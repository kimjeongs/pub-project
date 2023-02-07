function headerClose() {
    $('.gnb > ul > li').removeClass('on');
	$('#dim').removeClass('on');
}
function etcClose() {
	$('.character-type .btn').removeClass('open');
    $('.character-list').slideUp(500);
	$('.character-type').css('z-index','99');
	$('#dim').css('top','0');
}
function gnbOpen() {
	 var closebind = function(){
		$('.gnb > ul > li').removeClass('on');
		$(window).unbind('click touchstart', closebind);
	 }
	$('.gnb > ul > li > .depth1').on('click', function(e){
        e.stopPropagation();
        e.preventDefault();
        var _this = $(this);

       if(!_this.parent().is('.on')){
            headerClose();
            _this.parent().addClass('on').siblings().removeClass('on');
            $(window).bind('click touchstart', closebind);
        }else{
            headerClose();
            _this.parent().removeClass('on');
        }
    });
	$('#gnb > ul > li > a').on('focusin', function(e){
        $('.submenu').css('display', 'block');
        $('#container').attr('tabindex',0)
    });
};

function gnbClickAction() {
	var headerHeight = $("#header").height();
	$('.submenu > ul > li > a').bind("click", function(e) {
		var target = $('.cont-tab-wrap');
		var scrollToPosition = $(target).offset().top - headerHeight+140;		
		$('html').animate({'scrollTop': scrollToPosition }, 500, function(target){
		});		
		e.preventDefault();
	});
};

function hdSearchAction() {
	var hdSrchBtn = $('.btn-search-open');
	hdSrchBtn.on('click', function(e) {
		e.preventDefault();
		if (hdSrchBtn.hasClass('close')){
			hdSrchBtn.removeClass('close').attr('title','검색하기');
			$('.gnb-search-wrap').slideUp(500);
			$('#dim').removeClass('on');
		}else{
			hdSrchBtn.addClass('close').attr('title','검색 닫기');
			$('.gnb-search-wrap').slideDown(500);
			$('#dim').addClass('on');
			etcClose();
		}
	});
};

function tabAction() {
    var tabBtn = $(".cont-tab-wrap>ul>li");
    tabBtn.on('click', function(e) {
        e.preventDefault();
       $(this).addClass('on').siblings().removeClass('on'); 
    });
};

function aroTabAction() {
    var tabBtn = $(".type-info-bx>.type-list>ul>li");
    tabBtn.on('click', function(e) {
        e.preventDefault();
       $(this).addClass('on').siblings().removeClass('on'); 
    });
};

function familySiteList() {
	var famTitle = $('.family-site .fam-title');
	famTitle.on('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		if (famTitle.hasClass('active')){
			famTitle.removeClass('active').attr('title','관련사이트 보기');
			$(window).unbind('click touchstart', windowClick);
		}else{
			famTitle.addClass('active').attr('title','관련사이트 닫기');
			$(window).bind('click touchstart', windowClick);
		}
	});
};

function footerReset(){
	var famTitle = $('.family-site .fam-title');

	famTitle.removeClass('active').attr('title','관련사이트 보기');
}

function likeBox() {
    var btnLike = $('.like-cont .like');
    btnLike.on('click', function (e) {
        e.preventDefault();
        if (btnLike.hasClass('on')){
            btnLike.removeClass('on');
        }else {
            btnLike.addClass('on');
        }
    });
}


function accordion(){
    var btnAcco = $('.accordion .btn-accordion');
    
    btnAcco.on('click',function(e){
        e.preventDefault();

        if ($(this).hasClass('on')) {
            $(this).parent().removeClass('up');
            $(this).removeClass('on').children().text('간략히');
        }else {
            $(this).parent().addClass('up');
            $(this).addClass('on').children().text('모두보기');
        }
    });
}

