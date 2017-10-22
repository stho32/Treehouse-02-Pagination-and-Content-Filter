/**
 * Content Filtering for a list
 * 
 * As requested for the project 2/12 by team treehouse.
 * 
 * ... because it was so close :)
 */

/**
 * You have that list and then you think: 
 * Man, I should search this.
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
function UnobstrusiveSearching(selector, 
    listSelector,
    areYouAMatchCallback) {

    if ( $(selector).length !== 1 ) {
        console.log("I'm sorry, but your selector doesn't seem to make much sense. I cannot get the just-one-list I was hoping for.");
    }

    let $list = $(listSelector);
    let $listItems = $(listSelector).children("li");
    $(listSelector).parent().append('<div class="search-nothing-found">no student\'s found</div>');
    let $nothingFound = $(listSelector).parent().find(".search-nothing-found");

    /**
     * Search Callback 
     */
    function search(searchText) {
        let visibleItemsCount = 0;

        for (let i = 0; i < $listItems.length; i++ ) {
            let isVisible = $($listItems[i]).is(":visible");

            let shouldBeVisible = false;
            if ( areYouAMatchCallback !== undefined ) {
                shouldBeVisible = areYouAMatchCallback(searchText, $($listItems[i]));
            }

            if ( shouldBeVisible ) {
                visibleItemsCount += 1;
                if ( !isVisible ) $($listItems[i]).show();
            }
            else
            {
                if ( isVisible ) $($listItems[i]).hide();
            }
        }

        if ( visibleItemsCount == 0 ) {
            $nothingFound.show()
        }
        else
        {
            $nothingFound.hide();
        }
    }    

    let searchControl = SearchControl(selector, search);

}

