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
  alertLabel.css({ 'background-color': '#FF8178'});
  setTimeout( function(){
      alertLabel.css({'background-color': '#fff'});
    }, 3400);
}

function triggerInvalidEmailAlert() {
  var alertDiv = '<div class="validation-alert">Please enter a valid email!</div>';
  $('body').append(alertDiv);
  setTimeout(function(){
    $('.validation-alert').remove();
  }, 3000);
  var alertLabel = $('#input-alert-email');
  alertLabel.css({ 'background-color': '#FF8178'});
  setTimeout( function(){
      alertLabel.css({'background-color': '#fff'});
    }, 3000);
}

function triggerInvalidPasswordAlert() {
  var alertDiv = '<div class="validation-alert">Password should have more than 3 and less than 12 characters!</div>';
  $('body').append(alertDiv);
  setTimeout(function(){
    $('.validation-alert').remove();
  }, 3000);
  var alertLabel = $('#input-alert-password');
  alertLabel.css({ 'background-color': '#FF8178'});
  setTimeout( function(){
      alertLabel.css({'background-color': '#fff'});
    }, 3000);
}

function triggerFailToLogInAlert() {
  var alertDiv = '<div class="validation-alert">Login Failed! Please check your email and password!</div>';
  $('body').append(alertDiv);
  setTimeout(function(){
    $('.validation-alert').remove();
  }, 3000);
  var alertLabel = $('#input-alert-password, #input-alert-email');
  alertLabel.css({ 'background-color': '#FF8178'});
  setTimeout( function(){
      alertLabel.css({'background-color': '#fff'});
    }, 3000);
}

function triggerFailToSignUpAlert() {
  var alertDiv = '<div class="validation-alert">Server Error! Please try again later!</div>';
  $('body').append(alertDiv);
  setTimeout(function(){
    $('.validation-alert').remove();
  }, 3000);
  var alertLabel = $('#input-alert-password, #input-alert-email');
  alertLabel.css({ 'background-color': '#FF8178'});
  setTimeout( function(){
      alertLabel.css({'background-color': '#fff'});
    }, 3000);
}

function triggerUserExistAlert() {
  var alertDiv = '<div class="validation-alert">User Exist! Please try another email or login!</div>';
  $('body').append(alertDiv);
  setTimeout(function(){
    $('.validation-alert').remove();
  }, 3000);
  var alertLabel = $('#input-alert-email');
  alertLabel.css({ 'background-color': '#FF8178'});
  setTimeout( function(){
      alertLabel.css({'background-color': '#fff'});
    }, 3000);
}
