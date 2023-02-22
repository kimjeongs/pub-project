$(document).ready(function () {
    /****** Tab Menu ******/
    $('.tab_menu .tab_list').click(function () {
        var activeTab = $(this).attr('data-tab');
        $(this).parents('.tab_menu').find('.tab_list').removeClass('current');
        $(this).addClass('current');
        $(this).parents('.tab_menu').next('.tab_cont').find('.tab_cont_item').stop().hide();
        $(this).parents('.tab_menu').next('.tab_cont').find('#' + activeTab).stop().show();
    });

    function tabOn2() {
        $('.tab_list li').removeClass('current');
        $(this).addClass('current');
        tabBar2();
    };

    $(document).on("click", ".tab_menu .tab_list", tabOn2);
    //Line Tab
    function tabBar2() {
        if ($(".line_tab").length > 0) {

            $(".line_tab").each(function () {
                if ($(".tab_bar").length < 1) {
                    $(this).append("<div class='tab_bar'></div>");
                };
                var bar = $(this).find(".tab_bar");
                var liWidth = $(this).find(".current").outerWidth();
                var marginLeft = parseInt($(this).find(".current").css("margin-left"));
                var left = $(this).find(".current").position().left + marginLeft;
                bar.css({
                    "width": liWidth,
                    "left": left
                });
            });

            $(".vertical_tab").each(function () {
                if ($(".tab_bar").length < 1) {
                    $(this).append("<div class='tab_bar'></div>");
                };
                var bar = $(this).find(".tab_bar");
                var liH = $(this).find(".current").outerHeight();
                var marginTop = parseInt($(this).find(".current").css("margin-top"));
                var top = $(this).find(".current").position().top + marginTop;
                bar.css({
                    "height": liH,
                    "top": top
                });
            });
        };
    };
    tabBar2();


    /****** Toggle Button ******/
    //Toggle Button Change Text
    $('.btn_toggle').click(function () {
        var toggleON = $(this).find('input[type=checkbox]').is(":checked");
        var toggleText = $(this).next('.btn_toggle_txt');
        var toggleTextValue = $(this).next('.btn_toggle_txt').text();
        if (toggleON) {
            if(toggleTextValue == 'OFF'){
                toggleText.text('ON');
            }else if(toggleTextValue == 'Unchecked toggle'){
                toggleText.text('Checked toggle');
            }
        } else {
            if(toggleTextValue == 'ON'){
                toggleText.text('OFF');
            }else if(toggleTextValue == 'Checked toggle'){
                toggleText.text('Unchecked toggle');
            }            
        }
    });
    //Toggle Button Disabled
    $('.btn_toggle').each(function (index, item) {
        var toggleDis = $(item).find('input[type=checkbox]').is(":disabled");
        if (toggleDis) {
            $(item).addClass('disabled');
        } else {
            $(item).removeClass('disabled');
        }
    });


    /****** File Uploader ******/
    $('.file_uploader').each(function (index, item) {
        $(item).find('.file_name .input_delete').on('click', function () {
            $(this).parents('.file_name').remove();
        });
        $(item).find('.input_file').on('change', function () {
            var fileCheck = $(this).val();
            if (fileCheck == '') {
                alert("파일을 첨부해 주세요");
            } else {
                var $div = $('<div class="file_name"><input type="text" readonly><i class="input_delete" onclick="removeFilename(this)"></i></div>');
                $(item).append($div);
                var fileName = $(this).val();
                //경로가 있는경우
                //$div.find('input').val(fileName);
                //경로가 없어야 하는 경우
                fileName = fileName.split("\\");
                $div.find('input').val(fileName[fileName.length - 1]);
            }
        });
    });


    /****** Select Box ******/
    $(document).on('click', '.select_box_value', function (e) {
        const t = $(this);
        if ($(this).parents('.select_box').hasClass('on')) {
            dropDownClose(t);
        } else {
            if($(this).parents('.select_box').hasClass('disabled')){
               return false;
            }
            $('.select_box').removeClass('on');
            selectBoxDown(t);
        }
    });
    $(document).on('click', '.select_box_list li', function (e) {
        selectBoxDownAction(this);
        SelectBoxChange(this);
    });

    function selectBoxDown(t) {
        const $selectBox = t.parents('.select_box');
        if (!t.hasClass('disabled')) {
            if ($selectBox.hasClass('on')) {
                $selectBox.removeClass('on')
            } else {
                $selectBox.addClass('on');
                $selectBox.siblings('.select_box').removeClass('on');
            }
            $('body').on('click', function (e) {
                if ($(e.target).closest('.select_box').length === 0 && $('.select_box').hasClass('on')) {
                    dropDownClose()
                }
            });
        };
    };

    function selectBoxDownAction(el) {
        $(el).parents('.select_box_list').find('li').not('.disabled').removeClass('selected');

        if (!$(el).parent('li').hasClass('disabled')) {
            $(el).addClass('selected');
        }
        $(el).parents('.select_box').removeClass('on')
    };

    function dropDownClose() {
        $('.select_box').removeClass('on');
    };
    //Change Select Box Value
    function SelectBoxChange(selectItem) {
        if ($(selectItem).find('ul').length <= 0) {
            var $cloneEle = $(selectItem).parents('.select_box').find('.select_box_value').children('span').children();
            var selectText = $(selectItem).text();
            clearInput(selectItem);
            $(selectItem).parents('.select_box').find('.select_box_value').children('span').text(selectText);
            $(selectItem).parents('.select_box').find('.select_box_value').children('span').addClass('selected');
            $(selectItem).parents('.select_box').find('.select_box_value').children('span').append($cloneEle);
        }
    };

    function clearInput(obj) {
        $(obj).parents('.select_box').find('.select_box_value').children('span').text("");
    };


    /****** Accordion ******/
    $(".accordion_heading").click(function () {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            $(this).find(".accordion_cont").stop().slideUp();
        } else {
            $(this).parent('.accordion_list').find('.accordion_heading').removeClass("on");
            $(this).parent('.accordion_list').find(".accordion_cont").stop().slideUp();
            $(this).addClass("on");
            $(this).find(".accordion_cont").stop().slideDown();
        }
    });


    /****** Data Tables ******/
    $('.dataTables_wrapper .dataTables_length').click(function () {
        $(this).toggleClass('on');
    });
    $('body').on('click', function (e) {
        if ($(e.target).closest('.dataTables_length').length === 0 && $('.dataTables_length').hasClass('on')) {
            $('.dataTables_length').toggleClass('on');
        }
    });

    /****** TextArea String Length Count ******/
    $('.input_writing_group').each(function (index, item) {
        $(item).find('textarea').on('keyup', function () {
            var regex = /[^0-9]/g; //숫자추출 정규식
            var total = $(this).next('.txt_count').find('.total').html().replace(regex, "");
            $(this).next('.txt_count').find('.current').html($(this).val().length);
            if ($(this).val().length > total) {
                alert(total + '자 이내로 작성해주세요')
                $(this).val($(this).val().substring(0, total));
                $(this).next('.txt_count').find('.current').html(total);
            };
        });
    });

    /****** Progress bar ******/
   if ($('.progress_bar').length > 0) {
      $(".progress_bar").each(function (i, block) {
         var regex = /[^0-9]/g; //숫자추출 정규식
         var progressR = $(block).html().replace(regex, "");//끝 값   
         var width = 0; //시작값
         var id = setInterval(frame, 15);//너비, 숫자표시 증가속도
         function frame() {
            if(progressR >= 100){
                  progressR = 100;
                  $(block).css('width', 100 + '%'); //너비       
            }
            if (width >= progressR) {
                  clearInterval(id);
                  cnt = 0;
            } else {
                  width++;
                  $(block).css('width', width + '%'); //너비
                  $(block).find('.progress_ratio').html(width + '%');  //숫자 표시
            }
         }
      });
   }

    /****** Pagination ******/
   if ($('.pagination').length > 0) {
      $('.pagination').each(function (index, item) {
          $(item).find('.page_link').on('click', function () {
            $(this).parents('li').siblings().not('.arr').removeClass('active');
            $(this).parent('li').addClass('active');      
         });
      });
   }

    //if($(".quickBtn").length > 0) {chatbotAction();}

    // textarea 글자수 카운트
    $('.text_area textarea').on('keyup', function(e) {
        e.preventDefault();
        let content = $(this).val(),
        commentLeng = content.length,
        mxLeng = $(this).attr("maxlength");
        if (content.length > mxLeng) {
            commentLeng = mxLeng;
        }
        $(this).closest(".text_area").find("strong").text(commentLeng);
    });

    // textarea 붙여넣기 글자수 카운트
    $('.inputTextarea').bind('input paste', function() {
        $(this).trigger('keyup');
    });

    //브랜드 스토어
    brandStore();

}) //ready


