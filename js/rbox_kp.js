

	function vpop(width, image, title, position, linkki) {
		
		var cssalign = 'display: block;margin-left:auto;margin-right:auto;' 
    if(position == "left"){ cssalign = "float:left;" ; alignment="center"};
    if(position == "right") { cssalign = "float:right;" ; alignment="center"}


    	  
	  document.write('<div class="picture_div" style="width:'+width+'px;'+ cssalign +'">')
	  document.write('<a href="images/USA/DSC_' + image + '.JPG"  data-lightbox="usa" data-title="' + title + '"><IMG id="'+image+'" src= "images/USA/thumb/DSC_' +image+ '.JPG" alt="' + title + '"  title="' + title + '"/></a>')
 		document.write('<div class="caption_text">')
 		document.write(title)
 		
 		
if(linkki == "") {
   
  }
   	else {
   		document.write(' <a href="http://'+linkki+'" target="_New" style="font-size:11px;">Link</a> | ')
   	}
 		
 		document.write(' <a href="images/USA/DSC_' + image + '.JPG" target="_New" style="font-size:11px;">OI</a>')
 		
 		
 		document.write('</div>')
 			
 		document.write('</div>')
 		
 		
 	
 		}

