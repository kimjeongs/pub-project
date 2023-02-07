(function($){

	var defaults = {
		$html : 'html',
		$body : 'body',
		$wrap : '#wrap',
		$commonMenu : '#commonMenu',
		$header : '#header',
		selectedName : 'active',
		openText : '보기',
		closeText : '닫기',
		speed : 300,
	};
	
	window.comJs = {
		// commonMenu
		commonMenu : function(){
			var navbarToggle = $('.navbar-toggle'),
				$gnbMenu = $('.gnb-menu'),
				$gnbCont = $('.gnb-cont'),
				selectedName = 'menu-open';

			navbarToggle.on('click', function(e){
				e.preventDefault();
				if (!$(defaults.$body).hasClass(selectedName)) {
					originalPosition = comJs.scrollPosition();
					$(defaults.$body).addClass(selectedName);
					$(defaults.$wrap).css({marginTop:-originalPosition});
					$(defaults.$header).css({top:originalPosition});
					initValue();
					dimmAdd();
				}else{
					menuClose();
				};
			});

			// 메뉴닫기
			function menuClose(){
				$(defaults.$body).removeClass(selectedName);
				$(defaults.$wrap).attr('style','');
				$(defaults.$header).attr('style','');
				$('html,body').scrollTop(originalPosition);
				$gnbCont.find('.'+defaults.selectedName+' ul').removeAttr('style');
				$gnbCont.find('.'+defaults.selectedName+'').removeClass(defaults.selectedName);
				$gnbMenu.find('li:first-child').addClass(defaults.selectedName).siblings().removeClass(defaults.selectedName);
				$($($gnbMenu.find('.active a')).attr('href')).addClass(defaults.selectedName).next().addClass(defaults.selectedName);
				dimmRemove();
			};

			var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
			$(defaults.$html).on(transitionEnd,defaults.$commonMenu,function(){
				if (!$('.'+selectedName+'').get(0)) {
					$(defaults.$commonMenu).css({height : 'auto'});
				}
			});

			// 전체 배경 추가
			function dimmAdd(){
				var dimmHtml = '<div class="dim-layer"></div>';
				if (!$('.dim-layer').length) $(defaults.$header).append(dimmHtml);
			};

			// 전체 배경 삭제
			function dimmRemove(){
				$('.dim-layer').remove();
			};

			function initValue(){
				var wh = window.innerHeight ? window.innerHeight : $(window).height();
				$(defaults.$commonMenu).css({
					paddingTop : $('.top-btn').outerHeight(),
					height : wh-$('.top-btn').outerHeight()
				});
			};

			$($($gnbMenu.find('.active a')).attr('href')).addClass(defaults.selectedName).next().addClass(defaults.selectedName);

			$gnbMenu.off().on('click', 'a', function(e){
				e.preventDefault();
				$(this).parent().addClass(defaults.selectedName).siblings().removeClass(defaults.selectedName);
				$gnbCont.find('.active').removeClass(defaults.selectedName);
				$gnbCont.find('.depth1 ul').removeAttr('style');
				$(this.hash).addClass(defaults.selectedName).next().addClass(defaults.selectedName);
			});

			// depth1
			$gnbCont.find('.depth1 > li > a').off().on('click', function(e){
				if ($(this).next().is('.depth2') && !$(this).parent().hasClass(defaults.selectedName)) {
					e.preventDefault();
					$gnbCont.find('li.'+defaults.selectedName+' ul').velocity('slideUp', {duration:defaults.speed});
					$gnbCont.find('li.'+defaults.selectedName+'').removeClass(defaults.selectedName);
					$(this).parent().addClass(defaults.selectedName);
					$(this).next().velocity('slideDown', {duration:defaults.speed});
				}else if ($(this).next().is('.depth2') && $(this).parent().hasClass(defaults.selectedName)){
					e.preventDefault();
					$(this).parent().removeClass(defaults.selectedName);
					$(this).parent().find('ul').velocity('slideUp', {duration:defaults.speed});
				};
			});

			// depth2
			$gnbCont.find('.depth2 > li > a').off().on('click', function(e){
				if ($(this).next().is('.depth3') && !$(this).parent().hasClass(defaults.selectedName)) {
					e.preventDefault();
					$(this).parent().addClass(defaults.selectedName)
						   .siblings().removeClass(defaults.selectedName)
						   .find('ul').velocity('slideUp', {duration:defaults.speed});
					$(this).next().velocity('slideDown', {duration:defaults.speed});
				}else if ($(this).next().is('.depth3') && $(this).parent().hasClass(defaults.selectedName)){
					e.preventDefault();
					$(this).parent().removeClass(defaults.selectedName);
					$(this).parent().find('ul').velocity('slideUp', {duration:defaults.speed});
				};
			});

			return {
				initValue : initValue,
				menuClose : menuClose
			}
			
		},
		// 스크롤 위치 기억
		scrollPosition : function(){
			var de = document.documentElement;
			var b = document.body;
			var now = {};
			now.Y = document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);
			return now.Y;
		},
		// common toggle
		toggleBtn : function(){
			var $btnToggle = $('.toggle-btn'),
				$tooltipClose = $('.tooltip .close');

			function toogleSelected(e){
				e.preventDefault();
				var $toggleCont = $($(this).data('target'));
				if (!$(this).parent().hasClass(defaults.selectedName)) {
					$(this).parent().addClass(defaults.selectedName);
					$toggleCont.slideDown(defaults.speed);
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
					$toggleCont.slideUp(defaults.speed);
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

			function tooltipClose(e){
				e.preventDefault();
				var $tooltipWrap = $(this).closest('.tooltip');
				$tooltipWrap.removeClass(defaults.selectedName);
				if ($tooltipWrap.find($btnToggle).attr('title')) {
					// title 경우
					var targetTitle = $tooltipWrap.find($btnToggle).attr('title').replace(/.{2}$/,defaults.openText);
					$tooltipWrap.find($btnToggle).attr('title',targetTitle);
				}else{
					// text 경우
					var targetText = $tooltipWrap.find($btnToggle).text().replace(/.{2}$/,defaults.openText);
					$tooltipWrap.find($btnToggle).text(targetText);
				};
			};
			
			$('body').on('click', '.toggle-btn', toogleSelected);
			$('body').on('click', '.tooltip .close', tooltipClose);
			
			// $btnToggle.on('click', toogleSelected);
			// $tooltipClose.on('click', tooltipClose);
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
		initialize : function(){
			this.commonMenu = this.commonMenu();
			this.toggleBtn = this.toggleBtn();
			this.jsTabs = this.jsTabs();
		}
	};



	$(document).ready(function(){
		comJs.initialize();
	});

	$(window).scroll(function(){

	});
})(jQuery);