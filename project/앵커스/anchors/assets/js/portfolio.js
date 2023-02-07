jQuery.event.add(window, 'load', function () {
	var winW = $(window).width(),
	posArr = [],
	ptSwpBox = $('.portfolio-swiper-box'),
	alignSize = parseInt($('.footer-cont').css('max-width')),
	ftwVal = $('body').css('font-weight') / 4,
	addMgn = ftwVal * 2,
	pageDownBtn = $('.btn-portfolio-in'),
	posItem = $('.portfolio-list li'),
	posItemLength = posItem.length,
	slideAutoHgt = $('.portfolio-slide a, .portfolio-top-outer'),
	headerOur = $('.header'),
	headerOurCnt = $('.header-cont'),
	sideItem = $('.btm-copyright, .btn-contact-us'),
	brChk = $('.portfolio-list-box .pf-desc br'),
	btnMoreItem = $('.portfolio-list-box .btn-more'),
	navBtnMenu = $('.nav .btn-menu'),
	toggleClass = $('.btn-toggle');
	sideItem.css('opacity', '0');

	$(window).resize(function () {
		if (winW > 767) {
			slideHgt();
		}
		txtBrChk();
	});

	$(window).on('orientationchange', function () {
		location.reload();
	});

	function pfItemHgt () {
		setTimeout(function () {
			var dHgt = posItem.outerHeight(true) * 5;
			posItem.parent().css('height', dHgt);
		}, 0);
	}
	pfItemHgt ();

	pageDownBtn.click(function () {
		$('html, body').stop().animate({ scrollTop: pfHgt }, addMgn * 3, 'easeInQuart');
		setTimeout(function(){
			headerOurCnt.find('.h-logo img').attr('src', '/anchors/assets/images/common/img_header_logo.png');
			navBtnMenu.removeClass('other');
		}, 650);
	});

	$(window).scroll(function () {
		var scrPos = $(this).scrollTop(),
		actPos = $('.portfolio-list-outer').offset().top;
		if (scrPos > actPos) {
			headerOur.addClass('scroll');
			headerOurCnt.find('.h-logo img').attr('src', '/anchors/assets/images/common/img_header_logo.png');
			navBtnMenu.removeClass('other');
			ptSwpBox.css('position', 'absolute');
			if (winW > alignSize) {
				sideItem.css('opacity', '1');
			}
		} else {
			headerOur.removeClass('scroll');
			headerOurCnt.find('.h-logo img').attr('src', '/anchors/assets/images/common/img_header_logo2.png');
			navBtnMenu.addClass('other');
			ptSwpBox.css('position', 'fixed');
			sideItem.css('opacity', '0');
		}

		for (var i = 0; i < posItemLength; i++) {
			var thisPos = posItem.eq(i).offset().top;
			posArr.push(thisPos);

			if (scrPos > posArr[i] - pfHgt + ftwVal) {
				posItem.eq(i).find('a').removeClass('on').removeAttr('ir').attr('ir-idx', (i + 6));
			} else {
				posItem.eq(i).find('a').addClass('on').removeAttr('ir-idx').attr('ir', '');
			}
		}
	});

	btnMoreItem.click(function () {
		posItem.removeClass('disabled');
		posItem.parent().css('height', 'auto');
		$(this).fadeOut(ftwVal * 5);
	});

	toggleClass.click(function () {
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
			$('.portfolio-swiper-box').removeClass('off').addClass('on');
		} else {
			$(this).removeClass('active');
			$('.portfolio-swiper-box').removeClass('on').addClass('off');
		}
	});

	function slideHgt() {
		pfHgt = $(window).height();
		slideAutoHgt.css('height', pfHgt);
	}
	slideHgt();

	function txtBrChk() {
		if (winW <= alignSize) {
			brChk.hide();
		} else {
			brChk.show();
		}
	}
	txtBrChk();
});
