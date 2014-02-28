// DO not work for our partials
// var a=document.getElementsByTagName("a");
// for(var i=0;i<a.length;i++) {
//     if(!a[i].onclick && a[i].getAttribute("target") != "_blank") {
//         a[i].onclick=function() {
//                 window.location=this.getAttribute("href");
//                 console.log('Prevent default href redirection...');
//                 return false; 
//         }
//     }
// }

function RegisterNavListener(){
  // content button Not existing any more..
  $('#nav-content').click(function(e){  
    window.location.href = '/content'
  });

  $('#nav-select').click(function(e){
    window.location.href = '/select'
  });
  $('#nav-trend').click(function(e){
    window.location.href = '/trend'
  });
  $('#nav-settings').click(function(e){
    window.location.href = '/settings'
  });
}
