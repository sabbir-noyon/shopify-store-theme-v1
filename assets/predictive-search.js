class PredictiveSearch extends HTMLElement {
    constructor(){
        super();
        this.$input = $(this).find('input[type="search"]');
        this.$predictiveSearchResults = $(this).find('#predictive-search');
        
        this.$input.on('input', this.debounce((event)=>{
            this.onChange(event);
        }, 300).bind(this))
    }

    onChange(){
        const searchTerm = this.$input.val().trim();
        if(!searchTerm.length){
            this.close();
            return;
        }
        this.getSearchResults(searchTerm);
    }

    getSearchResults(searchTerm){
        $.ajax({
            url: `/search/suggest?q=${searchTerm}&section_id=predictive-search`,
            method: 'GET',
            success: (response)=>{
               const resultMarkup = $(new DOMParser().parseFromString(response, 'text/html')).find('#predictiveSearchSection').html();
               this.$predictiveSearchResults.html(resultMarkup);
               this.open();
            },
            error: ()=>{
                this.close();
            }
        })
    }

    open(){
        this.$predictiveSearchResults.show();
    }
    
    close(){
        this.$predictiveSearchResults.hide();
    }

    debounce(fn, wait){
        let t;
        return (...arg)=>{
            clearTimeout(t);
            t= setTimeout(()=> fn.apply(this, arg), wait)
        }
    }
}

customElements.define('predictive-search', PredictiveSearch)