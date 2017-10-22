/**
 * Paging for a list
 * 
 * As requested for the project 2/12 by team treehouse.
 */

/**
 * You have that list and then you think: 
 * Man, I should page this.
 * 
 * selector: 
 *  A css selector that identifies the one list that you want to have paging.
 *  The selector should identify exactly one list, an ul or ol, with good nice
 *  li elements inside. 
 */
function UnobstrusivePaging(selector) {

    if ( $(selector).length !== 1 ) {
        console.log("I'm sorry, but your selector doesn't seem to make much sense. I cannot get the just-one-list I was hoping for.");
    }

    let $list = $(selector);
    let $listItems = $(selector).children("li");
    console.log("I found " + $listItems.length + " list items.");

    // Initial configuration
    const pageSize   = 10;
    const activePage = 0;

    // .. since its not a dynamic list, we can calculate the page count here
    // We need to use ceil here. Rounding would forget a page when the remaining
    // elements on the last page are less then 0.5.
    const pageCount = Math.ceil($listItems.length / pageSize);
    console.log("This makes " + pageCount + " pages.")

    function showPage(pageNumber) {
        let startIndex = pageNumber * pageSize;
        let endIndex = pageNumber * pageSize + pageSize -1;
        
        console.log("showing " + (startIndex + 1).toString() + " to " + (endIndex + 1).toString());

        for (let i = 0; i < $listItems.length; i++ ) {
            let isVisible = $($listItems[i]).is(":visible");
            if ( i >= startIndex && i <= endIndex ) {
                /* These elements should be visible */
                if ( !isVisible ) $($listItems[i]).show();
            }
            else
            {
                /* These elements should NOT be visible */
                if ( isVisible ) $($listItems[i]).hide();
            }
        }
    }    

    let pagingControl = PagingControl($list.parent(), pageCount, showPage);
 
    function appendPageLinks() {
        pagingControl.updateDom();
    }

    // First thing: Append those links.
    appendPageLinks();
    // Then show the first page.
    showPage(0);

}

