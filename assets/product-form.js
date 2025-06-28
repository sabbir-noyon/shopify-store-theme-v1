$(document).ready(function(){
    if($('button[name="add"]').length > 0){
        $(document).on("click", "button[name='add']", function(e){
            e.preventDefault();
            var formData = $(this).closest('.product-form[action="/cart/add"]').serialize();
            
            $.ajax({
                type: 'POST',
                url: '/cart/add.js',
                dataType: 'json',
                data: formData,
                success: function(data){
                    console.log('data:', data);
                    getCartDetails();
                    $('#offcanvasRight').offcanvas('show');
                },
                error: 'Add to cart error!'
            })
        })
    }
});