//File Uploader - Remove Choosed File
function removeFilename(t) {
    $(t).parents('.file_name').remove();
};

//DataTable Select All row
function dataTableSelect(dtable) {
    var dtable = dtable;
    $(".dataTable  .checkall").prop("checked", false);
    $(".checkall").click(function () {
        if ($(this).prop("checked")) {
            dtable.rows().select();
        } else {
            dtable.rows().deselect();
        }
    });
};

// 톤워크 스크립트 시작
let st = 0, //스크롤 초기값
colorTargetis = $(this), // this 타겟
ww = $(window).width(), // 윈도우 너비
last_scrollTop = 0;

// 메인 스와이퍼
function mainSwiper() {
    if (mySwiper == undefined) {
            mySwiper = new Swiper(".main_swiper", {
            slidesPerView: 1,
            simulateTouch: true,
            speed : 1000,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            preloadImages: true,
            updateOnImagesReady: true,
            grabCursor: true,
            effect: "creative",
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: ["-20%", 0, -1],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: 'true',
                type: 'bullets',
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + '<i></i>' + '<b></b>'  + '</span>';
                },
            },
            on : {
                activeIndexChange: function () {
                    $(".video_thum").addClass("active");
                }
            },
        });
    } else if (mySwiper != undefined) {
        mySwiper.destroy();
        mySwiper = undefined;
    }

    $(".main_swiper").on("mouseover", function(){
        mySwiper.autoplay.stop();
    });
        $(".main_swiper").on("mouseout", function(){
        mySwiper.autoplay.start();
    });
}

