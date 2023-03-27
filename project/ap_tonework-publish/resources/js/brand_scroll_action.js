$(document).ready(function () {
    
    const story_01 = $(".brand_about_01"),
    brand_wrp = $(".brand_about_wrap");    
    story_01.addClass("active");
    
    // 메인 스크롤 액션
    let tween = new TimelineMax(),
        line01 = new TimelineMax(),
        line02 = new TimelineMax(),
        line03 = new TimelineMax(),
        $line01 = $(".brd_ani_line01"),
        $line02 = $(".brd_ani_line02"),
        $line03 = $(".brd_ani_line03"),
        controller;
    
    // setTimeout(function() {
    //     brand_wrp.addClass("active");
    //     brandScrollMagic();
    // }, 4400);
        
    brand_wrp.addClass("active");
    brandScrollMagic();

    function pathPrepare01($el) {
        let lineLength = $el[0].getTotalLength();
        $el.css("stroke-dasharray", lineLength);
        $el.css("stroke-dashoffset", lineLength);
    }

    function pathPrepare02($el) {
        let lineLength = $el[0].getTotalLength();
        $el.css("stroke-dasharray", lineLength);
        $el.css("stroke-dashoffset", lineLength);
    }

    function pathPrepare03($el) {
        let lineLength = $el[0].getTotalLength();
        $el.css("stroke-dasharray", lineLength);
        $el.css("stroke-dashoffset", lineLength);
    }

    // prepare SVG
    pathPrepare01($line01);
    pathPrepare02($line02);
    pathPrepare03($line03);
    
    function brandScrollMagic() {
        // init controller
        controller = new ScrollMagic.Controller();
        tween.fromTo('.brand_philosophy', .5, {opacity:1}, {opacity:0});
        line01.add(TweenMax.to($line01, 1, {strokeDashoffset: 0, ease:Linear.easeNone})); // draw
        line02.add(TweenMax.to($line02, 1, {strokeDashoffset: 0, ease:Linear.easeNone})); // draw
        line03.add(TweenMax.to($line03, 1, {strokeDashoffset: 0, ease:Linear.easeNone})); // draw
            
        new ScrollMagic.Scene({triggerElement: "#trigger_01", duration: "100%", triggerHook:1, offset:90, tweenChanges: true})
        .setTween(tween)
        .setClassToggle('.brand_about_01', 'fade')
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: ".step_01",triggerHook:1, offset:90, tweenChanges: true})
        .setClassToggle('.step_01 .number, .step_01 .step_about', 'active')
        //.addIndicators()// add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: ".step_01 .step_line > svg", duration: "100%", triggerHook:1, offset:90, tweenChanges: true})
        .setTween(line01)
        //.addIndicators()// add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: ".step_02",triggerHook:1, offset:90, tweenChanges: true})
        .setClassToggle('.step_02 .number, .step_02 .step_about', 'active')
        //.addIndicators()// add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: ".step_02 .step_line > svg", duration: "100%", triggerHook:1, offset:90, tweenChanges: true})
        .setTween(line02)
        //.addIndicators()// add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: ".step_03",triggerHook:1, offset:90, tweenChanges: true})
        .setClassToggle('.step_03 .number, .step_03 .step_about', 'active')
        //.addIndicators()// add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: ".step_03 .step_line > svg", duration: "100%", triggerHook:1, offset:90, tweenChanges: true})
        .setTween(line03)
        //.addIndicators()// add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: ".step_04",triggerHook:1, offset:90, tweenChanges: true})
        .setClassToggle('.step_04 .step_final', 'active')
        //.addIndicators()// add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#trigger_02", triggerHook:1, tweenChanges: true})
        .setClassToggle('.brand_about_03', 'active')
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#trigger_03", triggerHook:1, tweenChanges: true})
        .setClassToggle('.brand_about_04', 'active')
        //.addIndicators() // add indicators (requires plugin)
        .on("enter", function () {
            $("footer").addClass("active");
            countNum();
        })
        .addTo(controller);
    }

});