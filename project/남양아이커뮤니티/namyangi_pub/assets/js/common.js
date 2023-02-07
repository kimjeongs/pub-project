
$(function(){
	var topGnb = $('.top-gnb'),
	gnbMenu = $('.gnb-detail-menu'),
	gnbSub = $('.gnb-detail-sub'),
	gnbList = $('.gnb-list li'),
	focusListItem = $('.focus-list a, .focus-list button'),
	detailFocusItem = $('.detail-list-item a'),
	subDetailItem = $('.sub-detail-list div'),
	sltColor = $('.form-cont select'),
	wSize = $(window).width(),
	wHgt = $(window).height(),
	outerHgt = $('.header').outerHeight() + $('.footer').outerHeight(),
	contHgt = $('.container').outerHeight(),
	contSize = wHgt - outerHgt,
	tabCommon = $('.tab a, .tab button'),
	sltTabCommon = $('.slt-tab select'),
	tabView = $('.tab-view .tab a, .tab-view .tab button');
	
	// s : skip navigation
	if ($('.left-content').length > 0) {
		var skipDeTar = setTimeout,
		skipNavTar = $('.left-content');
		$('.wrap').prepend('<a href="#" class="skip-navi">컨텐츠 바로가기</a>');
		skipDeTar(function(){
			$('.skip-navi').on('focusin focusout', function(e){
				if (e.type == 'focusin') {
					$(this).click(function(){
						skipNavTar.attr('tabindex', '0');
						skipDeTar(function(){
							skipNavTar.focus();
						});
						skipNavTar.focusout(function(){
							$(this).removeAttr('tabindex');
						});
					});
				}
			});
		});
	}
	// e : skip navigation

	// s : tablet scale option
	$(document).ready(function(){
		setTimeout(function(){
			$('head').prepend('<meta name="viewport" content="width=768, initial-scale=0.6, user-scalable=0">');
			$('head').prepend('<meta name="viewport" content="width=1024, initial-scale=0.6, user-scalable=0">');
		}, 100);
	});
	// e : tablet scale option

	// s : gnb
	$('.gnb-detail-sub.active').removeAttr('style');
	gnbMenu.click(function () {
		if (!$(topGnb).hasClass('on')) {
			topGnb.addClass('on');
			if ($('.top-gnb.on').length > 0) {
				$('html').click(function (e) {
					var gnbTarItem = $('.gnb-detail-sub.active *');
					if (!$(e.target).is(gnbTarItem)) {
						topGnb.removeClass('on');
					}
				});
			}
		} else {
			topGnb.removeClass('on');
		}
		return false;
	});

	$('.sub-list ul li').mouseenter(function(){
		var subListIdx = $(this).index();
		gnbSub.addClass('active');
		$(this).addClass('hover').siblings().removeClass('hover');
		subDetailItem.css({'opacity':'0', 'z-index':'-1'}).eq(subListIdx).css({'opacity':'1', 'z-index':'5'});
	});

	gnbList.on('mouseenter mouseleave', function(e){
		if (e.type == 'mouseenter') {
			$(this).find('ul').css('z-index', '30').stop().fadeIn(300);
		} else {
			$(this).find('ul').css('z-index', '1').stop().fadeOut(300);
		}
	});

	focusListItem.click(function(){
		$(this).closest('.focus-list').find('li').removeClass('focus');
		$(this).closest('li').addClass('focus');
	});

	detailFocusItem.click(function(){
		$(this).closest('ul').find('dd').removeClass('focus');
		$(this).parent().addClass('focus');
	});

	$('.search-box a').click(function(){
		$(this).parent().addClass('on').find('.inp-search').focus();
		if ($('.search-box.on').length > 0) {
			$('html').click(function (e) {
				var snsTarItem = $('.search-box *');
				if (!$(e.target).is(snsTarItem)) {
					$('.search-box').removeClass('on').find('.inp-search').val('');
					$('.top-search-keywords').fadeOut(300);
				}
			});
		}
	});

	$('.toggle').click(function(){
		if (!$(this).hasClass('on')) {
			if ($(this).hasClass('btn-tooltip')) {
				$('.btn-tooltip').removeClass('on');
				$('.tooltip-box-position').fadeOut(300);
				$(this).addClass('on');
			} else {
				$(this).addClass('on');
			}
			if ($(this).hasClass('btn-more-schedule')) {
				$('.btn-more-schedule').removeClass('on');
				$('.more-schedule-area').css({'opacity':'0'});
				$(this).addClass('on');
			} else {
				$(this).addClass('on');
			}
			if ($('.btn-share.on').length > 0) {
				$('html').click(function (e) {
					var snsTarItem = $('.sns-share-cont *');
					if (!$(e.target).is(snsTarItem)) {
						$('.btn-share').removeClass('on');
					}
				});
			}
			if ($('.btn-birthday-tooltip.on').length > 0) {
				$('html').click(function (e) {
					var birthTar = $('.calendar-birthday-cont .tooltip-box-cont *');
					if (!$(e.target).is(birthTar)) {
						$('.btn-birthday-tooltip').removeClass('on');
					}
				});
			}
			if ($('.btn-all-schedule.on').length > 0) {
				$('html').click(function (e) {
					var btnAllChkTar = $('.option-schedule-item *');
					if (!$(e.target).is(btnAllChkTar)) {
						$('.btn-all-schedule').removeClass('on');
					}
				});
			}
			if ($(this).hasClass('btn-birthday-box')) {
				$('.btn-tooltip').removeClass('on');
				$('.tooltip-box-position').fadeOut(300);
				$(this).addClass('on');
			} else {
				$(this).addClass('on');
			}
		} else {
			$(this).removeClass('on');
		}
		return false;
	});
	// e : gnb

	//* s : tab
	tabCommon.click(function (e) {
		if (!$(this).is('.btn-individual-edit, .btn-children')) {
			if (!$(this).closest('li').hasClass('add-storybook')) {
				e.preventDefault();
				var tabIdx = $(this).parents('li').index(),
				_tabCnt = $(this).closest('.tab-area').find('> .tab-item-cont');
				if ($(this).closest('.tab').hasClass('tag-filter')) {
					$(this).closest('li').addClass('on').siblings().removeClass('on');
				} else {
					$(this).parents('.tab').find('a, button').removeClass('on');
					$(this).addClass('on');
				}
				if (!$(_tabCnt).hasClass('view-type')) {
					_tabCnt.find('> div').hide().eq(tabIdx).fadeIn(200);
				} else {
					_tabCnt.find('> div').removeClass('active').stop().animate({opacity:0}, 300).eq(tabIdx).addClass('active').stop().animate({opacity:1}, 300);
				}
			}
		}
	});

	// 190626 add
	tabView.click(function(){
		var viewIdx = $(this).parent().index();
		$('.tab-view-cont > div').removeClass('active').eq(viewIdx).addClass('active');
	});

	// 190702 add
	sltTabCommon.change(function () {
		var sltTabIdx = $(this).find('option:selected').index();
		$(this).closest('.slt-tab-box').find('.slt-tab-cont .slt-tab-item').hide().removeClass('active').eq(sltTabIdx).fadeIn(500).addClass('active');
	});
	//* e : tab

	//* s : storybook radio case
	$('.radio-tab').find('li').click(function(){
		var rdoCorIdx = $(this).index();
		// $('.preview-wrap > div').hide().eq(rdoCorIdx).show();
		$('.preview-wrap > div').eq(rdoCorIdx).addClass('on').siblings().removeClass('on');
	});
	//* e : storybook radio case

	//* s : select
	sltColor.each(function(){
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

	// s : scrollTop button
	$(window).scroll(function () {
		var headerHgt = $('.header').outerHeight();
		if ($(this).scrollTop() > headerHgt) {
			$('.btn-screen-top').fadeIn(300);
		} else {
			$('.btn-screen-top').fadeOut(300);
		}
	});

	$('.btn-screen-top').click(function(){
		$('html, body').animate({scrollTop:0}, 300);
	});
	// e : scrollTop button
	
	// s : layout container auto height
	function autoHgt () {
		$('.container').css('height', wHgt - outerHgt);
		if (contSize < contHgt) {
			$('.container').css('height', 'auto');
		}
	}
	autoHgt();

	$(window).resize(function(){
		autoHgt();
	});
	// e : layout container auto height

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

	// s : bottom sticky menu
	var stkyMain = $('.sticky-menu-wrap'),
	stkySub = $('.sticky-sub-wrap');
	$('.on .sticky-sub-wrap').css('height', '410px');
	$('.sticky-sub-wrap > .active .active').css('opacity', '1');
	$('.btn-sticky').click(function(){
		if (!$(this).closest(stkyMain).hasClass('on')) {
			$(this).closest(stkyMain).addClass('on').find(stkySub).stop().animate({'height':'410px'}, 350);
			$(this).find('.func-txt').text('CLOSE');
		} else {
			$(this).closest(stkyMain).removeClass('on').find(stkySub).stop().animate({'height':'0'}, 350);
			$(this).closest(stkyMain).find(stkySub).removeClass('active');
			$(this).find('.func-txt').text('OPEN');
		}
	});

	$('.sticky-menu-navi a').click(function(e){
		e.preventDefault();
		var stContIdx = $(this).closest('li').index();
		$(this).closest('.sticky-area').find('.sticky-sub-wrap > div').removeClass('active').stop().animate({opacity:0}, 300).eq(stContIdx).addClass('active').stop().animate({opacity:1}, 300, function(){
			$('.sticky-sub-wrap > .active .active').css('opacity', '1');
		});
	});

	$('.on .sticky-sub-item.active').stop().animate({opacity:1}, 300);
	$('.sticky-menu-wrap .btn-month').click(function(){
		var stkyBtnIdx = $(this).closest('li').index();
		$('.btn-sticky').find('.func-txt').text('CLOSE');
		$(this).addClass('on').closest('li').siblings().find('.btn-month').removeClass('on');
		$(this).closest(stkyMain).addClass('on').find('.sticky-sub-cont.active > div').removeClass('active').stop().animate({opacity:0}, 300).eq(stkyBtnIdx).addClass('active').stop().animate({opacity:1}, 300);
		if (!$(stkySub).hasClass('active')) {
			$(this).closest(stkyMain).addClass('on');
			$('.on .sticky-sub-wrap').stop().animate({'height':'410px'}, 350);
		}
	});

	$('.sticky-menu-wrap .btn-month, .btn-sticky').click(function(){
		if ($('.sticky-menu-wrap.on').length > 0) {
			$('html').click(function (e) {
				var stickyOuterClose  = $('.sticky-menu-wrap *');
				if (!$(e.target).is(stickyOuterClose)) {
					$(stkyMain).removeClass('on');
					$(stkySub).stop().animate({'height':'0'}, 350);
					$(this).find('.func-txt').text('OPEN');
				}
			});
		}
		return false;
	});
	// e : bottom sticky menu

	// s : post-list image check 190710 add
	$('.post-list .img img').ready(function () {
		$('.post-list li').not('.none-img').find('.img img').each(function(){
			var imgHgt = $(this).height(),
			imgOuterHgt = $(this).parent().height();
			if (imgHgt < imgOuterHgt) {
				$(this).css({'height':'100%'});
			}
		});
	});
	// e : post-list image check

	// s : top-search-box
	$('.top-gnb .search-box').find('.inp-search').on('focusin keyup', function(e){
		var srcItemCont = $(this).closest('.search-box').find('.search-keyword-cont > div');
		if (e.type == "focusin") {
			if ($(this).val() == 0) {
				srcItemCont.eq(0).fadeIn(300).siblings().fadeOut();
			} else {
				srcItemCont.eq(1).fadeIn(300).siblings().fadeOut();
			}
		} else {
			if ($(this).val() == 0) {
				srcItemCont.eq(0).fadeIn(300).siblings().fadeOut();
			} else {
				srcItemCont.eq(1).fadeIn(300).siblings().fadeOut();
			}
		}
	});

	$('.search-keyword-cont .close-btn').click(function(){
		$(this).closest('.search-keyword-cont').find('.top-search-keywords').fadeOut(300).closest('.search-box').removeClass('on');
	});
	// e : top-search-box

	// s : layerpopup
	$('.popup-open').click((function () {
		var returnTar;
		$('.pop-scroll-list, .pop-scroll-area, .n-scroll').append('<li><span class="empty"></span></li>');
		$('.tarLoop').remove();
		return function (e) {
			var bodyWid = $('body').width();
			returnTar = $(e.target).closest('button'),
			aniItem = setTimeout, wSize = $(window).width(),
			popupSync = $(this).attr('data-num');
			$('.layerpopup-wrap' + '[data-num=' + popupSync + ']').fadeIn(350).css('display', 'table');
			$('.layerpopup-wrap.main-pop' + '[data-num=' + popupSync + ']').css('z-index', '100').animate({ opacity: '1' }, 350);
			$('.layerpopup-wrap.jplayer' + '[data-num=' + popupSync + ']').css('z-index', '100').animate({opacity : '1'}, 350);
			$('body').css({'overflow':'hidden', 'width':bodyWid});
			$('.sticky-menu-wrap').css({'width': bodyWid });
			if (wSize > 1024) {
				$('.layerpopup-wrap' + '[data-num=' + popupSync + ']').find('.layerpopup-align').attr('tabindex', '0');
			}
			aniItem(function () {
				$('.layerpopup-wrap' + '[data-num=' + popupSync + ']').find('.layerpopup-align').focus().append('<a href="#" class="tarLoop"></a>');
				$('.tarLoop').focusin(function () {
					$('.layerpopup-align').focus();
				});
				$('.pop-scroll-list, .pop-scroll-area, .n-scroll').find('span.empty').parent().remove();
			}, 0);
			$('.layerpopup-wrap .btn-popup-close, .layerpopup-wrap').not('.layerpopup-wrap.main-pop').not('.layerpopup-wrap.main-pop .btn-popup-close').click(function (e) {
				var tarItem = $('.layerpopup-cont, .layerpopup-wrap.main-pop .btn-today-view, .layerpopup-body, .layerpopup-body *');
				if (!$(e.target).is(tarItem)) {
					$('.layerpopup-align').removeAttr('tabindex');
					$(this).closest('.layerpopup-wrap').fadeOut(350);
					if (!$(this).closest('.layerpopup-wrap').hasClass('sub-pop')) {
						aniItem(function () {
							$('body').css({'overflow':'auto', 'width':'100%'});
							$('.sticky-menu-wrap').css({'width': 'auto'});
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
					$('.layerpopup-wrap.jplayer').animate({opacity: '0'}, 0);
				}
			});

			$('.layerpopup-wrap.main-pop .btn-popup-close, .layerpopup-wrap.main-pop').not('.layerpopup-wrap.main-pop .btn-today-view').click(function (e) {
				var tarItem = $('.layerpopup-body, .layerpopup-body *');
				if (!$(e.target).is(tarItem)) {
					$('.layerpopup-align').removeAttr('tabindex');
					$(this).closest('.layerpopup-wrap.main-pop').stop().animate({opacity:'0'}, 350, function(){
						$('.layerpopup-wrap.main-pop').css('z-index', '-1');
					});
					$('body').css({ 'overflow': 'auto', 'width': '100%' });
				}
			});
		}
	})());
	// e : layerpopup
});