function mainSwiperPlay(event) {
    $(event).parent().removeClass("active");
    if($(event).attr("data-video") == "youtube"){
        let playurl = $(event).parent().siblings(".video_cnt").attr("data-url"),
        playHtml = '';
        playHtml
        += '<iframe src="https://www.youtube.com/embed/' + playurl +'?autoplay=1&amp;enablejsapi=1&amp;mute=1&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;controls=0&amp;loop=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>';
        $(event).parent().siblings(".video_cnt").html(playHtml);
        $(event).parent().siblings(".video_cnt").addClass("active");
    } else {
        $(event).parent().siblings(".video_cnt").addClass("active");
        $(event).parent().siblings(".video_cnt").trigger("play");
    }
}

// 헤더 gnb 액션
function headerAction(){
    st = $(this).scrollTop();
    wh = $(window).height();
    let header = $("header"),
    st_sum;
    if(wh < 700) {
        wh = 700;
        st_sum = st/wh *100;
        if (st_sum >= 45) {
            header.addClass("on");
        } else {
            header.removeClass("on");
        }
    } else {
        st_sum = st/wh *100;
        if (st_sum >= 45) {
            header.addClass("on");
        } else {
            header.removeClass("on");
        }
    }    
}

function mainSnsSwiper() {
	const mainSnsSwiper = new Swiper(".main_sns_swiper", {
		slidesPerView: 4,
		loop: false,
        freeMode: true,
        preloadImages: true,
        updateOnImagesReady: true,
		spaceBetween : 16,
        followFinger : true,
		observer: true,
		observeParents: true,
        /*breakpoints: {        
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 16,
            }
        },*/
	});
}

function basepickerM(){
    let base = $(".basepicker_about"),
    t_base = $(".basepicker_wrap"),
    base_imgH = base.find(".about_img").height()-40,
    t_baseH = base.height() - base_imgH;
    if( ww <=768 ) {
        t_base.css("padding-bottom", t_baseH);
    } else {
        t_base.removeAttr("style");
    }
}

