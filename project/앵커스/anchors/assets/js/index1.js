jQuery.event.add(window, 'load', function () {
	rtW();
	$(window).resize(function(){
		rtW();
	});
	
	function rtW(){
		var winW = $(window).width();
		if (winW > 1920) {
			$('.main-bg-mov').css('width', winW);
		}
	}
});