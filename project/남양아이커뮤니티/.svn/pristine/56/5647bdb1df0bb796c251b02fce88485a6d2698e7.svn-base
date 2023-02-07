$(function(){
	var sltColor = $('.inp-select-box select'),
	gnbOpenBtn = $('.btn-gnb-menu'),
	gnbCloseBtn = $('.header-menu-btn .btn-close'),
	wSize = $(window).width(),
	wHgt = $(window).height(),
	outerHgt = $('.header').outerHeight() + $('.footer').outerHeight(),
	contHgt = $('.container').outerHeight(),
	contSize = wHgt - outerHgt,
	aniItem = setTimeout,
	tabCommon = $('.tab a, .tab button'),
	iScrSum3 = 0,
	iScrDep3 = $('.gnb-depth3 li'),
	iScrSum4 = 0,
	iScrDep4 = $('.gnb-depth4 li'),
	depDownCnt = $('.gnb-right-depth ul li'),
	tabCommon = $('.tab > li'),
	sltTabCommon = $('.slt-tab select'),
	tabView = $('.tab-view .tab > li'),
	popContHgt = $('.layerpopup-cont, .login-cont');
	searchContHgt = $('.cont-com-search');

	// s : user agent
	if (/Android/i.test(navigator.userAgent)) {
		// 안드로이드
		$('body').addClass('android');
	} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		// iOS 아이폰, 아이패드, 아이팟
		$('body').addClass('ios');
	} else {
		// 그 외 디바이스
	}
	// e : user agent
	
	// s : gnb
	gnbOpenBtn.click(function(){
		$('.wrap').hide();
		$('.header-menu-wrap').fadeIn(350);
	});

	gnbCloseBtn.click(function () {
		$('.header-menu-wrap').fadeOut(350, function () {
			$('.wrap').fadeIn(350);
			autoHgt();
		});
	});

	iScrDep4.click(function(){
		$(this).addClass('on').siblings().removeClass('on');
	});

	depDownCnt.click(function () {
		$(this).addClass('on').siblings().removeClass('on');
	});

	$('.gnb-depth4 li, .gnb-right-depth li').click(function(){
		var depthIdx = $(this).index();
		if ($(this).parent().hasClass('gnb-depth4')) {
			depDownCnt.removeClass('on').eq(depthIdx).addClass('on');
		} else {
			$('.gnb-right-btn').trigger('click');
			iScrDep4.removeClass('on').eq(depthIdx).addClass('on');
		}
	});

	for (var i = 0; i <= iScrDep4.length; i++) {
		iWidInt = parseInt(iScrDep4.eq(i).outerWidth());
		iScrDep4.eq(i).css('width', iWidInt);
		iScrSum4 += iScrDep4.eq(i).outerWidth();
	}
	iScrDep4.parent().css('width', iScrSum4);

	for (var j = 0; j <= iScrDep3.length; j++) {
		iWidInt2 = parseInt(iScrDep3.eq(j).outerWidth());
		iScrDep3.eq(j).css('width', iWidInt2+5);
		iScrSum3 += iScrDep3.eq(j).outerWidth();
	}
	iScrDep3.parent().css('width', iScrSum3);

	$('.search-box a').click(function(){
		$(this).parent().addClass('on');
	});
	// e : gnb

	// s : toggle
	$('.toggle').click(function(){
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
				if ($(this).hasClass('on')) {
					$('html').on('click touchstart', function (e) {
						var snsTarCont = $('.toggle-cont *, .toggle, .toggle *, .sns-share-cont *');
						if (!$(e.target).is(snsTarCont)) {
							$('.toggle').not('.toggle.add-check').not('.toggle.btn-like').not('.toggle.btn-gnb-bookmark').not('.toggle.circle-switch-box').removeClass('on'); // exception case
						}
					});
				}
			} else {
				$(this).removeClass('on');
			}
			return false;
		});

	$('.toggle-cont .btn-close').click(function(){
		$(this).closest('.toggle-cont').prev().removeClass('on');
	});
	// e : toggle
	
	//* s : tab
	tabCommon.click(function () {
		var _this = $(this).index();
		if (!$(this).hasClass('unbind')) {
			$(this).addClass('on').siblings().removeClass('on');
			$(this).closest('.tab-box').find('.tab-cont > .tab-item').hide().removeClass('active').eq(_this).fadeIn(350).addClass('active');
			if ($(this).parent().hasClass('sticky-menu-category')) {
				$(this).closest('.tab-box').find('.tab-cont-month > div').hide().removeClass('active').eq(_this).fadeIn(350).addClass('active');
				$(this).closest('.tab-box').find('.tab-cont-info > div').hide().removeClass('active').eq(_this).fadeIn(350).addClass('active');
			}
		}
	});

	tabView.click(function(){
		var _thisIdx = $(this).index();
		$('.tab-view-cont .tab-item').removeClass('active').eq(_thisIdx).addClass('active');
	});

	sltTabCommon.change(function () {
		var sltTabIdx = $(this).find('option:selected').index();
		$(this).closest('.slt-tab-box').find('.slt-tab-cont .slt-tab-item').hide().removeClass('active').eq(sltTabIdx).fadeIn(500).addClass('active');
	});
	//* e : tab

	// s : 190708 modify
	/* s : sticky menu */
	$('.btn-btm-sticky').click(function(){
		stkyAutoHgt();
		if ($('.sticky-menu-wrap').length > 0) {
			$('.wrap').hide();
			$('html, body').animate({ scrollTop: 0 }, 0);
			$('.sticky-menu-wrap').fadeIn(350);
		}
	});

	function stkyAutoHgt() {
		aniItem(function () {
			var stickyImgItem = $('.sticky-menu-cont.active .sticky-cont-sub.active').find('.post-list li .item-list'),
				stickyTar = $('.sticky-menu-cont .post-list li .item-list.none-img, .sticky-menu-cont .post-list .item-banner'),
				stickyImgAutoHgt = stickyImgItem.find('.img').closest('.item-list').outerHeight(true);
			stickyTar.css('height', stickyImgAutoHgt);
		});
	}
	// e : 190708 modify

	$('.sticky-menu-wrap .btn-close').click(function () {
		$('html, body').animate({scrollTop:0}, 0);
		$('.sticky-menu-wrap').fadeOut(350, function(){
			$('.wrap').fadeIn(350);
			autoHgt();
		});
	});

	$('.tab-cont-month select').change(function(){
		var optSltIdx = $(this).find('option:selected').index();
		$('.sticky-menu-cont.active .sticky-cont-sub').hide().removeClass('active').eq(optSltIdx).fadeIn(500).addClass('active');
	});
	/* e : sticky menu */

	//* s : select
	sltColor.each(function () {
		if ($(this).find('option[hidden]').is(':selected')) {
			$(this).css('color', '#aaa');
			$(this).find('option').not('[hidden]').css('color', '#000');
		}
		$(this).on('change', function () {
			if ($(this).find('option[hidden]').is(':selected')) {
				$(this).css('color', '#aaa');
			} else {
				$(this).css('color', '#000');
			}
		});
	});
	//* e : select

	// s : bottom banner 190718 modify
	function btmBannerHgt () {
		var bannerHgt = parseInt($('.cont-btm-banner').outerHeight());
		if ($('.cont-btm-banner').length > 0) {
			$('.content').css('padding-bottom', bannerHgt + 41);
		}
	
		if ($('.pregnancy-parenting-box').length > 0) {
			$('.content').css('padding-bottom', '0');
		}
	}
	
	$(document).ready(function(){
		btmBannerHgt ();
	})
	// e : bottom banner 190718 modify

	// s : scrollTop button
	$(window).scroll(function () {
		var headerHgt = $('.header-cont').outerHeight();
		if ($(this).scrollTop() > headerHgt) {
			$('.btn-screen-top, .btn-btm-sticky').fadeIn(300);
		} else {
			$('.btn-screen-top, .btn-btm-sticky').fadeOut(300);
		}
	});

	// $(window).scroll(function () {
	// 	stickyPosition();
	// });

	// function stickyPosition () {
	// 	if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
	// 		$('.btn-screen-top, .btn-btm-sticky').fadeIn(300);
	// 	} else {
	// 		$('.btn-screen-top, .btn-btm-sticky').fadeOut(300);
	// 	}
	// }

	$('.btn-screen-top').click(function(){
		$('html, body').animate({scrollTop:0}, 300);
	});
	// e : scrollTop button
	
	// s : layout container auto height
	function autoHgt () {
		var headerHgt = $('.header .header-cont').outerHeight(true);
		if (!$('.header-sub').length > 0) {
			$('.content').css({'height':wHgt - outerHgt,'padding-top': headerHgt});
			if (contSize < contHgt) {
				$('.content').css('height', 'auto');
			}
		} else {
			$('.content').css({'height':wHgt - outerHgt});
			$('.header-sub').css({'padding-top': headerHgt});
			if ($('.header-cont').length == 2) {
				$('.header-sub').css({'padding-top': headerHgt*2});
			}
			if (contSize < contHgt) {
				$('.content').css('height', 'auto');
			}
		}
	}
	autoHgt();

	$(window).resize(function(){
		autoHgt();
		imgAutoHgt();
		btmBannerHgt(); // 190718 modify
		stkyAutoHgt(); // 190708 modify
	});
	// e : layout container auto height

	// s : x-scroll auto width
	$('.x-scroll').each(function () {
		var xScrWid = $(this).children().length;
		$(this).css('width', $(this).children().eq(1).outerWidth(true) * xScrWid+5);
	});

	// s : accordion
	$('li.on').find('.cont-accordion').show();
	$('.accordion-box').click(function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on').find('.cont-accordion').slideUp(300);
			return;
		}
		$('.accordion-box').parent().removeClass('on');
		$('.cont-accordion').slideUp(300).fadeOut(300);
		$(this).parent().addClass('on').find('.cont-accordion').slideDown(300);
	});
	// e : accordion

	// s : tooltip
	$('.btn-tooltip, .text-tooltip').click(function(){
		if ($(this).hasClass('on')) {
			$(this).next().fadeIn(300);
			if ($('.btn-tooltip.on, .text-tooltip.on').length > 0) {
				$('html').click(function (e) {
					var snsTarItem = $('.tooltip-box-position *');
					if (!$(e.target).is(snsTarItem)) {
						$('.btn-tooltip, .text-tooltip').removeClass('on');
						$('.tooltip-box-position').fadeOut(300);
					}
				});
			}
		} else {
			$(this).next().fadeOut(300);
		}
		return false;
	});
	// e : tooltip

	//* s : storybook radio case
	$('.radio-tab').find('li').click(function () {
		var rdoCorIdx = $(this).index();
		// $('.preview-wrap > div').hide().eq(rdoCorIdx).show();
		$('.preview-wrap > div').eq(rdoCorIdx).addClass('on').siblings().removeClass('on');
	});
	//* e : storybook radio case

	// s : post-list image check 190710 add
	$('.post-list .img img').ready(function () {
		$('.post-list li').not('.none-img').find('.img img').each(function () {
			var imgHgt = $(this).height(),
			imgOuterHgt = $(this).parent().height();
			if (imgHgt < imgOuterHgt) {
				$(this).css({'height': '100%' });
			}
		});
	});
	// e : post-list image check

	// s : layerpopup
	popContHgt.css('height', wHgt);
	searchContHgt.css('height', wHgt - 52);
	$('.popup-open').click((function () {
		var returnTar;
		$('.tarLoop').remove();
		return function (e) {
			returnTar = $(e.target).closest('button'),
			wSize = $(window).width(),
			popupSync = $(this).attr('data-num');
			if (!$('.layerpopup-wrap' + '[data-num=' + popupSync + ']').hasClass('main-pop')) {
				$('.layerpopup-wrap' + '[data-num=' + popupSync + ']').fadeIn(350).css('display', 'block');
			}
			$('.layerpopup-wrap.main-pop' + '[data-num=' + popupSync + ']').css({ 'z-index': '10', 'display': 'table' }).animate({ opacity: '1' }, 350);
			$('.wrap').hide();
			$('html, body').animate({ scrollTop: 0 }, 0);
			if (wSize > 1024) {
				$('.layerpopup-wrap' + '[data-num=' + popupSync + ']').find('.layerpopup-align').attr('tabindex', '0');
			}
			aniItem(function () {
				$('.layerpopup-wrap' + '[data-num=' + popupSync + ']').find('.layerpopup-align').focus().append('<a href="#" class="tarLoop"></a>');
				$('.tarLoop').focusin(function () {
					$('.layerpopup-align').focus();
				});
			}, 0);
			$('.btn-popup-close, .layerpopup-wrap').click(function (e) {
				var tarItem = $('.layerpopup-cont, .layerpopup-body, .layerpopup-body *, .jp-type-playlist *');
				if (!$(e.target).is(tarItem)) {
					$('.layerpopup-align').removeAttr('tabindex');
					if (!$('.layerpopup-wrap' + '[data-num=' + popupSync + ']').hasClass('main-pop')) {
						$(this).closest('.layerpopup-wrap').fadeOut(350);
					}
					if (!$(this).closest('.layerpopup-wrap').hasClass('sub-pop')) {
						aniItem(function () {
							$('.wrap').show();
							autoHgt();
							$('.sticky-menu-wrap').css({'width':'auto'});
						}, 350);
					}
					aniItem(function () {
						if ($('.layerpopup-wrap' + '[data-num=' + popupSync + ']').hasClass('sub-pop')) {
							$('.sub-pop .tarLoop').remove();
						}
					}, 350);
					aniItem(function () {
						returnTar.focus();
					}, 0);
				}
			});
			$('.layerpopup-wrap.main-pop .btn-popup-close, .layerpopup-wrap.main-pop').not('.layerpopup-wrap.main-pop .btn-today-view').click(function (e) {
				var tarItem = $('.layerpopup-body, .layerpopup-body *');
				if (!$(e.target).is(tarItem)) {
					$('.layerpopup-align').removeAttr('tabindex');
					$(this).closest('.layerpopup-wrap.main-pop').stop().animate({ opacity: '0' }, 350, function () {
						$('.layerpopup-wrap.main-pop').css('z-index', '-1');
					});
				}
			});
		}
	})());
	// e : layerpopup

	// s : share cont close
	$('.sns-share-cont .btn-close').click(function () {
		$('.btn-gnb-share').removeClass('on');
	});
	// e : share cont close

	// s : post-list Auto Height
	function imgAutoHgt() {
		aniItem(function(){
			if ($('.content .post-list li .item-list').length > 0) {
				var imgAutoHgt = $('.content .post-list li .item-list').find('.img').closest('.item-list').outerHeight(true);
				$('.content .post-list li .item-list.none-img, .content .post-list .item-banner').css('height', imgAutoHgt);
			}
		});
	}
	imgAutoHgt();
	// e : post-list Auto Height

	if ($('.cont-list-pagination').length > 0) {
		$('.pagination-list').each(function(){
			var pageNum = $(this).find('li').length;
			$(this).addClass('col' + pageNum);
		});
	}
});