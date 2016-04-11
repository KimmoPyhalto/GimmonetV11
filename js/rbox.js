


// Detect mobile operating systems . Credit to http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/
// Changed isMobile to is_mobile on 19062015 after backup.

var is_mobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry|BB10/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (is_mobile.Android() || is_mobile.BlackBerry() || is_mobile.iOS() || is_mobile.Opera() || is_mobile.Windows());
    }
};

function isMobile() {
  return (is_mobile.any())
}


function isComputer(){ 
return (!isMobile() && screen.width > 720 && screen.height > 720 )
}
function isNetbook(){ 
return (!isMobile() && screen.width > 720 && screen.height > 600 && screen.height < 719 )
}

function isFirefox() {
 return navigator.userAgent.match(/Firefox/i);
}
function isApple() {
 return navigator.userAgent.match(/WebKit/i);
}
function isIE9() {
 return navigator.userAgent.match(/MSIE 9.0/i);
}
function isOpera() {
 return navigator.userAgent.match(/Opera/i);
}


var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; // historic and believed only used in fudge in popup5() 
function isChrome() {
 return is_chrome ;
}

var screenWidth = screen.width
var inWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // Browser Independent
if (inWidth > 280 && inWidth < screen.width) { screenWidth = inWidth } // Otherwise Viewports may nor give corrected innerWidth

// Functions called for vertical and horizontal popups of two different sizes (image files end in i.jpg for icon, w.jpg for small image (400*300) and b.jpg for large images (600x450)

// Routine for popup windows with title, size and background colour parameter (5 parameters)

var newwindow;
var wheight = 0, wwidth = 0;

function popitup5(url, title, iwidth, iheight, colour) {
var pwidth, pheight;
if (isOpera() ) {if (newwindow && !newwindow.closed) { newwindow.close(); }} // Opera fudge
if ( !newwindow || newwindow.closed ) {
	pwidth=iwidth+30;
	pheight=iheight+30;
	newwindow=window.open('','htmlname','width=' + pwidth +',height=' +pheight + ',resizable=yes,top=50,left=10,status=no,location=no');
	wheight=iheight;
	wwidth=iwidth;
}

if (wheight!=iheight || wwidth!=iwidth ) {
	pwidth=iwidth+30;
	pheight=iheight+70;
	if (window.resizeTo) newwindow.resizeTo(pwidth, pheight);
wheight=iheight;
wwidth=iwidth;
}

newwindow.document.clear();
newwindow.document.writeln('<html> <head> <title>' + title + ' <\/title> <\/head> <body style= \"background-color:' + colour + ';\"><div style=\"text-align:center;\">');
newwindow.document.writeln('<img src=' + url + '  title=\"' + title + '\"   alt=\"' + title + '\" >')
newwindow.document.writeln('<\/div> <\/body> <\/html>');
newwindow.document.close();

if (is_chrome) {newwindow.parent.blur();}  // Chrome focus workround

newwindow.focus();
}

//Routines used specifically for popup feedback form windows

var fbwindow
function fbpopitup(url) {
if (fbwindow && !fbwindow.closed) 
	{ fbwindow.location.href = url; fbwindow.focus(); } 
else 
	{ fbwindow=window.open(url,'fhtmlname','width=520,height=420,resizable=1,scrollbars=1,top=50,left=10'); }
}

//Routines to tidy up popup windows when page is left

function tidy() {tidy5() }
function tidy5() {
tidyh();
fbtidy();
}

function tidyh() {
if (newwindow && !newwindow.closed) { newwindow.close(); }
}

function fbtidy(){
if (fbwindow && !fbwindow.closed) {fbwindow.close(); } }	

//routines to simulate functions used on older pages. 

function popitup(url) { popitup5(url , 'Digital Image 384x288 &copy; P Curtis', 384, 288, 'white') }
function ppopitup(url) { popitup5(url , 'Photographic Image 400x267 &copy; P Curtis',400, 267, 'white') }

function vpopitup(url) { popitup5(url , 'Digital Image 288x384 &copy; P Curtis', 288,384, 'white') }
function pvpopitup(url) { popitup5(url , 'Photographic Image 267x400 &copy; P Curtis', 267, 400, 'white') }