function layerPop() {
    var popBtn = $('.open-pop');
    var closePop = $('.layer-pop .btn-close');
    
    popBtn.on('click', function (e) {
        e.preventDefault();

        var _this = $(this),
            _thisHref = _this.attr('href');

        console.log(_thisHref);
        $('body').css('overflow', 'hidden');
        if (_thisHref && _thisHref != '#'){
            $(_thisHref).css('display', 'block');
        } else {
            $('.layer-pop').css('display', 'block');
        }
        $('#dim').addClass('on').css({
            'background-color': 'rgba(0,0,0,0.75)',
            'zIndex': 1000
        });
    });

    closePop.on('click', function (e) {
        e.preventDefault();
        $('body').css('overflow', 'visible');
        $('.layer-pop').css('display', 'none');
        $('#dim').removeClass('on').css({
            'background-color': 'rgba(0,0,0,0.25)',
            'zIndex': 100
        });
    });

    /*$('#dim').on('click', function (e) {
        e.preventDefault();
        $('body').css('overflow', 'visible');
        $('.layer-pop').css('display', 'none');
        $(this).removeClass('on').css({
            'background-color': 'rgba(0,0,0,0.25)',
            'zIndex': 100
        });
    });*/
}

function charType(){
    var openBtn = $('.character-type .btn');

    openBtn.on('click',function(e){
        e.preventDefault();
        var slideOpen = $(this).hasClass('open'),
			_thisP = $(this).parents('.job-info');

        if (slideOpen) {
			//$('.character-list').slideUp(500);
			$('.character-type .inner').stop().animate({'height' : '68px'}, 500, function(){
				_thisP.removeClass('job-list-open');
			});
            $(this).removeClass('open').text('열기');
            //$('#dim').removeClass('on').css('top','0');
			//$('.character-type').css('z-index','99');
        }else {
			//$('.character-list').slideDown(500);
			$('.character-type .inner').stop().animate({'height' : '425px'}, 500);
			_thisP.addClass('job-list-open');
            $(this).addClass('open').text('닫기');
            //$('#dim').addClass('on').css('top','555px');
			//$('.character-type').css('z-index','500');
        }

        //아래 딤처리
        /*$(window).on('scroll', function () {
            var scroll = $(this).scrollTop();
            if (scroll >= 500){
                $('#dim').css('top','0');
            }else {
                $('#dim').css('top','555px');
            }
        })*/
    });
}
function tabBox(){
    var tabBtn = $('.tab-menu li');
    var tabCont = $('.tab-cont > div');
    tabBtn.on('click',function(e){
        e.preventDefault();

        var i = $(this).index();
        tabBtn.removeClass('on');
        $(this).addClass('on');
        tabCont.removeClass('on');
        tabCont.eq(i).addClass('on');
    })
}

function cardSelectBtn(){
	var cardSelectWrap = $('.course-card-fixed'),
		toggleBtn = cardSelectWrap.find('.fixed-toggle'),
		cardCont = cardSelectWrap.find('.card-fixed-cont');

		toggleBtn.on('click', function(){
			var _this = $(this);

			if (_this.hasClass('toggle-hidden')){
				_this.removeClass('toggle-hidden').find('> span').text('접기');
				cardCont.slideDown();
			} else {
				_this.addClass('toggle-hidden').find('> span').text('펼치기');
				cardCont.slideUp();
			}
		});
}

