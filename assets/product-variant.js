$(document).ready(function(){
    function selectedVariant(param, value){
       var url = new URL(window.location.href);

       url.searchParams.set(param, value);
       window.history.replaceState({},'',url);
    }
    function updateSelection(){
        var selectedValues = "";
        $('.product-options input[type="radio"]:checked').each(function(){
            selectedValues += (selectedValues ? " / " : "") + $(this).val();
        });

        // select the main variant
        $(".variants option").each(function(){
            if($(this).text() == selectedValues){
                $(this).prop("selected", true);
                return false;
            }
        });
    }

    $('.product-options input[type="radio"]').change(function(){
        updateSelection();

        var currentVariant = $('.variants').val();
        var variantAvailable = $('.variants').find('option:selected').data('available');
        if(variantAvailable == false){
            $('.cart-buttons > button').prop('disabled', true);
            $('.cart-buttons > button').text('Not available');
        }else{
            $('.cart-buttons > button').prop('disabled', false);
            $('.cart-buttons > button').text('Add to cart');
        }
        selectedVariant('variant', currentVariant);
    });
    updateSelection();
})