//Routines for cookies used to remember if user has broadband and a large screen and preferences for popup or lightbox.

/* Call function as setCookie("cookiename" , cookievalue, lifetime, cookiepath)
with the lifetime required in days, -1 to delete a cookie or zero
for a temporary cookie. The Cookie Path is optional.*/

function setCookie(cookie_name, cookie_value, cookie_life, cookie_path) {
  var today = new Date()
  var expiry = new Date(today.getTime() + cookie_life * 24*60*60*1000)
  if (cookie_value != null && cookie_value != ""){
    var cookie_string =cookie_name + "=" + escape(cookie_value)
    if(cookie_life){ cookie_string += "; expires=" + expiry.toGMTString()}
    if(cookie_path){ cookie_string += "; path=" + cookie_path}
	document.cookie = cookie_string
  }
} // Based on JavaScript provided by Peter Curtis at www.pcurtis.com -->

/* Call function as getCookie("cookiename") It returns the value of a cookie
if set or null. Beware of potential ambiguities in names of cookies -
getCookie is simple and will match the end of a string so xyname 
will also be matched by yname and ame. */
 
function getCookie(name) {
  var index = document.cookie.indexOf(name + "=")
  if (index == -1) { return "undefined"}
  index = document.cookie.indexOf("=", index) + 1
  var end_string = document.cookie.indexOf(";", index)
  if (end_string == -1) { end_string = document.cookie.length }
  return unescape(document.cookie.substring(index, end_string))
} // Based on JavaScript provided by Peter Curtis at www.pcurtis.com -->

// Set broadband true provided the screen resolution is sufficient for the larger popups 

var default_broadband = "true"
if (isNetbook()) {default_broadband = "false"}
var cookie_time=100
var default_pref_box = "true"

// Initialise Cookies during first visit - otherwise reload them to extend life
if (getCookie('broadband') == "undefined") { setCookie('broadband',default_broadband,cookie_time,"/") } else { setCookie('broadband',getCookie('broadband'),cookie_time,"/") } ;
if (getCookie('pref_box') == "undefined") { setCookie('pref_box',default_pref_box,cookie_time,"/") } else { setCookie('pref_box',getCookie('pref_box'),cookie_time,"/") } ;

function reset_defaults() {
  setCookie('broadband',default_broadband,cookie_time,"/");
  setCookie('pref_box',default_pref_box,cookie_time,"/");
  location.reload(false) ;
}
// Functions to set and clear broadband - also need to reload page

function set_broadband(){
setCookie('broadband',"true",cookie_time,"/")
  location.reload(false) ;
}

function clear_broadband(){
setCookie('broadband',"false",cookie_time,"/")
location.reload(false) ;
}

// Function to toggle flag for broadband users

function toggle(){
if (getCookie('broadband') != "true") {
setCookie('broadband',"true",cookie_time,"/");
}
else {
setCookie('broadband',"false",cookie_time,"/");
}
location.reload(false) ;
}

// Functions to set and clear pref_box - also reload page

function set_pref_box(){
setCookie('pref_box',"true",cookie_time,"/")
window.location.reload(false) ;
}
// Force settings for certain browsers
 if ( isIE9() && (getCookie('pref_box') != "true") ) {  setCookie('pref_box',"true",cookie_time,"/") }

function clear_pref_box(){
setCookie('pref_box',"false",cookie_time,"/")
window.location.reload(false) ;
}

// Function to toggle flag for pref_box users

function toggle_pref_box(){
if (getCookie('pref_box') != "true") {
setCookie('pref_box',"true",cookie_time,"/");
}
else {
setCookie('pref_box',"false",cookie_time,"/");
}
window.location.reload(false) ;
}

function popitup2v(url,title) {
if ( getCookie('broadband') == "true") {url=url+'b.jpg';popitup5(url , title, 450, 600, 'white') }
else {url=url+'w.jpg'; popitup5( url , title, 300, 400, 'white') } }

function popitup2h(url,title) {
if ( getCookie('broadband') == "true") {url=url+'b.jpg';popitup5(url , title, 600, 450, 'white') }
else { url=url+'w.jpg'; popitup5( url, title, 400, 300, 'white')
}}

