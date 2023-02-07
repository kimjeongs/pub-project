$(function(){
	posArr = [],
	pfHgt = $(window).height(),
	wrapBox = $('.ctr-ir'),
	wrapBoxLeng = wrapBox.length,
	servicePos = $('.service-outer').offset().top,
	serviceLi = $('.service-list li'),
	serviceLen = $('.service-list li').length,
	partnersPos = $('.partners-outer').offset().top,
	movPos = $('.anchors-mv').offset().top,
	aniItem = setTimeout;

	$(window).scroll(function () {
		var scrPos = $(this).scrollTop();

		//top background
		if (scrPos > 0) {
			$('.top-about-outer').addClass('on');
		} else {
			$('.top-about-outer').removeClass('on');
		}

		//service
		if (!serviceLi.is(':animated')) {
			if (scrPos >= servicePos - 300) {
				serviceLi.stop().animate({ 'overflow': 'visible' }, 4900);
				for (i = 0; i <= serviceLen; i++) {
					$(function (i) {
						aniItem(function () {
							serviceLi.eq(i).addClass('on');
						}, i * 600)
					}(i));
					aniItem(function () {
						if (serviceLi.last().hasClass('on')) {
							serviceLi.addClass('cursor');
						} else {
							serviceLi.removeClass('cursor');
						}
					}, 4200)
				}
			} else {
				serviceLi.removeClass('on cursor');
			}
		}

		//partners
		if (scrPos >= partnersPos - 300) {
			$('.partners-outer').addClass('on');
		} else {
			$('.partners-outer').removeClass('on');
		}

		//video
		if (scrPos >= movPos - 200) {
			$('.anchors-mv video').attr('autoplay','autoplay');
		}

		//Kquery
		for (var i = 0; i < wrapBoxLeng; i++) {
			var thisPos = wrapBox.eq(i).offset().top;
			posArr.push(thisPos);
			if (scrPos > posArr[i] - pfHgt + 100) {
				wrapBox.eq(i).removeClass('on').removeAttr('ir').attr('ir-idx', (i + 5));
			} else {
				wrapBox.eq(i).addClass('on').removeAttr('ir-idx').attr('ir', '');
			}
		};
	});
});