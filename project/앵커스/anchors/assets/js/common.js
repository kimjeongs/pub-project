jQuery.event.add(window, 'load', function () {
	var showMainList = $('[ir] > li'),
	winWid = $(window).width(),
	navWid = $('.header-cont').width(),
	aniItem = setTimeout;

	$('.grid li:first').clone().insertBefore('.grid li:nth-child(1)');
	$('.grid li:first').clone().insertBefore('.grid li:nth-child(3)');

	function irInsert() {
		$('[ir]').each(function (index) {
			var iNum = showMainList.length, _this = $(this);
			if (_this.children().is('li')) {
				_this.removeAttr('ir').attr('ir-group-idx', (index + 1));
			} else {
				if (!$(this).hasClass('on')) {
					_this.removeAttr('ir').attr('ir-idx', (index + 1));
				}
			}
			aniItem(function () {
				for (i = 0; i <= iNum; i++) {
					$(function (i) {
						aniItem(function () {
							showMainList.eq(i).addClass('active');
						}, 300 * i);
					}(i));
				}
			}, 1200);
		});
	}

	aniItem(function(){
		irInsert();
	}, 50);

	$(window).resize(function(){
		$('.nav.on').css('right', -($(window).width() - $('.header-cont').width()) / 2 + 20 + 'px');
	});

	$('.nav .btn-menu').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.nav').toggleClass('on');
		if ($(this).parent().hasClass('full')) {
			if ($(this).parent().hasClass('on')) {
				$(this).parent().css('right', -(winWid - navWid)/2 + 20 + 'px');
			} else {
				$(this).parent().css('right', '3px');
			}
		}
	});

	$('html, body').click(function(e){
		var tarItem = $('.nav .btn-menu, .nav .btn-menu *, .nav .menu, .nav .menu *');
		if(!$(e.target).is(tarItem)) {
			$('.nav').removeClass('on');
			$('.nav.full').css('right', '3px');
		}
	});

	// $('.popup').click((function () {
	// 	var returnTar;
	// 	return function (e) {
	// 		var bodyWid = $('body').width();
	// 		returnTar = $(e.target).closest('button'),
	// 		wSize = $(window).width(),
	// 		popIdx = $(this).attr('pop-idx');
	// 		$('.layerPopupWrap' + '[pop-idx=' + popIdx + ']').fadeIn(500).css('display', 'table');
	// 		$('.layerPopupCont').attr('tabindex', '0').fadeIn(500);
	// 		if (wSize > 1024) {
	// 			$('body').css({ 'overflow': 'hidden', 'width': bodyWid });
	// 		}
	// 		aniItem(function () {
	// 			$('.layerPopupCont').focus().append('<a href="#" class="tarLoop"></a>');
	// 			$('.tarLoop').focusin(function () {
	// 				$('.layerPopupCont').focus();
	// 			});
	// 		}, 0);

	// 		$('.popupClose, .layerPopupWrap').click(function (e) {
	// 			var tarItem = $('.layerPopupCont > div, .layerTitle, .layerCont *');
	// 			if (!$(e.target).is(tarItem)) {
	// 				$('.layerPopupWrap').fadeOut(500);
	// 				$('.layerPopupCont').removeAttr('tabindex').fadeOut(500);
	// 				$('.tarLoop').remove();
	// 				aniItem(function () {
	// 					returnTar.focus();
	// 				}, 0);
	// 				aniItem(function () {
	// 					if (wSize > 1024) {
	// 						$('body').css({ 'overflow': 'auto', 'width': 'auto' });
	// 					}
	// 				}, 800);
	// 			}
	// 		});
	// 	}
	// })());

	$(window).scroll(function () {
		var scrPos = $(this).scrollTop(),
		scrPosSum = $(document).height() - $(window).height() - $('.footer').height();
		if (scrPos > 0) {
			$('.header').addClass('scroll');
		} else {
			$('.header').removeClass('scroll');
		}

		if ($('.main').length == 0) {
			if (scrPos >= scrPosSum) {
				$('.wrap').addClass('side-fixed');
			} else {
				$('.wrap').removeClass('side-fixed');
			}
		}
	});

	// if (winWid > 767) {
	// 	$('<div class="mouse">').appendTo('body');
	// 	var mouseX = -50, mouseY = -50;
	// 	var xp = 0, yp = 0;
	
	// 	$('html, body').on('mousemove', function (e) {
	// 		mouseX = e.pageX - 30;
	// 		mouseY = e.pageY - 30;
	// 	});
	
	// 	setInterval(function () {
	// 		xp += ((mouseX - xp) / 6);
	// 		yp += ((mouseY - yp) / 6);
	// 		$('.mouse').css({top:yp + 'px', left:xp + 'px'});
	// 	}, 10);
	
	// 	$('a, button, [class*="swiper-button"], .swiper-pagination-bullet').on('mouseleave mouseenter', function(e){
	// 		e.preventDefault();
	// 		if (e.type == 'mouseleave') {
	// 			$('.mouse').removeClass('hover');
	// 		} else {
	// 			$('.mouse').addClass('hover');
	// 		}
	// 	});
	// }
});
