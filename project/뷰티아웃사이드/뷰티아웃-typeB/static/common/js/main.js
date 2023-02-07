$(Document).ready(function(){

    //윈도우 사이즈 리사이즈 될때마다 맞추기
    function reHeight(){
        var wHeight = $(window).height();
        $('section').height(wHeight);
        }//reHeight
    
    reHeight();
    
    $(window).on('resize',function(){
        reHeight();
        //함수 넣기
    })//resize

//mouseWheel 하면 다음섹션 넘어가게
    $('section').on('mousewheel',function(e,d){
        //스크롤 내리면
        if(d<0){
            var next = $(this).next().offset().top;
            $('html, body').stop().animate({
                'scrollTop':next
            },700)
        }//if
        //스크롤 올리면
        else if(d>0){
            var prev = $(this).prev().offset().top;
            $('html, body').stop().animate({
                'scrollTop':prev
            },700)
        }//else if
    })//mousewheel

    
    $(window).on('scroll', function(){
        var wHeight = $(window).height();
        $('section').height(wHeight);
        var scr = $(window).scrollTop();
        //console.log(scr);
        
        if(scr>wHeight*3.5){
            $('.section1 .side .hospital').addClass('on');
        }else{
            $('.section1 .side .hospital').removeClass('on');
        }
            
        
        
        
    })//scroll
    
    
/*메뉴열기*/    
    $('.btn').on('click', function(){
        $('.menu').animate({'left':'0'},500);
        $(this).animate({'left':'-150px'},50);
    });

/*메뉴닫기*/    
     $('.close').on('click', function(){
         $('.menu').animate({'left':'-440px'});
         $('.gnbTit>li').eq(0).addClass('on').siblings().removeClass('on');
         $('.btn').animate({'left':'-55px'});
    });
/*탭메뉴*/    
   /* $('.gnbTit li').on('click',function(){
        var i = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
    })*/

    
//mainSlide 
    
        /*var boxlength = $('.Bslide .img').length;
        console.log(boxlength);//3
        var n = 0;
    

        var splay;
        
        splay = setInterval(function(){
        var nam = (n+1) % boxlength;
        $('.Bslide .img').eq(n).fadeOut();
        $('.Bslide .img').eq(nam).fadeIn();
        n = nam;
        },5000)*///setInterval
    
    /*$('.slideBtn .next').on('click',function(){
        var nam = (n+1) % boxlength;
        $('.slide .img').eq(n).fadeOut();
        $('.slide .img').eq(nam).fadeIn();
        n = nam;
    });
    
    
    $('.slideBtn .prev').on('click',function(){
        var nam = (n+2) % boxlength;
        console.log(nam); //1
        $('.slide .bg').eq(n).fadeOut();
        $('.slide .bg').eq(nam).fadeIn();
        n = nam;
    });*/
    
    $('.section1 .subMenu .like').on('click',function(event){
        $(this).toggleClass('on');
        event.preventDefault();
    })
    

  
    
    
    
    

    
    
})//ready