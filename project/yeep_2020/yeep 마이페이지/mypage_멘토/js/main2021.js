menuPop();
quickBtn();
reportPop();

function menuPop() {
    var popBtn = $('.btn-pop-menu'),
        btnClose = $('.pop-menu .btn-close');

    $(document).click(function(e){ 
        if($(e.target).is(popBtn)) {
            popBtn.toggleClass('active');
        } else if (!$(e.target).is('.pop-menu,.pop-menu *')) {
            popBtn.removeClass('active');
        }
    });
    btnClose.on('click',function() {
        popBtn.removeClass('active');
    })
}


function quickBtn() {
    var floatPos = parseInt($(".quick-btn").css('top')),
        posPsn = $('.personal').offset().top;

    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop(),
        newPosition = scrollTop + floatPos + "px";
    
        $(".quick-btn").stop().animate({
        "top" : newPosition
        }, 300);

        $('.quick-btn li').removeClass('active');
        if(scrollTop > posPsn - 500) {
            $('.quick-btn .btn-psn').addClass('active');
        } else {
            $('.quick-btn .btn-grp').addClass('active');
        }
    }).scroll();

    $('.btn-top ,.btn-grp').on('click',function() {
        $('html,body').stop().animate({
            scrollTop : 0
        }, 300);
        return false;
    })
    
    $('.btn-psn').on('click',function() {
        $('html,body').stop().animate({
            scrollTop : posPsn
        }, 300);
        return false;
    })

}

function reportPop() {
    $('.mypage-main .report > a').on('click',function() {
        $(this).next('.report-layer').show();
    })
}