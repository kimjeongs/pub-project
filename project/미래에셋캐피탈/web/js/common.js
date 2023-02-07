(function($){

	var defaults = {
		$body : 'body',
		$header : '#header',
		$gnb : '#gnb',
		$headerWrap : '.header-wrap',
		scrollName : 'scroll',
		selectedName : 'active',
		selectedItem : '.active',
		openText : '보기',
		closeText : '닫기',
	};
	
	window.comJs = {
		// gnb navi
		gnbNavi : function(){
			var $subMenuContainer = '.sub-menu-container';
				$subMenuContents = '.sub_menu_contents',
				$eventBox = '.event-box',
				speed = 300;

			$(''+defaults.$gnb+' > ul > li > a').on('mouseenter focusin', function(){
				if (!$(this).parent().hasClass(defaults.selectedName)) {
					if (!$(''+defaults.$gnb+' > span').get(0)) $(defaults.$gnb).append('<span></span>');
					var targetPL = $(this).position().left,
						targetW = $(this).width();
					$(''+defaults.$gnb+' > span').velocity({width:targetW, left:targetPL+25},200);
					$(this).closest('li').siblings().removeClass(defaults.selectedName).find($subMenuContainer).removeAttr('style');
					$(this).closest('li').siblings().find('li').removeAttr('style');
					$(this).parent().addClass(defaults.selectedName);
					$(this).next()
					.show().stop().velocity({height:245},200)
					.find(''+$subMenuContents+' > div:not('+$eventBox+')').each(function(){
						$(this).find('li,strong')
						.velocity('transition.slideUpIn', {
							duration: 300,
							stagger: 40,
						}); 
					});
					dimmAdd();
				};
			});

			$(defaults.$gnb).on('mouseleave', subMenuClose);

			var timer;
			$(defaults.$gnb).find('a').focusin(function(){
				clearTimeout(timer);
			}).focusout(function(){
				timer = setTimeout(function(){
					subMenuClose();
				}, 50);
			});

			function subMenuClose(){
				$(''+defaults.$gnb+' > span').remove();
				$(''+defaults.$gnb+' .'+defaults.selectedName+'').removeClass(defaults.selectedName);
				$($subMenuContainer).removeAttr('style');
				dimmRemove();
			}

			// 전체 배경 추가
			function dimmAdd(){
				var dimmHtml = '<div class="dim-layer"></div>';
				if (!$('.dim-layer').length) $(defaults.$body).append(dimmHtml);
				$('.dim-layer').fadeIn(200);
			};

			// 전체 배경 삭제
			function dimmRemove(){
				$('.dim-layer').remove();
			};

			// 피싱예방 설정 툴팁
			$('.prevention-box').on('click', '> a', function(){
				$(this).next().addClass(defaults.selectedName);
			}).on('click', '.close', function(){
				$(this).parent().removeClass(defaults.selectedName);
				$('.prevention-box > a').focus();
			});
		},
		// 공통 스크롤
		comScroll : function(){
			var $estimateInner = $('.estimate-inner'),
				$estimateResult = $('.estimate-group.result'),
				$smallItem = $('.s-item'),
				scrollName = 'scroll-s';
			// location navi
			function quickNaviScroll(){
				var _wst = $(window).scrollTop();
				(_wst > $(defaults.$headerWrap).height())
				? $(defaults.$body).addClass(defaults.scrollName)
				: $(defaults.$body).removeClass(defaults.scrollName);
			};

			// 차량정보
			// var $targetOffsetT = $estimateResult.offset().top;
			function estimateGroupScroll(){
				var _wst = $(window).scrollTop();
				if ($estimateResult.length && $estimateInner.length) {
					var topSection = (!$smallItem.length) ? 230 : 0;
					(_wst > $(defaults.$header).height() + topSection)
					? $estimateInner.addClass(scrollName)
					: $estimateInner.removeClass(scrollName);
				};
				
				// if ($estimateResult.length && $estimateInner.length) {
				// 	var topSection = (!$smallItem.length) ? 225 : -57;
				// 	if (_wst >= $targetOffsetT + topSection) {
				// 		$estimateInner.addClass(scrollName)
				// 		$estimateResult.css({top:_wst - $targetOffsetT + 57})
				// 	}else{
				// 		$estimateInner.removeClass(scrollName);
				// 		$estimateResult.css({top:0})
				// 	};
				// };
			};

			return {
				quickNaviScroll : quickNaviScroll,
				estimateGroupScroll : estimateGroupScroll
			}
		},
		// quick navi location
		locationNavi : function(){
			var $openBtn = $('.navi > li:not(.navihome) > a'),
				$closeBtn = $('.navi_up'),
				selectedName = 'open';
			
			$openBtn.on('click', function(e){
				if ($(this).next().is('.sub-menu')) {
					e.preventDefault();
					$openBtn.removeClass(selectedName);
					$(this).addClass(selectedName);
				};
			});

			$closeBtn.on('click', function(e){
				e.preventDefault();
				$openBtn.removeClass(selectedName);
			});
		},
		// quick menu
		quickMenu : function(){
			var $quickMenu = $('#quick-menu'),
				$controlBtn = '.toggle-btn',
				selectedName = 'quick-open';

			function toogleSelected(e){
				e.preventDefault();
				if (!$quickMenu.hasClass(selectedName)) {
					$quickMenu.addClass(selectedName)
					$quickMenu.find('a:not('+$controlBtn+')').attr('tabindex', '0');
				}else{
					$quickMenu.removeClass(selectedName)
					$($controlBtn).focus();
					$quickMenu.find('a:not('+$controlBtn+')').attr('tabindex', '-1');
				};
			};

			$($controlBtn).on('click', toogleSelected);
		},
		// common toggle
		comToggle : function(){
			var $btnToggle = $('.btn-toggle'),
				selectedName = 'open';
			// 단계 영역 열기
			function sectionOpen($target){
				$target.addClass(selectedName);
				var targetTitle = $target.find($btnToggle).attr('title').replace(/.{2}$/,defaults.closeText);
				$target.find($btnToggle).attr('title',targetTitle);
				// $target.find('.estimate-cont').stop().slideDown();
			};

			// 단계 영역 닫기
			function sectionClose($target){
				$target.removeClass(selectedName);
				var targetTitle = $target.find($btnToggle).attr('title').replace(/.{2}$/,defaults.openText);
				$target.find($btnToggle).attr('title',targetTitle);
				// $target.find('.estimate-cont').stop().slideUp();
			};

			return {
				sectionOpen : sectionOpen,
				sectionClose : sectionClose
			}
		},
		// common toggle
		toggleBtn : function(){
			var $btnToggle = $('.toggle-btn')

			function toogleSelected(e){
				e.preventDefault();
				if (!$(this).parent().hasClass(defaults.selectedName)) {
					$(this).parent().addClass(defaults.selectedName)
					if ($(this).attr('title')) {
						// title 경우
						var targetTitle = $(this).attr('title').replace(/.{2}$/,defaults.closeText);
						$(this).attr('title',targetTitle);
					}else{
						// text 경우
						var targetText = $(this).text().replace(/.{2}$/,defaults.closeText);
						$(this).text(targetText);
					};
				}else{
					$(this).parent().removeClass(defaults.selectedName);
					if ($(this).attr('title')) {
						// title 경우
						var targetTitle = $(this).attr('title').replace(/.{2}$/,defaults.openText);
						$(this).attr('title',targetTitle);
					}else{
						// text 경우
						var targetText = $(this).text().replace(/.{2}$/,defaults.openText);
						$(this).text(targetText);
					};
				};

			};
			
			$btnToggle.on('click', toogleSelected);
		},
		// percent
		// percentJs : function(){
		// 	var $percentList = $('.percent-list'),
		// 		$percentTarget = $('.box-percent > span'),
		// 		stringRegx = /[~!@\#$%<>^&*\()\-=+_\’]/gi;

		// 	function percentAction(_percent){
		// 		var _percent = (!_percent) ? $percentList.find(defaults.selectedItem +' a').text() : _percent;
		// 		if (stringRegx.test(_percent)) var _percent = _percent.replace(/[^0-9]/g,'');
		// 		$percentTarget.text(_percent+'%');
		// 		$percentTarget.stop().animate({width:_percent+'%'});
		// 		$percentList.children().eq(_percent/10).addClass(defaults.selectedName)
		// 					.siblings().removeClass(defaults.selectedName);
		// 		$percentList.find('a').removeAttr('title');
		// 		$percentList.children().eq(_percent/10).find('a').attr('title','선택 되었습니다.');
		// 	};
		// 	percentAction();

		// 	return {
		// 		percentAction : percentAction
		// 	}
		// },
		// My Account 메뉴
		myAccountMenu : function(){
			var $loanDetailList = $('.loan-detail-list'),
				$loanListBtn = $loanDetailList.find('[class^="menu"] > a'),
				$loanListSubBtn = $loanDetailList.find('.smenu'),
				timer;
			$loanListBtn.on('click',function(e){
				if ($(this).next().is('.sub-menu')) {
					e.preventDefault();
					$(this).addClass(defaults.selectedName).parent().siblings().find('> a').removeClass(defaults.selectedName);
					$loanListSubBtn.removeClass(defaults.selectedName);
				};
			});
			$loanListSubBtn.on('click',function(e){
				e.preventDefault();
				$(this).toggleClass(defaults.selectedName).parent().siblings().find('> a').removeClass(defaults.selectedName);
			});
			$('.navi_up').on('click',function(){
				$(this).closest('[class^="menu"]').find('> a').removeClass(defaults.selectedName);
				$loanListSubBtn.removeClass(defaults.selectedName);
			});

			$('.myaccount-list01 button').focusin(function(){
				$(this).closest('li').siblings().removeClass(defaults.selectedName);
				$(this).closest('li').addClass(defaults.selectedName);
				clearTimeout(timer);
			}).focusout(function(){
				timer = setTimeout(function(){
					$('.myaccount-list01 li').removeClass(defaults.selectedName);
				}, 50);
			});
		},
		// 탭
		jsTabs : function(){
			var _this = $('.js-tab'),
				item = _this.find('a'),
				content = 'tab-content',
				selectedContent = 'tab-content-selected';

			item.each(function(){
				var items = $(this.hash);
				items.addClass(content);
				if ($(this).parent().hasClass(defaults.selectedName)) items.addClass(selectedContent);
			});

			item.parent().click(function(){
				$(this).addClass(defaults.selectedName).siblings().removeClass(defaults.selectedName);
				item.parent().each(function(){
					var items = $($(this).children().attr('href'));
					($(this).hasClass(defaults.selectedName)) ? items.addClass(selectedContent) : items.removeClass(selectedContent);
				});
				return false;
			});
		},
		// 
		familySite : function(){
			var _this = $('.affiliate'),
				$btnToggle = _this.find('> a');

			$btnToggle.on('click', function(e){
				e.preventDefault();
				if (!$(this).hasClass(defaults.selectedName)) {
					$(this).addClass(defaults.selectedName);
					var targetTitle = $(this).attr('title').replace(/.{2}$/,defaults.closeText);
					$(this).attr('title',targetTitle);
				}else{
					$(this).removeClass(defaults.selectedName);
					var targetTitle = $(this).attr('title').replace(/.{2}$/,defaults.openText);
					$(this).attr('title',targetTitle);
				}
			});
			// $btnToggle.next().find('a').focusin(function(){
			// 	clearTimeout(timer);
			// }).focusout(function(){
			// 	timer = setTimeout(function(){
			// 		$btnToggle.removeClass(defaults.selectedName);
			// 	}, 50);
			// });
		},
		// 공통 슬라이드
		commonBxSlider : function(){
			$('.common-slider').each(function(){
				var commonBxSlider = $(this).bxSlider({
					mode:$(this).data('slider-mode'), //horizontal
					controls:$(this).data('slider-controls'), //true
					pager:$(this).data('slider-pager'), //true
					pagerCustom:$(this).data('slider-custom'),
					auto:$(this).data('slider-auto'), //false
					autoControls:$(this).data('slider-autocontrols'), //false
					autoControlsSelector:$(this).data('slider-autoselector'), // Selector
					pause:$(this).data('slider-pause'), //4000
					touchEnabled:$(this).data('slider-touch'), //true
					moveSlides:$(this).data('slider-moves'), //0
					minSlides:$(this).data('slider-mins'), //1
					maxSlides:$(this).data('slider-maxs'), //1
					slideWidth:$(this).data('slider-slidew'), //0
					shrinkItems:$(this).data('slider-shrink'), //false
					infiniteLoop:$(this).data('slider-loop'), // true
					startText:'시작',
					stopText:'정지',
					autoControlsCombine:true, // false
					slideMargin:0, //0
					speed:500, // 500
					stopAutoOnClick:true, // false
					responsive:true, // true
					useCSS:true // true
				});
			});
		},
		initialize : function(){
			this.gnbNavi = this.gnbNavi();
			this.comScroll = this.comScroll();
			this.locationNavi = this.locationNavi();
			this.quickMenu = this.quickMenu();
			this.comToggle = this.comToggle();
			this.toggleBtn = this.toggleBtn();
			// this.percentJs = this.percentJs();
			this.myAccountMenu = this.myAccountMenu();
			this.jsTabs = this.jsTabs();
			this.familySite = this.familySite();
			this.commonBxSlider = this.commonBxSlider();
		}
	};

	$(document).ready(function(){
		comJs.initialize();
		$(".custom-scroll").mCustomScrollbar();
		$(".pop-cont").mCustomScrollbar();
		$('.color-pick-cont button').on('click', function(){
			$(this).toggleClass(defaults.selectedName).parent().siblings().find('button').removeClass(defaults.selectedName);
		});
	});

	$(window).scroll(function(){
		if ($('.quick-navi-wrap').get(0)) {
			comJs.comScroll.quickNaviScroll();
			comJs.comScroll.estimateGroupScroll();
		};
	});
})(jQuery);

// 카운트다운
function loginCountdown(duration) {
	var timer = duration * 60,
		circleDashoffset = 31,
		minutes, seconds;

	ltimeInterval = setInterval(function(){
		var minutes = parseInt(timer / 60),
			seconds = parseInt(timer % 60),
			minutes = minutes < 10 ? "0" + minutes : minutes,
			seconds = seconds < 10 ? "0" + seconds : seconds;
		$('.time-min').text(minutes);
		$('.time-sec').text(seconds);

		$('.time-circle circle').css('stroke-dashoffset', circleDashoffset-(circleDashoffset/timer));

		circleDashoffset = circleDashoffset-(circleDashoffset/timer)

		if (--timer < 0) {
			timer = 0;
			console.log('카운트다운 종료');
			clearInterval(ltimeInterval);
		};
	}, 1000);
};

loginCountdown(10);

// 로그인 시간 연장
function loginTimeExtension(duration){
	clearInterval(ltimeInterval);
	loginCountdown(duration);
};