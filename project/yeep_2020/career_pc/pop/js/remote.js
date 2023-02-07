$(function(){

	// pop
	var openpopup = $('.btn-pop'),
		closepopup = $('.rm-popup .btn-close'),
		popup = $('.rm-popup'),
		dim = $('.dim');
	
	openpopup.on('click',function() {
	var num = $(this).attr('data-num');
	
	$('.rm-popup'+'[data-num='+num+']').addClass('on');
	$('body, html').css('overflow','hidden');
	dim.css('display','block');
	$('body, html').css('overflow','hidden')
	});
	
	closepopup.on('click',function() {
	if ($(this).parents(popup).hasClass('on')) {
		$(this).parents(popup).removeClass('on');
		dim.css('display','none');
		$('body, html').css('overflow','visible')
	}
	});

	dim.on('click',function(){
	dim.css('display','none');
	$('body, html').css('overflow','visible');
	$('.rm-popup').removeClass('on');
	});

})
