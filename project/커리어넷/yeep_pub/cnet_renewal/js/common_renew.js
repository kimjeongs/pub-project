function gnbEvent(){
	var header = $('#headerR'),
		gnbWrap = $('.gnb'),
		oneDept = gnbWrap.find('> ul > li > a, .depth1'),
		dim = $('.dim-new');

	oneDept.focus(function(){
		var _this = $(this),
			_thisLi = _this.parents('li');

		header.addClass('open').stop().animate({
			'height' : '345px' 
		}, 400);
		dim.addClass('on');
		_thisLi.addClass('on').siblings().removeClass('on');
	}).hover(function() {
		var _this = $(this),
			_thisLi = _this.parents('li');

		header.addClass('open').stop().animate({
			'height' : '345px' 
		}, 400);
		dim.addClass('on');
		_thisLi.addClass('on').siblings().removeClass('on');
	});

	header.mouseleave(function() {
		header.stop().animate({
			'height' : '132px' 
		}, 500, function(){
			dim.removeClass('on');
			header.removeClass('open');
			gnbWrap.find('> ul > li').removeClass('on');
		});
	});

	$('.mbtype-menu .sns-link > a').eq(2).add('.hd-logo > a').blur(function() {
		header.stop().animate({
			'height' : '132px' 
		}, 500, function(){
			dim.removeClass('on');
			header.removeClass('open');
			gnbWrap.find('> ul > li').removeClass('on');
		});
	});
}

$(document).ready(function(){
	gnbEvent();
}); 