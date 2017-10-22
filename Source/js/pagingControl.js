/**
 * This file just defines everything that I need to draw
 * and control a pagination "control".
 */

/**
 * PagingControl
 * 
 * Parameters: 
 *   attachToThisElement : append this pagingControl to the element (jQuery selected)
 *   pageCount           : initial number of pages
 *   showPageCallback    : everytime a page is selected this function is called back
 *                         signature: callback(pageNumber)
 * 
 * API: 
 *   ... a lot of little variables ... 
 *   function updateDom     : inserts or updates the needed DOM elements.
 *   function setActivePage : sets the active page
 */
function PagingControl($attachToThisElement, pageCount, showPageCallback) {
  /* The publicApi is returned at the end. 
     It contains all variables and functions the control wants to share. 

     Everything else we will keep in the body of the function, and not return
     it, thus keep it private. 
  */
  var publicApi = {};

  /* PUBLIC variables */
  publicApi.markerClass = "pagination";
  publicApi.showPageCallback = showPageCallback;
  publicApi.$attachToThisElement = $attachToThisElement;
  publicApi.pageCount = pageCount;

  // the DOM element that we create for the control
  publicApi.$element;

  // template definitions 
  publicApi.templateStart = "<div class=\"pagination\"><ul>";
  publicApi.templateEnd = "</ul></div>";
  // note : I added data-pageNumber. This way every item remembers which page it stands for. 
  //        Independently of the text it shows. 
  // note : replaced href="#" with "javascript:void(0)" to stop the page from jumping to the top when clicking a button
  publicApi.listElement = "<li data-pagenumber=\"$pageNumber$\"><a href=\"javascript:void(0)\">$pageNumber$</a></li>";
  publicApi.listElementActive = "<li data-pagenumber=\"$pageNumber$\"><a class=\"active\" href=\"javascript:void(0)\">$pageNumber$</a></li>";


  /* PRIVATE variables */
  let activePage = 0;

  /* PRIVATE functions */

  /**
   * renderPageButton is a private function to render a button-Template
   */
  function renderPageButton(pageNumber, isActive) {
    let result = publicApi.listElement;
    if (isActive) result = publicApi.listElementActive;

    result = result.replace(/\$pageNumber\$/g, pageNumber.toString())

    return result;
  }

  /**
   * renderTemplate is a private function to render the complete
   * template of the control.
   */
  function renderTemplate() {
    let result = "";

    result += publicApi.templateStart;
    for (let i = 0; i < publicApi.pageCount; i++) {
      result += renderPageButton(i + 1, i == activePage);
    }

    result += publicApi.templateEnd;

    return result;
  }

  /** 
   * This is the button handler. 
   * When one of our buttons is clicked we recognize the clicked page and we update the controls DOM. 
   * And we call the callback function so our users have a chance to react on the page change.
   */
  function onButtonClick(event) {
    event.stopPropagation();

    let $clickedListElement = $(event.target).closest("li");
    let newPageNumber = parseInt($clickedListElement.data("pagenumber")) - 1;

    activePage = newPageNumber;

    if (publicApi.showPageCallback !== undefined) {
      publicApi.showPageCallback(activePage);
    }

    /// Since the active page has changed, we need to modify the layout of the control.
    publicApi.updateDom();

    event.preventDefault();
  }

  /**
   * When the control is not in the DOM yet we need to place it there...  
   */
  function appendControlToDOM() {
    publicApi.remove();

    // append a fresh copy of the buttons
    $(publicApi.$attachToThisElement).append(renderTemplate());
    // and keep a reference to the dom object for further operations later on.
    publicApi.$element = publicApi.$attachToThisElement.parent().find("." + publicApi.markerClass);

    $(publicApi.$element).on("click", "a", onButtonClick);
    console.log("paging control has been attached/updated!");
  }

  /* PUBLIC FUNCTIONS */

  /* updateDom is called by the user to update the DOM. 
     He'll probably just call this once to append the control in
     the right location.
  */
  publicApi.updateDom = function () {
    appendControlToDOM();
    /* fire callback so dependent ui can be updated, too */
    if (publicApi.showPageCallback !== undefined) {
      publicApi.showPageCallback(activePage);
    }
  }

  /* Removes the DOM element if needed */
  publicApi.remove = function() {
    if (publicApi.$element !== undefined) {
      publicApi.$element.remove();
      publicApi.$element = undefined;
    }
  }

  /**
   * setActivePage(number)
   * 
   * Sets the currently active page. Setting the page
   * updates the DOM and calls the callback function.
   */
  publicApi.setActivePage = function (number) {
    activePage = number;
    publicApi.updateDom();
  }


  return publicApi;
}
