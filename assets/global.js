function getCartDetails(){
    fetch("?section_id=cart-drawer")
    .then((response)=> response.text())
    .then((cartData)=>{
        var cart_html = $(cartData);
        var cart_items = $('.cart-items', cart_html);
        $('.cart-items').replaceWith(cart_items);
        var drawer_header = $('#offcanvasRightLabel', cart_html);
        $('#offcanvasRightLabel').replaceWith(drawer_header);
        var subtotal = $('.subtotal', cart_html);
        $('.subtotal').replaceWith(subtotal);
    });
    fetch("?section_id=header")
    .then((response)=> response.text())
    .then((headerData)=>{
        var cart_html = $(headerData);
        var cart_count = $('.header-cart-count', cart_html);
        $('.header-cart-count').replaceWith(cart_count);
    })
}

function increaseItem(el){
    var $input = el.previousElementSibling;
    var value = parseInt($input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    $input.value = value
    changeQuantity($input); 
}
function decreaseItem(el){
    var $input = el.nextElementSibling;
    var value = parseInt($input.value, 10);
    if(value > 1){
        value = isNaN(value) ? 0 : value;
        value--;
        $input.value = value;
        changeQuantity($input);
    }    
}

function changeQuantity($input){
  var line = $($input).attr('data-line');
  var quantity = $($input).val();
  jQuery.ajax({
    type: 'POST',
    url: '/cart/change.js',
    data: {
        'line': line,
        'quantity': quantity
    },
    dataType: 'json',
    success: function(res){
        getCartDetails();
    },
    error: function(err){
        console.log(err);
    }
  })
}


function itemRemove(e,el){
    e.preventDefault();
    var line = $(el).attr('data-line');
    jQuery.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: {
            'line': line,
            'quantity': 0
        },
        dataType: 'json',
        success: function(res){
            getCartDetails();
        },
        error: function(err){
            console.log(err);
        }
    })
}


