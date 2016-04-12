// Make that $ works for other than jQuery
var jq = $.noConflict();

// Run after document ready
jq(document).ready(function(){
	
	jq(".Mobile_menu").hide();
	
	// Page loading - first the frontpage
	var cp = document.location.href.match(/[^\/]+$/)[0];
	if (cp == 'index_fi.html'){
		LoadPage('indexc_fi');
		} else {
			LoadPage('indexc');
			}
	
	// Then other pages
	jq(document).on("click", ".Button_MainMenu", function(){
		
	/* link active script - not functional yet, doesn't toggle always?!?
	jq(this).toggleClass("link_hover");
	var selected_currentsaved = jq("#nav").data('selected_current');
	var selected_new = jq(this).attr('id');
	console.log(selected_new+" C: "+selected_currentsaved);
	if(selected_new != selected_currentsaved) {
		jq("#"+selected_currentsaved).toggleClass("link_inactive");
    } 
  jq("#nav").data('selected_current', jq(this).attr('id')); */
	
	var PageId = jq(this).attr('id');
	LoadPage(PageId);
	})
  					
  // Actual page loading function				
  function LoadPage(PageId){
  	jq("#conti_container").load(PageId+".html");
  	jq(".Mobile_menu").hide(); SwapArrow();
  	}				
 });

// Update update date - has to be outside document.ready
function PageUpdated(date){
	jq('#updated').text(date);
	}

// For the responsive state's compact menu
jq(document).on("click", ".Button_MainMenuSelector", function(){
	jq(".Mobile_menu").toggle();
	SwapArrow();
	});

function SwapArrow(){
	var _this = jq("#arrowRotate");
  var current = _this.attr("src");
  var swap = _this.attr("data-swap");     
  _this.attr('src', swap).attr("data-swap",current);
	}
