$(document).ready(function(){ 
 $("circle").hover(
	function() {
	$(this).addClass( "yellow" );;
	}, 
	function(){
	$(this).removeClass( "yellow" );
});
}); 