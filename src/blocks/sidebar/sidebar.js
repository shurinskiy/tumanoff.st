import $ from "jquery";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
(function(){
	var $checkbox = $('input#showmenu');
	var $header = $('.sidebar');
	var $window = $(window);
	var headerToTop = function pin(e) {
		if(window.matchMedia('(max-width: 960px)').matches) {
			var scrolltop = $window.scrollTop();
			if (scrolltop > 200 && !pin.flag) {
				$header
					.stop()
					.hide()
					.addClass('menufixed')
					.fadeIn()
					.next()
					.css('margin-top', 100);
					pin.flag = true;
			}
			else if (scrolltop < 1 && pin.flag) {
				$header
					.stop()
					.removeClass('menufixed')
					.next()
					.css('margin-top', 0);
					pin.flag = false;
			}
		}
	}
	$window.on('scroll', function() {
		window.requestAnimationFrame(headerToTop);
	});
	headerToTop();


	$checkbox.on("change", function() {
		if($(this).is(':checked')) {
			disablePageScroll();
		} else {
			enablePageScroll();
		}				
	});
	
}($));






