import $ from "jquery";
(function(){
	var show = $('.comments__write');
	var form = $('.comments__form.form');

	show.on('click', function(event) {
		form.css('display', 'flex');
		event.preventDefault();
	});


}($));
