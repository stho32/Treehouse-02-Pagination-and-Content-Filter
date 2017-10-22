/**
 * Paging and Content Filtering  main file 
 * 
 * As requested for the project 2/12 by team treehouse.
 * 
 */

// In case you'd like a lot of debug output to get a grasp of everything
// feel free to set DEBUG to true. 
// Set it to false if you just want to use it.
const DEBUG = true;

/* log logs the text to the console if DEBUG is set to 
   true 
*/
function log(textOrObject) 
{
    if ( DEBUG ) {
        console.log(textOrObject);
    }
}

/**
 * You have that list and then you think: 
 * Man, I should page this.
 * 
 * selector: 
 *  A css selector that identifies the one list that you want to have paging.
 *  The selector should identify exactly one list, an ul or ol, with good nice
 *  li elements inside. 
 */
function ApplyUnobstrusivePaging(selector) {

    if ( $(selector).length !== 1 ) {
        console.log("I'm sorry, but your selector doesn't seem to make much sense. I cannot get the just-one-list I was hoping for.");
    }

    let $list = $(selector);
    let $listItems = $(selector).children("li");
    log("I found " + $listItems.length + " list items.");

    // Initial configuration
    const pageSize   = 10;
    const activePage = 0;

    // .. since its not a dynamic list, we can calculate the page count here
    // We need to use ceil here. Rounding would forget a page when the remaining
    // elements on the last page are less then 0.5.
    const pageCount = Math.ceil($listItems.length / pageSize);
    log("This makes " + pageCount + " pages.")

    function showPage(pageNumber) {
        console.log(pageNumber);
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