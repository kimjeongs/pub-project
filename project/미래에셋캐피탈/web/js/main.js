(function($){
	var defaults = {
		$body : $('body'),
		$wrap : $('#mWrap'),
		$header : $('#header'),
		$mContainer : $('#mContainer'),
		$mainNavi : $('.main-navi'),
		$mainNaviA : $('.main-navi a'),
		$sectionMenu : $('.section-menu'),
		$actionBox : $('.action-box'),
		$pageContent : $('#pageContent'),
		$scrollDown : $('.scroll-down'),
		pageSelected : 'page-selected',
		selectedName : 'selected',
	};
	
	window.mainJs = {
		initialize : function(){
			this.initPage = this.initPage();
			defaults.$mainNaviA.off().on('click', mainJs.targetAction);
			$('.scroll-down i').velocity({translateY: "10px"}, {duration:750, loop:true});
		},
		initPage : function(){
			defaults.$body.addClass('first');
			mainJs.lodingAction(true);
			var initActive = [
				{ e: defaults.$wrap,
				  p: { paddingLeft:55, paddingRight:55 },
				  o: { duration:1500, delay:1500, easing:[.9,.2,.2,.9],
				  		complete: function() {
				  			onComplete();
				  		}
				  	 }
				},
				{ e: defaults.$header,
				  p: { top:0 },
				  o: { duration:1500, easing:[.9,.2,.2,.9], sequenceQueue:false }
				},
				{ e: defaults.$sectionMenu,
				  p: { marginTop:-55 },
				  o: { duration:1500, easing:[.9,.2,.2,.9], sequenceQueue:false }
				},
				{ e: defaults.$actionBox,
				  p: { width:'50%' },
				  o: { duration:1500, easing:[.9,.2,.2,.9], sequenceQueue:false }
				},
				{ e: $('h2'),
				  p: 'transition.slideDownIn',
				  o: { duration:500 }
				},
				{ e: defaults.$mainNavi,
				  p: { opacity:1 },
				  o: { duration:800, sequenceQueue:false,
				  		complete: function() {
				  			defaults.$body.removeClass('first');
				  		}
				  	 }
				}
			];

			$.Velocity.RunSequence(initActive);

			function onComplete(){
				defaults.$body.removeClass('loding');
				$('svg polyline').velocity("stop");
				$('.dimm-loding').remove();
			};
		},
		pageAction : function($targetBox){

			$targetBox.addClass(defaults.selectedName).siblings().removeClass(defaults.selectedName);

			defaults.$pageContent.find('h3,p,li').removeAttr('style');

			var directionType = ($targetBox.is('#pageCompany')) ? '100%' : '0%',
				directionType2 = ($targetBox.is('#pageCompany')) ? 'transition.slideRightIn' : 'transition.slideLeftIn',
				pageActive = [
				{ e: defaults.$actionBox,
				  p: { width:directionType },
				  o: { duration:800, easing:[.8,.3,.3,.8] }
				},
				{ e: $targetBox.find('h3'),
				  p: directionType2,
				  o: { duration:300, delay:500, sequenceQueue:false }
				},
				{ e: $targetBox.find('p'),
				  p: 'transition.slideUpIn',
				  o: { duration:300 }
				},
				{ e: $targetBox.find('li'),
				  p: 'transition.slideUpBigIn',
				  o: { duration:300, stagger:200}
				},
				{ e: defaults.$scrollDown,
				  p: {bottom:25},
				  o: { duration:500, easing:[.9,.2,.2,.9], delay:600, sequenceQueue:false,
						complete: function() {
							onComplete();
						}
					 }
				}
			];

			$.Velocity.RunSequence(pageActive);

			setTimeout(function() {
				defaults.$pageContent.focus();
			}, 800);

			function onComplete(){
				defaults.$mainNaviA.off().on('click',mainJs.targetAction);
				$(window).off().on('mousewheel DOMMouseScroll', mainJs.mousewheelEvent);
			};

		},
		targetAction : function(e){
			e.preventDefault();

			var $targetBox = $(this.hash);

			$(window).off('mousewheel DOMMouseScroll', mainJs.mousewheelEvent);

			if (!$(this).parent().hasClass(defaults.selectedName) && !defaults.$body.hasClass(defaults.pageSelected)) {
				defaults.$mainNaviA.off('click',mainJs.targetAction);
				mainJs.lodingAction();
				defaults.$scrollDown.velocity({bottom:-50}, {duration:750, easing:[.9,.2,.2,.9]});
				defaults.$mainNaviA.parent().removeClass(defaults.selectedName);
				$(this).parent().addClass(defaults.selectedName);
				defaults.$body.addClass(defaults.pageSelected);
				setTimeout(function() {
					mainJs.pageAction($targetBox);
				}, 1000);
			}else if (!$(this).parent().hasClass(defaults.selectedName) && defaults.$body.hasClass(defaults.pageSelected)) {
				defaults.$mainNaviA.off('click',mainJs.targetAction);
				mainJs.contentUp();
				mainJs.lodingAction();
				defaults.$scrollDown.velocity({bottom:-50}, {duration:750, easing:[.9,.2,.2,.9]});
				defaults.$mainNaviA.parent().removeClass(defaults.selectedName);
				$(this).parent().addClass(defaults.selectedName);
				defaults.$pageContent.velocity({
					opacity:0,
					left:-50,
					complete: function() {
						onComplete();
					}
				},200); 
			};

			function onComplete(){
				setTimeout(function() {
					defaults.$pageContent.css({opacity:1, left:0}); 
					mainJs.pageAction($targetBox);
				}, 1000);
			};

			defaults.$body.on('mouseenter focusin', '#pageContent ul li', function(){
				var fontColor = ($(this).closest('div').is('#pageCompany')) ? '#0f0f0f' : '#fb831d';
				$(this).find('em').velocity({width:40}, 200);
				$(this).find('a').velocity({color:fontColor}, 200);
			}).on('mouseleave focusout','#pageContent ul li' ,function(){
				$(this).find('em').stop().velocity({width:10}, 200);
				$(this).find('a').stop().velocity({color:"#fff"}, 200);
			});
			
			defaults.$scrollDown.on('click', function(e){
				e.preventDefault();
				mainJs.contentDown();
			})
		},
		lodingAction : function(lodingType){
			var lodingHtml = '<div class="dimm-loding"><svg xmlns="http://www.w3.org/2000/svg" width="150" height="80" viewBox="0 0 567.07 285.82"><polyline class="loaderpath" points="18.62 74.51 182.66 249.83 345.84 97.93 281.11 35.48 216.58 98.12 379.57 248.8 548.76 74.14"></polyline></svg></div>';
			if (!$('.dimm-loding').length) defaults.$mContainer.append(lodingHtml);
			defaults.$body.addClass('loding');
			var dash = 1110;
			if (lodingType) {
				$('svg polyline')
				.velocity({
					opacity:1,
					strokeDashoffset: dash,
					strokeDasharray: dash
				}, {duration:0, loop:true})
				.velocity({
					strokeDashoffset: -dash
				},1500);
			}else{
				$('svg polyline')
				.velocity({
					opacity:1,
					strokeDashoffset: dash,
					strokeDasharray: dash
				},0).velocity({
					strokeDashoffset: -dash
				},{duration:1500, complete:loadingComplete});
			};
			function loadingComplete(){
				$('.dimm-loding').remove();
				defaults.$body.removeClass('loding');
			};
		},
		mousewheelEvent : function(event){
			// var E = e.originalEvent,
			// 	delta = (E.detail) ? E.detail * -40 : E.wheelDelta;

			if (event.deltaY < 0 && defaults.$body.hasClass('page-selected')){
				mainJs.contentDown();
			}else if (event.deltaY > 0){
				mainJs.contentUp();
			};
		},
		contentDown : function(){
			if (!defaults.$body.hasClass('contentDown')) {
				$(window).off('mousewheel DOMMouseScroll', mainJs.mousewheelEvent);
				defaults.$body.addClass('contentDown');
				defaults.$scrollDown.velocity({bottom:-50}, {duration:750, easing:[.9,.2,.2,.9]});
				defaults.$sectionMenu.find('li').velocity("stop").velocity('transition.slideLeftBigIn', 1000);
				defaults.$sectionMenu.find('strong').velocity("stop").velocity({top:0}, 'ease-in-out', 1000);
				defaults.$sectionMenu.find('p').velocity("stop").velocity({top:0}, 'ease-in-out', 1200);
				defaults.$sectionMenu.find('a').velocity("stop").velocity({top:0}, 'ease-in-out', 1300);
				$('html,body').velocity("stop").velocity('scroll', {duration: 750, easing:[.9,.2,.2,.9], offset:$(document).height() - $(window).height(),
			  		complete: function() {
			  			$(window).on('mousewheel DOMMouseScroll', mainJs.mousewheelEvent);
			  		}
				});
			};
		},
		contentUp : function(){
			if (defaults.$body.hasClass('contentDown')) {
				$(window).off('mousewheel DOMMouseScroll', mainJs.mousewheelEvent);
				defaults.$scrollDown.velocity({bottom:25}, {duration:750, easing:[.9,.2,.2,.9]});
				defaults.$sectionMenu.find('li').velocity("stop").velocity({opacity:0}, 500);
				defaults.$sectionMenu.find('strong,p,a').velocity("stop").velocity({top: 150});
				$('html,body').velocity("stop").velocity('scroll', {duration: 750, easing:[.9,.2,.2,.9], offset: 0,
			  		complete: function() {
			  			$(window).on('mousewheel DOMMouseScroll', mainJs.mousewheelEvent);
						defaults.$body.removeClass('contentDown');
			  		}
			  	});
			};
		}
	};

	$(document).ready(function(){
		mainJs.initialize();
	});
})(jQuery);