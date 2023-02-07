$(function(){
	var winH = $(window).height(),
	footH = $('.footer').outerHeight(),
	carWrap = $('.career-wrap'),
	cListBoxAct = $('.career-list-box li'),
	irSec = $('body').css('font-weight') * 3;
	carWrap.css('height', winH - footH);

	cListBoxAct.click(function () {
		var _this = $(this);
		if (!cListBoxAct.is(':animated')) {
			_this.stop().animate({'overflow':'visible'}, irSec);
			if (!_this.hasClass('on')) {
				_this.addClass('on').siblings().removeClass('on').parent().addClass('active');
			} else {
				_this.removeClass('on').parent().removeClass('active');
			}
		}
	});
});