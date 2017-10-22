/**
 * Content Filtering for a list
 * 
 * As requested for the project 2/12 by team treehouse.
 * 
 * ... because it was so close :)
 */

/**
 * You have that list and then you think: 
 * Man, I should search this. And page it.
 * 
 * selector: 
 *  A css selector that identifies the element that you want the search box to be attached
 *  to :).
 * listSelector:
 *  A css selector that identifies the one list that you want to have content-filtering on.
 *  The selector should identify exactly one list, an ul or ol, with good nice
 *  li elements inside. 
 * areYouAMatchCallback: 
 *  This callback is called with an il element as parameter. It returns a boolean that
 *  gives back if il is a match for the search text. This way I keep the logic for the 
 *  text matching outside. And for the text extraction which is specific. 
 */
function UnobstrusivePagingAndSearching(selector, 
    listSelector,
    areYouAMatchCallback) {

    if ( $(selector).length !== 1 ) {
        console.log("I'm sorry, but your selector doesn't seem to make much sense. I cannot get the just-one-list I was hoping for.");
    }

    /* This is our untainted view of the list */
    let $list = $(listSelector);
    let $listItems = $(listSelector).children("li");
    // Matched elements init
    let matchedItems = [];
    /* -- */
    
    /* nothing found .. */
    $(listSelector).parent().append('<div class="search-nothing-found">no student\'s found</div>');
    let $nothingFound = $(listSelector).parent().find(".search-nothing-found");
    /* -- */

    // Initial configuration of the paging
    const pageSize   = 10;
    let pagingControl = undefined;

    /* 
        Show Page 
    */
    function showPage(pageNumber) {
        let startIndex = pageNumber * pageSize;
        let endIndex = pageNumber * pageSize + pageSize -1;
        
        console.log("showing " + (startIndex + 1).toString() + " to " + (endIndex + 1).toString());

        for (let i = 0; i < matchedItems.length; i++ ) {
            if ( i >= startIndex && i <= endIndex ) {
                /* These elements should be visible */
                $(matchedItems[i]).show();
            }
            else
            {
                /* These elements should NOT be visible */
                $(matchedItems[i]).hide();
            }
        }
    }

    /**
     * Search Callback 
     */
    function search(searchText) {
        let visibleItemsCount = 0;
        matchedItems = [];
        
        if ( pagingControl !== undefined ) {
            pagingControl.remove();
            pagingControl == undefined;
        }

        for (let i = 0; i < $listItems.length; i++ ) {
            let shouldBeVisible = false;
            if ( areYouAMatchCallback !== undefined ) {
                shouldBeVisible = areYouAMatchCallback(searchText, $($listItems[i]));
            }

            if ( shouldBeVisible ) {
                visibleItemsCount += 1;
                matchedItems.push($listItems[i]);
                $($listItems[i]).show();
            }
            else
            {
                $($listItems[i]).hide();
            }
        }
        console.log(matchedItems.length + " students matched");

        if ( visibleItemsCount == 0 ) {
            $nothingFound.show()
        }
        else
        {
            $nothingFound.hide();
            if ( visibleItemsCount > 10) {
                pagingControl = PagingControl($list.parent(), Math.ceil(matchedItems.length / pageSize), showPage);
                pagingControl.setActivePage(0);
            }
        }
    }    

    let searchControl = SearchControl(selector, search);
    // init everything
    search("");
}

