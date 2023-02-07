coursePop();
commonPop();
limitCheck();
area();
tutorial();
mapClick();


// course pop
function coursePop() {
	var btnCourse = $('.course-list>li>a'),
			closeCourse = $('.course-info-box>.btn-close'),
			coursePop = $('.course-info-box');

	btnCourse.on('click',function(e){
		e.preventDefault();
		var num = $(this).attr('data-open-pop');

		$('.course-list li').removeClass('active');
		$(this).parent('li').addClass('active');
		coursePop.removeClass('active');
		$('.course-info-box'+'[data-open-pop='+num+']').addClass('active');
		allClose();

		closeCourse.on('click',function() {
			coursePop.removeClass('active');
			btnCourse.parent('li').removeClass('active');
			allClose();
		});

		focusMove();
	})  
	
}

//지도 클릭
function mapClick(){
	$('.map').on('click',function(){
		focusMove()
	})
}

// 최초 포커스 이동
function focusMove(){
	var mapPos = $('.cont-area').offset().top ;
	$('body, html').stop().animate({
		'scrollTop':mapPos
	})
}


function commonPop() {
	var btnPop = $('.btn-pop');

	btnPop.on('click',function() {
		var num = $(this).attr('data-open-pop');
		
		btnPop.removeClass('active');
		$(this).addClass('active');
		$('.popup').removeClass('active');
		$('.popup'+'[data-open-pop='+num+']').addClass('active');

		if($(this).is('.sub')) {
			$(this).parents('.popup').addClass('active');
			$(this).parents('.popup').siblings('.btn-pop').addClass('active');
		} 
		if(!$(this).is('.info-pop-wrap > .btn-pop')) {
			$('.inner-dim').addClass('active');
		}
		if($(this).is('.control')) {
			$('.course-info-box').removeClass('active');
			$('.course-list>li').removeClass('active');
		}
	});

	$('.btn-close').on('click',function(){
		$('.popup').removeClass('active');
		$('.btn-pop').removeClass('active');
		$('.inner-dim').removeClass('active')

		if($(this).is('.sub')) {
			$(this).parents('.popup').addClass('active');
			$(this).parents('.popup').siblings('.btn-pop').addClass('active');
			$(this).closest('.popup').removeClass('active');
			$(this).closest('.popup').siblings('.btn-pop').removeClass('active');
		}
	})
}


//area
function area(){
	$('.area-list>li>a').on('click',function(e){
		e.preventDefault();
		$('.area-list>li').removeClass('active');
		$(this).parent('li').addClass('active');
		
		$('.course-info-box').removeClass('active');
		$('.course-list>li').removeClass('active');
		allClose();
	})
}


// limit check
function limitCheck() {
	var count = 2,
		courseCheckList = $('.course-check input[type="checkbox"]');

	courseCheckList.on('click',function() {
		var len = $('.course-check input:checked[type="checkbox"]').length;
	
		if(len > count) {
			$(this).prop('checked', false);
		}
	})
}


// all close
function allClose() {
	$('.popup').removeClass('active');
	$('.btn-pop').removeClass('active');
	$('.inner-dim').removeClass('active');
	$('.course-check input[type="checkbox"]').prop('checked', false);
}


// tutorial
function tutorial(){
	var naviBtn = $('.desc .navi li a');

	$('.tutorial-info').on('click',function(){
		var len = $('.navi li').length,
			current = $('.navi li.active').index();

		if(current == len-1) {
			$('.tutorial-wrap').css('display','none');
		}
		$('.active').next('li').addClass('active');
		$('.active').prev('.active').removeClass('active');
	})

	naviBtn.on('click',function(e){
		e.preventDefault();
		var i = $(this).parent('li').index();

		$('.desc .navi li').removeClass('active');
		$(this).parent('li').addClass('active');

		$('.tutorial-info .step li').removeClass('active');
		$('.tutorial-info .step li').eq(i).addClass('active');
	})
}