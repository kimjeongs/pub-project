$(window).ready(function(){
	//������ ������ �������� �ɶ����� ���߱�
    function reHeight(){
        var wHeight = $(window).height();
        $('.section').height(wHeight);
        }//reHeight
    
    reHeight();
    
    $(window).on('resize',function(){
        reHeight();
        //�Լ� �ֱ�
    })//resize

	/*�޴�����*/    
    $('.btn-menu , .m-btn-menu').on('click', function(){
        $('.menu-cont').animate({'left':'0'},500);
        $(this).animate({'left':'-170px'},50);
    });

	/*�޴��ݱ�*/    
	 $('.close').on('click', function(){
		 $('.menu-cont').animate({'left':'-440px'});
		 $('.gnb-menu>li').eq(0).addClass('on').siblings().removeClass('on');
		 $('.btn-menu').animate({'left':'-55px'});
	});

	/*�޴��ݱ�*/    
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