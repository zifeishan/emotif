/* This is the code for login/signup validation
* Simply inject this js code into the page that needs
* validation, and write some logic to perform. 
*/

var minPasswordLength = 3;
var maxPasswordLength = 12;

function validateEmail(email) { 
    if(email.length = 0) {
      return false;
    }
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
  if(password.length < minPasswordLength || password.length > maxPasswordLength) {
    return false;
  }
  return true;
}

//This is the function to trigger alert effect.
function triggerAlert() {
  var alertDiv = $('.validate-alert');
  alertDiv.fadeIn(200).delay(3000).fadeOut(200);
  var alertLabel = $('.input-alert');
  alertLabel.css({ 'background-color': '#F29E4A'});
  setTimeout( function(){
      alertLabel.css({'background-color': '#fff'});
    }, 3400);
}

function triggerInvalidEmailAlert() {
  var alertDiv = $('.validate-alert');
  alertDiv.fadeIn(200).delay(3000).fadeOut(200);
  var alertLabel = $('.input-alert');
  alertLabel.css({ 'background-color': '#F29E4A'});
  setTimeout( function(){
      alertLabel.css({'background-color': '#fff'});
    }, 3400);
}

function triggerInvalidPasswordAlert() {
  
}

function triggerFailToLogInAlert() {

}