/*
Functions to put in the HTML to provide simplified calls for vertical and horizontal popups with a doubleClick event handler calling toggle() so that large popups can be displayed if user has broadband. image parameter must be 8 or more characters. Three pictures expected imagei.jpg imagew.jpg and imageb.jpg (160px, 400px and 600px). Alignment can be left|right|center|galleryxxxx 
*/
var cssalign = "" ;
	function hpop(image, title, alignment) {
if ( getCookie('pref_box') == "true" || !( isComputer() || isNetbook() ) || isIE9() ) { hbox(image, title, alignment) }  
else {
        cssalign = "display: block; margin-left: auto; margin-right: auto;" 
        if(alignment == "left"){ cssalign = "float:left;"};
        if(alignment == "right") { cssalign = "float:right;"};
        title = title + "  (" + image.substring(image.lastIndexOf('/')+1) + ")";
	    document.write('hpop<IMG src= "' +image + '_small.jpg\" alt=\"' + title + '\"  title=\"' + title + '\"   style=\"width: 160px; height:120px; padding: 10px;  ' + cssalign + ' \"   onDblClick=\"toggle()\"  onClick=\"popitup2h(\' ' + image + '\' ,\' ' + title + '  \' )\" \>')  
      }
}

	function vpop(image, title, alignment) {
if ( getCookie('pref_box') == "true"  || !( isComputer() || isNetbook() ) || isIE9() ) { vbox(image, title, alignment) }  
else {
        cssalign = "display: block; margin-left: auto; margin-right: auto;" 
        if(alignment == "left"){ cssalign = "float:left;"};
        if(alignment == "right") { cssalign = "float:right;"}
        title = title + "  (" + image.substring(image.lastIndexOf('/')+1) + ")";
	    document.write('<IMG src= "' +image + '_small.jpg\" alt=\"' + title + '\"  title=\"' + title + '\"   style=\"width: 120px; height:160px; padding: 10px;  ' + cssalign + ' \"   onDblClick=\"toggle()\"  onClick=\"popitup2v(\' ' + image + '\' ,\' ' + title+ '  \' )\" \>') 
     }
}

	function hbox(image, title, alignment) {
  	cssalign = "display: block;margin-left:auto;margin-right:auto;" 
    if (screenWidth < 358 ) {
    	cssalign = "width: 156px; height:117px; display: block;margin-left:auto;margin-right:auto;" }
    if(alignment == "left"){ cssalign = "float:left;" ; alignment="center"};
    if(alignment == "right") { cssalign = "float:right;" ; alignment="center"}
    if((alignment !== "center" && alignment.substring(0, 7) !== "gallery") || getCookie('broadband') == "false" ){alignment = 
    image.substring(image.lastIndexOf('/')+1)  };
    
    document.write('<div class=\"picture_div\" style=\"'+cssalign+'\">')
	  document.write('<a href="' + image + '.jpg\"  data-lightbox=\"' + alignment + '\" data-title=\"' + title +'\"><IMG src= "' +image + '.jpg\" alt=\"' + title + '\"  title=\"' + title + '\"    style=\"width: 213px; height:160px; padding:0px;    \"   \/></a>')
 		document.write('<div class=\"caption_text\" style=\"width:160px;\">'+title+'</div>')
 		document.write('</div>')
		
 }

	function vbox(image, title, alignment) {
  	cssalign = "display: block; margin-left: auto; margin-right: auto;" 
    if(alignment == "left"){ cssalign = "float:left;" ; alignment="center"};
    if(alignment == "right") { cssalign = "float:right;" ; alignment="center"}
    if((alignment !== "center" && alignment.substring(0, 7) !== "gallery") || getCookie('broadband') == "false" ){alignment = 	image.substring(image.lastIndexOf('/')+1)  };
    	  
	  document.write('<div class=\"picture_div\" style=\"'+cssalign+'\">')
	  document.write('<a href="' + image + '.jpg\"  data-lightbox=\"' + alignment + '\" data-title=\"' + title +'\"><IMG src= "' +image + '.jpg\" alt=\"' + title + '\"  title=\"' + title + '\"    style=\"width: 120px; height:160px; padding:0px;    \"   \/></a>')
 		document.write('<div class=\"caption_text\" style=\"width:120px;\">'+title+'</div>')
 		document.write('</div>')
 		}


