parentTab();
subTab();
popup();
tutorial();
kAcco();


function parentTab() {
	var tabBtn = $('.parent-tab .tab-menu > li');
	tabBtn.each(function(index){
		$(this).data('city-cont > li', $('.city-cont > li').eq(index))
	})
	tabBtn.on('click',function() {
		focusMove();
		tabBtn.removeClass('active');
		$('.city-cont > li').removeClass('active');
		$(this).addClass('active').data('city-cont > li').addClass('active');
	})
}

function subTab() {
	var tabBtn = $('.city-cont .tab-menu > li > a');

	tabBtn.on('click',function(e) {
		e.preventDefault();
		var i = $(this).parent('li').index(),
			subTab = $(this).parents('.left-menu').next();

		focusMove();
		$(this).parents('.tab-menu').children('li').removeClass('active');
		$(this).parent('li').addClass('checked active');
		subTab.find('.default-txt').hide();
		subTab.find('.tab-cont > li').removeClass('active');
		subTab.find('.tab-cont > li').eq(i).addClass('active');
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
		$('body, html').css('overflow','hidden');
	});

	closepopup.on('click',function() {
		if ($(this).parents(popup).hasClass('active')) {
			$(this).parents(popup).removeClass('active');
			dim.removeClass('active');
			$('body, html').css('overflow','visible');
		}
	});

	dim.on('click',function() {
		if(dim.hasClass('active') && popup.hasClass('active')) {
			$(this).removeClass('active');
			popup.removeClass('active');
		}
	})
}

//accordion
function kAcco() {
	var accoBtn = $('.k-list-wrap .btn-acco');
	accoBtn.on('click',function() {
		$(this).parent('li').toggleClass('active');
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