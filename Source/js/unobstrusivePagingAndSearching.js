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
        /* Since we know what page size we want to have
           we calculate starting and ending indexes so we
           know what to how and what not to show.
        */
        let startIndex = pageNumber * pageSize;
        let endIndex = pageNumber * pageSize + pageSize -1;
        
        console.log("showing " + (startIndex + 1).toString() + " to " + (endIndex + 1).toString());

        // note: This function works with the matched items, not with every item.
        //       This way we can stack paging and searching. 
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
     * Search Callback for the search control.
     * 
     * The search control calls this callback on the occasion of a search being performed;
     */
    function search(searchText) {
        /* We count how many items we find ... */
        let visibleItemsCount = 0;
        /* and remember them  */
        matchedItems = [];
        
        /* We remove the current paging control from the DOM 
           if its there... */
        if ( pagingControl !== undefined ) {
            pagingControl.remove();
            pagingControl == undefined;
        }

        for (let i = 0; i < $listItems.length; i++ ) {
            let shouldBeVisible = false;
            /* To perform the search I've created the parameter "areYouAMatchCallback".
               This is a callback. As I may have already stated I wanted to develop 
               in a way that may enable me to grab the code later for real development. 
               So it make sence to split the matching out to be able to react on different
               list item markup then.
               As always, one should check if the parameter has been passed to us first.
               If it is undefined the functionality would break. */
            if ( areYouAMatchCallback !== undefined ) {
                /* We pass a text and the item as jquery-thingy. 
                   The callback can then grab whatever elements it needs and tell me, 
                   if it is a match or not. */
                shouldBeVisible = areYouAMatchCallback(searchText, $($listItems[i]));
            }

            /* When the item should be visible, we make it so _and_ we remember it. */
            if ( shouldBeVisible ) {
                visibleItemsCount += 1;
                matchedItems.push($listItems[i]);
                $($listItems[i]).show();
            }
            else
            {
                /* Else, we hide it */
                $($listItems[i]).hide();
            }
        }
        console.log(matchedItems.length + " students matched");

        if ( visibleItemsCount == 0 ) {
            /* Show "no students found" */
            $nothingFound.show()
        }
        else
        {
            /* or do not show "no students found" */
            $nothingFound.hide();
            /* If there are more then 10 results we apply our paging magic here. 
               We pass where our list is and the page count. The page count is calculated over
               the number of the matched items. 
               The callback "showPage" will also operate on the matchedItems. 
               So note how this works: 
               1) we hide all items that are not matched by the search and show all 
                  items that are matched.
               2) we use paging magic, but only on the set of matched items that are 
                  visible after this search. The paging will then decide, which items
                  are to be hidden in the next step so that the paging works. */
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