/* The following is loosely based on some code found at the Webdeveloper.com by Ultimater */

function ExpandOn(topicID){
var expand=document.getElementById(topicID);
if(!expand)return true;
expand.style.display="block";
return true;
}

function ExpandOff(topicID){
var expand=document.getElementById(topicID);
if(!expand)return true;
expand.style.display="none";
return true;
} 

function ExpandToggle(topicID){
var expand=document.getElementById(topicID);
if(!expand)return true;
if(expand.style.display=="none"){
expand.style.display="block";
} else {
expand.style.display="none";
}
return true;
}

/* Modifications to Expand code for Responsive design  */

function ResponsiveShowHide(rlogic,showId,hideId){
var expand1=document.getElementById(showId);
if(!expand1)return true;
   if (rlogic) {
      expand1.style.display="block";
   } else {
      expand1.style.display="none"
   }
var expand2=document.getElementById(hideId);
if(!expand2)return true;
   if (rlogic) {
      expand2.style.display="none";
   } else {
      expand2.style.display="block";
   }
return true;
} 

//  Should the following bbe changed to use screenWidth which is browser independent ?? Tests needed !!

function isTwoCols () { 
var sw = screen.width
if(window.innerWidth) { 
    if (window.innerWidth < screen.width) { sw = window.innerWidth }
}
   return ( sw < 550 )
}

function isThreeCols() {
var sw = screen.width
if(window.innerWidth) { 
    if (window.innerWidth < screen.width) { sw = window.innerWidth }
}
   return ( (sw > 549 && sw < 719 ) )
}

function isFourCols() {
var sw = screen.width
  if(window.innerWidth) { 
    if (window.innerWidth < screen.width) { sw = window.innerWidth }
  }
   return (screenWidth > 718 )
}

function ReponsiveNavBarSplit(){
   if (!isFourCols() ) {
      document.write('\<\/tr\>\<tr\>');
   }
}

function reponsivePictureblockSplit(pbIndex){
   if (isTwoCols() && (pbIndex % 2 == 0 ) )  {
      document.write('\<\/tr\>\<tr\>');
   } else if (isThreeCols() && (pbIndex % 3 == 0 ) )  {
      document.write('\<\/tr\>\<tr\>');
   }  else if (isFourCols() && (pbIndex % 4 == 0 ) )  {
      document.write('\<\/tr\>\<tr\>');
   }
}

//Following functions complete the set to allow a complete standard picture block to be written on the fly within a single script element.

function td(){
      document.write('\<td style=\"padding:0px;\"\>');
}
function tdCpictureblock(){
      document.write('\<td class=\"pictureblock\"\>');
}
function tdE(){
      document.write('\<\/td\>');
}
function tr(){
      document.write('\<tr\>');
}
function trE(){
      document.write('\<\/tr\>');
}
function tableCpictureblock(){
      document.write('\<table class=\"pictureblock\"\>');
}
function tableE(){
      document.write('\<\/table\>');
}

window.addEventListener("orientationchange", responsiveReload); 
window.addEventListener("resize", responsiveReload);

var twoCols = isTwoCols();
var threeCols = isThreeCols();
var fourCols = isFourCols();

function responsiveReload() {
// Check for a change in the columns required before a reload 
  if( twoCols == !isTwoCols() || threeCols == !isThreeCols() || fourCols == !isFourCols() ) {
    twoCols = isTwoCols(); 
    threeCols = isThreeCols();
    fourCols = isFourCols();
   
    if( isFirefox() ) { 
       location.href=location.pathname;
       return true;
    } else if (isApple()){ 
      location.reload(false)  //  setTimeout(location.reload(false), 1000);
       return true;
    } else {
        history.go(0)
    }
  }
}

// =============== Code changes from rbox_17092015.js follow ===============================================

// onload function does two separate things
// 1. Sets up a click handler doclick() to detect a click anywhere to clear popup/down menus
// 2. Creates a banner on the first visit to display EU style cookie warning.

