/*------------------- Change CSS depending on window width, Extra styling for finnish side, Make the footer stay on the bottom of the window ---------------------*/

window.onload = function() {
	
	var browserName=navigator.appName; 
	if (browserName=="Microsoft Internet Explorer") {
		var sWidth = document.body.clientWidth;
		}
	else {
		var sWidth = window.innerWidth;
		}

	// Variables	
	var FileName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
	var sHeight = window.innerHeight;
	var sHeight = sHeight - 25;
	var foot = $('#footer');
	var cssfile = $('#css_file');
	var footHomeY = foot.offset().bottom;

	//Keep footer at the bottom of the page
	if (sWidth > 1023) {
		foot.css({
			position: 'fixed',
	  	top: +sHeight
	  	});
		}

	//If the front page page is not higher than window, we must stretch is. Also extra style changes depending on width and language.
	if (FileName == 'index.shtml' || FileName == 'index_fi.shtml' || FileName == 'tutkimus.shtml') {
		if (sWidth > 1023) {
			var sHeight = sHeight-155;
			if (FileName == 'cv_fi.shtml' || FileName == 'index_fi.shtml') {
				var nav = $('#nav');
	  		nav.css({
    		'padding-left': 196,
      	width: 828
      	});
				}
			}
			else {
				var sHeight = sHeight+500;
				}
			var frontpage = $('#section_main');
	  	frontpage.css({
	  		height: +sHeight
	    	});
	  	}
	 
	 //Extra styling for finnish side
	if (FileName == 'cv_fi.shtml' || FileName == 'tutkimus.shtml' && sWidth > 1023) {
		var nav = $('#nav');
	  nav.css({
    	'padding-left': 196,
      width: 828
      });
		}
	};

/*------------------- When scrolling, make the navigation stop on the top of the window ---------------------*/
$(function() {
	var nav = $('#nav');
	var navHomeY = nav.offset().top;
	var navHomeY = navHomeY;
  var isFixed = false;
  var $w = $(window);
  $w.scroll(function() {
  	var scrollTop = $w.scrollTop();
    var shouldBeFixed = scrollTop > navHomeY;
    if (shouldBeFixed && !isFixed) {
    	nav.css({
      	position: 'fixed',
        top: 0
        });
			isFixed = true;
      }
      else if (!shouldBeFixed && isFixed) {
      	nav.css({
        	position: 'static'
          });
        isFixed = false;
        }
    });
 	});
 

/*------------------- AJAX loader for the pages ---------------------*/
 function LoadContent(page,extraheight){
 	$("#conti_container").load(page);
	}

