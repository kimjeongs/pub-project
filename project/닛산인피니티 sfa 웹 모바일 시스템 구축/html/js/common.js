
function windowClick() {
	gnbReset();
	$(window).unbind('click touchstart', windowClick);
}

function headerAction() {
	var _gnb = $('.gnb-menu'),
		_viewBtn = $('#header .header-menu'),
		_closeBtn = _gnb.find('.gnb-close button'),
		dimmed = $('.dimmed-layer');

	_viewBtn.on('click', function(){
		_gnb.addClass('gnb-view');
		dimmed.css('display', 'block');
	});

	_closeBtn.on('click', function(){
		gnbClose();
	});
}

function gnbClose() {
	var _gnb = $('.gnb-menu'),
		dimmed = $('.dimmed-layer');

	
	_gnb.removeClass('gnb-view');
	dimmed.removeAttr('style');
}

function calendarSetting() {
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		//2019-03-25 수정 추가
		yearSuffix: '<span class="year-txt">년</span>', 
		changeMonth: true,
		changeYear: true,
		yearRange: "1950:2050"
	};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
}
//스크롤시 달력 닫히게
function datepickerClose(){
	if($('#ui-datepicker-div').css('display') == 'block'){
		$('.calendar-box .input-txt').datepicker('hide');
		$('.input-txt').blur(); //2019-03-25 수정 추가
		$(this).unbind('scroll',datepickerClose);
		console.log('b')
	}
}

//2019-03-26 수정
function calendarLayer () {
	$('.calendar-box .input-txt').datepicker();
	$('.calendar-box .input-txt').on('click', function(){
		var currentScroll = $("#container").scrollTop();
		console.log(currentScroll)
		$("#container").off("scroll").scroll(function () {
			console.log($("#container").scrollTop());
			if ($("#container").scrollTop() - 200 < currentScroll || $("#container").scrollTop() + 200 > currentScroll){
				$('.calendar-box .input-txt').datepicker('hide');
				$('.input-txt').blur(); //2019-03-25 수정 추가
				$("#container").off("scroll");
			}
		});
		$('#ui-datepicker-div').css('left', $(this).offset().left + 'px');
		
	});
}

function popupHeight() {
	var winH = $(window).height(),
		winW = $(window).width(),
		popupWrap = $('.layer-popup'),
		popH = popupWrap.outerHeight(true);

	popupWrap.css('height', '');
	if (winW > 640){
		if (popH >= winH){
			popupWrap.css('height', winH + 'px');
		}
	} else {
		popupWrap.css('height', '');
	}
}

function allLayerClose() {
	var layerWrap = $('.layer-popup');

	layerWrap.removeAttr('style');
}

$(document).ready(function () { //2019-03-12 수정
	headerAction();
	calendarSetting();

	if ($('.calendar-box .input-txt').length > 0){
		calendarLayer();
	}

	if ($('.layer-popup').length > 0){
		popupHeight();
	}
	tableHeight(); //2019-03-12 수정



	// 테이블 제목 고정 2019-03-13
	$('.table-scroll').addClass('tableFixhead');
	var $th = $('.tableFixhead').find('thead th');
	$('.tableFixhead').on('scroll', function () {
		
		$(this).find('thead th').css({
			'transform': 'translateY(' + (this.scrollTop) + 'px)',
			'position': 'relative',
			'zIndex':1
		});
		$(this).find('tbody th').css({
			'transform': 'translateX(' + (this.scrollLeft) + 'px)',
			'position': 'relative',
			'zIndex': 0
		});
		
	})	
	
	
	if($('#ui-datepicker-div').length){
		$(window).bind('scroll',datepickerClose);
		$('#container, #wrap').bind('scroll',datepickerClose);
	}

});


$(window).resize(function() {
	gnbClose();
	if ($('.layer-popup').length > 0){
		popupHeight();
		//allLayerClose();
	}
	tableHeight(); // 2019-03-12 추가
});

// 2019-03-12 추가
//테이블 높이 자동
function tableHeight(){
	var winH = $(window).height();
	winH = winH - 280;
	var tableScroll = $('.table-scroll');
	tableScroll.each(function(){
		var tableH = $(this).height();
		
		if(tableH >= winH){
			$(this).height(winH);
		}else {
			$(this).css({
				height : 'auto'
			});
		}
	})
	
}

