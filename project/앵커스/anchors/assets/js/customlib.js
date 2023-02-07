$(function(){
	var option = {},
		slideLength = $('.portfolio-slide .swiper-slide').length,
		btnPfCtl = $('.btn-portfolio-control');
	if (slideLength == 1) {
		option = {
			allowSlidePrev: false,
			allowSlideNext: false,
			autoplay: false,
			loop: false,
			simulateTouch: false
		}
		$('.portfolio-slide [class*="swiper-button"]').hide();
	} else {
		option = {
			centeredSlides: true,
			autoplay: {
				delay: 4500,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			speed: 800,
		}
	}
	var pfSwiper = new Swiper('.portfolio-slide', option);
	
	btnPfCtl.click(function () {
		if (!$(this).hasClass('active')) {
			pfSwiper.autoplay.stop();
		} else {
			pfSwiper.autoplay.start();
		}
	});
});