function cardList(cardListEvent){
    var cardListWrap = $('.course-card-list-wrap > .course-card-list'),
		cardLi = cardListWrap.find(' > li'),
		liH = cardLi.outerHeight(true),
		//liW = cardLi.outerWidth(true),
		liW = 204,
		lineNum = 0,
		liT = 0,
		liL = 0;

	if (cardLi.length % 6 == 0){
		lineNum = cardLi.length / 6;
	} else {
		lineNum = parseInt(cardLi.length / 6) + 1;
	}

	cardListWrap.css('height', liH * lineNum);

	cardLi.each(function(i){
		var _this = $(this),
			_thisLine = parseInt(i / 6),
			liT = _thisLine * liH,
			liL = (i - (_thisLine * 6)) * liW;

		_this.css({
			'top' : liT + 'px',
			'left' : liL + 'px'
		});
	});
	if ($(window).height() - $('.course-card-fixed').outerHeight(true) > $('.course-card-list').offset().top + 160 && cardListEvent){
		cardLi.each(function(i){
			var _this = $(this);

			_this.delay(100*i).queue(function(){
				$(this).css({
					'transform' : 'rotateY(-360deg)'
				});
				$(this).addClass('card-list-view');
			});
		});
		cardListEvent = false;
		return cardListEvent;
	}
	$(window).scroll(function() {
		if ($(window).scrollTop() + $(window).height() - $('.course-card-fixed').outerHeight(true) > $('.course-card-list').offset().top + 160 && cardListEvent) {
			cardLi.each(function(i){
				var _this = $(this);

				_this.delay(100*i).queue(function(){
					$(this).css({
						'transform' : 'rotateY(-360deg)'
					});
					$(this).addClass('card-list-view');
				});
			});
			cardListEvent = false;
			return cardListEvent;
		}
	});
}

function myCourseQna(){
	var courseWrap = $('.my-course-wrap'),
		qnaBox = courseWrap.find('.question .qna-box'),
		qnaCont = qnaBox.find('.txt-box'),
		qnaToggle = qnaBox.find('.btn-view-hidden');

	qnaToggle.on('click', function(){
		var _this = $(this);

		if (_this.hasClass('qna-txt-hidden')){
			qnaCont.slideDown();
			_this.removeClass('qna-txt-hidden');
			_this.text('내가 쓴 내용 닫기');
		} else {
			qnaCont.slideUp();
			_this.addClass('qna-txt-hidden');
			_this.text('내가 쓴 내용 보기');
		}
	});
}

function starScore(){
	var scoreWrap = $('.star-score'),
		scoreItem = scoreWrap.find('li'),
		nowIndex = 0;

	scoreItem.each(function(index){
		if ($(this).hasClass('on')){
			nowIndex = index;
		}
	});

	scoreItem.eq(nowIndex).find('span').css('display', 'block');

	scoreItem.hover(
		function(){
			var _this = $(this),
				_prev = _this.prevAll(),
				_next = _this.nextAll();

			scoreWrap.addClass('star-hover');
			_this.addClass('hover').siblings().removeClass('hover unhover');
			_prev.addClass('hover');
			_next.addClass('unhover');
		},
		function(){
			scoreItem.removeClass('hover unhover');
			scoreWrap.removeClass('star-hover');
		}
	);

	scoreItem.on('click', function(){
		var _this = $(this),
			_prev = _this.prevAll(),
			_next = _this.nextAll();

		_this.addClass('on');
		_prev.addClass('on');
		_next.removeClass('on');
		scoreItem.find('span').removeAttr('style');
		scoreItem.eq(_this.index()).find('span').css('display', 'block');
	});
}

function titMenu(){
	var titMenuWrap = $('.cont-exploration'),
		menuBtn = titMenuWrap.find('.exploration-top-tit > .btn');

	menuBtn.on('click', function(e){
		e.preventDefault();

		var _this = $(this),
			_thisP = _this.parent();

		if (_thisP.hasClass('menu-on')){
			_thisP.removeClass('menu-on');
			_this.find('img').attr('alt', '열기');
		} else {
			_thisP.addClass('menu-on');
			_this.find('img').attr('alt', '닫기');
		}
	});
}

function eptDim(){
	var eDim = $('.ept-dimmed .exploration-cont');

	eDim.one('click', function(){
		$(this).parent().removeClass('ept-dimmed');
	});
}

function futureCard(){
	var cardWrap = $('.ft-job-card'),
		cardli = cardWrap.find(' > li'),
		allBtn = cardWrap.parent().find('.all-card > a'),
		allCheck = false;

	cardli.on('click', function(){
		if ($(this).hasClass('selected')){
			$(this).removeClass('selected');
		} else {
			$(this).addClass('selected');
		}
	});

	allBtn.on('click', function(e){
		e.preventDefault();

		cardli.each(function(){
			if($(this).hasClass('selected')){
				allCheck = true;
			} else {
				allCheck = false;
				return false;
			}
		});

		if (allCheck){
			cardli.removeClass('selected');
		} else {
			cardli.addClass('selected');
		}
	});
}