// 퀵버튼 위치
function quickBtn(){
    st = $(this).scrollTop();
    let fh = $("footer").outerHeight(),
    colorTargetis = $(".quick_btn"),
    acth = $(window).height()/2,
    quick_btn_b = $(document).height() - $(window).height() - fh;
    if(st >= acth){
        colorTargetis.addClass("active");
        if($("#wrap").hasClass("main") || $("#container").hasClass("brand_story")){
            if(st >= quick_btn_b && $("footer").hasClass("active")){
                colorTargetis.css({"position":"absolute", "bottom":fh + 20});
            } else {
                colorTargetis.removeAttr("style");
            }
        } else {
            if(st >= quick_btn_b){
                colorTargetis.css({"position":"absolute", "bottom":fh + 20});
            } else {
                colorTargetis.removeAttr("style");
            }
        }
    } else {
        colorTargetis.removeClass("active");
    }
}

// 상단 바로가기
function go_top(){ // 맨위로 바로가기
    $('body, html').animate({scrollTop:0}, 300);
}

// slide 토글
function slide_toggle(event) {
    const prt_target = $(event).closest("dt"),
    orther_target = $(event).closest("li").siblings("li").find("dt"),
    target_leng = $(event).closest(".tbl_list").children("li").length,
    this_idx = $(event).closest("li").index() + 1,
    action_target = prt_target.siblings("dd");
    if($(event).parents().hasClass("product_view")){ // 제품 상세
        if(prt_target.hasClass("active")){
            if(this_idx == target_leng){
                $(event).closest(".tbl_list").removeClass("remove_line");
            }
            action_target.stop().slideUp(function(){
                prt_target.removeClass("active");
            });
        } else {
            if(this_idx == target_leng){
                $(event).closest(".tbl_list").addClass("remove_line");
            }
            action_target.stop().slideDown(function(){
                prt_target.addClass("active");
            });
        }
    } else { // FAQ 유형
        if(prt_target.hasClass("active")){
            action_target.stop().slideUp(function(){
                prt_target.removeClass("active");
            });
        } else {
            orther_target.removeClass("active");
            orther_target.siblings("dd").slideUp();
            action_target.stop().slideDown(function(){
                prt_target.addClass("active");
            });
        }
    }
}

// 이벤트 뷰 상품 슬라이드
function rcpSwiper() {
	const rcpSwiper = new Swiper(".rcp_swiper", {
		slidesPerView: 3,
        centeredSlides: true,
		loop: true,
        preloadImages: true,
        updateOnImagesReady: true,
		spaceBetween : 16,
        touchRatio: 0,
		observer: true,
		observeParents: true,
        navigation: {
            nextEl: ".rcp_swiper .swiper-button-next",
            prevEl: ".rcp_swiper .swiper-button-prev"
        },
        /*breakpoints: {        
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 16,
            }
        },*/
	});
}

/* 베스트 리뷰
function reviewSwiper() {
    let rvSwiperOpt = {
        slidesPerView: "auto",
		loop: true,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
        simulateTouch: true,
        speed: 5000,
        freeMode: true,
        preloadImages: true,
        updateOnImagesReady: true,
		spaceBetween : 16,
		observer: true,
		observeParents: true,
        freeModeMomentum: false
    }
    let rvSwiper = new Swiper(".review_swiper", rvSwiperOpt);
    let rvWrapper = document.querySelector(".review_swiper .swiper-wrapper");
    let transformValue;

    rvWrapper.addEventListener("mouseenter", (event) => {
        rvSwiper.autoplay.pause();
        transformValue = rvWrapper.style.transform;
        //rvWrapper.style.transitionDuration = "0ms";
        rvWrapper.style.transform =
            "translate3d(" + rvSwiper.getTranslate() + "px, 0px, 0px)";
    });
    rvWrapper.addEventListener("mouseleave", (event) => {
        //rvWrapper.style.transitionDuration = rvSwiper.params.speed + "ms";
        //rvWrapper.style.transform = transformValue;
        rvSwiper.autoplay.pause();
    });
}
*/

