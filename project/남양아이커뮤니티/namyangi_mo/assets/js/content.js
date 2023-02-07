$(function () {
	// s : replay-edit
	var btnEdit = $('.reply-cont .btn-edit, .btn-re-reply'),
	btnCancel = $('.form-cont .btn-cancel');
	btnEdit.click(function () {
		if ($(this).hasClass('btn-edit')) {
			$(this).parents().siblings('.btm-cont').hide();
			if (!$(this).closest('.reply-cont').hasClass('active')) {
				$(this).closest('.reply-cont').addClass('active');
			}
		} else {
			if (!$(this).parents('.reply-cont').siblings('.reply-cont.re-reply').hasClass('active')) {
				$(this).parents('.reply-cont').siblings('.reply-cont.re-reply').addClass('active');
			}
		}
	});

	btnCancel.click(function () {
		$(this).closest('.reply-cont').removeClass('active');
		$(this).parents().siblings('.btm-cont').show();
	});
	// e : replay-edit

	// s : embryo music-box list
	$('.music-list-item .inp-chk-box').find('label').click(function(){
		var inpChkItem = $(this).closest('.inp-chk-box').find('.inp-chk');
		if (!inpChkItem.is(':checked')) {
			inpChkItem.prop('checked', true);
		} else {
			inpChkItem.prop('checked', false);
		}
	});

	var allChk = $('.music-list-item .all-chk label'),
	chkItem = $('.music-list-item .cont-list-item label');
	allChk.click(function () {
		var _this = $(this).closest('.music-list-item').find('.cont-list-item .inp-chk');
		if ($(this).prev().is(':checked')) {
			_this.prop('checked', true);
		} else {
			_this.prop('checked', false);
		}
	});

	chkItem.click(function () {
		var chkNum = $(this).parents('.music-list-item').find('.cont-list-item .inp-chk').length;
		if ($('.music-list-item .cont-list-item input:checked').length == chkNum) {
			allChk.prev().prop('checked', true);
		} else {
			allChk.prev().prop('checked', false);
		}
	});

	$('.music-list .swiper-slide, .music-list .swiper-pagination-bullet').on('touchend click', function(e){
		tarIdx = $('.swiper-pagination .swiper-pagination-bullet-active').index();
		setTimeout(function(){
			var musicListIdx = $('.swiper-pagination .swiper-pagination-bullet-active').index();
			if (tarIdx !== musicListIdx) {
				$('.music-list-cont .music-list-item').removeClass('active').hide().eq(musicListIdx).addClass('active').fadeIn(300);
			}
		});
	});
	// e : embryo music-box list

	// s : embryo 280
	$('.baby-month-wrap .inp-select-box select').change(function(){
		var optSltIdx = $(this).find('option:selected').index();
		$('.baby-month-cont .baby-month-item').hide().removeClass('active').eq(optSltIdx).fadeIn(500).addClass('active');
	});
	// e : embryo 280

	// s : cont-item active check
	function activeChkBox () {
		$('.music-list-cont .music-list-item').not('.music-list-item.active').hide();
		$('.baby-month-cont .baby-month-item').not('.baby-month-item.active').hide();
	}
	activeChkBox();
	// e : cont-item active check

	// s : circle press list
	var btnPress = $('.circle-press-list li > button'),
	pressCont = $('.press-list .cont-box');
	btnPress.click(function () {
		var pressIdx = $(this).parent().index();
		pressCont.hide().eq(pressIdx).fadeIn(500);
	});
	// e : circle press list

	// s : pop product search
	var btnPro = $('.layerpopup-cont.pro-search .hor-tab-box a');
	btnPro.click(function () {
		var proIdx = $(this).parent().index(),
		proCont = $(this).parents('.layerpopup-body').find('.product-box');
		proCont.removeClass('on').eq(proIdx).addClass('on');
	});
	// e : pop product search

	// s : membership benefit scroll
	$(window).scroll(function () {
		fixedScr();
	});

	function fixedScr() {
		var fixTab = $('.fixed-type'),
		fixCont = $('.benefit-wrap > div');
		if (fixTab.length > 0) {
			var scrPos = $(window).scrollTop();
			if (scrPos > 216) {
				fixTab.addClass('fixed');
			} else {
				fixTab.removeClass('fixed');
			}
			var scrNum1 = fixCont.eq(0).offset(),
			scrNum2 = fixCont.eq(1).offset(),
			scrNum3 = fixCont.eq(2).offset(),
			scrNum4 = fixCont.eq(3).offset(),
			scrNum5 = fixCont.eq(4).offset();
			if (scrPos > scrNum1.top - 160 && scrPos < scrNum2.top - 160) {
				fixTab.find('li').eq(0).addClass('on').siblings().removeClass('on');
			} else if (scrPos > scrNum2.top - 160 && scrPos < scrNum3.top - 160) {
				fixTab.find('li').eq(1).addClass('on').siblings().removeClass('on');
			} else if (scrPos > scrNum3.top - 160 && scrPos < scrNum4.top - 160) {
				fixTab.find('li').eq(2).addClass('on').siblings().removeClass('on');
			} else if (scrPos > scrNum4.top - 160 && scrPos < scrNum5.top - 160) {
				fixTab.find('li').eq(3).addClass('on').siblings().removeClass('on');
			} else if (scrPos > scrNum5.top - 160) {
				fixTab.find('li').eq(4).addClass('on').siblings().removeClass('on');
			}
		}
	}
	fixedScr();

	$('.fixed-type a').click(function () {
		var scrIdx = $(this).parent().index(),
		scrOffset = $('.benefit-wrap > div').eq(scrIdx).offset();
		$('html, body').stop().animate({ scrollTop: scrOffset.top - 155 }, 500);
		setTimeout(function () {
			$(this).parent().find('a').addClass('on').parent().siblings().find('a').removeClass('on');
		}, 500);
	});
	// e : membership benefit scroll

	// s : embryo cont auto height
	function embryoAutoHgt() {
		var embDetailHgt = $('.embryo-cont.active .embryo-cont-detail').outerHeight(),
		embryoHgt = embDetailHgt + 35;
		$('.embryo-cont.active').parent().css('height', embryoHgt);
	}
	embryoAutoHgt();

	$('.embryo .tab button').click(function () {
		embryoAutoHgt();
	});
	// e : embryo cont auto height

	// s : keyword option search box
	var btnSearch = $('.search-option-wrap .btn-type-search'),
	searchOptWrap = $('.search-option-wrap'),
	searchOptType = $('.search-option-type'),
	searchContHgt = $('.search-option-type').outerHeight();
	if (!$('.search-option-wrap').hasClass('on')) {
		searchOptType.css('height', '0');
	} else {
		searchOptType.css('height', searchContHgt);
	}
	btnSearch.click(function () {
		if (!$(searchOptWrap).hasClass('on')) {
			$(searchOptWrap).addClass('on');
			searchOptType.stop().animate({'height':searchContHgt}, 350);
			if ($('.search-option-wrap.on').length > 0) {
				$('html').click(function (e) {
					var searchTarItem = $('.search-option-type *');
					if (!$(e.target).is(searchTarItem)) {
						searchOptType.stop().animate({'height':'0'}, 350, function () {
							$(searchOptWrap).removeClass('on');
						});
					}
				});
			}
		} else {
			searchOptType.stop().animate({'height':'0'}, 350, function () {
				$(this).closest(searchOptWrap).removeClass('on');
			});
		}
		return false;
	});

	searchOptType.find('.type-list a').click(function () {
		var _thisTxt = $(this).text();
		btnSearch.find('span').text(_thisTxt);
		$('.recipe-categoty .sort-tit').text(_thisTxt);
		searchOptType.stop().animate({'height':'0'}, 350, function () {
			$(searchOptWrap).removeClass('on');
		});
	});
	// e : keyword option search box

	// s : select after index cont
	$('.slt-idx-tab').change(function () {
		var sltIdxContBox = $(this).closest('.cont-box'),
		optionIdx = $(this).find('option:selected').index(),
		sltOptinCont = $(this).closest(sltIdxContBox).find('.nu-table-outer > div');
		sltOptinCont.hide().eq(optionIdx).fadeIn(300);
	});
	// e : select after index cont

	// s : subject-check
	$('.subject-circle-box .inp-chk-box:first-child').find('input').click(function(){
		if (!$(this).is(':checked') == true) {
			$(this).closest('.subject-circle-box').removeClass('focus');
		} else {
			$(this).closest('.subject-circle-box').addClass('focus');
		}
	});
	// e : subject-check

	// s : view-option
	$('.view-option .btn-view').click(function () {
		if (!$(this).parent().hasClass('on')) {
			$(this).parent().addClass('on');
		} else {
			$(this).parent().removeClass('on');
		}
	});

	// s : 190710 modify
	$('.option-check li').find('a').click(function () {
		var _thisTxt = $(this).text();
		onlyNum = /[^0-9]/g;
		_thisTxt = _thisTxt.replace(onlyNum, '');
		$(this).parent().addClass('on').siblings().removeClass('on');
		$(this).closest('.view-option').removeClass('on').find('.btn-view strong').text(_thisTxt);
	});
	// e : 190710 modify
	// e : view-option

	// s : tooltip
	$('.tooltip-box-position .btn-close').click(function(){
		$(this).closest('.tooltip-box-position').fadeOut(300, function(){
			$(this).closest('.tooltip-box-position').prev().removeClass('on');
		});
	});
	// e : tooltip

	// s : smart-calendar-function
	$('.option-schedule-item ul li').click(function(){
		var _thisTxt = $(this).text(),
		_thisColor = $(this).css('background-color');
		$(this).closest('.all-schedule-box').find('.btn-all-schedule span').text(_thisTxt).removeClass('placeholder');
		$(this).closest('.all-schedule-box').find('.btn-all-schedule').removeClass('on');
		$('.btn-all-schedule').css('background-color', _thisColor);
	});

	$('.all-schedule-cont .circle-switch-box').click(function(){
		chkCarlendar();
	});

	function chkCarlendar() {
		if ($('.btn-my-schedule.on').length > 0) {
			$('.smart-my-schedule').fadeIn(200);
			$('.btn-my-schedule.on').text('ON');
		} else {
			$('.smart-my-schedule').fadeOut(200, function () {
				$('.smart-my-schedule').attr('style', 'display:none !important;');
				$('.btn-my-schedule').text('OFF');
			});
		}
		if ($('.btn-smart-schedule.on').length > 0) {
			$('.smart-schedule').fadeIn(200);
			$('.btn-smart-schedule.on').text('ON');
		} else {
			$('.smart-schedule').fadeOut(200, function () {
				$('.smart-schedule').attr('style', 'display:none !important;');
				$('.btn-smart-schedule').text('OFF');
			});
		}
	}
	chkCarlendar();

	$('.more-view-schedule .btn-more-schedule').click(function () {
		var smartScheduleItem = $('.more-view-schedule .smart-my-schedule, .more-view-schedule .smart-schedule');
		if ($(this).hasClass('on') > 0) {
			$(this).closest('.more-view-schedule').find('.more-schedule-area').css('z-index', '1').stop().animate({'opacity':'1'}, 200);
			smartScheduleItem.fadeIn(200);
			$('html').click(function (e) {
				var smartScheduleTar = $('.more-schedule-box *');
				if (!$(e.target).is(smartScheduleTar)) {
					$('.btn-more-schedule').removeClass('on');
					$('.more-schedule-area').stop().animate({'opacity':'0'}, 200, function(){
						$('.more-schedule-area').css('z-index', '-1');
					});
					smartScheduleItem.fadeOut(200);
				}
			});
		} else {
			$(this).closest('.more-view-schedule').find('.more-schedule-area').stop().animate({'opacity':'0'}, 200, function(){
				$('.more-schedule-area').css('z-index', '-1');
			});
			smartScheduleItem.fadeOut(200);
		}
	});
	// e : smart-calendar-function

	// s : alarm chk text
	var alarmChk = $('.schedule-detail-box .btn-alarm-chk');
	alarmChk.click(function(){
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
			$(this).find('span').text('ON');
		} else {
			$(this).removeClass('on');
			$(this).find('span').text('OFF');
		}
	});
	// e : alarm chk text

	// s : share cont close
	$('.sns-share-cont .btn-close').click(function () {
		$('.btn-share').removeClass('on');
	});
	// e : share cont close

	$('.reply-write .form-cont .count-input.ta textarea, .input-form-left .count-input.inp input').on('focusin focusout', function(e){
		if (e.type == 'focusin') {
			$(this).parent().addClass('focus');
		} else {
			$(this).parent().removeClass('focus');
		}
	});
});