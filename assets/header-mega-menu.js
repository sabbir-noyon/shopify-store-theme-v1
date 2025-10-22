/*============================
	Header-Mega-Menu Start
==============================*/

/*=== Mega Menu Enhancements Start ==*/

// Mega menu hover handling
document.addEventListener("DOMContentLoaded", function () {
	const megaMenus = document.querySelectorAll(".nav-mega-menu");

	megaMenus.forEach((menu) => {
		const megaMenu = menu.querySelector(".mega-menu");

		// Add hover delay
		let hoverTimer;

		menu.addEventListener("mouseenter", function () {
			clearTimeout(hoverTimer);
			hoverTimer = setTimeout(() => {
				megaMenu.style.display = "block";
			}, 150);
		});

		menu.addEventListener("mouseleave", function () {
			clearTimeout(hoverTimer);
			hoverTimer = setTimeout(() => {
				megaMenu.style.display = "none";
			}, 300);
		});

		// Keep menu open when hovering over mega menu
		megaMenu.addEventListener("mouseenter", function () {
			clearTimeout(hoverTimer);
		});

		megaMenu.addEventListener("mouseleave", function () {
			hoverTimer = setTimeout(() => {
				megaMenu.style.display = "none";
			}, 300);
		});
	});

	// ===== BLOG DROPDOWN HOVER DELAY (ONLY FOR MEGA MENU) =====

	if (!document.querySelector(".header-main-section.mega-menu-project")) return;

	const blogDropdown = document.querySelector(".nav-dropdown");
	if (blogDropdown) {
		const blogSubmenu = blogDropdown.querySelector(".nav-submenu");
		let blogHoverTimer;

		blogDropdown.addEventListener("mouseenter", function () {
			clearTimeout(blogHoverTimer);
			blogHoverTimer = setTimeout(() => {
				blogSubmenu.style.display = "block";
			}, 150);
		});

		blogDropdown.addEventListener("mouseleave", function () {
			clearTimeout(blogHoverTimer);
			blogHoverTimer = setTimeout(() => {
				blogSubmenu.style.display = "none";
			}, 300);
		});

		blogSubmenu.addEventListener("mouseenter", function () {
			clearTimeout(blogHoverTimer);
		});

		blogSubmenu.addEventListener("mouseleave", function () {
			blogHoverTimer = setTimeout(() => {
				blogSubmenu.style.display = "none";
			}, 300);
		});
	}
});

/*=== Mega Menu Enhancements End ==*/

/*=== Off-Canvas Drawer Start ===*/

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

/*============================
	Header-Mega-Menu End
==============================*/