/* 베스트 리뷰 */
function reviewSwiper() {
    let itemWid = $(".slide_item").outerWidth(),
    itemH = $(".slide_item").outerHeight(),
    mleft = 0,
    clone = $('.slide_wrapper').children().clone(),
    timer = setInterval(move, 20);

    $('.review_slide').height(itemH);
    clone.appendTo(".slide_wrapper");
    $(".review_slide").on("mouseenter", function(){
        clearInterval(timer);
    });
    $('.review_slide').on('mouseleave',function(){
		timer = setInterval(move, 20);
	});

    function move(){
		mleft -= 2;
		if (mleft < - itemWid) {
			$('.slide_wrapper .slide_item').first().appendTo('.slide_wrapper');
			mleft = 0;
            itemWid = $(".slide_item").outerWidth();
		}
		$('.slide_wrapper').css({'left' : mleft});
	}
}

function reviewMore(event) { // 리뷰 더보기
    const prt_target = $(event).siblings(".review_details"),
    text_target = prt_target.find(".review_cnt"),
    point_target = prt_target.find(".point_details");
    if(prt_target.hasClass("active")){ // 접기
        prt_target.removeClass("active");
        point_target.stop().slideUp();
        $(event).removeClass("on");
        $(event).html("더보기");
    } else { // 더보기
        prt_target.addClass("active");
        point_target.stop().slideDown();
        $(event).addClass("on");
        $(event).html("접기");
    }
}

function like(event) { // 좋아요
    const target = $(event),
    target_num = $(event).find("span");
    let count_like = $(event).find("span").html();
    

    if(target.hasClass("active")){
        count_like--
        let count_add = count_like+1;
        target.removeClass("active");
        $({ count_add }).animate({
            count_add: count_like
        },{
            duration: 200, 
            easing:'linear',
            step: function() {
                target_num.text(numberWithCommas(Math.floor(this.count_add)));
            },
            complete: function() {
                target_num.text(numberWithCommas(Math.floor(this.count_add)));
            }
        });
    } else {
        count_like++
        let count_add = count_like-1;
        target.addClass("active");
        $({ count_add }).animate({
            count_add: count_like
        },{
            duration: 200, 
            easing:'linear',
            step: function() {
                target_num.text(numberWithCommas(Math.floor(this.count_add)));
            },
            complete: function() {
                target_num.text(numberWithCommas(Math.floor(this.count_add)));
            }
        });
    }
}

function countNum() {
    $('.count_num').each(function() { 
        let $this = $(this),
        $this_num = $this.html() - 10,
        countTo = $this.attr('data-count');
        $({ countNum: $this_num}).animate({
            countNum: countTo 
        },{
            duration: 1000, 
            easing:'linear',
            step: function() {
                $this.text(numberWithCommas(Math.floor(this.countNum)));
            },
            complete: function() {
                $this.text(numberWithCommas(Math.floor(this.countNum)));
            }
        });
    });
}

// 카운트 숫자 콤마처리
function numberWithCommas(x) { 
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//팝업 열기
function openPopup(el){
    var $modalWrap = $(el)
    $modalWrap.addClass('open')
    popupCase(el);
}
//팝업 위치
function popupCase(el){
    var $modal = $(el).find('.modal');
    var $modalCloseBtn = $(el).find('.modal_close');
    var $modalH = $modal.height();
    var $winW = $(window).innerWidth();
    var $winH = $(window).innerHeight();
    if ($modalH > $winH) {
        $modal.addClass('absolute');
    } else {
        $modal.removeClass('absolute');
    }
    $modalCloseBtn.on("click", function() {
        $(this).parents(".modal_wrap").removeClass("open");
    });
}

//리뷰 이미지 슬라이드
function reviewModalImgSwiper() {
    const reviewPopImgSwiper = new Swiper(".review_modal_swiper", {
        slidesPerView: 1,
        loop: false,
        preloadImages: true,
        updateOnImagesReady: true,
        spaceBetween : 0,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".review_modal_swiper .swiper-button-next",
            prevEl: ".review_modal_swiper .swiper-button-prev"
        },
        pagination: {
            el: '.review_modal_swiper .swiper-pagination',
            clickable: 'true',
            type: 'bullets',
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + '<span class="blind">'+ index + '번째 사진' +'</span>' + '</span>';
            },
        },
    });
}
// 제품상세 색상 선택
function colorAction() {
    controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({triggerElement: ".color_select_filter", triggerHook:0.8, tweenChanges: true})
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller)
        .on("start end", function () {
            colorLoading();
            fixedBtnShow();
    });
}
function colorMouseAct() { // color select mouse Action
    const body = document.querySelector('.color_select_box');

    if (body) {
        const   bodyItems           = body.querySelector('.color_select'),
                bodyColumns         = bodyItems.querySelectorAll('.color_list li'),
                speed               = 0.02;
        let     positionX           = 0,
                coordsXPercent      = 0;
    
        function setMouseGalleryStyle() {
            let bodyItemsWidth = 0;
            
            bodyColumns.forEach(element => {
                bodyItemsWidth += element.offsetWidth;
            });
    
            const   diff    = bodyItemsWidth - body.offsetWidth;
                    distX   = Math.floor(coordsXPercent - positionX);
    
            positionX = positionX + (distX * speed);
    
            const position = diff / 200 * positionX;
    
            bodyItems.style.cssText = `transform: translate3d(${-position}px, 0, 0)`;
    
            if (Math.abs(distX) > 0) {
                requestAnimationFrame(setMouseGalleryStyle);
            } else {
                body.classList.remove('init');
            }
        }
    
        body.addEventListener('mousemove', function(e) {
            const   bodyWidth = body.offsetWidth;
                    coordX = e.pageX - bodyWidth / 2;
    
            coordsXPercent = coordX / bodyWidth * 200;
    
            if (!body.classList.contains('init')) {
                requestAnimationFrame(setMouseGalleryStyle);
                body.classList.add('init');
            }
        });
    }
}

