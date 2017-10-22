/**
 * Search Control
 * 
 * Encapsulation of a filter for those students. 
 * 
 * I want to separate the functionalities of paging and content filtering. 
 * This way if someone only needs the search or the paging functionality, 
 * both can be applied separatly.  
 * 
 * This is the search control. Its simply just the control. Attach it to the DOM. 
 * Get the search text and pass it to a callback. So I can remove complexity 
 * from the other js around.
 * 
 * selector: selector of the DOM element where want to place the search box
 * onSearchCallback : well you need to do something there, don't you :)
 */
function SearchControl(selector, onSearchCallback) {
    var publicApi = {};

    /* PUBLIC variables */

    publicApi.markerClass = "student-search";
    publicApi.template = '<div class="student-search">\n' +
        '  <input placeholder="Search for students...">\n' +
        '  <button>Search</button>\n' +
        '</div>';
    publicApi.$attachToThisElement = $(selector);
    publicApi.onSearch = onSearchCallback;
    
    // the DOM element that we create for the control
    publicApi.$element;

    /* PRIVATE variables */

    /* PRIVATE functions */

    /** button handler for the search */
    function onButtonClick(event) {
        event.stopPropagation();
    
        let searchText = publicApi.$element.find("input").val();
        console.log("Search has been called with '" + searchText + "'!")
        if ( publicApi.onSearch !== undefined ) {
          publicApi.onSearch(searchText);
        }
    
        event.preventDefault();
      }    

    /**
     * Add element to DOM
     */
    function appendControlToDOM() {
        if (publicApi.$element !== undefined) {
          publicApi.$element.remove();
          publicApi.$element = undefined;
        }
    
        // append a fresh copy of the template
        $(publicApi.$attachToThisElement).append(publicApi.template);
        // and keep a reference to the dom object for further operations later on.
        publicApi.$element = publicApi.$attachToThisElement.find("." + publicApi.markerClass);
      
        $(publicApi.$element).on("click", "button", onButtonClick);
        console.log("search box attached!");
      }

    /* PUBLIC functions */

    /* Insert the Control into the correct spot. Do nothing else. */
    publicApi.updateDom = function () {
        appendControlToDOM();
    }

    // We want to auto-add when its initialized :)
    appendControlToDOM();

    return publicApi;
}