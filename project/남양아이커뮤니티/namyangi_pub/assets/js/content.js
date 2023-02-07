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
	var btnEmbryo = $('.embryo-music-list .btn-embryo-list'),
	embryoCont = $('.embryo-list-cont .cont-list-box');
	btnEmbryo.click(function () {
		var embryoIdx = $(this).parent().index();
		embryoCont.hide().eq(embryoIdx).fadeIn(500);
	});

	var allChk = $('.all-chk label'),
	chkItem = $('.cont-list-item label');
	allChk.click(function () {
		var _this = $(this).parents('.cont-list-box').find('.cont-list-item .inp-chk');
		if ($(this).prev().is(':checked')) {
			_this.prop('checked', true);
		} else {
			_this.prop('checked', false);
		}
	});
	$('.btn-embryo-list').click(function () {
		$('.embryo-music-box .inp-chk').prop('checked', false);
	});

	chkItem.click(function () {
		var chkNum = $(this).parents('.cont-list-item').find('.inp-chk').length;
		if ($('.cont-list-item input:checked').length == chkNum) {
			allChk.prev().prop('checked', true);
		} else {
			allChk.prev().prop('checked', false);
		}
	});
	// e : embryo music-box list

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
			if (scrPos > 480) {
				fixTab.addClass('fixed');
			} else {
				fixTab.removeClass('fixed');
			}
			var scrNum1 = fixCont.eq(0).offset(),
			scrNum2 = fixCont.eq(1).offset(),
			scrNum3 = fixCont.eq(2).offset(),
			scrNum4 = fixCont.eq(3).offset(),
			scrNum5 = fixCont.eq(4).offset();
			if (scrPos > scrNum1.top - 120 && scrPos < scrNum2.top - 120) {
				fixTab.find('li').eq(0).find('a').addClass('on').parent().siblings().find('a').removeClass('on');
			} else if (scrPos > scrNum2.top - 120 && scrPos < scrNum3.top - 120) {
				fixTab.find('li').eq(1).find('a').addClass('on').parent().siblings().find('a').removeClass('on');
			} else if (scrPos > scrNum3.top - 120 && scrPos < scrNum4.top - 120) {
				fixTab.find('li').eq(2).find('a').addClass('on').parent().siblings().find('a').removeClass('on');
			} else if (scrPos > scrNum4.top - 120 && scrPos < scrNum5.top - 120) {
				fixTab.find('li').eq(3).find('a').addClass('on').parent().siblings().find('a').removeClass('on');
			} else if (scrPos > scrNum5.top - 120) {
				fixTab.find('li').eq(4).find('a').addClass('on').parent().siblings().find('a').removeClass('on');
			}
		}
	}
	fixedScr();

	$('.fixed-type a').click(function () {
		var scrIdx = $(this).parent().index(),
		scrOffset = $('.benefit-wrap > div').eq(scrIdx).offset();
		$('html, body').stop().animate({ scrollTop: scrOffset.top - 95 }, 500);
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

	$('.option-check li').find('a').click(function () {
		var _thisTxt = $(this).text();
		$(this).parent().addClass('on').siblings().removeClass('on');
		$(this).closest('.view-option').removeClass('on').find('.btn-view span').text(_thisTxt);
	});
	// e : view-option

	// s : tooltip
	$('.tooltip-box-position .btn-close').click(function(){
		$(this).closest('.tooltip-box-position').fadeOut(300, function(){
			$(this).closest('.tooltip-box-position').prev().removeClass('on');
		});
	});
	// e : tooltip

	// s : more question
	// $('.more-qu .btn-more-qu').click(function(){
	// 	$('.more-qu').hide();
	// 	$('.reply-write-box').show();
	// });
	// e : more question

	// s : smart-calendar-function
	$('.option-schedule-item ul li').click(function(){
		var _thisTxt = $(this).text();
		$(this).closest('.all-schedule-box').find('.btn-all-schedule span').text(_thisTxt).removeClass('placeholder');
		$(this).closest('.all-schedule-box').find('.btn-all-schedule').removeClass('on');
	});

	$('.all-schedule-cont .circle-switch-box').click(function(){
		if ($('.btn-my-schedule.on').length > 0) {
			$('.smart-my-schedule').fadeIn(200);
		} else {
			$('.smart-my-schedule').fadeOut(200, function () {
				$('.smart-my-schedule').attr('style', 'display:none !important;');
			});
		}
		if ($('.btn-smart-schedule.on').length > 0) {
			$('.smart-schedule').fadeIn(200);
		} else {
			$('.smart-schedule').fadeOut(200, function () {
				$('.smart-schedule').attr('style', 'display:none !important;');
			});
		}
	});

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

	// s : share cont close
	$('.sns-share-cont .btn-close').click(function () {
		$('.btn-share').removeClass('on');
	});
	// e : share cont close

	// s : table-toggle-balloon
	$('.text-tooltip').click(function(){
		$(this).closest('td').find('.tooltip-box-position').fadeIn(350);
	});
	// e : table-toggle-balloon

	//s : label chk property
	$('.other-chk .inp-chk-box label').click(function () {
		if (!$(this).parent().find('input').attr('disabled') == true) {
			if (!$(this).parent().find('input').is(':checked')) {
				$(this).parent().find('input').prop('checked', true);
			} else {
				$(this).parent().find('input').prop('checked', false);
			}
		}
	});
	//e : label chk property
});