function colorLoading(){ // 컬러 select 로딩
    const parentT = $(".color_list"),
    listT = parentT.children("li").length,
    listEq = Math.ceil(listT/2);

    parentT.addClass("loading");
    parentT.find("li").eq(listEq-1).addClass("active");
    setTimeout(function(){
        let thisNum_N = listEq-1,
        thisNum_P = listEq-1,
        isValid = true;
        parentT.find("li").each(function(){
            let thisT = parentT.find("li").eq(thisNum_N);
            
            if(thisT.next().length!==0){
                setInterval(function(){
                    thisT.next().addClass("on");
                    thisT = parentT.find("li").eq(thisNum_N);
                    thisNum_N = thisNum_N+1;
                }, 100);
                isValid = false;
                return false;
            }
        });

        parentT.find("li").each(function(){
            let thisT = parentT.find("li").eq(thisNum_P);
            if(thisT.prev().length!==0){
                setInterval(function(){
                    if(thisT.prev().hasClass("active")==false){
                        thisT.prev().addClass("on");
                    }
                    thisT = parentT.find("li").eq(thisNum_P);
                    thisNum_P = thisNum_P-1;
                }, 100);
                isValid = false;
                return false;
            }
        });
        
        colorMouseAct();
    },100);
}

// 제품 목록
function prdListAction(){
   var headerH = $("header").outerHeight();
   let prdListcontroller = new ScrollMagic.Controller();
   var prdListTitH = $('.prd_list_tit').outerHeight();
   var regex = /[^0-9]/g; //숫자추출 정규식
   var gridPadding = $('.grid_wrap').css('padding-left').replace(regex, "")

   var prdListTitAct = TweenMax.fromTo('.prd_list_tit', 0.5,{left:0, top: -286, fontSize: "9.64vw", textAlign:"center"},{left:gridPadding,  top:-prdListTitH, fontSize: "4.79vw", textAlign:"left"});
   var prdListWrapAct = TweenMax.fromTo('.prd_list_wrap', 0.5,{paddingTop:0},{paddingTop:204});
   
   
   //제품목록 제목액션
  new ScrollMagic.Scene({
     triggerElement: "#trigger1",
     triggerHook:0,
     duration: 364 - headerH,
     tweenChanges: true
  })
  .setTween(prdListTitAct)
  .addTo(prdListcontroller)
  .on("end", function () {
     $('.prd_list_wrap').toggleClass('scroll')
  });
     
  //제품목록 제목 위치 패딩 액션
  new ScrollMagic.Scene({
     triggerElement: "#trigger1",
     triggerHook:0,
     duration: 364 - headerH,
     tweenChanges: true
  })
  .setTween(prdListWrapAct)
  .addTo(prdListcontroller)
   //.addIndicators({name: "indicator_1"})
}