window.onload=function() {  
  if (document.getElementById('showFooterMenu') || document.getElementById('showHeaderMenu' )) { 
     document.onclick = docClick
  } 
  if (getCookie('cookies_accepted') == "false" || getCookie('cookies_accepted') == "undefined") {
        createBanner(); 
    } else { setCookie('cookies_accepted',"true",cookie_time,"/") } ; // extend life back to cookie_time when revisited
}

var display_footer_menu="false";
var display_header_menu="false";
var kill_header_timeout;
var kill_footer_timeout;
function docClick() {
  setTimeout(function(){
    if (display_header_menu=="true") { ExpandToggle('showHeaderMenu');    
    } else { ExpandOff('showHeadMenu');}
    if (display_footer_menu=="true") { ExpandToggle('showFooterMenu');    
    } else { ExpandOff('showFooterMenu');}
    display_header_menu="false";
    display_footer_menu="false";
  }, 5);
}
function setDisplayFooterMenu() {
 display_footer_menu='true';
    clearTimeout(kill_footer_timeout);
    kill_footer_timeout = setTimeout(function(){
      if (display_footer_menu=="true") { ExpandToggle('showFooterMenu'); display_footer_menu="false";    
      } else { ExpandOff('showFooterMenu'); }
  }, 20000);
}
function setDisplayHeaderMenu() {
 display_header_menu='true';
    clearTimeout(kill_header_timeout);
    kill_header_timeout = setTimeout(function(){
      if (display_header_menu=="true") { ExpandToggle('showHeaderMenu'); display_header_menu="false";    
      } else { ExpandOff('showHeaderMenu'); }
  }, 20000);
}



var msieversion = 0;
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ 
  msieversion = Number(RegExp.$1) }
function isIE9orless() {
 return ( msieversion != 0 && msieversion < 10 );
}

// The method of adding an extra <div> element is based on an idea at https://www.creare.co.uk/js-eu-cookie-law-banner
function createBanner(){
  var bodytag = document.getElementsByTagName('body')[0];
  var div = document.createElement('div');
  var bannerCode = '<img title="Close Banner"  onclick="removeBanner()" src="gallery/close_banner.png" style="height:20px;width:20px;float:right;padding:6px;"><p style="padding:10px 10px;">';
 
  if ( !navigator.cookieEnabled ) { 
     bannerCode += '<b>Warning:</b> Cookies have been disabled in your browser settings so advanced functions will not work and preferences will not display correctly <br> ';
  } else {
    bannerCode +=  'This website uses cookies and by  '
    bannerCode += '<a href="javascript:void(0);" onclick="doAccept()" class="homebar" title="Agree to use of Cookies">Agreeing</a>'
    bannerCode += ', or continuing, you signify acceptance.&nbsp;&nbsp; <a href="privacy.htm" class="homebar" title="Privacy &amp; Cookies Policy"  target="_blank">More&nbsp;Details</a>' 
  }
  if ( isIE9orless() ) { 
     bannerCode += '<br><b>Warning:</b> You are running an early version (' + msieversion + ') of Internet Explorer so some advanced web site functions have been disabled.' 
  };
  bannerCode += '</p>';  
  div.setAttribute('id','cookie_banner');
  div.setAttribute('style','background:yellow;border-radius:7px;'); // Better to use #cookie_banner {background:yellow;border-radius:7px;} in style sheet
  div.innerHTML = bannerCode;   
//  bodytag.appendChild(div); // Alternative - adds Banner before </body> tag 
  bodytag.insertBefore(div,bodytag.firstChild); // Alternative - adds  Banner after <body> tag
  setCookie('cookies_accepted',"true",cookie_time,"/"); //Remove commenting to have default of banner only appearing once.
}

function removeBanner(){
	var element = document.getElementById('cookie_banner');
	element.parentNode.removeChild(element);
} 

function doAccept() {
setCookie('cookies_accepted',"true",cookie_time,"/");
removeBanner();
}

function doNotAccept() {
setCookie('cookies_accepted',"false",cookie_time,"/");
//    location.reload(false);
}
