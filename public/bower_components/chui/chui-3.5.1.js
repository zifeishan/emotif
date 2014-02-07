/*
    pO\
   6  /\
     /OO\
    /OOOO\
  /OOOOOOOO\
 ((OOOOOOOO))
  \:~=++=~:/

ChocolateChip-UI
ChUI.js
Copyright 2014 Sourcebits www.sourcebits.com
License: MIT
Version: 3.5.1
*/
(function($) {
  'use strict';


  $.extend({
    ///////////////
    // Create Uuid:
    ///////////////
    Uuid : function() {
      return Date.now().toString(36);
    },

    ///////////////////////////
    // Concat array of strings:
    ///////////////////////////
    concat : function ( args ) {
      return (args instanceof Array) ? args.join('') : [].slice.apply(arguments).join('');
    },

    ////////////////////////////
    // Version of each that uses
    // regular paramater order:
    ////////////////////////////
    forEach : function ( obj, callback, args ) {
      function isArraylike( obj ) {
        var length = obj.length,
          type = jQuery.type( obj );

        if ( type === "function" || jQuery.isWindow( obj ) ) {
          return false;
        }

        if ( obj.nodeType === 1 && length ) {
          return true;
        }

        return type === "array" || length === 0 ||
          typeof length === "number" && length > 0 && ( length - 1 ) in obj;
      } 
      var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike( obj );

      if ( args ) {
        if ( isArray ) {
          for ( ; i < length; i++ ) {
            value = callback.apply( obj[ i ], args );

            if ( value === false ) {
              break;
            }
          }
        } else {
          for ( i in obj ) {
            value = callback.apply( obj[ i ], args );

            if ( value === false ) {
              break;
            }
          }
        }

      // A special, fast, case for the most common use of each
      } else {
        if ( isArray ) {
          for ( ; i < length; i++ ) {
            value = callback.call( obj[ i ], obj[ i ], i );

            if ( value === false ) {
              break;
            }
          }
        } else {
          for ( i in obj ) {
            value = callback.call( obj[ i ], obj[ i ], i );

            if ( value === false ) {
              break;
            }
          }
        }
      }
    }
  });

  $.fn.extend({
    //////////////////////
    // Return element that 
    // matches selector:
    //////////////////////
    iz : function ( selector ) {
      var ret = $();
      this.forEach(function(ctx) {
        if ($(ctx).is(selector)) {
          ret.push(ctx);
        }
      });
      return ret;
    },

    //////////////////////////////
    // Return element that doesn't 
    // match selector:
    //////////////////////////////
    iznt : function ( selector ) {
      return this.not(selector);
    },
 
    ///////////////////////////////////
    // Return element whose descendants 
    // match selector:
    ///////////////////////////////////
    haz : function ( selector ) {
      return this.has(selector);
    },
 
    ///////////////////////////////////
    // Return element whose descendants 
    // don't match selector:
    ///////////////////////////////////
    haznt : function ( selector ) {
      var ret = $();
      this.forEach(function(ctx) {
        if (!$(ctx).has(selector)[0]) {
          ret.push(ctx);
        }
      });
      return ret;
    },

    //////////////////////////////////////
    // Return element that has class name:
    //////////////////////////////////////
    hazClass : function ( className ) {
      var ret = $();
      this.forEach(function(ctx) {
        if ($(ctx).hasClass(className)) {
          ret.push(ctx);
        }
      });
      return ret;
    },

    //////////////////////////////
    // Return element that doesn't 
    // have class name:
    //////////////////////////////
    hazntClass : function ( className ) {
      var ret = $();
      this.forEach(function(ctx) {
        if (!$(ctx).hasClass(className)) {
          ret.push(ctx);
        }
      });
      return ret;
    },

    /////////////////////////////////////
    // Return element that has attribute:
    /////////////////////////////////////
    hazAttr : function ( property ) {
      var ret = $();
      this.forEach(function(ctx){
        if ($(ctx).attr(property)) {
          ret.push(ctx);
        }
      });
      return ret;
    },

    //////////////////////////
    // Return element that 
    // doesn't have attribute:
    //////////////////////////
    hazntAttr : function ( property ) {
      var ret = $();
      this.forEach(function(ctx){
        if (!$(ctx).attr(property)) {
          ret.push(ctx);
        }
      });
      return ret;
    },

    ////////////////////////////
    // Version of each that uses
    // regular paramater order:
    ////////////////////////////
    forEach : function ( callback, args ) {
      return $.forEach( this, callback, args );
    }
  });

 
 
  $.extend({
    eventStart : null,
    eventEnd : null,
    eventMove : null,
    eventCancel : null,
    // Define min-length for gesture detection:
    gestureLength : 30 
  });

  $(function() {
    //////////////////////////
    // Setup Event Variables:
    //////////////////////////
    // Pointer events for IE10 and WP8:
    if (window.navigator.pointerEnabled) {
      $.eventStart = 'pointerdown';
      $.eventEnd = 'pointerup';
      $.eventMove = 'pointermove';
      $.eventCancel = 'pointercancel';
    // Pointer events for IE10 and WP8:
    } else if (window.navigator.msPointerEnabled) {
      $.eventStart = 'MSPointerDown';
      $.eventEnd = 'MSPointerUp';
      $.eventMove = 'MSPointerMove';
      $.eventCancel = 'MSPointerCancel';
    // Touch events for iOS & Android:
    } else if ('ontouchstart' in window) {
      $.eventStart = 'touchstart';
      $.eventEnd = 'touchend';
      $.eventMove = 'touchmove';
      $.eventCancel = 'touchcancel';
    // Mouse events for desktop:
    } else {
      $.eventStart = 'mousedown';
      $.eventEnd = 'click';
      $.eventMove = 'mousemove';
      $.eventCancel = 'mouseout';
    }
  });

 
 
  $.extend({
    isiPhone : /iphone/img.test(navigator.userAgent),
    isiPad : /ipad/img.test(navigator.userAgent),
    isiPod : /ipod/img.test(navigator.userAgent),
    isiOS : /ip(hone|od|ad)/img.test(navigator.userAgent),
    isAndroid : (/android/img.test(navigator.userAgent) && !/trident/img.test(navigator.userAgent)),
    isWebOS : /webos/img.test(navigator.userAgent),
    isBlackberry : /blackberry/img.test(navigator.userAgent),
    isTouchEnabled : ('createTouch' in document),
    isOnline :  navigator.onLine,
    isStandalone : navigator.standalone,
    isiOS6 : navigator.userAgent.match(/OS 6/i),
    isiOS7 : navigator.userAgent.match(/OS 7/i),
    isWin : /trident/img.test(navigator.userAgent),
    isWinPhone : (/trident/img.test(navigator.userAgent) && /mobile/img.test(navigator.userAgent)),
    isIE10 : navigator.userAgent.match(/msie 10/i),
    isIE11 : navigator.userAgent.match(/msie 11/i),
    isWebkit : navigator.userAgent.match(/webkit/),
    isMobile : /mobile/img.test(navigator.userAgent),
    isDesktop : !(/mobile/img.test(navigator.userAgent)),
    isSafari : (!/Chrome/img.test(navigator.userAgent) && /Safari/img.test(navigator.userAgent) && !/android/img.test(navigator.userAgent)),
    isChrome : /Chrome/img.test(navigator.userAgent),
    isNativeAndroid : (/android/i.test(navigator.userAgent) && /webkit/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent))
  });


  //////////////////////////////////////////////////////
  // Swipe Gestures for ChocolateChip-UI.
  // Includes mouse gestures for desktop compatibility.
  //////////////////////////////////////////////////////
  var touch = {};
  var touchTimeout;
  var swipeTimeout;
  var tapTimeout;
  var longTapDelay = 750;
  var singleTapDelay = 150;
  var longTapTimeout;

  function parentIfText(node) {
    return 'tagName' in node ? node : node.parentNode;
  }

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down');
  }

  function longTap() {
    longTapTimeout = null;
    if (touch.last) {
      try {
        if (touch && touch.el) {
          touch.el.trigger('longtap');
          touch = {};
        }
      } catch(err) { }
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout);
    longTapTimeout = null;
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout);
    if (tapTimeout) clearTimeout(tapTimeout);
    if (swipeTimeout) clearTimeout(swipeTimeout);
    if (longTapTimeout) clearTimeout(longTapTimeout);
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
    touch = {};
  }

  $(function(){
    var now;
    var delta;
    var body = $(document.body);
    var twoTouches = false;
    body.on($.eventStart, function(e) {
      now = Date.now();
      delta = now - (touch.last || now);
      if (e.originalEvent) e = e.originalEvent;
  
      // Handle MSPointer Events:
      if (window.navigator.msPointerEnabled  || window.navigator.pointerEnabled) {
        if (window && window.jQuery && $ === window.jQuery) {
          if (e.originalEvent && !e.originalEvent.isPrimary) return;
        } else {
          if (!e.isPrimary) return;
        }
        e = e.originalEvent ? e.originalEvent : e;
        body.on('MSHoldVisual', function (e) {
          e.preventDefault();
        });
        touch.el = $(parentIfText(e.target));
        touchTimeout && clearTimeout(touchTimeout);
        touch.x1 = e.pageX;
        touch.y1 = e.pageY;
        twoTouches = false;
      } else {
        if ($.eventStart === 'mousedown') {
          touch.el = $(parentIfText(e.target));
          touchTimeout && clearTimeout(touchTimeout);
          touch.x1 = e.pageX;
          touch.y1 = e.pageY;
          twoTouches = false;
        } else {
          // User to detect two or more finger gestures:
          if (e.touches.length === 1) {
            touch.el = $(parentIfText(e.touches[0].target));
            touchTimeout && clearTimeout(touchTimeout);
            touch.x1 = e.touches[0].pageX;
            touch.y1 = e.touches[0].pageY;
            if (e.targetTouches.length === 2) {
              twoTouches = true;
            } else {
              twoTouches = false;
            }
          }
        }
      }
      if (delta > 0 && delta <= 250) {
        touch.isDoubleTap = true;
      }
      touch.last = now;
      longTapTimeout = setTimeout(longTap, longTapDelay);
    });
    body.on($.eventMove, function(e) {
      if (e.originalEvent) e = e.originalEvent;
      if (window.navigator.msPointerEnabled) {
        if (window && window.jQuery && $ === window.jQuery) {
          if (e.originalEvent && !e.originalEvent.isPrimary) return;
        } else {
          if (!e.isPrimary) return;
        }
        e = e.originalEvent ? e.originalEvent : e;
        cancelLongTap();
        touch.x2 = e.pageX;
        touch.y2 = e.pageY;
      } else {
        cancelLongTap();
        if ($.eventMove === 'mousemove') {
          touch.x2 = e.pageX;
          touch.y2 = e.pageY;
        } else {
          // One finger gesture:
          if (e.touches.length === 1) { 
            touch.x2 = e.touches[0].pageX;
            touch.y2 = e.touches[0].pageY;
          }
        }
      }

      if ($.isAndroid) {
        $.gestureLength = 10;

        if (!!touch.el) {
          // Swipe detection:
          if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > $.gestureLength) ||
        (touch.y2 && Math.abs(touch.y1 - touch.y2) > $.gestureLength))  {
            swipeTimeout = setTimeout(function() {
              e.preventDefault();
              if (touch && touch.el) {
                touch.el.trigger('swipe');
                touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
                touch = {};
              }
            }, 0);

          // Normal tap:
          } else if ('last' in touch) {

            // Delay by one tick so we can cancel the 'tap' event if 'scroll' fires:
            tapTimeout = setTimeout(function() {

            // Trigger universal 'tap' with the option to cancelTouch():
            if (touch && touch.el) {
              touch.el.trigger('tap');
            }

            // Trigger double tap immediately:
            if (touch && touch.isDoubleTap) {
              if (touch && touch.el) {
              touch.el.trigger('doubletap');
              touch = {};
              }
            } else {
              // Trigger single tap after singleTapDelay:
              touchTimeout = setTimeout(function(){
              touchTimeout = null;
              if (touch && touch.el) {
                touch.el.trigger('singletap');
                touch = {};
                return false;
              }
              }, singleTapDelay);
            }

            }, 0);
          }
        } else { return; }  
      }

    });
    body.on($.eventEnd, function(e) {
      if (window.navigator.msPointerEnabled) {
        if (window && window.jQuery && $ === window.jQuery) {
          if (e.originalEvent && !e.originalEvent.isPrimary) return;
        } else {
          if (!e.isPrimary) return;
        }
      }
      cancelLongTap();
      if (!!touch.el) {
        // Swipe detection:
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > $.gestureLength) ||
        (touch.y2 && Math.abs(touch.y1 - touch.y2) > $.gestureLength))  {
          swipeTimeout = setTimeout(function() {
            if (touch && touch.el) {
              touch.el.trigger('swipe');
              touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
              touch = {};
            }
          }, 0);

        // Normal tap:
        } else if ('last' in touch) {

          // Delay by one tick so we can cancel the 'tap' event if 'scroll' fires:
          tapTimeout = setTimeout(function() {

            // Trigger universal 'tap' with the option to cancelTouch():
            if (touch && touch.el) {
              touch.el.trigger('tap');
            }

            // Trigger double tap immediately:
            if (touch && touch.isDoubleTap) {
              if (touch && touch.el) {
                touch.el.trigger('doubletap');
                touch = {};
              }
            } else {
              // Trigger single tap after singleTapDelay:
              touchTimeout = setTimeout(function(){
                touchTimeout = null;
                if (touch && touch.el) {
                  touch.el.trigger('singletap');
                  touch = {};
                  return false;
                }
              }, singleTapDelay);
            }

          }, 0);
        }
      } else { return; }
    });
    body.on('touchcancel', cancelAll);

  });

  ['swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown', 'doubletap', 'tap', 'singletap', 'longtap'].forEach(function(method){ 
    // Add gesture events to ChocolateChipJS:
    $.fn.extend({
      method : function(callback){ 
        return this.on(method, callback);
      }
    });
  });


  /////////////////////////////////////////
  // Set classes for desktop compatibility:
  /////////////////////////////////////////
  $.extend({
    UIDesktopCompat : function ( ) {
      if ($.isDesktop && $.isSafari) {
        $('body').addClass('isiOS').addClass('isDesktopSafari');
      } else if ($.isDesktop && $.isChrome) {
        $('body').addClass('isAndroid').addClass('isDesktopChrome');
      }
    }
  });
  ////////////////////////////////
  // Determine browser version:
  ////////////////////////////////
  $.extend({
    browserVersion : function ( ) {
      var n = navigator.appName;
      var ua = navigator.userAgent;
      var temp;
      var m = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
      if (m && (temp = ua.match(/version\/([\.\d]+)/i))!== null) m[2]= temp[1];
      m = m ? [m[1], m[2]]: [n, navigator.appVersion, '-?'];
      return m[1];
    }
  });

  $(function() {
    ////////////////////////////////
    // Added classes for client side
    // os-specific styles:
    ////////////////////////////////
    $.body = $('body');
    if ($.isWin) {
      $.body.addClass('isWindows');
    } else if ($.isiOS) {
      $.body.addClass('isiOS');
    } else if ($.isAndroid) {
      $.body.addClass('isAndroid');
    }
    if ($.isSafari && parseInt($.browserVersion(), 10) === 6) {
      $.body.addClass('isSafari6');
    }
    $.UIDesktopCompat();
  });

 

  $(function() { 
    $.body = $('body');

    //////////////////////
    // Add the global nav:
    //////////////////////
    if (!$.body[0].classList.contains('splitlayout')) {
      $('body').prepend("<nav id='global-nav'></nav>");
    }

    /////////////////////////////////////////////////
    // Fix Split Layout to display properly on phone:
    /////////////////////////////////////////////////
    if ($.body[0].classList.contains('splitlayout')) {
      if (window.innerWidth < 768) {
        $('meta[name=viewport]').attr('content','width=device-width, initial-scale=0.45, maximum-scale=2, user-scalable=yes');
      }
    }

    /////////////////////////////////////////////////////////
    // Add class to nav when button on right.
    // This allows us to adjust the nav h1 for small screens.
    /////////////////////////////////////////////////////////
    $('h1').each(function(idx, ctx) {
      if (ctx.nextElementSibling && ctx.nextElementSibling.nodeName === 'A') {
        ctx.classList.add('buttonOnRight');
      }
    });

    //////////////////////////////////////////
    // Get any toolbars and adjust the bottom 
    // of their corresponding articles:
    //////////////////////////////////////////
    $('.toolbar').prev('article').addClass('has-toolbar');
  });


  $.extend({
    subscriptions : {},

    // Topic: string defining topic: /some/topic
    // Data: a string, number, array or object.
    subscribe : function (topic, callback) {
      if (!$.subscriptions[topic]) {
        $.subscriptions[topic] = [];
      }
      var token = ($.Uuid());
      $.subscriptions[topic].push({
        token: token,
        callback: callback
      });
      return token;
    },

    unsubscribe : function ( token ) {
      setTimeout(function() {
        for (var m in $.subscriptions) {
          if ($.subscriptions[m]) {
              for (var i = 0, len = $.subscriptions[m].length; i < len; i++) {
                  if ($.subscriptions[m][i].token === token) {
                    $.subscriptions[m].splice(i, 1);
                    return token;
                  }
              }
          }
        }
        return false;
      });
    },

    publish : function ( topic, args ) {
      if (!$.subscriptions[topic]) {
        return false;
      }
      setTimeout(function () {
        var len = $.subscriptions[topic] ? $.subscriptions[topic].length : 0;
        while (len--) {
          $.subscriptions[topic][len].callback(topic, args);
        }
        return true;
      });
      return true;
   }
  });


  ////////////////////////////////////
  // Create custom navigationend event
  ////////////////////////////////////
  function triggerNavigationEvent(target) {
    var transition;
    var tansitionDuration;
    if ('transition' in document.body.style) {
      transition = 'transition-duration';
    } else if ('-webkit-transition' in document.body.style){
      transition = '-webkit-transition-duration';
    }

    function determineDurationType (duration) {
      if (/m/.test(duration)) {
        return parseFloat(duration); 
      } else if (/s/.test(duration)) {
        return parseFloat(duration) * 100;
      }
    }

    tansitionDuration = determineDurationType($('article').eq(0).css(transition));
    
    setTimeout(function() {
      $(target).trigger({type: 'navigationend'});
    }, tansitionDuration);
  }

  $.extend({
    ////////////////////////////////////////////////
    // Manage location.hash for client side routing:
    ////////////////////////////////////////////////
    UITrackHashNavigation : function ( url, delimeter ) {
      url = url || true;
      $.UISetHashOnUrl($.UINavigationHistory[$.UINavigationHistory.length-1], delimeter);
    },

    /////////////////////////////////////////////////////
    // Set the hash according to where the user is going:
    /////////////////////////////////////////////////////
    UISetHashOnUrl : function ( url, delimiter ) {
      delimiter = delimiter || '#/';
      var hash;
      if (/^#/.test(url)) {
        hash = delimiter + (url.split('#')[1]);
      } else {
        hash = delimiter + url;
      }
      if ($.isAndroid) {
        if (/#/.test(url)) {
          url = url.split('#')[1];
        }
        if (/\//.test(url)) {
          url = url.split('/')[1];
        }
        window.location.hash = '#/' + url;
      } else {
        window.history.replaceState('Object', 'Title', hash);
      }
    },

    //////////////////////////////////////
    // Navigate Back to Non-linear Article
    //////////////////////////////////////
    UIGoBackToArticle : function ( articleID ) {
      var historyIndex = $.UINavigationHistory.indexOf(articleID);
      var currentArticle = $('article.current');
      var destination = $(articleID);
      var currentToolbar;
      var destinationToolbar;      
      if ($.UINavigationHistory.length === 0) {
        destination = $('article:first-of-type');
        $.UINavigationHistory.push('#' + destination[0].id);
      }
      var prevArticles;
      if ($.UINavigationHistory.length > 1) {
        prevArticles = $.UINavigationHistory.splice(historyIndex+1);
      } else {
        prevArticles = $('article.previous');
      }
      $.publish('chui/navigateBack/leave', currentArticle[0].id);
      $.publish('chui/navigateBack/enter', destination[0].id);
      currentArticle[0].scrollTop = 0;
      destination[0].scrollTop = 0;
      if (prevArticles.length) {
        $.each(prevArticles, function(_, ctx) {
          $(ctx).removeClass('previous').addClass('next');
          $(ctx).prev().removeClass('previous').addClass('next');
        });
      }
      currentToolbar = currentArticle.next().hazClass('toolbar');
      destinationToolbar = destination.next().hazClass('toolbar');
      destination.removeClass('previous next').addClass('current');
      destination.prev().removeClass('previous next').addClass('current');
      destinationToolbar.removeClass('previous next').addClass('current');
      currentArticle.removeClass('current').addClass('next');
      currentArticle.prev().removeClass('current').addClass('next');
      currentToolbar.removeClass('current').addClass('next');
      $('.toolbar.previous').removeClass('previous').addClass('next');
      $.UISetHashOnUrl($.UINavigationHistory[$.UINavigationHistory.length-1]);
      triggerNavigationEvent(destination);
    },

    ////////////////////////////////////
    // Navigate Back to Previous Article
    ////////////////////////////////////
    UIGoBack : function () {
      var histLen = $.UINavigationHistory.length;
      var currentArticle = $('article.current');
      var destination = $($.UINavigationHistory[histLen-2]);
      var currentToolbar;
      var destinationToolbar;
      if (histLen === 0) {
        destination = $('article:first-of-type');
        $.UINavigationHistory.push('#' + destination[0].id);
      }
      $.publish('chui/navigateBack/leave', currentArticle[0].id);
      $.publish('chui/navigateBack/enter', destination[0].id);
      currentArticle[0].scrollTop = 0;
      destination[0].scrollTop = 0;
      currentToolbar = currentArticle.next().hazClass('toolbar');
      destinationToolbar = destination.next().hazClass('toolbar');
      destination.removeClass('previous').addClass('current');
      destination.prev().removeClass('previous').addClass('current');
      destinationToolbar.removeClass('previous').addClass('current');
      currentArticle.removeClass('current').addClass('next');
      currentArticle.prev().removeClass('current').addClass('next');
      currentToolbar.removeClass('current').addClass('next');
      $.UISetHashOnUrl($.UINavigationHistory[histLen-2]);
      if ($.UINavigationHistory.length === 1) return;
      $.UINavigationHistory.pop();
    },

    isNavigating : false,
  
    ///////////////////////////////
    // Navigate to Specific Article
    ///////////////////////////////
    UIGoToArticle : function ( destination ) {
      if ($.isNavigating) return;
      $.isNavigating = true;
      var current = $('article.current');
      var currentNav = current.prev();
      destination = $(destination); 
      var destinationID = '#' + destination[0].id;
      var destinationNav = destination.prev();
      var currentToolbar;
      var destinationToolbar;
      var navigationClass = 'next previous';
      $.publish('chui/navigate/leave', current[0].id);
      $.UINavigationHistory.push(destinationID);
      $.publish('chui/navigate/enter', destination[0].id);
      current[0].scrollTop = 0;
      destination[0].scrollTop = 0;
      currentToolbar = current.next().hazClass('toolbar');
      destinationToolbar = destination.next().hazClass('toolbar');
      current.removeClass('current').addClass('previous');
      currentNav.removeClass('current').addClass('previous');
      currentToolbar.removeClass('current').addClass('previous');
      destination.removeClass(navigationClass).addClass('current');
      destinationNav.removeClass(navigationClass).addClass('current');
      destinationToolbar.removeClass(navigationClass).addClass('current');
    
      $.UISetHashOnUrl(destination[0].id);
      setTimeout(function() {
        $.isNavigating = false;
      }, 500);

      triggerNavigationEvent(destination);

    }
  });

  ///////////////////
  // Init navigation:
  ///////////////////
  $(function() {
    //////////////////////////////////////////
    // Set first value for navigation history:
    //////////////////////////////////////////
    $.extend({
      UINavigationHistory : ["#" + $('article').eq(0).attr('id')]
    });

    ///////////////////////////////////////////////////////////
    // Make sure that navs and articles have navigation states:
    ///////////////////////////////////////////////////////////
    $('nav:not(#global-nav)').each(function(idx, ctx) {
      // Prevent if splitlayout for tablets:
      if ($('body')[0].classList.contains('splitlayout')) return;
      if (idx === 0) {
        ctx.classList.add('current');
      } else { 
        ctx.classList.add('next'); 
      }
    });
  
    $('article').each(function(idx, ctx) {
      // Prevent if splitlayout for tablets:
      if ($('body')[0].classList.contains('splitlayout')) return;
      if ($('body')[0].classList.contains('slide-out-app')) return;
      if (idx === 0) {
        ctx.classList.add('current');
      } else { 
        ctx.classList.add('next'); 
      }
    }); 

      ///////////////////////////
    // Initialize Back Buttons:
    ///////////////////////////
    $('body').on('singletap', 'a.back', function() {
      if (this.classList.contains('back')) {
        $.UIGoBack();
      }
    });
  
    ////////////////////////////////
    // Handle navigation list items:
    ////////////////////////////////
    $('body').on('singletap doubletap', 'li', function() {
      if ($.isNavigating) return;
      if (!this.hasAttribute('data-goto')) return;
      if (!this.getAttribute('data-goto')) return;
      if (!document.getElementById(this.getAttribute('data-goto'))) return;
      if ($(this).parent()[0].classList.contains('deletable')) return;
      var destinationHref = '#' + this.getAttribute('data-goto');
      $(destinationHref).addClass('navigable');
      var destination = $(destinationHref);
      $.UIGoToArticle(destination);
    });

    $('li[data-goto]').each(function(idx, ctx) {
      $(ctx).closest('article').addClass('navigable');
      var navigable =  '#' + ctx.getAttribute('data-goto');
      $(navigable).addClass('navigable');
    });
  
    /////////////////////////////////////
    // Init navigation url hash tracking:
    /////////////////////////////////////
    // If there's more than one article:
    if ($('article').eq(1)[0]) {
      $.UISetHashOnUrl($('article').eq(0)[0].id);
    }

    /////////////////////////////////////////////////////////
    // Stop rubber banding when dragging down on nav:
    /////////////////////////////////////////////////////////
    $('nav').on($.eventStart, function(e) {
      e.preventDefault();
    });
  });

 
 
  $(function() {
    ///////////////////////////////////
    // Initialize singletap on buttons:
    ///////////////////////////////////
    $('body').on('singletap', '.button', function() {
      var $this = $(this);
      if ($this.parent('.segmented')[0]) return;
      if ($this.parent('.tabbar')[0]) return;
      $this.addClass('selected');
      setTimeout(function() {
        $this.removeClass('selected');
      }, 500);
    });
  });

 
 
  $.fn.extend({
    /////////////////////////
    // Block Screen with Mask
    /////////////////////////
    UIBlock : function ( opacity ) {
      opacity = opacity ? " style='opacity:" + opacity + "'" : " style='opacity: .5;'";
      $(this).before("<div class='mask'" + opacity + "></div>");
      $('article.current').attr('aria-hidden',true);
      return this;
    },

    //////////////////////////
    // Remove Mask from Screen
    //////////////////////////
    UIUnblock : function ( ) {
      $('.mask').remove();
      $('article.current').removeAttr('aria-hidden');
      return this;
    }
  });


  $.fn.extend({
    //////////////////////////////
    // Center an Element on Screen
    //////////////////////////////
    UICenter : function ( ) {
      if (!this[0]) return;
      var $this = $(this);
      var parent = $this.parent();
      var position;
      if ($this.css('position') !== 'absolute') position = 'relative';
      else position = 'absolute';

      var height, width, parentHeight, parentWidth;
      if (position === 'absolute') {
        height = $this[0].clientHeight;
        width = $this[0].clientWidth;
        parentHeight = parent[0].clientHeight;
        parentWidth = parent[0].clientWidth;
      } else {
        height = parseInt($this.css('height'),10);
        width = parseInt($this.css('width'),10);
        parentHeight = parseInt(parent.css('height'),10);
        parentWidth = parseInt(parent.css('width'),10);
      }
      var tmpTop, tmpLeft;
      if (parent[0].nodeName === 'body') {
        tmpTop = ((window.innerHeight /2) + window.pageYOffset) - height /2 + 'px';
        tmpLeft = ((window.innerWidth / 2) - (width / 2) + 'px');
      } else {
        tmpTop = (parentHeight /2) - (height /2) + 'px';
        tmpLeft = (parentWidth / 2) - (width / 2) + 'px';
      }
      if (position !== 'absolute') tmpLeft = 0;
      // if (parseInt(tmpLeft,10) <= 0) tmpLeft = '10px';
      $this.css({left: tmpLeft, top: tmpTop});
    }
  });


  $.fn.extend({
    ////////////////////////
    // Create Busy indicator
    ////////////////////////
    /*
      var options = {
        color: 'red',
        size: '80px',
        position: 'right'
      }
    */
    UIBusy : function ( options ) {
      options = options || {};
      var $this = this;
      var color = options.color || '#000';
      var size = options.size || '80px';
      var position = (options && options.position === 'right') ? 'align-flush' : null;
      var duration = options.duration || '2s';
      var spinner;
      // For iOS:
      var iOSBusy = function() {
        var webkitAnim = {'-webkit-animation-duration': duration};
        spinner = $('<span class="busy"></span>');
        $(spinner).css({'background-color': color, 'height': size, 'width': size});
        $(spinner).css(webkitAnim);
        $(spinner).attr('role','progressbar');
        if (position) $(spinner).addClass(position);
        $this.append(spinner);
        return this;
      };
      // For Android:
      var androidBusy = function() {
        var webkitAnim = {'-webkit-animation-duration': duration};
        spinner = $('<div class="busy"><div></div><div></div></div>');
        $(spinner).css({'height': size, 'width': size, "background-image":  'url(' + '"data:image/svg+xml;utf8,<svg xmlns:svg=' + "'http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1' x='0px' y='0px' width='400px' height='400px' viewBox='0 0 400 400' enable-background='new 0 0 400 400' xml:space='preserve'><circle fill='none' stroke='" + color + "' stroke-width='20' stroke-miterlimit='10' cx='199' cy='199' r='174'/>" + '</svg>"' + ')'});
        $(spinner).css(webkitAnim);
        $(spinner).attr('role','progressbar');
        $(spinner).innerHTML = "<div></div><div></div>";
        if (position) $(spinner).addClass('align-' + position);
        $this.append(spinner);
        return this;
      };
      // For Windows 8/WP8:
      var winBusy = function() {
        spinner = $('<progress class="busy"></progress>');
        $(spinner).css({ 'color': color });
        $(spinner).attr('role','progressbar');
        $(spinner).addClass('win-ring');
        if (position) $(spinner).addClass('align-' + position);
        $this.append(spinner);
        return this;
      };
      // Create Busy control for appropriate OS:
      if ($.isWin) {
        winBusy(options);
      } else if ($.isAndroid || $.isChrome) {
        androidBusy(options);
      } else if ($.isiOS || $.isSafari) {
        iOSBusy(options);
      }
    }
  });


  $.extend({
    ///////////////
    // Create Popup
    ///////////////
    UIPopup : function( options ) {
      /*
      options {
        id: 'alertID',
        title: 'Alert',
        message: 'This is a message from me to you.',
        cancelButton: 'Cancel',
        continueButton: 'Go Ahead',
        callback: function() { // do nothing }
      }
      */
      if (!options) return;
      var id = options.id || $.Uuid();
      var title = options.title ? '<header><h1>' + options.title + '</h1></header>' : '';
      var message = options.message ? '<p role="note">' + options.message + '</p>' : '';
      var cancelButton = options.cancelButton ? '<a href="javascript:void(null)" class="button cancel" role="button">' + options.cancelButton + '</a>' : '';
      var continueButton = options.continueButton  ? '<a href="javascript:void(null)" class="button continue" role="button">' + options.continueButton + '</a>' : '';
      var callback = options.callback || $.noop;
      var padding = options.empty ? ' style="padding: 40px 0;" ' : '';
      var panelOpen, panelClose;
      if (options.empty) {
        panelOpen = '';
        panelClose = '';
      } else {
        panelOpen = '<div class="panel">';
        panelClose = '</div>';
      }
      var popup = '<div class="popup closed" role="alertdialog" id="' + id + '"' + padding + '>' + panelOpen + title + message + '<footer>' + cancelButton + continueButton + '</footer>' + panelClose + '</div>';
    
      $('body').append(popup);
      if (callback && continueButton) {
        $('.popup').find('.continue').on($.eventStart, function() {
          $('.popup').UIPopupClose();
          callback.call(callback);
        });
      }
    
      $.UICenterPopup();
      setTimeout(function() {
        $('body').find('.popup').removeClass('closed');
      }, 200);
      $('body').find('.popup').UIBlock('0.5');
      var events = $.eventStart + ' singletap ' + $.eventEnd;
      $('.mask').on(events, function(e) {
        e.stopPropagation();
      });
    },
    
    //////////////////////////////////////////
    // Center Popups When Orientation Changes:
    //////////////////////////////////////////
    UICenterPopup : function ( ) {
      var popup = $('.popup');
      if (!popup[0]) return;
      var tmpTop = ((window.innerHeight /2) + window.pageYOffset) - (popup[0].clientHeight /2) + 'px';
      var tmpLeft;
      if (window.innerWidth === 320) {
        tmpLeft = '10px';
      } else {
        tmpLeft = Math.floor((window.innerWidth - 318) /2) + 'px';
      }
      if ($.isWin) {
        popup.css({top: tmpTop}); 
      } else {
          popup.css({left: tmpLeft, top: tmpTop}); 
        }
    }
  });

  $.fn.extend({
    //////////////
    // Close Popup
    //////////////
    UIPopupClose : function ( ) {
      if (!this[0].classList.contains('popup')) return;
      $(this).UIUnblock();
      $(this).remove();
    }
  });
  $(function() {
    //////////////////////////
    // Handle Closing Popups:
    //////////////////////////
    $('body').on($.eventStart, '.cancel', function() {
      if ($(this).closest('.popup')[0]) {
        $(this).closest('.popup').UIPopupClose();
      }
    });

    /////////////////////////////////////////////////
    // Reposition popups on window resize:
    /////////////////////////////////////////////////
    window.onresize = function() {
      $.UICenterPopup();
    };
  });

  
  $.fn.extend({ 
    /////////////////
    // Create Popover
    /////////////////
    /*
      id: myUniqueID,
      title: 'Great',
      callback: myCallback
    */
    UIPopover : function ( options ) {
      if (!options) return [];
      var triggerEl = $(this);
      var triggerID;
      if (this[0].id) {
        triggerID = this[0].id;
      } else {
        triggerID = $.Uuid();
        triggerEl.attr('id', triggerID);
      }
      var id = options.id ? options.id : $.Uuid();
      var header = options.title ? ('<header><h1>' + options.title + '</h1></header>') : '';
      var callback = options.callback ? options.callback : $.noop;
      var popover = '<div class="popover" id="' + id + '">' + header + '<section></section></div>';
    
      // Calculate position of popover relative to the button that opened it:
      var _calcPopPos = function (element) {
        var offset = $(element).offset();
        var left = offset.left;
        var calcLeft;
        var calcTop;
        var popover = $('.popover');
        var popoverOffset = popover.offset();
        calcLeft = popoverOffset.left;
        calcTop = offset.top + $(element)[0].clientHeight;
        if ((popover.width() + offset.left) > window.innerWidth) {
          popover.css({
            'left': ((window.innerWidth - popover.width())-20) + 'px',
            'top': (calcTop + 20) + 'px'
          });
        } else {
          popover.css({'left': left + 'px', 'top': (calcTop + 20) + 'px'});
        }
      };

      $(this).on($.eventStart, function() {
        var $this = this;
        $(this).addClass('selected');
        setTimeout(function() {
          $($this).removeClass('selected');
        }, 1000);
        $('body').append(popover);
        $('.popover').UIBlock('.5');
        var event = 'singletap';
        if ($.isWin && $.isDesktop) {
          event = $.eventStart + ' singletap ' + $.eventEnd;
        }
        $('.mask').on(event, function(e) {
          e.preventDefault();
          e.stopPropagation();
        });
        $('.popover').data('triggerEl', triggerID);
        if ($.isWin) {
          _calcPopPos($this);
          $('.popover').addClass('open');
        } else {
          $('.popover').addClass('open');
          setTimeout(function () {
             _calcPopPos($this);
          });
        }
        callback.call(callback, $this);
      });
    }
  });

  $.extend({
    ///////////////////////////////////////
    // Align the Popover Before Showing it:
    ///////////////////////////////////////
    UIAlignPopover : function () {
      var popover = $('.popover');
      if (!popover.length) return;
      var triggerID = popover.data('triggerEl');
      var offset = $('#'+triggerID).offset();
      var left = offset.left;
      if (($(popover).width() + offset.left) > window.innerWidth) {
        popover.css({
          'left': ((window.innerWidth - $(popover).width())-20) + 'px'
        });
      } else {
        popover.css({'left': left + 'px'});
      }
    }
  });

  $.extend({
    UIPopoverClose : function ( ) {
      $('body').UIUnblock();
      $('.popover').css('visibility','hidden');
      setTimeout(function() {
        $('.popover').remove();
      },10);
    }
  });
  $(function() {
    /////////////////////////////////////////////////
    // Reposition popovers on window resize:
    /////////////////////////////////////////////////
    window.onresize = function() {
      $.UIAlignPopover();
    };
    var events = $.eventStart + ' singletap ' + $.eventEnd;
    $('body').on(events, '.mask', function(e) {
      if (!$('.popover')[0]) {
        if (e && e.nodeType === 1) return;
        e.stopPropogation();
      } else {
        $.UIPopoverClose();
      }
    });
  });

 
  $.fn.extend({
    ///////////////////////////////
    // Initialize Segmented Control
    ///////////////////////////////
    UISegmented : function ( options ) {
      if (this.hasClass('paging')) return;
      var callback = (options && options.callback) ? options.callback : $.noop;
      var selected;
      if (options && options.selected) selected = options.selected;
      if (options && options.callback) {
        callback = options.callback;
      }
      this.find('a').each(function(idx, ctx) {
        $(ctx).find('a').attr('role','radio');
        if (selected === 0 && idx === 0) {
          ctx.setAttribute('aria-checked', 'true');
          ctx.classList.add('selected');
        }
        if (idx === selected) {
          ctx.setAttribute('aria-checked', 'true');
          ctx.classList.add('selected');
        }
      });
      if (!selected) {
        if (!this.find('.selected')[0]) {
          this.children().eq(0).addClass('selected');
        }
      }
      this.on('singletap', '.button', function(e) {
        var $this = $(this);
        if (this.parentNode.classList.contains('paging')) return;
        $this.siblings('a').removeClass('selected');
        $this.siblings('a').removeAttr('aria-checked');
        $this.addClass('selected');
        $this.attr('aria-checked', true);
        callback.call(this, e);
      });
    }
  });

  $.extend({ 
    ///////////////////////////
    // Create Segmented Control
    ///////////////////////////
    UICreateSegmented : function ( options ) {
      /* 
        options = {
          id : '#myId',
          className : 'special' || '',
          labels : ['first','second','third'],
          selected : 0 based number of selected button
        }
      */
      var className = (options && options.className) ? options.className : '';
      var labels = (options && options.labels) ? options.labels : [];
      var selected = (options && options.selected) ? options.selected : 0;
      var _segmented = ['<div class="segmented'];
      if (className) _segmented.push(' ' + className);
      _segmented.push('">');
      labels.forEach(function(ctx, idx) {
        _segmented.push('<a role="radio" class="button');
        if (selected === idx) {
          _segmented.push(' selected" aria-checked="true"');
        } else {
          _segmented.push('"');
        }
        _segmented.push('>');
        _segmented.push(ctx);
        _segmented.push('</a>');
      });
      _segmented.push('</div>');
      return _segmented.join('');
    }
  });

  $(function() {
    /////////////////////////////////////
    // Handle Existing Segmented Buttons:
    /////////////////////////////////////
    $('.segmented').UISegmented();
  });


  $.fn.extend({
    ////////////////////////////////////////////
    // Allow Segmented Control to toggle panels
    ////////////////////////////////////////////
    UIPanelToggle : function ( panel, callback ) {
      var panels;
      var selected = 0;
      selected = this.children().hazClass('selected').index() || 0;
      if (panel instanceof Array) {
        panels = panel.children('div');
      } else if (typeof panel === 'string') {
        panels = $(panel).children('div');
      }
      panels.eq(selected).siblings().css({display: 'none'});
      if (callback) callback.apply(this, arguments);
      this.on($.eventEnd, 'a', function() {
        panels.eq($(this).index()).css({display:'block'})
          .siblings().css('display','none');
      });
    
      this.on('singletap', '.button', function() {
        var $this = $(this);
        if (this.parentNode.classList.contains('paging')) return;
        $this.siblings('a').removeClass('selected');
        $this.siblings('a').removeAttr('aria-checked');
        $this.addClass('selected');
        $this.attr('aria-checked', true);
      });
    }
  });

 
 
  $.extend({
    ///////////////////////
    // Setup Paging Control
    ///////////////////////
      UIPaging : function ( ) {
        var currentArticle = $('.segmented.paging').closest('nav').next();
        if (window && window.jQuery && $ === window.jQuery) {
          if ($('.segmented.paging').hasClass('horizontal')) {
            currentArticle.addClass('horizontal');
          } else if ($('.segmented.paging').hasClass('vertical')) {
            currentArticle.addClass('vertical');
          }
        } else {
          if ($('.segmented.paging').hasClass('horizontal')[0]) {
            currentArticle.addClass('horizontal');
          } else if ($('.segmented.paging').hasClass('vertical')[0]) {
            currentArticle.addClass('vertical');
          }
        }
        currentArticle.children().eq(0).addClass('current');
        currentArticle.children().eq(0).siblings().addClass('next');
        var sections = function() {
          return currentArticle.children().length;
        };

        $('.segmented.paging').on($.eventStart, '.button:first-of-type', function() {
          if (sections() === 1) return;
          var $this = $(this);
          $this.next().removeClass('selected');
          $this.addClass('selected');
          var currentSection;
          currentSection = $('section.current');
          if (currentSection.index() === 0)  {
            currentSection.removeClass('current');
            currentArticle.children().eq(sections() - 1).addClass('current').removeClass('next');
            currentArticle.children().eq(sections() - 1).siblings().removeClass('next').addClass('previous');
          } else {
            currentSection.removeClass('current').addClass('next');
            currentSection.prev().removeClass('previous').addClass('current');
          }

          setTimeout(function() {
            $this.removeClass('selected');
          }, 250);
        });
        $('.segmented.paging').on($.eventStart, '.button:last-of-type', function() {
          if (sections() === 1) return;
          var $this = $(this);
          $this.prev().removeClass('selected');
          $this.addClass('selected');
          var currentSection;
          if (this.classList.contains('disabled')) return;
          currentSection = $('section.current');
          if (currentSection.index() === sections() - 1) {
              // start again!
            currentSection.removeClass('current');
            currentArticle.children().eq(0).addClass('current').removeClass('previous');
            currentArticle.children().eq(0).siblings().removeClass('previous').addClass('next');
          } else {
            currentSection.removeClass('current').addClass('previous');
            currentSection.next().removeClass('next').addClass('current');
          }
          setTimeout(function() {
            $this.removeClass('selected');
          }, 250);
        });
      }
  });

 
 
  $.extend({
    ////////////////////////////
    // Initialize Deletable List
    ////////////////////////////
    UIDeletable : function ( options ) {
      /*
        options = {
          list: selector,
          editLabel : labelName || Edit,
          doneLabel : labelName || Done,
          deleteLabel : labelName || Delete,
          placement: left || right,
          callback : callback
        }
      */
      if (!options || !options.list || !options instanceof Array) {
        return;
      }
      var list = $(options.list);
      var editLabel = options.editLabel || 'Edit';
      var doneLabel = options.doneLabel || 'Done';
      var deleteLabel = options.deleteLabel || 'Delete';
      var placement = options.placement || 'right';
      var callback = options.callback || $.noop;
      var deleteButton;
      var editButton;
      var deletionIndicator;
      var button;
      var swipe = 'swiperight';
      if ($('html').attr('dir') === 'rtl') swipe = 'swipeleft';
      // Windows uses an icon for the delete button:
      if ($.isWin) deleteLabel = '';
      if (list[0].classList.contains('deletable')) return;
      var height = $('li').eq(1)[0].clientHeight;
      deleteButton = $.concat('<a href="javascript:void(null)" class="button delete">', deleteLabel, '</a>');
      editButton = $.concat('<a href="javascript:void(null)" class="button edit">', editLabel, '</a>');
      deletionIndicator = '<span class="deletion-indicator"></span>';
      if (placement === 'left') {
        list.closest('article').prev().prepend(editButton);
      } else {
        list.closest('article').prev().append(editButton);
        list.closest('article').prev().find('h1').addClass('buttonOnRight');
        list.closest('article').prev().find('.edit').addClass('align-flush');
        button = list.closest('article').prev().find('.edit');
      }
      list.find('li').prepend(deletionIndicator);
      list.find('li').append(deleteButton);
      var setupDeletability = function(callback, list, button) {
        var deleteSlide;
        if ($.isiOS) {
          deleteSlide = '100px';
        } else if ($.isAndroid) {
          deleteSlide = '140px';
        }
        $(function() {
          button.on('singletap', function() {
            var $this = this;
            if (this.classList.contains('edit')) {
              list.addClass('deletable');
              setTimeout(function() {
                $this.classList.remove('edit');
                $this.classList.add('done');
                $($this).text(doneLabel);
                $(list).addClass('showIndicators');
              });
            } else if (this.classList.contains('done')) {
              list.removeClass('deletable');
              setTimeout(function() {
                $this.classList.remove('done');
                $this.classList.add('edit');
                $($this).text(editLabel);
                $(list).removeClass('showIndicators');
                $(list).find('li').removeClass('selected');
              });            
            }
          });
          $(list).on('singletap', '.deletion-indicator', function() {
            if ($(this).parent('li').hasClass('selected')) {
              $(this).parent('li').removeClass('selected');
              return;
            } else {
              $(this).parent('li').addClass('selected');
            }
          });
        
          if ($.isiOS || $.isSafari) {
            $(list).on(swipe, 'li', function() {
              $(this).removeClass('selected');
            });
          }
          $(list).on('singletap', '.delete', function() {
            var $this = this;
            var direction = '-1000%';
            if ($('html').attr('dir') === 'rtl') direction = '1000%';
            $(this).siblings().css({'-webkit-transform': 'translate3d(' + direction + ',0,0)', '-webkit-transition': 'all 1s ease-out'});
            setTimeout(function() {
              callback.call(callback, $this);
              $($this).parent().remove();
            }, 500);
          });
        });    
      };
      return setupDeletability(callback, list, button);
      //return list;
    }
  });

 

  $.fn.extend({
    /////////////////////////
    // Initialize Select List 
    /////////////////////////
    /* 
    // For default selection use zero-based integer:
    options = {
      name : name // used on radio buttons as group name, defaults to uuid.
      selected : integer,
      callback : callback
      // callback example:
      function () {
        // this is the selected list item:
        console.log($(this).text());
      }
    }
    */
    UISelectList : function (options) {
      var name = (options && options.name) ? options.name : $.Uuid(); 
      var list = this[0];
      if (list && !$(list).hasClass('select')) {
        this.addClass('select');
      }
      if (!list) return [];
      list.classList.add('select');
      $(list).find('li').forEach(function(ctx, idx) {
        ctx.setAttribute('role', 'radio');
        if (options && options.selected === idx) {
          ctx.setAttribute('aria-checked', 'true');
          ctx.classList.add('selected');
          if (!$(ctx).find('input')[0]) {
            $(ctx).append('<input type="radio" checked="checked" name="' + name + '">');
          } else {
            $(ctx).find('input').attr('checked','checked');
          }
        } else {
          if (!$(ctx).find('input')[0]) {
            $(ctx).append('<input type="radio" name="' + name + '">');
          }
        }
      });
      $(list).on('singletap', 'li', function() {
        var item = this;
        $(item).siblings('li').removeClass('selected');
        $(item).siblings('li').removeAttr('aria-checked');
        $(item).siblings('li').find('input').removeAttr('checked');
        $(item).addClass('selected');
        item.setAttribute('aria-checked', true);
        $(item).find('input').attr('checked','checked');
        if (options && options.callback) {
          options.callback.apply(this, arguments);
        }
      });
    }
  });


  $.extend({
    ///////////////////////////////////////////////
    // UISheet: Create an Overlay for Buttons, etc.
    ///////////////////////////////////////////////
    /*
      var options {
        id : 'starTrek',
        listClass :'enterprise',
        background: 'transparent',
      }
    */
    UISheet : function ( options ) {
      var id = $.Uuid();
      var listClass = '';
      var background = '';
      if (options) {
        id = options.id ? options.id : id;
        listClass = options.listClass ? ' ' + options.listClass : '';
        background = ' style="background-color:' + options.background + ';" ' || '';
      }
      var sheet = '<div id="' + id + '" class="sheet' + listClass + '"><div class="handle"></div><section class="scroller-vertical"></section></div>';
      $('body').append(sheet);
      $('.sheet .handle').on($.eventStart, function() {
        $.UIHideSheet();
      });
    },

    UIShowSheet : function ( ) {
      $('article.current').addClass('blurred');
      if ($.isAndroid || $.isChrome) {
        $('.sheet').css('display','block');
        setTimeout(function() {
          $('.sheet').addClass('opened');
        }, 20);
      } else {
        $('.sheet').addClass('opened');
      }
    },

    UIHideSheet : function ( ) {
      $('.sheet').removeClass('opened');
      $('article.current').addClass('removeBlurSlow');
      setTimeout(function() {
        $('article').removeClass('blurred');
        $('article').removeClass('removeBlurSlow');
      },500);
    }
  });


  $.extend({
    ////////////////////////////////////////////////
    // Create Slideout with toggle button.
    // Use $.UISlideout.populate to polate slideout.
    // See widget-factor.js for details.
    ////////////////////////////////////////////////
    UISlideout : function ( position ) {
      var slideoutButton = $("<a class='button slide-out-button' href='javascript:void(null)'></a>");
      var slideOut = '<div class="slide-out"><section></section></div>';
      $('article').removeClass('next');
      $('article').removeClass('current');
      $('article').prev().removeClass('next');
      $('article').prev().removeClass('current');
      position = position || 'left';
      $('body').append(slideOut);
      $('body').addClass('slide-out-app');
      $('article:first-of-type').addClass('show');
      $('article:first-of-type').prev().addClass('show');
      $('#global-nav').append(slideoutButton);
      $('.slide-out-button').on($.eventStart, function() {
        $('.slide-out').toggleClass('open');
      });
      $('.slide-out').on('singletap', 'li', function() {
        var whichArticle = '#' + $(this).attr('data-show-article');
        $.UINavigationHistory[0] = whichArticle;
        $.UISetHashOnUrl(whichArticle);
        $.publish('chui/navigate/leave', $('article.show')[0].id);
        $.publish('chui/navigate/enter', whichArticle);
        $('.slide-out').removeClass('open');
        $('article').removeClass('show');
        $('article').prev().removeClass('show');
        $(whichArticle).addClass('show');
        $(whichArticle).prev().addClass('show');
      });
    }
  });

  $.extend($.UISlideout, {
    /////////////////////////////////////////////////////////////////
    // Method to populate a slideout with actionable items.
    // The argument is an array of objects consisting of a key/value.
    // The key will be the id of the article to be shown.
    // The value is the title for the list item.
    // [{music:'Music'},{docs:'Documents'},{recipes:'Recipes'}]
    /////////////////////////////////////////////////////////////////  
    populate: function( args ) {
      var slideout = $('.slide-out');
      if (!slideout[0]) return;
      if (!$.isArray(args)) {
        return;
      } else {
        slideout.find('section').append('<ul class="list"></ul>');
        var list = slideout.find('ul');
        args.forEach(function(ctx) {
          for (var key in ctx) {
            if (key === 'header') {
              list.append('<li class="slideout-header"><h2>'+ctx[key]+'</h2></li>');
            } else {
              list.append('<li data-show-article="' + key + '"><h3>' + ctx[key] + '</h3></li>');
            }
          }
        });
      }
    }
  });


  $.fn.extend({
    /////////////////
    // Create stepper
    /////////////////
    /*
      var options = {
        start: 0,
        end: 10,
        defaultValue: 3
      }
    */
    UIStepper : function (options) {
      if (!options) return [];
      if (!options.start) return [];
      if (!options.end) return [];
      var stepper = $(this);
      var start = options.start;
      var end = options.end;
      var defaultValue = options.defaultValue ? options.defaultValue : options.start;
      var increaseSymbol = '+';
      var decreaseSymbol = '-';
      if ($.isWin) {
         increaseSymbol = '';
         decreaseSymbol = '';
      }
      var decreaseButton = '<a href="javascript:void(null)" class="button decrease">' + decreaseSymbol + '</a>';
      var label = '<label>' + defaultValue + '</label><input type="text" value="' + defaultValue + '">';
      var increaseButton = '<a href="javascript:void(null)" class="button increase">' + increaseSymbol + '</a>';
      stepper.append(decreaseButton + label + increaseButton);
      stepper.data('ui-value', {start: start, end: end, defaultValue: defaultValue});
    
      var decreaseStepperValue = function() {
        var currentValue = stepper.find('input').val();
        var value = stepper.data('ui-value');
        var start = value.start;
        var newValue;
        if (currentValue <= start) {
          $(this).addClass('disabled');
        } else {
          newValue = Number(currentValue) - 1;
          stepper.find('.button:last-of-type').removeClass('disabled');
          stepper.find('label').text(newValue);
          stepper.find('input')[0].value = newValue;
          if (currentValue === start) {
            $(this).addClass('disabled');
          }
        }
      };
    
      var increaseStepperValue = function() {
        var currentValue = stepper.find('input').val();
        var value = stepper.data('ui-value');
        var end = value.end;
        var newValue;
        if (currentValue >= end) {
          $(this).addClass('disabled');
        } else {
          newValue = Number(currentValue) + 1;
          stepper.find('.button:first-of-type').removeClass('disabled');
          stepper.find('label').text(newValue);
          stepper.find('input')[0].value = newValue;
          if (currentValue === end) {
            $(this).addClass('disabled');
          }
        }
      };
      stepper.find('.button:first-of-type').on('singletap', function() {
        decreaseStepperValue.call(this, stepper);
      });
      stepper.find('.button:last-of-type').on('singletap', function() {
        increaseStepperValue.call(this, stepper);
      });
    }
  });

  $.extend({
    ///////////////////////////////////////////
    // Pass the id of the stepper to reset.
    // It's value will be reset to the default.
    ///////////////////////////////////////////
    // Pass it the id of the stepper:
    UIResetStepper : function ( stepper ) {
      var defaultValue = stepper.data('ui-value').defaultValue;
      stepper.find('label').html(defaultValue);
      stepper.find('input')[0].value = defaultValue;
    }
  });


  $.fn.extend({

    ////////////////////////////
    // Initialize Switch Control
    ////////////////////////////
    UISwitch : function ( ) {
      var hasThumb = false;
      this.forEach(function(ctx, idx) {
        ctx.setAttribute('role','checkbox');
        if ($(ctx).data('ui-setup') === true) return;
        if (!ctx.querySelector('input')) {
          ctx.insertAdjacentHTML('afterBegin', '<input type="checkbox">');
        }
        if (ctx.classList.contains('on')) {
          ctx.querySelector('input').setAttribute('checked', 'checked');
        }
        if (ctx.querySelector('em')) hasThumb = true;
        if (!hasThumb) {
          ctx.insertAdjacentHTML('afterBegin', '<em></em>');
        }
        $(ctx).on('singletap', function() {
          var checkbox = ctx.querySelector('input');
          if (ctx.classList.contains('on')) {
            ctx.classList.remove('on');
            ctx.removeAttribute('aria-checked');
            checkbox.removeAttribute('checked');
          } else {
            ctx.classList.add('on');
            checkbox.setAttribute('checked', 'checked');
            ctx.setAttribute('aria-checked', true);
          }
        });
        $(ctx).on('swipeleft', function() {
          var checkbox = ctx.querySelector('input');
          if (ctx.classList.contains('on')) {
            ctx.classList.remove('on');
            ctx.removeAttribute('aria-checked');
            checkbox.removeAttribute('checked');
          }
        });
        $(ctx).on('swiperight', function() {
          var checkbox = ctx.querySelector('input');
          if (!ctx.classList.contains('on')) {
            ctx.classList.add('on');
            checkbox.setAttribute('checked', 'checked');
            ctx.setAttribute('aria-checked', true);
          }
        });
        $(ctx).data('ui-setup', true);
      });
    }
  });

  $.extend({
    ////////////////////////
    // Create Switch Control
    ////////////////////////
    UICreateSwitch : function ( options ) {
      /* options = {
          id : '#myId',
          name: 'fruit.mango'
          state : 'on' || 'off' //(off is default),
          value : 'Mango' || '',
          callback : callback
        }
      */
      var id = options ? options.id : $.Uuid();
      var name = options && options.name ? (' name="' + options.name + '"') : '';
      var value= options && options.value ? (' value="' + options.value + '"') : '';
      var state = (options && options.state === 'on') ? (' ' + options.state) : '';
      var checked = (options && options.state === 'on') ? ' checked="checked"' : '';
      var _switch = $.concat('<span class="switch', state, 
        '" id="', id, '"><em></em>','<input type="checkbox"',
        name, checked, value, '></span>');
      return $(_switch);
    }
  });

  $(function() {
    //////////////////////////
    // Handle Existing Switches:
    //////////////////////////
    $('.switch').UISwitch();
  });
 

  document.addEventListener('touchstart', function (e) {
    var parent = e.target,
      i = 0;

    for (i = 0; i < 10; i += 1) {
      if (parent !== null) {
        if (parent.className !== undefined) {
          if (parent.className.match('navigable')) {
            if (parent.scrollTop === 0) {
              parent.scrollTop = 1;
            } else if ((parent.scrollTop + parent.offsetHeight) === parent.scrollHeight) {
              parent.scrollTop = parent.scrollTop - 1;
            }
          }
        }
        parent = parent.parentNode;
      }
    }
  });


  $.extend({
    ///////////////////////////////////////////
    // Creates a Tab Bar for Toggling Articles:
    ///////////////////////////////////////////
    UITabbar : function ( options ) {
      /*
      var options = {
        id: 'mySpecialTabbar',
        tabs: 4,
        labels: ["Refresh", "Add", "Info", "Downloads", "Favorite"],
        icons: ["refresh", "add", "info", "downloads", "favorite"],
        selected: 2
      }
      */
      if (!options) return;
      $('body').addClass('hasTabBar');
      if ($.isiOS6) $('body').addClass('isiOS6');
      var id = options.id || $.Uuid();
      var selected = options.selected || '';
      var tabbar = '<div class="tabbar" id="' + id + '">';
      var icon = ($.isiOS || $.isSafari) ? '<span class="icon"></span>' : '';
      for (var i = 0; i < options.tabs; i++) {
        tabbar += '<a class="button ' + options.icons[i];
        if (selected === i+1) {
          tabbar += ' selected';
        }
        tabbar += '">' + icon + '<label>' + options.labels[i] + '</label></a>';
      }
      tabbar += '</div>';
      $('body').append(tabbar);
      $('nav').removeClass('current').addClass('next');
      $('nav').eq(selected).removeClass('next').addClass('current');
      $('article').removeClass('current').addClass('next');
      $('article').eq(selected-1).removeClass('next').addClass('current');
      $('body').find('.tabbar').on('singletap', '.button', function() {
        var $this = this;
        var index;
        var id;
        $.publish('chui/navigate/leave', $('article.current')[0].id);
        $this.classList.add('selected');
        $(this).siblings('a').removeClass('selected');
        index = $(this).index();
        $('article.previous').removeClass('previous').addClass('next');
        $('nav.previous').removeClass('previous').addClass('next');
        $('article.current').removeClass('current').addClass('next');
        $('nav.current').removeClass('current').addClass('next');
        id = $('article').eq(index)[0].id;
        $.publish('chui/navigate/enter', id);
        if (window && window.jQuery) {
          $('article').each(function(idx, ctx) {
            $(ctx).scrollTop(0);
          });
        } else {
          $('article').eq(index).siblings('article').forEach(function(ctx) {
            ctx.scrollTop = 0;
          });
        }
      
        $.UISetHashOnUrl('#'+id);
        if ($.UINavigationHistory[0] === ('#' + id)) {
          $.UINavigationHistory = [$.UINavigationHistory[0]];
        } else if ($.UINavigationHistory.length === 1) {
          if ($.UINavigationHistory[0] !== ('#' + id)) {
            $.UINavigationHistory.push('#'+id);
          }
        } else if($.UINavigationHistory.length === 3) {
          $.UINavigationHistory.pop();
        } else {
          $.UINavigationHistory[1] = '#'+id;
        }
        $('article').eq(index).removeClass('next').addClass('current');
        $('nav').eq(index+1).removeClass('next').addClass('current');
      });
    }
  });


  $.extend({
  /////////////////////////////
  // Templating:
  /////////////////////////////
    templates : {},
   
    template : function ( tmpl, variable ) {
      var regex;
      variable = variable || 'data';
      regex = /\[\[=([\s\S]+?)\]\]/g;
      var template =  new Function(variable, 
        "var p=[];" + "p.push('" + tmpl
        .replace(/[\r\t\n]/g, " ")
        .split("'").join("\\'")
        .replace(regex,"',$1,'")
        .split('[[').join("');")
        .split(']]').join("p.push('") + "');" +
        "return p.join('');");
      return template;
    }
  });

})(window.jQuery);