function futureJob(oneD, twoD){
	var jtWrap = $('.future-job-wrap'),
		jtTab = jtWrap.find('.future-job-tab'),
		oneLi = jtWrap.find('.job-tab-1dept'),
		oneTit = oneLi.find('.dept1-tit'),
		twoLi = jtWrap.find('.dept2-list > li'),
		jtBtn = jtWrap.find('.future-job-page-btn'),
		nextBtn = jtBtn.find('.next'),
		prevBtn = jtWrap.find('.prev'),
		eventTime = 300,
		thisOneIndex = 0;

	if (!oneD && !twoD){
		var oneD = 0,
			twoD = 0;
	}

	if (oneD == oneLi.length - 1 && twoD == oneLi.eq(oneLi.length - 1).find('.dept2-list > li').length - 1){
		nextBtn.addClass('disabled');
		prevBtn.removeClass('disabled');
	} else if (oneD == 0 && twoD == 0){
		nextBtn.removeClass('disabled');
		prevBtn.addClass('disabled');
	} else {
		nextBtn.removeClass('disabled');
		prevBtn.removeClass('disabled');
	}

	var _thisP = oneLi.eq(oneD);

	_thisP.addClass('dept1-view').find('.dept2-list').stop().animate({
		'width' : '300px'
	}, eventTime).find(' > li').eq(twoD).addClass('selected');

	_thisP.siblings().find('.dept2-list').stop().animate({
		'width' : '0'
	}, eventTime, function(){
		_thisP.siblings().removeClass('dept1-view dept1-bg');
	});

	twoLi.removeClass('selected');
	_thisP.find('.dept2-list > li').eq(twoD).addClass('selected');

	futureJobCont(oneD, twoD);

	thisOneIndex = oneD;

	nextBtn.on('click', function(e){
		e.preventDefault();
		if ($(this).hasClass('disabled')){
			return false;
		}

		var _thisP = oneLi.eq(oneD);

		prevBtn.removeClass('disabled');

		if (twoD == oneLi.eq(oneD).find('.dept2-list > li').length - 1){
			oneD = oneD + 1;
			twoD = 0;

			_thisP = oneLi.eq(oneD)
		} else {
			twoD = twoD + 1;
		}

		if (oneD == oneLi.length - 1 && twoD == oneLi.eq(oneLi.length - 1).find('.dept2-list > li').length - 1){
			nextBtn.addClass('disabled');
		}

		_thisP.addClass('dept1-view').find('.dept2-list').stop().animate({
			'width' : '300px'
		}, eventTime);

		_thisP.siblings().find('.dept2-list').stop().animate({
			'width' : '0'
		}, eventTime, function(){
			_thisP.siblings().removeClass('dept1-view dept1-bg');
		});

		twoLi.removeClass('selected');
		if (oneD == 2 && _thisP.find('.dept2-list > li').eq(twoD).hasClass('no-text')){
			_thisP.find('.dept2-list > li').eq(_thisP.find('.dept2-list > li').eq(twoD).prevAll().not('.no-text').index()).addClass('selected');
		} else {
			_thisP.find('.dept2-list > li').eq(twoD).addClass('selected');
		}

		thisOneIndex = oneD;

		futureJobCont(oneD, twoD);

		$('html, body').stop().animate({
			scrollTop : jtTab.offset().top
		}, eventTime);
	});

	prevBtn.on('click', function(e){
		e.preventDefault();
		if ($(this).hasClass('disabled')){
			return false;
		}

		var _thisP = oneLi.eq(oneD);

		nextBtn.removeClass('disabled');

		if (twoD == 0){
			oneD = oneD - 1;
			twoD = oneLi.eq(oneD).find('.dept2-list > li').length - 1;

			_thisP = oneLi.eq(oneD)
		} else {
			twoD = twoD - 1;
		}

		if (oneD == 0 && twoD == 0){
			prevBtn.addClass('disabled');
		}

		_thisP.addClass('dept1-view').find('.dept2-list').stop().animate({
			'width' : '300px'
		}, eventTime);

		_thisP.siblings().find('.dept2-list').stop().animate({
			'width' : '0'
		}, eventTime, function(){
			_thisP.siblings().removeClass('dept1-view dept1-bg');
		});

		twoLi.removeClass('selected');
		if (oneD == 2 && _thisP.find('.dept2-list > li').eq(twoD).hasClass('no-text')){
			_thisP.find('.dept2-list > li').eq(_thisP.find('.dept2-list > li').eq(twoD).prevAll().not('.no-text').index()).addClass('selected');
		} else {
			_thisP.find('.dept2-list > li').eq(twoD).addClass('selected');
		}

		thisOneIndex = oneD;

		futureJobCont(oneD, twoD);

		$('html, body').stop().animate({
			scrollTop : jtTab.offset().top
		}, eventTime);
	});

	oneTit.on('click', function(){
		var _this = $(this),
			_thisP = _this.parent();

		_thisP.addClass('dept1-view').find('.dept2-list').stop().animate({
			'width' : '300px'
		}, eventTime);

		/*_thisP.siblings().addClass('dept1-bg').find('.dept2-list').stop().animate({
			'width' : '0'
		}, eventTime, function(){
			_thisP.siblings().removeClass('dept1-view dept1-bg');
		});*/ /* 배경도 서서히 */

		_thisP.siblings().find('.dept2-list').stop().animate({
			'width' : '0'
		}, eventTime, function(){
			_thisP.siblings().removeClass('dept1-view dept1-bg');
		});

		thisOneIndex = _thisP.index();
		twoLi.removeClass('selected');
		_thisP.find('.dept2-list > li').eq(0).addClass('selected');

		oneD = _thisP.index();
		twoD = _thisP.find('.dept2-list > li').eq(0).index();

		if (oneD == oneLi.length - 1 && twoD == oneLi.eq(oneLi.length - 1).find('.dept2-list > li').length - 1){
			nextBtn.addClass('disabled');
			prevBtn.removeClass('disabled');
		} else if (oneD == 0 && twoD == 0){
			nextBtn.removeClass('disabled');
			prevBtn.addClass('disabled');
		} else {
			nextBtn.removeClass('disabled');
			prevBtn.removeClass('disabled');
		}

		futureJobCont(oneD, twoD);
	});

	oneLi.on('mouseenter', function(){
		var _this = $(this);

		twoLi.on('click', function(){
			var _this = $(this),
				_thisP = _this.parents('.job-tab-1dept');

			twoLi.removeClass('selected');
			_this.addClass('selected');

			_thisP.addClass('dept1-view');

			thisOneIndex = _thisP.index();

			oneD = _thisP.index();
			twoD = _this.index();

			if (oneD == oneLi.length - 1 && twoD == oneLi.eq(oneLi.length - 1).find('.dept2-list > li').length - 1){
				nextBtn.addClass('disabled');
				prevBtn.removeClass('disabled');
			} else if (oneD == 0 && twoD == 0){
				nextBtn.removeClass('disabled');
				prevBtn.addClass('disabled');
			} else {
				nextBtn.removeClass('disabled');
				prevBtn.removeClass('disabled');
			}

			futureJobCont(oneD, twoD);

			return false;
		});

		_this.addClass('dept1-view').find('.dept2-list').stop().animate({
			'width' : '300px'
		}, eventTime);

		_this.siblings().find('.dept2-list').stop().animate({
			'width' : '0'
		}, eventTime, function(){
			_this.siblings().removeClass('dept1-view dept1-bg');
		});

	});

	jtTab.on('mouseleave', function(){

		oneLi.eq(thisOneIndex).addClass('dept1-view').find('.dept2-list').stop().animate({
			'width' : '300px'
		}, eventTime);

		oneLi.eq(thisOneIndex).siblings().find('.dept2-list').stop().animate({
			'width' : '0'
		}, eventTime, function(){
			oneLi.eq(thisOneIndex).siblings().removeClass('dept1-view dept1-bg');
		});

	});

	$(window).scroll(function() {
		if ($(window).scrollTop() > $('#header').outerHeight(true) + $('#container').outerHeight(true) - $(window).height() - 60){
			jtBtn.css({
				'position' : 'absolute',
				'display' : 'block'
			});
		} else if ($(window).scrollTop() > $('.job-dept1-section').offset().top - 21){
			jtBtn.css({
				'position' : 'fixed',
				'display' : 'block'
			});
		} else {
			jtBtn.removeAttr('style');
		}
	});
}

