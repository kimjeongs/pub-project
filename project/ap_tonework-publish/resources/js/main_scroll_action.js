$(document).ready(function () {

    // 메인 스크롤 액션
    let w = window.innerWidth,
    tween = new TimelineMax(),
    tween2 = new TimelineMax(),
    controller,
    //logoSize = w * 72.9 / 100,
    size = w,
    delay = 500,
    timer = null,
    skinH = $(".main_cnt_02").height()/2;
    
    let logo_controller = new ScrollMagic.Controller();
    tween.fromTo('.main header .logo', .5, {left:100, top: 120, width:1024}, {left:40, top:30, width:240});
    new ScrollMagic.Scene({triggerElement: "#trigger1", duration: "50%", triggerHook:0, tweenChanges: true})
        .setTween(tween)
        //.addIndicators() // add indicators (requires plugin)
        .addTo(logo_controller);
    
    function makeScrollMagic() {
        // init controller
        controller = new ScrollMagic.Controller();        

        // build tween
        tween2.fromTo('.basepicker_list .ico_star', .5, {rotation:0}, {rotation:360});
        
        new ScrollMagic.Scene({triggerElement: "#trigger2", duration: "100%", tweenChanges: true})
        .setTween(tween2)
        .setClassToggle('.circle_info', 'off')
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#trigger3", duration: "200%", triggerHook:0, tweenChanges: true})
        .setPin(".main_cnt_02")
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#trigger3", duration: "200%", triggerHook:0, offset:skinH, tweenChanges: true})
        .setClassToggle(".main_cnt_02", "active")
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#trigger4", triggerHook:1, tweenChanges: true})
        //.addIndicators() // add indicators (requires plugin)
        .setClassToggle(".main_cnt_03", "active")
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#trigger5", triggerHook:1, tweenChanges: true})
        //.addIndicators() // add indicators (requires plugin)
        .setClassToggle(".main_cnt_04, .footer", "active")
        .addTo(controller);
    }
    
    /* 초기화
    function sizeIt() {
        w = window.innerWidth;
        let newSize = w;
        if (newSize != size) {
            size = newSize;
            TweenMax.set(".basepicker_list .ico_star", { clearProps: "all" });
            tween2.clear();
            controller.destroy(true);
            setTimeout(function() {
                makeScrollMagic();
            }, 10);
        }
    }
    */
    /* 리이즈시 초기화
    $(window).on('resize', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {sizeIt()}, delay);
    });
    */

    $(window).on('load', function() {
        if ($(".main").length > 0) {makeScrollMagic();}
    });
});