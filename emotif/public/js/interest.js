/*
* Front end logic for interest page.
*/
'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  RegisterNavListener();
  initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  $('#interest-next-button').click(function() {
    window.location.href = '/select';
  });
}