function futureJobCont(oneD, twoD) {
	var jtWrap = $('.future-job-wrap'),
		jtOneCont = jtWrap.find('.job-dept1-section'),
		jtTwoCont = jtWrap.find('.future-job-box');

	jtTwoCont.removeAttr('style');
	jtOneCont.eq(oneD).find('.future-job-box').eq(twoD).css('display', 'block');
}

function subPageScroll(){
	var tabWrap = $('.cont-tab-wrap'),
		tabTop = tabWrap.offset().top - 20,
		nowScroll = $(window).scrollTop(),
		newScroll = null,
		scrollEvent = true,
		scrollTime = 500;

	if (nowScroll != 0 && nowScroll <= tabTop){
		scrollEvent = false;
		$('html, body').animate({scrollTop : tabTop}, scrollTime, function(){
			scrollEvent = true;
		});
	}

	$(window).on('mousewheel',function(e){
		console.log(e.originalEvent.wheelDelta);
		var scrollTimer = setTimeout(function(){
			//if (nowScroll < $(window).scrollTop() && $(window).scrollTop() <= tabTop && scrollEvent){
			if (e.originalEvent.wheelDelta < 0 && $(window).scrollTop() <= tabTop){
				nowScroll = $(window).scrollTop();
				$('html, body').stop().animate({scrollTop : tabTop}, scrollTime);
			//} else if (nowScroll > $(window).scrollTop() && $(window).scrollTop() <= tabTop && scrollEvent){
			} else if (e.originalEvent.wheelDelta >0 && $(window).scrollTop() <= tabTop){
				nowScroll = $(window).scrollTop();
				$('html, body').stop().animate({scrollTop : 0}, scrollTime);
			}
			clearTimeout(scrollTimer);
		}, 100);
	});
}

