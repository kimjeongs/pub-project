$(window).ready(function(){
	//윈도우 사이즈 리사이즈 될때마다 맞추기
    function reHeight(){
        var wHeight = $(window).height();
        $('.section').height(wHeight);
        }//reHeight
    
    reHeight();
    
    $(window).on('resize',function(){
        reHeight();
        //함수 넣기
    })//resize

	/*메뉴열기*/    
    $('.btn-menu , .m-btn-menu').on('click', function(){
        $('.menu-cont').animate({'left':'0'},500);
        $(this).animate({'left':'-170px'},50);
    });

	/*메뉴닫기*/    
	 $('.close').on('click', function(){
		 $('.menu-cont').animate({'left':'-440px'});
		 $('.gnb-menu>li').eq(0).addClass('on').siblings().removeClass('on');
		 $('.btn-menu').animate({'left':'-55px'});
	});

	/*메뉴닫기*/    
	 $('.close').on('click', function(){
		 $('.menu-cont').animate({'left':'-440px'});
		 $('.gnb-menu>li').eq(0).addClass('on').siblings().removeClass('on');
		 $('.m-btn-menu').animate({'left':'10px'});
	});

	$('.subMenu .like').on('click',function(event){
        $(this).toggleClass('on');
        event.preventDefault();
    })

	$(window).on('scroll', function(){
		var wHeight = $(window).height();
		$('.mainview').height(wHeight);
		var scr = $(window).scrollTop();
		console.log(scr);
		
		if(scr>wHeight*3.5){
			$('.sideWrap .hospital').addClass('on');
		}else{
			$('.sideWrap .hospital').removeClass('on');
		}
	});
});