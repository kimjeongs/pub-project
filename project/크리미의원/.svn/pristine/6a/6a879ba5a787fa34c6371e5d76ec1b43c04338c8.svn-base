$(document).ready(function(){
	$('#header .m-menu').click(function(e){
		e.preventDefault();
		var me = $(this);
		if(me.is('.open')){
			$('body').removeClass('menu-open');
			$(this).removeClass('open');
			$('#m-gnb').hide();
			$('#header').removeClass('black');
		}else{
			$('body').addClass('menu-open');
			$(this).addClass('open');
			$('#m-gnb').show();
			$('#header').addClass('black');
		}		
	})

	$('#m-gnb > ul >li').click(function(e){
		e.preventDefault();
		var me = $(this);
		if(me.is('.active')){
			me.removeClass('active');
		}else{
			me.addClass('active');
		}
	})
	var stopEvnt = function(e){
		e.stopPropagation();
	}
	$('#m-gnb > ul> li li').click(stopEvnt)
})