function getCartDetails() {
	fetch("?section_id=cart-drawer")
		.then((response) => response.text())
		.then((cartData) => {
			var cart_html = $(cartData);
			var cart_items = $(".cart-items", cart_html);
			$(".cart-items").replaceWith(cart_items);
			var drawer_header = $("#offcanvasRightLabel", cart_html);
			$("#offcanvasRightLabel").replaceWith(drawer_header);
			var subtotal = $(".subtotal", cart_html);
			$(".subtotal").replaceWith(subtotal);
		});
	fetch("?section_id=header")
		.then((response) => response.text())
		.then((headerData) => {
			var cart_html = $(headerData);
			var cart_count = $(".header-cart-count", cart_html);
			$(".header-cart-count").replaceWith(cart_count);
		});
}

function increaseItem(el) {
	var $input = el.previousElementSibling;
	var value = parseInt($input.value, 10);
	value = isNaN(value) ? 0 : value;
	value++;
	$input.value = value;
	changeQuantity($input);
}
function decreaseItem(el) {
	var $input = el.nextElementSibling;
	var value = parseInt($input.value, 10);
	if (value > 1) {
		value = isNaN(value) ? 0 : value;
		value--;
		$input.value = value;
		changeQuantity($input);
	}
}

function changeQuantity($input) {
	var line = $($input).attr("data-line");
	var quantity = $($input).val();
	jQuery.ajax({
		type: "POST",
		url: "/cart/change.js",
		data: {
			line: line,
			quantity: quantity,
		},
		dataType: "json",
		success: function (res) {
			getCartDetails();
		},
		error: function (err) {
			console.log(err);
		},
	});
}

function itemRemove(e, el) {
	e.preventDefault();
	var line = $(el).attr("data-line");
	jQuery.ajax({
		type: "POST",
		url: "/cart/change.js",
		data: {
			line: line,
			quantity: 0,
		},
		dataType: "json",
		success: function (res) {
			getCartDetails();
		},
		error: function (err) {
			console.log(err);
		},
	});
}

/*  =======================
     Header 2 Area Start 
	======================
*/

// // Mobile menu toggle
// const menuToggle = document.getElementById("menu-toggle");
// const mobileMenu = document.getElementById("mobile-menu");

// menuToggle.addEventListener("click", () => {
// 	mobileMenu.style.left = mobileMenu.style.left === "0px" ? "-100%" : "0px";
// });

// // Close menu when clicking outside
// document.addEventListener("click", (e) => {
// 	if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
// 		mobileMenu.style.left = "-100%";
// 	}
// });

document.addEventListener("DOMContentLoaded", function () {
	const menuToggle = document.getElementById("menu-toggle");
	const mobileMenu = document.getElementById("mobile-menu");

	if (menuToggle && mobileMenu) {
		menuToggle.addEventListener("click", function (e) {
			e.stopPropagation();
			if (mobileMenu.classList.contains("open")) {
				mobileMenu.classList.remove("open");
			} else {
				mobileMenu.classList.add("open");
			}
		});

		// Close if clicked outside
		document.addEventListener("click", function (e) {
			if (
				mobileMenu.classList.contains("open") &&
				!mobileMenu.contains(e.target) &&
				!menuToggle.contains(e.target)
			) {
				mobileMenu.classList.remove("open");
			}
		});
	}
});

/*  =======================
     Header 2 Area End 
	======================
*/

/*  =======================
     Header 3 Area Start 
	======================
*/

