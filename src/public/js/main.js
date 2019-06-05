$(document).ready(() => {
	$('circle').hover(
		() => {
			$(this).addClass( 'yellow' );
		},
		() => {
			$(this).removeClass( 'yellow' );
		}
	);
});