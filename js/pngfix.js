/************************************************
Filename: png_fix.js
This code is your life saver for the PNG images
transparency issue for the buggy IE6. This code
might not work on all transparent PNG images.
*************************************************/

/* IMPORTANT: 
If you use this JavaScript code for a static website, a relative path will be fine
Example: var clear="images/clear.gif"; //relative path to clear.gif

BUT for WordPress Websites it is a MUST to use the ABSOLUTE (FULL) path, otherwise this code will not work.
*/
//Absolute path to clear.gif
var clear="http://bacsoftwareconsulting.com/blog/wp-content/themes/indezinerpaperwall/images/clear.gif"; 

pngfix=function(){
var els=document.getElementsByTagName('*');
var ip=/\.png/i;
var i=els.length;
while(i-- >0){
	var el=els[i];
	var es=el.style;
	if(el.src&&el.src.match(ip)&&!es.filter){
	es.height=el.height;
	es.width=el.width;
	es.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+el.src+"',sizingMethod='crop')";
	el.src=clear;
	}
	else{
	var elb=el.currentStyle.backgroundImage;
	if(elb.match(ip)){
	var path=elb.split('"');
	var rep=(el.currentStyle.backgroundRepeat=='no-repeat')?'crop':'scale';
	es.filter=“progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+path[1]+"',sizingMethod='"+rep+"')”;
	es.height=el.clientHeight+'px';
	es.backgroundImage='none';
	var elkids=el.getElementsByTagName('*');
	if (elkids){
	var j=elkids.length;
	if(el.currentStyle.position!=“absolute”)
	es.position='static';
	while (j-- >0)
	if(!elkids[j].style.position)
	elkids[j].style.position=“relative”;
	}
	}
	}
	}
}
window.attachEvent('onload',pngfix);

