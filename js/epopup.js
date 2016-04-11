// Browser check function to write warnings into the web page when placed within a <script> tag

function browser_caution() {
var browser = navigator.appName;
var version = navigator.appVersion;
// Check JavaScript supports resizing of windows - version 1.2 or higher
if (!window.resizeTo) { document.write('<font color="#FF0000">Unfortunately you are running a browser identifying itself as ' + browser + ' version ' + version + ' which does not seem to support the JavaScript which would provide the Popup images when you click on the thumbnails on this page.</font>') }
if (navigator.cookieEnabled == false) {
document.write('<font color="#FF0000">Unfortunately you seem to have disabled Cookies in your browser and this means you will not be able to change the size of the popups used for pictures.</font>')
}
}

// Identification of specific browsers

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
// var is_epiphany = navigator.userAgent.toLowerCase().indexOf('epiphany') > -1;
// var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

// Routine for popup windows with title, size and background colour parameter (5 parameters)

var newwindow;
var wheight = 0, wwidth = 0;

function popitup5(url, title, iwidth, iheight, colour) {
var pwidth, pheight;

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
// The resizeTo needs Javascript 1.2 or higher so the include for this javascript file should specify language="JavaScript1.2"
if (window.resizeTo) newwindow.resizeTo(pwidth, pheight);
wheight=iheight;
wwidth=iwidth;
}

newwindow.document.clear();
newwindow.document.writeln('<html> <head> <title>' + title + ' <\/title> <\/head> <body bgcolor= \"' + colour + '\"> <center>');
newwindow.document.writeln('<img src=' + url + ' title=\"' + title + '\" alt=\"' + title + '\" >');
newwindow.document.writeln('<\/center> <\/body> <\/html>');
newwindow.document.close();

if (is_chrome) {newwindow.parent.blur();}

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

//Routines for cookies used to remember if user has broadband and a large screen

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
if (screen.height < 720 || screen.width < 720 ) {default_broadband = "false"}
var cookie_time=0

// Functions to set and clear broadband

function set_broadband(){
setCookie('broadband',"true",cookie_time,"/")
}

function clear_broadband(){
setCookie('broadband',"false",cookie_time,"/")
}

// Function to toggle flag for broadband users

function toggle(){
if (getCookie('broadband') == "undefined") { setCookie('broadband',default_broadband,cookie_time,"/"); }
if (getCookie('broadband') != "true") {
setCookie('broadband',"true",cookie_time,"/");
}
else {
setCookie('broadband',"false",cookie_time,"/");
}
}

// Functions called for vertical and horizontal popups of two different sizes (image files end in i.jpg for icon, w.jpg for small image (400*300) and b.jpg for large images (600x450)

function popitup2v(url,title) {
if (getCookie('broadband') == "undefined") { setCookie('broadband',default_broadband,cookie_time,"/"); }
if ( getCookie('broadband') == "true") {url=url+'.jpg';popitup5(url , title, 450, 600, 'white') }
else {url=url+'w.jpg'; popitup5( url , title, 300, 400, 'white') } }

function popitup2h(url,title) {
if (getCookie('broadband') == "undefined") { setCookie('broadband',default_broadband,cookie_time,"/"); }
if ( getCookie('broadband') == "true") {url=url+'b.jpg';popitup5(url , title, 600, 450, 'white') }
else { url=url+'w.jpg'; popitup5( url, title, 400, 300, 'white')
}}
/*
Functions to put in the HTML to provide simplified calls for vertical and horizontal popups with a doubleClick event handler calling toggle() so that large popups can be displayed if user has broadband
*/

function hpop(image, title, alignment) {
document.write('<IMG src= \"' +image + 'i.jpg\" alt=\"' + title + '\" title=\"' + title + '\" width = 160 height = 120 border = 0 align=\"' + alignment + '\" hspace = 10 vspace = 10 onDblClick=\"toggle()\" onClick=\"popitup2h(\' '+ image+'\' ,\' ' + title+ ' \' )\" <\/IMG>') }

function vpop(image, title, alignment) {
document.write('<IMG src= "' +image + '_small.jpg\" alt=\"' + title + '\" title=\"' + title + '\" width = 120 height = 160 border = 0 align=\"' + alignment + '\" hspace = 10 vspace = 10 onDblClick=\"toggle()\" onClick=\"popitup2v(\''+ image+ '\' ,\' ' + title+ ' \' )\" <\/IMG>') }

// Some experimental functions follow in my file and other functions not to do with popups which are not included here. The layout has also suffered here and some indenting has been lost. 