// 제품 상세 스와이퍼
function prdSwiper(){
    const prdThumb = new Swiper(".prd_thumb", {
        slidesPerView: 5,
        direction: "horizontal",
        loop: false,
        preloadImages: true,
        updateOnImagesReady: true,
        spaceBetween : 0,
        observer: true,
        observeParents: true,    
        freeMode:true,
        breakpoints: {
            1263: {
                direction: "vertical",
            },
        },
    });
    const prdSwiper = new Swiper(".prd_swiper", {
        effect: "fade",
        loop: false,
        preloadImages: true,
        updateOnImagesReady: true,
        spaceBetween : 0,
        observer: true,
        observeParents: true,
        allowTouchMove : false,
        thumbs: {
            swiper: prdThumb
        },
    });
}

// 총점
function totalScore(){
    const totalScore = $(".total_score").find(".total_score_num");
    totalScore.each(function(){
        const scoreT = $(this).siblings(".total_score_star").find(".star_bg_ico"),
        dist_score =  $(this).parents().hasClass("dist_score"),
        dist_scoreT = $(this).parent(".total_score").siblings(".progressbar_box").find(".progressbar_bar");
        let thisScore = $(this).html()*20,
        sumdata = 0,
        dist_scoreNum = 0;
        if(dist_score == true){
            $('.user_num').each(function() {
                sumdata += parseFloat($(this).text());
            });
            dist_scoreNum = $(this).parent(".total_score").siblings(".user_num").html()/sumdata *100;
            dist_scoreT.css("width", dist_scoreNum + "%");
            scoreT.css("width", thisScore + "%");
        } else {
            scoreT.css("width", thisScore + "%");
        }
        
    });
}

function scroll_drag() { // 리뷰작성 컬러선택 마우스 드래그
    let dragFlag = false,
    x, y, pre_x, pre_y;
    const drag_t = $(".opt_color").find(".tone_list_box");

    drag_t.mousedown(
        function (e) {
            dragFlag = true;
            var obj = $(this);
            x = obj.scrollLeft();
            y = obj.scrollTop();
                
            pre_x = e.screenX;
            pre_y = e.screenY;                    
                onclick=false;
            $(this).css("cursor", "pointer");
        }
    );

    drag_t.mousemove(
        function (e) {
            if (dragFlag) {
                var obj = $(this);
                obj.scrollLeft(x - e.screenX + pre_x);
                obj.scrollTop(y - e.screenY + pre_y);
                //$('#result').text((x - e.screenX + pre_x) + "," + (y - e.screenY + pre_y));
                return false;
            }
        }
    );

    drag_t.mouseup(
        function () {
            dragFlag = false;     
            $("#tab1").off("click");
            $(this).css("cursor", "default");
            return false;
        }
    );
}

function fixedBtnShow() { // 제품상세 fixed btn show
    const fixBtn = $(".fixed_prd_box");
    fixBtn.toggleClass("on");
}

function reviewWrite() {
    const reviewWT = $(".write_slide");
    reviewWT.stop().slideDown();
}

// 브랜드 스토어
function brandStore() {
    const targetCont = $('.brand_store .store_cont .full_visual_img');
    let targetContTop = [];
    const dist = 400;
    let winW;
    const tbW = 768;

    $(window).on('resize scroll',function(e) {
        if(e.type == 'scroll' && winW > tbW) { //window scroll
            const scroll = $(this).scrollTop();
            for (let i = 0; i < targetCont.length; i++) {
                if (scroll > targetContTop[i] - dist) {
                    targetCont.eq(i).addClass('ir');
                } else {
                    targetCont.eq(i).removeClass('ir');
                }
            }      
        } else { //window resize
            fullCont();
        }
    })

    //width full & resize
    function fullCont() {
        winW = $(window).width(); 
        const gridW = $('.grid_wrap').width();
        const margin = (winW - gridW) / 2;
        
        targetCont.each(function() {
            const contTop = $(this).offset().top;
            targetContTop.push(contTop);
        })
        targetCont.css({
            marginLeft : -margin,
            marginRight : -margin
        })
    } fullCont();
}