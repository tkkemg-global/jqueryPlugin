( function( $ ) {
	$.fn.smScroll = function( options ) {
		var setting = {
			duration : 1000,
			easing : 'easeOutQuad'
		};
		options = $.extend( setting, options );
		return this.each( function( i, elem ) {
			$(elem).click( function() {
				var offset = $(this.hash).eq(0).offset();
				if ( this.hash && offset !== null ) {
					var targetPos = offset.top;
					var wst = $(window).scrollTop();
					$(window).scrollTop( wst + 1 );
					if ( $('html').scrollTop() > 0 ) {
						var targetBody = $('html');
					} else if ( $('body').scrollTop() > 0 ) {
						var targetBody = $('body');
					}
					if ( typeof targetBody !== 'undefined' ) {
						targetBody.animate(
							{
								scrollTop : targetPos
							},
							options.duration,
							options.easing
						);
					}
				}
			});
		});
	};
})( jQuery );

jQuery(function($) {
	$('a[href^="#"]').smScroll({
		duration : 2000,
		easing : 'easeOutQuad'
	});
});
