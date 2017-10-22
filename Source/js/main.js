/**
 * main 
 * 
 * uncomment the section below to enable the functionality you want to see
 */

/* just the paging */
//UnobstrusivePaging(".student-list");
/* -- */

/* searching only */
UnobstrusiveSearching(".page-header", ".student-list",
function(searchText, $element) {
    console.log($element.find("h3").text());
    if ( $element.find("h3").text().indexOf(searchText) > -1 )
        return true;
    if ( $element.find(".email").text().indexOf(searchText) > -1 )
        return true;     
    return false;               
});
/* -- */

/* Paging + Filtering */


/* -- */