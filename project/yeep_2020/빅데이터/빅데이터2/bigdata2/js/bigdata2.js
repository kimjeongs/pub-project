parentTab();
subTab();
popup();
tutorial();
showMap();
startupPlan();
imgArea();

// tab
function parentTab() {
	var tabBtn = $('.parent-tab .tab-menu > li');
	
	tabBtn.on('click',function() {
		var num = $(this).attr('data-area');

		$('.default-cont').addClass('move');
		$('.city-cont').show();
		tabBtn.removeClass('active');
		$(this).addClass('active');
		focusMove();
		mapDefault();
		activeArea(num);
	})
}

function subTab() {
	var tabBtn = $('.left-menu .tab-menu > li > a');

	tabBtn.on('click',function(e) {
		e.preventDefault();
		var i = $(this).parent('li').index(),
			subTab = $('.sub-tab-wrap');
		
		focusMove();
		$('.default-cont').hide();
		$('.left-menu .btn-map').show();
		$('.menu-tit-wrap .info-txt').hide();
		$('.left-menu .tab-menu li').removeClass('active');
		$(this).parent('li').addClass('active');
		subTab.show();
		subTab.find('.tab-cont > li').removeClass('active');
		subTab.find('.tab-cont > li').eq(i).addClass('active');
		$('.cont-wrap').addClass('auto');
	})
}

// show map
 function showMap() {
	 $('.left-menu .btn-map').on('click',function(){
		$(this).hide();
		mapDefault();
	 })
 }

 function mapDefault() {
	$('.default-cont').show();
	$('.left-menu .tab-menu > li').removeClass('active');
	$('.sub-tab-wrap').hide();
	$('.cont-wrap').removeClass('auto');
 }

//map
function imgArea() {
	$('.image-map area').on('mouseover mouseleave',function(e) {
		var num = $(this).attr('data-area');
		
		if(e.type == 'mouseover') {
			$('.area-cont li'+'[data-area='+num+']').addClass('on');
		} else {
			$('.area-cont > li').removeClass('on');
		}
	})

	$('.image-map area').on('click',function(e) {
		e.preventDefault();
		var num = $(this).attr('data-area');

		$('.parent-tab .tab-menu > li').removeClass('active');
		$('.parent-tab .tab-menu > li'+'[data-area='+num+']').addClass('active');
		$('.city-cont').show();
		$('.default-cont').addClass('move');
		activeArea(num);

	})

	// $('.area-cont .name').on('mouseover mouseleave',function(e) {
	// 	var num = $(this).parent('li').attr('data-area');
		
	// 	if(e.type == 'mouseover') {
	// 		$('.area-cont li'+'[data-area='+num+']').addClass('on');
	// 	} else {
	// 		$('.area-cont > li').removeClass('on');
	// 	}
	// })

	// $('.area-cont .name').on('click',function() {
	// 	var num = $(this).parent('li').attr('data-area');

	// 	$('.parent-tab .tab-menu > li').removeClass('active');
	// 	$('.parent-tab .tab-menu > li'+'[data-area='+num+']').addClass('active');
	// 	$('.city-cont').show();
	// 	$('.default-cont').addClass('move');
	// 	activeArea(num);
	// })
}

function activeArea(num) {
	var areaName = $('.parent-tab .tab-menu > li'+'[data-area='+num+']').text();

	$('.left-menu .current .txt strong').text(areaName);
	$('.area-cont > li').removeClass('active');
	$('.area-cont > li'+'[data-area='+num+']').addClass('active');
	$('.area-cont .name').hide();
	$('.area-cont > li'+'[data-area='+num+']').find('.name').show();
	$('.menu-tit-wrap .info-txt').show();
	$('.left-menu .btn-map').hide();
}

// startup plan
function startupPlan() {
	$('.startup-plan .list-wrap .list > li').on('click', function() {
		var i = $(this).index();

		$(this).parents('.popup').find('.btn-pop-green').removeClass('disabled')
		
		$('.startup-plan .list-wrap .list > li').removeClass('active')
		$(this).addClass('active');

		$('.startup-plan .default-img').hide();
		$('.startup-plan .list-cont > ul > li').removeClass('active');
		$('.startup-plan .list-cont > ul > li').eq(i).addClass('active');
	})
}

//scroll
function focusMove(){
	var mapPos = $('.parent-tab').offset().top,
	    currentPos = $(document).scrollTop();

	if(currentPos < mapPos) {
		$('body, html').stop().animate({
			'scrollTop':mapPos
		})
	}
	
}

// popup
function popup() {
    var openpopup = $('.btn-pop'),
        closepopup = $('.popup .btn-close'),
		popup = $('.popup'),
		dim = $('.dim');
    
	openpopup.on('click',function() {
		var num = $(this).attr('data-num');
		
		$('.popup'+'[data-num='+num+']').addClass('active');
		dim.addClass('active');
		// $('body, html').css('overflow','hidden');
	});

	closepopup.on('click',function() {
		if ($(this).parents(popup).hasClass('active')) {
			$(this).parents(popup).removeClass('active');
			dim.removeClass('active');
			// $('body, html').css('overflow','visible');
		}
	});

	dim.on('click',function() {
		if(dim.hasClass('active') && popup.hasClass('active')) {
			$(this).removeClass('active');
			popup.removeClass('active');
			$('body, html').css('overflow','visible');
		}
	})
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
		$('.tutorial-wrap li.active').next('li').addClass('active');
		$('.tutorial-wrap li.active').prev('.active').removeClass('active');
		changeImg(current)

	})

	naviBtn.on('click',function(e){
		e.preventDefault();
		var i = $(this).parent('li').index();

		$('.desc .navi li').removeClass('active');
		$(this).parent('li').addClass('active');

		$('.tutorial-info .step li').removeClass('active');
		$('.tutorial-info .step li').eq(i).addClass('active');
		changeImg(i-1)

	})

	function changeImg(i) {
		if(i > -1) {
			$('.tutorial-wrap .img-box img').attr('src','images/bigdata2/img_tutorial02.jpg');
		} else {
			$('.tutorial-wrap .img-box img').attr('src','images/bigdata2/img_tutorial01.jpg');
		}
	}
}