function windowClick() {
	footerReset();
	$(window).unbind('click touchstart', windowClick);
}


$(function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 300) {
			$('.btn-page-gotop, .request').fadeIn();
		} else {
			$('.btn-page-gotop, .request').fadeOut();
		}
	});
	
	$(".btn-page-gotop").click(function() {
		$('html, body').animate({
			scrollTop : 0
		}, 400);
		return false;
	});
});



$(document).ready(function(){
	tabAction();
	aroTabAction()
	familySiteList();
    gnbOpen();
	gnbClickAction();
    likeBox();
    accordion();
    hdSearchAction();
    layerPop(); 
    charType();
    tabBox();
	if ($('.course-card-fixed').length > 0){
		cardSelectBtn();
	}
    if ($('.course-card-list-wrap > .course-card-list').length > 0){
		var cardListEvent = true;
		cardList(cardListEvent);
	}
	if ($('.my-course-wrap').length > 0){
		myCourseQna();
	}
	if ($('.star-score').length > 0){
		starScore();
	}
	if ($('.cont-exploration').length > 0){
		titMenu();
	}
	if ($('.ept-dimmed').length > 0){
		eptDim();
	}
	if ($('.ft-job-card').length > 0){
		futureCard();
	}
	/*if ($('.cont-tab-wrap').length > 0){
		subPageScroll();
	}*/
}); 