document.addEventListener("DOMContentLoaded", function () {
	// Mobile Hamburger Menu
	const toggle = document.getElementById("hamburger-toggle");
	const mobileMenu = document.getElementById("mobile-menu");

	if (toggle && mobileMenu) {
		toggle.addEventListener("click", function (e) {
			e.stopPropagation();
			mobileMenu.classList.toggle("-translate-x-full");
		});

		// Close mobile menu if clicked outside
		document.addEventListener("click", function (e) {
			if (!mobileMenu.contains(e.target) && !toggle.contains(e.target)) {
				mobileMenu.classList.add("-translate-x-full");
			}
		});
	}

	// Desktop Dropdowns
	const dropdowns = document.querySelectorAll(".header3-nav li.relative");
	dropdowns.forEach((li) => {
		const submenu = li.querySelector("ul");
		if (!submenu) return;

		li.addEventListener("mouseenter", () => {
			submenu.classList.remove("opacity-0", "pointer-events-none");
			submenu.classList.add("opacity-100", "pointer-events-auto");
		});

		li.addEventListener("mouseleave", () => {
			submenu.classList.add("opacity-0", "pointer-events-none");
			submenu.classList.remove("opacity-100", "pointer-events-auto");
		});
	});
});

// Mobile Hamburger Menu
const toggle = document.getElementById("hamburger-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (toggle && mobileMenu) {
	toggle.addEventListener("click", function (e) {
		e.stopPropagation();
		mobileMenu.classList.toggle("-translate-x-full");
	});

	document.addEventListener("click", function (e) {
		if (!mobileMenu.contains(e.target) && !toggle.contains(e.target)) {
			mobileMenu.classList.add("-translate-x-full");
		}
	});
}

/*  =======================
     Header 3 Area End 
	======================
*/

/*=====================
	Header-Main Start
=======================*/

// Off-canvas drawer

(function () {
	const openBtn = document.getElementById("menu-toggle");
	const drawer = document.getElementById("site-drawer");
	const drawerPanel = drawer?.querySelector(".site-drawer__panel");
	const backdrop = document.getElementById("drawer-backdrop");
	const closeBtn = document.getElementById("drawer-close");
	const body = document.documentElement || document.body;

	if (!drawer || !openBtn) return;

	function openDrawer() {
		drawer.classList.add("open");
		drawer.setAttribute("aria-hidden", "false");
		document.body.classList.add("drawer-locked");
		// move focus to first focusable item in drawer
		setTimeout(() => {
			const first = drawer.querySelector(
				'button, a, [tabindex]:not([tabindex="-1"])'
			);
			if (first) first.focus();
		}, 120);
	}

	function closeDrawer() {
		drawer.classList.remove("open");
		drawer.setAttribute("aria-hidden", "true");
		document.body.classList.remove("drawer-locked");
		openBtn.focus();
	}

	openBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		openDrawer();
	});

	closeBtn &&
		closeBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			closeDrawer();
		});
	backdrop &&
		backdrop.addEventListener("click", (e) => {
			e.stopPropagation();
			closeDrawer();
		});

	// close when any link inside drawer is clicked
	drawer.addEventListener("click", (e) => {
		const target = e.target;
		if (target.closest("a") || target.classList.contains("drawer-link")) {
			// close drawer after click
			closeDrawer();
		}
	});

	// Escape to close
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && drawer.classList.contains("open")) {
			closeDrawer();
		}
	});

	// Toggle submenu behavior
	drawer.querySelectorAll(".drawer-toggle").forEach((btn) => {
		btn.addEventListener("click", function (ev) {
			ev.preventDefault();
			const item = this.closest(".drawer-item");
			const expanded = this.getAttribute("aria-expanded") === "true";
			this.setAttribute("aria-expanded", String(!expanded));
			item.classList.toggle("open");
		});
	});

	// Close drawer if user resizes to desktop
	window.addEventListener("resize", () => {
		if (window.innerWidth > 992 && drawer.classList.contains("open")) {
			closeDrawer();
		}
	});

	// Prevent clicks inside panel from closing
	drawerPanel &&
		drawerPanel.addEventListener("click", (e) => e.stopPropagation());
})();

/*====================
	Header-Main End
======================*/

/*============================
	Header-Mega-Menu Start
==============================*/

/*============================
	Header-Mega-Menu End
==============================*/
