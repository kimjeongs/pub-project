$(document).ready(function () {
  /****** Tab Menu ******/
  $(".tab_menu .tab_list").click(function () {
    var activeTab = $(this).attr("data-tab");
    $(this).parents(".tab_menu").find(".tab_list").removeClass("current");
    $(this).addClass("current");
    $(this)
      .parents(".tab_menu")
      .next(".tab_cont")
      .find(".tab_cont_item")
      .stop()
      .hide();
    $(this)
      .parents(".tab_menu")
      .next(".tab_cont")
      .find("#" + activeTab)
      .stop()
      .show();
  });

  function tabOn2() {
    $(".tab_list li").removeClass("current");
    $(this).addClass("current");
    tabBar2();
  }

  $(document).on("click", ".tab_menu .tab_list", tabOn2);
  //Line Tab
  function tabBar2() {
    if ($(".line_tab").length > 0) {
      $(".line_tab").each(function () {
        if ($(".tab_bar").length < 1) {
          $(this).append("<div class='tab_bar'></div>");
        }
        var bar = $(this).find(".tab_bar");
        var liWidth = $(this).find(".current").outerWidth();
        var marginLeft = parseInt($(this).find(".current").css("margin-left"));
        var left = $(this).find(".current").position().left + marginLeft;
        bar.css({
          width: liWidth,
          left: left,
        });
      });

      $(".vertical_tab").each(function () {
        if ($(".tab_bar").length < 1) {
          $(this).append("<div class='tab_bar'></div>");
        }
        var bar = $(this).find(".tab_bar");
        var liH = $(this).find(".current").outerHeight();
        var marginTop = parseInt($(this).find(".current").css("margin-top"));
        var top = $(this).find(".current").position().top + marginTop;
        bar.css({
          height: liH,
          top: top,
        });
      });
    }
  }
  tabBar2();

  /****** Toggle Button ******/
  //Toggle Button Change Text
  $(".btn_toggle").click(function () {
    var toggleON = $(this).find("input[type=checkbox]").is(":checked");
    var toggleText = $(this).next(".btn_toggle_txt");
    var toggleTextValue = $(this).next(".btn_toggle_txt").text();
    if (toggleON) {
      if (toggleTextValue == "OFF") {
        toggleText.text("ON");
      } else if (toggleTextValue == "Unchecked toggle") {
        toggleText.text("Checked toggle");
      }
    } else {
      if (toggleTextValue == "ON") {
        toggleText.text("OFF");
      } else if (toggleTextValue == "Checked toggle") {
        toggleText.text("Unchecked toggle");
      }
    }
  });
  //Toggle Button Disabled
  $(".btn_toggle").each(function (index, item) {
    var toggleDis = $(item).find("input[type=checkbox]").is(":disabled");
    if (toggleDis) {
      $(item).addClass("disabled");
    } else {
      $(item).removeClass("disabled");
    }
  });

  /****** File Uploader ******/
  $(".file_uploader").each(function (index, item) {
    $(item)
      .find(".file_name .input_delete")
      .on("click", function () {
        $(this).parents(".file_name").remove();
      });
    $(item)
      .find(".input_file")
      .on("change", function () {
        var fileCheck = $(this).val();
        if (fileCheck == "") {
          alert("파일을 첨부해 주세요");
        } else {
          var $div = $(
            '<div class="file_name"><input type="text" readonly><i class="input_delete" onclick="removeFilename(this)"></i></div>'
          );
          $(item).append($div);
          var fileName = $(this).val();
          //경로가 있는경우
          //$div.find('input').val(fileName);
          //경로가 없어야 하는 경우
          fileName = fileName.split("\\");
          $div.find("input").val(fileName[fileName.length - 1]);
        }
      });
  });

  /****** Select Box ******/
  $(document).on("click", ".select_box_value", function (e) {
    const t = $(this);
    if ($(this).parents(".select_box").hasClass("on")) {
      dropDownClose(t);
    } else {
      if ($(this).parents(".select_box").hasClass("disabled")) {
        return false;
      }
      $(".select_box").removeClass("on");
      selectBoxDown(t);
    }
  });
  $(document).on("click", ".select_box_list li", function (e) {
    selectBoxDownAction(this);
    SelectBoxChange(this);
  });

  function selectBoxDown(t) {
    const $selectBox = t.parents(".select_box");
    if (!t.hasClass("disabled")) {
      if ($selectBox.hasClass("on")) {
        $selectBox.removeClass("on");
      } else {
        $selectBox.addClass("on");
        $selectBox.siblings(".select_box").removeClass("on");
      }
      $("body").on("click", function (e) {
        if (
          $(e.target).closest(".select_box").length === 0 &&
          $(".select_box").hasClass("on") &&
          $(e.target).closest(".ui-datepicker-header").length === 0 &&
          !$(e.target).is('.ui-datepicker-calendar') &&
          !$(e.target).is('#ui-datepicker-div')
        ) {
          dropDownClose();
        }
      });
    }
  }

  function selectBoxDownAction(el) {
    $(el)
      .parents(".select_box_list")
      .find("li")
      .not(".disabled")
      .removeClass("selected");

    if (!$(el).parent("li").hasClass("disabled")) {
      $(el).addClass("selected");
    }
    $(el).parents(".select_box").removeClass("on");
  }

  function dropDownClose() {
    $(".select_box").removeClass("on");
  }
  //Change Select Box Value
  function SelectBoxChange(selectItem) {
    if (
      $(selectItem).find("ul").length <= 0 &&
      $(selectItem).find(".two_col").length <= 0
    ) {
      var $cloneEle = $(selectItem)
        .parents(".select_box")
        .find(".select_box_value")
        .children("span")
        .children();
      var selectText = $(selectItem).text();
      clearInput(selectItem);
      $(selectItem)
        .parents(".select_box")
        .find(".select_box_value")
        .children("span")
        .text(selectText);
      $(selectItem)
        .parents(".select_box")
        .find(".select_box_value")
        .children("span")
        .addClass("selected");
      $(selectItem)
        .parents(".select_box")
        .find(".select_box_value")
        .children("span")
        .append($cloneEle);
    }
  }

  function clearInput(obj) {
    $(obj)
      .parents(".select_box")
      .find(".select_box_value")
      .children("span")
      .text("");
  }

  /****** Accordion ******/
  $(".accordion_heading").each(function () {
    if ($(this).hasClass("on")) {
      $(this).find(".accordion_cont").show();
    }
  });

  $(".accordion_arr").click(function () {
    const accorHeading = $(this).parents(".accordion_heading");
    if (accorHeading.hasClass("on")) {
      accorHeading.removeClass("on");
      accorHeading.find(".accordion_cont").stop().slideUp();
    } else {
      $(this)
        .parents(".accordion_list")
        .find(".accordion_heading")
        .removeClass("on");
      $(this)
        .parents(".accordion_list")
        .find(".accordion_cont")
        .stop()
        .slideUp();
      accorHeading.addClass("on");
      accorHeading.find(".accordion_cont").stop().slideDown();
    }
  });

  /****** Data Tables ******/
  $(".dataTables_wrapper .dataTables_length").click(function () {
    $(this).toggleClass("on");
  });
  $("body").on("click", function (e) {
    if (
      $(e.target).closest(".dataTables_length").length === 0 &&
      $(".dataTables_length").hasClass("on")
    ) {
      $(".dataTables_length").toggleClass("on");
    }
  });

  /****** TextArea String Length Count ******/
  $(".input_writing_group").each(function (index, item) {
    $(item)
      .find("textarea")
      .on("keyup", function () {
        var regex = /[^0-9]/g; //숫자추출 정규식
        var total = $(this)
          .next(".txt_count")
          .find(".total")
          .html()
          .replace(regex, "");
        $(this).next(".txt_count").find(".current").html($(this).val().length);
        if ($(this).val().length > total) {
          alert(total + "자 이내로 작성해주세요");
          $(this).val($(this).val().substring(0, total));
          $(this).next(".txt_count").find(".current").html(total);
        }
      });
  });

  /****** Progress bar ******/
  if ($(".progress_bar").length > 0) {
    $(".progress_bar").each(function (i, block) {
      var regex = /[^0-9]/g; //숫자추출 정규식
      var progressR = $(block).html().replace(regex, ""); //끝 값
      var width = 0; //시작값
      var id = setInterval(frame, 15); //너비, 숫자표시 증가속도
      function frame() {
        if (progressR >= 100) {
          progressR = 100;
          $(block).css("width", 100 + "%"); //너비
        }
        if (width >= progressR) {
          clearInterval(id);
          cnt = 0;
        } else {
          width++;
          $(block).css("width", width + "%"); //너비
          $(block)
            .find(".progress_ratio")
            .html(width + "%"); //숫자 표시
        }
      }
    });
  }

  /****** Pagination ******/
  if ($(".pagination").length > 0) {
    $(".pagination").each(function (index, item) {
      $(item)
        .find(".page_link")
        .on("click", function () {
          $(this).parents("li").siblings().not(".arr").removeClass("active");
          $(this).parent("li").addClass("active");
        });
    });
  }

  //if($(".quickBtn").length > 0) {chatbotAction();}

  // textarea 글자수 카운트
  $(".text_area textarea").on("keyup", function (e) {
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
  $(".inputTextarea").bind("input paste", function () {
    $(this).trigger("keyup");
  });
  //검색옵션 버튼
  $(".btn_search_opt").click(function () {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
    } else {
      $(this).addClass("open");
    }
  });

  if ($(".brand_story").length > 0) {
    $("body").css("overflow-y", "scroll");
  }
  //폼 셀렉트박스
  $(".form_select_box .select_box_list li").each(function () {
    $(this).on("click", function () {
      selectBoxAddClass(this);
    });
  });

  allCheck(); //체크박스 전체 선택
  toggleBtn(); //toggle 버튼
}); //ready

//File Uploader - Remove Choosed File
function removeFilename(t) {
  $(t).parents(".file_name").remove();
}

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
}

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
      speed: 1000,
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
        el: ".swiper-pagination",
        clickable: "true",
        type: "bullets",
        renderBullet: function (index, className) {
          return (
            '<span class="' +
            className +
            '">' +
            "<i></i>" +
            "<b></b>" +
            "</span>"
          );
        },
      },
      // 동영상 버튼 클릭시 사용
      // on: {
      //   beforeTransitionStart: function () {
      //     if ($(".video_box").length > 0) {
      //       $(".video_thum").addClass("active");
      //       $(".video_cnt").find("iframe").remove();
      //       if ($("video.video_cnt").length > 0) {
      //         $("video.video_cnt").get(0).pause();
      //         $("video.video_cnt").get(0).currentTime = 0;
      //       }
      //     }
      //   },
      // },
    });
  } else if (mySwiper != undefined) {
    mySwiper.destroy();
    mySwiper = undefined;
  }

  $(".main_swiper").on("mouseover", function () {
    mySwiper.autoplay.stop();
  });
  $(".main_swiper").on("mouseout", function () {
    mySwiper.autoplay.start();
  });
}

function mainSwiperPlay(event) {
  $(event).parent().removeClass("active");
  if ($(event).attr("data-video") == "youtube") {
    let playurl = $(event).parent().siblings(".video_cnt").attr("data-url"),
      playHtml = "";
    playHtml +=
      '<iframe src="https://www.youtube.com/embed/' +
      playurl +
      '?autoplay=1&amp;enablejsapi=1&amp;mute=1&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;controls=0&amp;loop=1&amp;playlist=' + playurl + '" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
    $(event).parent().siblings(".video_cnt").html(playHtml);
    $(event).parent().siblings(".video_cnt").addClass("active");
  } else {
    $(event).parent().siblings(".video_cnt").addClass("active");
    $(event).parent().siblings(".video_cnt").trigger("play");
  }
}

// main_cnt_02
function mainAutoRolling() {
  const rollingWrap = $('.rolling_wrap');
  
  rollingWrap.each(function() {
    const item = $(this).find('.item');
    let currentIdx = 0;

    item.each(function(i){
      $(this).css({top:`${i*100}%`});
    })    
  
    function move(i) {
      const currentSlide = item.eq(currentIdx);
      const nextSlide = item.eq(i);

      currentSlide.animate({top:'-100%'});
      nextSlide.css({top:'100%'}).animate({top:0});
      
      currentIdx = i;
    }

    function autoRolling() {
      setInterval(() => {
        let nextIdx = currentIdx + 1;
        if(nextIdx === item.length) {
          nextIdx = 0;
        }
        move(nextIdx);
      },3000)
    }

    autoRolling();
  })

  setInterval(() => {
    $('.main_cnt_02').toggleClass('active')
  },3000)
}

// 메인 솔루션 스와이퍼
function solutionSwiper() {
  const solutionSwiper = new Swiper(".swiper-solution", {
    direction: "vertical",
    effect: "slide",
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
      reverseDirection: false,
      disableOnInteraction: false,
    },
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// 메인 팝업업
function infoPopSwiper() {
  const reviewPopImgSwiper = new Swiper(".info-modal-swiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    observer: true,
    observeParents: true,
    watchOverflow : true, 
    navigation: {
      nextEl: ".info-modal-swiper .swiper-button-next",
      prevEl: ".info-modal-swiper .swiper-button-prev",
    },
    pagination: {
      el: ".info-modal-swiper .swiper-pagination",
      clickable: "true",
      type: "bullets",
    },
  });

  const infoPopClose = $('.info_modal').find('.modal_close');
  infoPopClose.on('click',function() {
    if($(this).parents('.info_modal').is('.open')) {
      $(this).parents('.info_modal').removeClass('open');
      $("body").css("overflow", "visible");
    } else {
      $(this).parents('.info_modal').addClass('open');
      $("body").css("overflow", "hidden");
    }
  })
}

// 헤더 gnb 액션
function headerAction() {
  st = $(this).scrollTop();
  wh = $(window).height();
  const header = $("header");
  let st_sum;
  if (wh < 700) {
    wh = 700;
    st_sum = (st / wh) * 100;
    if (st_sum >= 45) {
      header.addClass("on");
    } else {
      header.removeClass("on");
    }
  } else {
    st_sum = (st / wh) * 100;
    if (st_sum >= 45) {
      header.addClass("on");
    } else {
      header.removeClass("on");
    }
  }
}

function gnbAction() {
  const header = $("header");
  let menu_btn = $(".btn_gnb_menu"),
    gnbList = $(".gnb");

  menu_btn.toggleClass("active");

  if (gnbList.hasClass("active")) {
    gnbList.removeClass("active");
  } else {
    setTimeout(function () {
      gnbList.addClass("active");
    }, 500);
  }

  header.toggleClass("active");
  return false;
}

function gnbListToggle(event) {
  let $this = $(event),
    depth_01 = $this.parent(".depth_01"),
    depth_02 = depth_01.find(".depth_02"),
    other = depth_01.siblings(".depth_01");
  (other_depth_02 = other.find(".depth_02")),
    (all_depth_02 = $(".gnb_list").find(".depth_02")),
    (href = $this.data("href"));

  if (ww >= 1264) {
    location.href = href;
  } else {
    if (depth_02.length == 0) {
      //depth2 가 없을 경우
      location.href = href;
    } else {
      // depth2가 있을 경우
      if (depth_01.hasClass("active")) {
        depth_02.stop().slideUp(function () {
          depth_01.removeClass("active");
          depth_02.removeAttr("style");
        });
      } else {
        depth_01.addClass("active");
        depth_02.stop().slideDown();
        other_depth_02.slideUp(function () {
          other.removeClass("active");
          other_depth_02.removeAttr("style");
        });
      }
    }
  }
}

function mainSnsSwiper() {
  const mainSnsSwiper = new Swiper(".main_sns_swiper", {
    slidesPerView: 1.3,
    loop: false,
    freeMode: true,
    preloadImages: true,
    updateOnImagesReady: true,
    spaceBetween: 16,
    followFinger: true,
    observer: true,
    observeParents: true,
    breakpoints: {
      769: {
        slidesPerView: 4,
      },
    },
  });
}

function basepickerM() {
  let base = $(".basepicker_about"),
    t_base = $(".basepicker_wrap"),
    base_imgH = base.find(".about_img").height() - 40,
    t_baseH = base.height() - base_imgH;
  if (ww <= 768) {
    t_base.css("padding-bottom", t_baseH);
  } else {
    t_base.removeAttr("style");
  }
}

// 모바일 푸터 토글
function m_footerToggle() {
  $(".footer").toggleClass("on");
}

// 퀵버튼 위치
function quickBtn() {
  st = $(this).scrollTop();
  let fh = $("footer").outerHeight(),
    quick = $(".quick_btn"),
    acth = $(window).height() / 2;
  quick_btn_b = $(document).height() - $(window).height() - fh;
  if ($(".product_view").length > 0) {
    quick.addClass("top");
    review_quickActive();
  } else {
    quickActive();
  }
  function quickActive() {
    if (st >= acth) {
      quick.addClass("active");
    } else {
      quick.removeClass("active");
    }
  }

  function review_quickActive() {
    if (st >= acth) {
      quick.addClass("active");
    } else {
      quick.removeClass("active");
    }
    if (st >= quick_btn_b) {
      quick.removeClass("top");
    } else {
      quick.addClass("top");
    }
  }
}

// 공유하기 열기
function shareItemOpen(event) {
  let $this = $(event),
    item = $(".share_list");
  $this.siblings(item).addClass("active");
}

// 공유하기 닫기
function shareItemClose(event) {
  let $this = $(event),
    item = $(".share_list");
  $this.parent(item).removeClass("active");
}

// 상단 바로가기
function go_top() {
  // 맨위로 바로가기
  $("body, html").animate({ scrollTop: 0 }, 300);
}

// slide 토글
function slide_toggle(event) {
  const prt_target = $(event).closest("dt"),
    orther_target = $(event).closest("li").siblings("li").find("dt"),
    target_leng = $(event).closest(".tbl_list").children("li").length,
    this_idx = $(event).closest("li").index() + 1,
    action_target = prt_target.siblings("dd");
  if ($(event).parents().hasClass("product_view")) {
    // 제품 상세
    if (prt_target.hasClass("active")) {
      if (this_idx == target_leng) {
        $(event).closest(".tbl_list").removeClass("remove_line");
      }
      action_target.stop().slideUp(function () {
        prt_target.removeClass("active");
      });
    } else {
      if (this_idx == target_leng) {
        $(event).closest(".tbl_list").addClass("remove_line");
      }
      action_target.stop().slideDown(function () {
        prt_target.addClass("active");
      });
    }
  } else {
    // FAQ 유형
    if (prt_target.hasClass("active")) {
      action_target.stop().slideUp(function () {
        prt_target.removeClass("active");
      });
    } else {
      orther_target.removeClass("active");
      orther_target.siblings("dd").slideUp();
      action_target.stop().slideDown(function () {
        prt_target.addClass("active");
      });
    }
  }
}

function ft_Swiper() {
  let filterInit = undefined;

  function filterSelSwiper() {
    let ww = $(window).width();
    if (ww < 769 && filterInit == undefined) {
      filterSwiper = new Swiper(".filter_item", {
        slidesPerView: "auto",
        loop: false,
        freeMode: true,
        preloadImages: true,
        updateOnImagesReady: true,
        spaceBetween: 8,
        followFinger: true,
        observer: true,
        observeParents: true,
      });
    } else if (ww >= 769 && filterInit != undefined) {
      Swiper.destroy();
      filterInit = undefined;
      $(".swiper-wrapper").removeAttr("style");
      $(".swiper-slide").removeAttr("style");
    }
  }

  filterSelSwiper();

  $(window).on("resize", function () {
    filterSelSwiper();
  });
}

// 이벤트 뷰 상품 슬라이드
function rcpSwiper() {
  const rcpSwiper = new Swiper(".rcp_swiper", {
    slidesPerView: 1,
    loop: false,
    preloadImages: true,
    updateOnImagesReady: true,
    spaceBetween: 16,
    touchRatio: 0,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".rcp_swiper .swiper-button-next",
      prevEl: ".rcp_swiper .swiper-button-prev",
    },
    breakpoints: {
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1264: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
  });
}

/* 베스트 리뷰 */
function reviewSwiper() {
  let itemWid = $(".slide_item").outerWidth(),
    itemH = $(".slide_item").outerHeight(),
    mleft = 0,
    clone = $(".slide_wrapper").children().clone(),
    timer = setInterval(move, 20);

  $(".review_slide").height(itemH);
  clone.appendTo(".slide_wrapper");
  $(".review_slide").on("mouseenter", function () {
    clearInterval(timer);
  });
  $(".review_slide").on("mouseleave", function () {
    timer = setInterval(move, 20);
  });

  function move() {
    mleft -= 2;
    if (mleft < -itemWid) {
      $(".slide_wrapper .slide_item").first().appendTo(".slide_wrapper");
      mleft = 0;
      itemWid = $(".slide_item").outerWidth();
    }
    $(".slide_wrapper").css({ left: mleft });
  }
}

function reviewMore(event) {
  // 리뷰 더보기
  const prt_target = $(event).siblings(".review_details"),
    text_target = prt_target.find(".review_cnt"),
    point_target = prt_target.find(".point_details");
  if (prt_target.hasClass("active")) {
    // 접기
    prt_target.removeClass("active");
    point_target.stop().slideUp();
    $(event).removeClass("on");
    $(event).html("더보기");
  } else {
    // 더보기
    prt_target.addClass("active");
    point_target.stop().slideDown();
    $(event).addClass("on");
    $(event).html("접기");
  }
}

function like(event) {
  // 좋아요
  const target = $(event),
    target_num = $(event).find("span");
  let count_like = $(event).find("span").html();

  if (target.hasClass("active")) {
    count_like--;
    let count_add = count_like + 1;
    target.removeClass("active");
    $({ count_add }).animate(
      {
        count_add: count_like,
      },
      {
        duration: 200,
        easing: "linear",
        step: function () {
          target_num.text(numberWithCommas(Math.floor(this.count_add)));
        },
        complete: function () {
          target_num.text(numberWithCommas(Math.floor(this.count_add)));
        },
      }
    );
  } else {
    count_like++;
    let count_add = count_like - 1;
    target.addClass("active");
    $({ count_add }).animate(
      {
        count_add: count_like,
      },
      {
        duration: 200,
        easing: "linear",
        step: function () {
          target_num.text(numberWithCommas(Math.floor(this.count_add)));
        },
        complete: function () {
          target_num.text(numberWithCommas(Math.floor(this.count_add)));
        },
      }
    );
  }
}

function countNum() {
  $(".count_num").each(function () {
    let $this = $(this),
      $this_num = $this.html() - 10,
      countTo = $this.attr("data-count");
    $({ countNum: $this_num }).animate(
      {
        countNum: countTo,
      },
      {
        duration: 1000,
        easing: "linear",
        step: function () {
          $this.text(numberWithCommas(Math.floor(this.countNum)));
        },
        complete: function () {
          $this.text(numberWithCommas(Math.floor(this.countNum)));
        },
      }
    );
  });
}

// 카운트 숫자 콤마처리
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//팝업 열기
function openPopup(el) {
  // window.scrollTo({top:0});
  $("body").css("overflow", "hidden");
  var $modalWrap = $(el);
  $modalWrap.addClass("open");
  popupCase(el);
}
//팝업 위치
function popupCase(el) {
  var $modal = $(el).find(".modal");
  var $modalCloseBtn = $(el).find(".modal_close");
  var $modalH = $modal.height();
  var $winW = $(window).innerWidth();
  var $winH = $(window).innerHeight();
  /*if ($modalH > $winH) {
        $modal.addClass('absolute');
    } else {
        $modal.removeClass('absolute');
    }*/
  $modalCloseBtn.on("click", function () {
    $(this).parents(".modal_wrap").removeClass("open");
    $("body").css("overflow", "visible");
  });
}

//리뷰 이미지 슬라이드
function reviewModalImgSwiper() {
  const reviewPopImgSwiper = new Swiper(".review_modal_swiper", {
    slidesPerView: 1,
    loop: false,
    preloadImages: true,
    updateOnImagesReady: true,
    spaceBetween: 0,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".review_modal_swiper .swiper-button-next",
      prevEl: ".review_modal_swiper .swiper-button-prev",
    },
    pagination: {
      el: ".review_modal_swiper .swiper-pagination",
      clickable: "true",
      type: "bullets",
      renderBullet: function (index, className) {
        return (
          '<span class="' +
          className +
          '">' +
          '<span class="blind">' +
          index +
          "번째 사진" +
          "</span>" +
          "</span>"
        );
      },
    },
  });
}
// 제품상세 색상 선택
function colorAction() {
  controller = new ScrollMagic.Controller();
  new ScrollMagic.Scene({
    triggerElement: ".color_select_filter",
    triggerHook: 0.8,
    tweenChanges: true,
  })
    //.addIndicators() // add indicators (requires plugin)
    .addTo(controller)
    .on("start end", function () {
      colorLoading();
    });
  fixedBtnShow();
}
function colorMouseAct() {
  // color select mouse Action
  const body = document.querySelector(".color_select_box");

  if (body) {
    const bodyItems = body.querySelector(".color_select"),
      bodyColumns = bodyItems.querySelectorAll(".color_list li"),
      speed = 0.004;
    let positionX = 0,
      coordsXPercent = 0;

    function setMouseGalleryStyle() {
      let bodyItemsWidth = 0;

      bodyColumns.forEach((element) => {
        bodyItemsWidth += element.offsetWidth;
      });

      const diff = bodyItemsWidth - body.offsetWidth;
      distX = Math.floor(coordsXPercent - positionX);

      positionX = positionX + distX * speed;

      const position = (diff / 200) * positionX;

      bodyItems.style.cssText = `transform: translate3d(${-position}px, 0, 0)`;

      if (Math.abs(distX) > 0) {
        requestAnimationFrame(setMouseGalleryStyle);
      } else {
        body.classList.remove("init");
      }
    }

    body.addEventListener("mousemove", function (e) {
      const bodyWidth = body.offsetWidth;
      coordX = e.pageX - bodyWidth / 2;

      coordsXPercent = (coordX / bodyWidth) * 200;

      if (!body.classList.contains("init")) {
        requestAnimationFrame(setMouseGalleryStyle);
        body.classList.add("init");
      }
    });
  }
}

function colorLoading() {
  // 컬러 select 로딩
  const parentT = $(".color_list"),
    listT = parentT.children("li").length,
    listEq = Math.ceil(listT / 2);

  parentT.addClass("loading");
  parentT
    .find("li")
    .eq(listEq - 1)
    .addClass("active");
  setTimeout(function () {
    let thisNum_N = listEq - 1,
      thisNum_P = listEq - 1,
      isValid = true;
    parentT.find("li").each(function () {
      let thisT = parentT.find("li").eq(thisNum_N);

      if (thisT.next().length !== 0) {
        setInterval(function () {
          thisT.next().addClass("on");
          thisT = parentT.find("li").eq(thisNum_N);
          thisNum_N = thisNum_N + 1;
        }, 100);
        isValid = false;
        return false;
      }
    });

    parentT.find("li").each(function () {
      let thisT = parentT.find("li").eq(thisNum_P);
      if (thisT.prev().length !== 0) {
        setInterval(function () {
          if (thisT.prev().hasClass("active") == false) {
            thisT.prev().addClass("on");
          }
          thisT = parentT.find("li").eq(thisNum_P);
          thisNum_P = thisNum_P - 1;
        }, 100);
        isValid = false;
        return false;
      }
    });

    colorMouseAct();
  }, 100);
}

/* 모바일 컬러 셀렉트 */
function colorSwiper() {
  const color_t = $(".m_color_swiper");
  let colorSwiper = undefined,
    colorChk = color_t.find("li").find("input:checked"),
    colorIdx = 0;

  colorChk.each(function () {
    if (!$(this).is("checked")) {
      colorIdx = $(this).closest("li").index();
    } else {
      colorIdx = 1;
    }
  });

  function initSwiper() {
    let liLen = $(".m_color_swiper .swiper-slide").length / 2 - 1;

    if (ww < 1264 && colorSwiper == undefined) {
      colorSwiper = new Swiper(".m_color_swiper .swiper", {
        slidesPerView: "auto",
        loop: false,
        freeMode: true,
        centeredSlides: true,
        preloadImages: true,
        updateOnImagesReady: true,
        spaceBetween: 0,
        // initialSlide : colorIdx,
        initialSlide: liLen,
        followFinger: true,
        observer: true,
        observeParents: true,
      });
    } else if (ww >= 1264 && colorSwiper != undefined) {
      colorSwiper.destroy();
      colorSwiper = undefined;
    }
  }

  initSwiper();
  initSelSwiper();

  $(window).on("resize", function () {
    initSwiper();
    initSelSwiper();
  });
}

function initSelSwiper() {
  let selectSwiper = undefined;
  if (ww < 1264 && selectSwiper == undefined) {
    selectSwiper = new Swiper(".review_sel_swiper", {
      slidesPerView: "auto",
      loop: false,
      freeMode: true,
      preloadImages: true,
      updateOnImagesReady: true,
      spaceBetween: 8,
      followFinger: true,
      observer: true,
      observeParents: true,
    });
  } else if (ww >= 1264 && selectSwiper != undefined) {
    selectSwiper.destroy();
    selectSwiper = undefined;
  }
}

// 제품 목록
function prdListAction() {
  var headerH = $("header").outerHeight();
  let prdListcontroller = new ScrollMagic.Controller();
  var prdListTitH = $(".prd_list_tit").outerHeight();
  var regex = /[^0-9]/g; //숫자추출 정규식
  var gridPadding = $(".grid_wrap").css("padding-left").replace(regex, "");

  var prdListTitAct = TweenMax.fromTo(
    ".prd_list_tit",
    0.5,
    {
      left: 0,
      top: -286,
      fontSize: "clamp(92px, 9.46vw, 176px)",
      textAlign: "center",
    },
    {
      left: gridPadding,
      top: -prdListTitH,
      fontSize: "clamp(92px, 4.79vw, 92px)",
      textAlign: "left",
    }
  );
  var prdListWrapAct = TweenMax.fromTo(
    ".prd_list_wrap",
    0.5,
    { paddingTop: 0 },
    { paddingTop: 204 }
  );

  //제품목록 제목액션
  new ScrollMagic.Scene({
    triggerElement: "#trigger1",
    triggerHook: 0,
    duration: 364 - headerH,
    tweenChanges: true,
  })
    .setTween(prdListTitAct)
    .addTo(prdListcontroller)
    .on("end", function () {
      $(".prd_list_wrap").toggleClass("scroll");
    });

  //제품목록 제목 위치 패딩 액션
  new ScrollMagic.Scene({
    triggerElement: "#trigger1",
    triggerHook: 0,
    duration: 364 - headerH,
    tweenChanges: true,
  })
    .setTween(prdListWrapAct)
    .addTo(prdListcontroller);
  //.addIndicators({name: "indicator_1"})
}

// 제품 상세 스와이퍼
function prdSwiper() {
  const prdThumb = new Swiper(".prd_thumb", {
    slidesPerView: 5,
    direction: "horizontal",
    loop: false,
    preloadImages: true,
    updateOnImagesReady: true,
    spaceBetween: 5,
    observer: true,
    observeParents: true,
    followFinger: false,
    freeMode: true,
    breakpoints: {
      768: {
        direction: "vertical",
        slidesPerView: "auto",
        spaceBetween: 8,
      },
    },
  });
  const prdSwiper = new Swiper(".prd_swiper", {
    effect: "fade",
    loop: false,
    preloadImages: true,
    updateOnImagesReady: true,
    spaceBetween: 0,
    observer: true,
    observeParents: true,
    allowTouchMove: true,
    thumbs: {
      swiper: prdThumb,
    },
  });
}

// 총점
function totalScore() {
  const totalScore = $(".total_score").find(".total_score_num");
  totalScore.each(function () {
    const scoreT = $(this).siblings(".total_score_star").find(".star_bg_ico"),
      dist_score = $(this).parents().hasClass("dist_score"),
      dist_scoreT = $(this)
        .parent(".total_score")
        .siblings(".progressbar_box")
        .find(".progressbar_bar");
    let thisScore = $(this).html() * 20,
      sumdata = 0,
      dist_scoreNum = 0;
    if (dist_score == true) {
      $(".user_num").each(function () {
        sumdata += parseFloat($(this).text());
      });
      dist_scoreNum =
        ($(this).parent(".total_score").siblings(".user_num").html() /
          sumdata) *
        100;
      dist_scoreT.css("width", dist_scoreNum + "%");
      scoreT.css("width", thisScore + "%");
    } else {
      scoreT.css("width", thisScore + "%");
    }
  });
}

function scroll_drag() {
  // 리뷰작성 컬러선택 마우스 드래그
  let dragFlag = false,
    x,
    y,
    pre_x,
    pre_y;
  const drag_t = $(".opt_color").find(".tone_list_box");

  drag_t.mousedown(function (e) {
    dragFlag = true;
    var obj = $(this);
    x = obj.scrollLeft();
    y = obj.scrollTop();

    pre_x = e.screenX;
    pre_y = e.screenY;
    onclick = false;
    $(this).css("cursor", "pointer");
  });

  drag_t.mousemove(function (e) {
    if (dragFlag) {
      var obj = $(this);
      obj.scrollLeft(x - e.screenX + pre_x);
      obj.scrollTop(y - e.screenY + pre_y);
      //$('#result').text((x - e.screenX + pre_x) + "," + (y - e.screenY + pre_y));
      return false;
    }
  });

  drag_t.mouseup(function () {
    dragFlag = false;
    $("#tab1").off("click");
    $(this).css("cursor", "default");
    return false;
  });
}

function fixedBtnShow() {
  // 제품상세 fixed btn show
  const fixBtn = $(".fixed_prd_box");
  let target_s,
    fh = $("footer").outerHeight(),
    fbh = $(document).height() - $(window).height() - fh;
  target_s = $(window).height() / 2;

  let ws = $(window).scrollTop();
  fixBtnAct();
  $(window).scroll(function () {
    ws = $(window).scrollTop();
    fixBtnAct();
  });

  function fixBtnAct() {
    if (target_s <= ws && ws <= fbh) {
      fixBtn.addClass("on");
    } else {
      fixBtn.removeClass("on");
    }
  }
}

function reviewWrite() {
  const reviewWT = $(".write_slide");
  reviewWT.stop().slideDown();
}

//브랜드 스토어
function brandStore() {
  const targetCont = $(".brand_store .store_cont .full_visual_img");
  let targetContTop = [];
  const dist = 400;
  let winW;
  const moW = 768;

  $(window).on("resize scroll", function (e) {
    if (e.type == "scroll" && winW > moW) {
      //window scroll
      const scroll = $(this).scrollTop();
      for (let i = 0; i < targetCont.length; i++) {
        if (scroll > targetContTop[i] - dist) {
          targetCont.eq(i).addClass("ir");
        } else {
          targetCont.eq(i).removeClass("ir");
        }
      }
    } else {
      //window resize
      fullCont();
    }
  });

  //width full & resize
  function fullCont() {
    winW = $(window).width();
    const gridW = $(".grid_wrap").width();
    const margin = (winW - gridW) / 2;

    targetCont.each(function () {
      const contTop = $(this).offset().top;
      targetContTop.push(contTop);
    });
    targetCont.css({
      marginLeft: -margin,
      marginRight: -margin,
    });
  }
  fullCont();
} //브랜드 스토어

//피부측청
function skinToneColor() {
  const skinTone = $(".skin_tone"),
    toneCont = skinTone.find(".tone_cont"),
    toneContLen = toneCont.length,
    toneContTit = toneCont.find(".section_tit"),
    topTxtBox = skinTone.find(".brand_philosophy"),
    stepCont = $(".step_cont"),
    stepContLen = $(".step_cont").length,
    motionWrap = $(".motion_wrap"),
    motionItem = motionWrap.find(".motion_item"),
    subContainer = skinTone.parent("#sub_container"),
    footer = subContainer.siblings(".footer");

  let winH = $(window).height(),
    winW = $(window).width(),
    topTrigger = winH / 2,
    tbW = 1263,
    speed = 300,
    toneContTopArr = [],
    stepTopArr = [],
    toneContTop,
    lastH;

  subContainer.css("padding-bottom", 0);

  //window resize
  $(window).on("resize", function () {
    topTrigger = winH / 2;
    winH = $(window).height();
    winW = $(window).width();
    toneContTopArr = [];
    stepTopArr = [];
    savTop();
    reWid(winW, tbW);
    stepSwiper();
  });

  //window scroll
  $(window).on("scroll", function () {
    let scroll = $(this).scrollTop();
    let dist = winH / 2;

    //top visual
    topAction(scroll, topTrigger);

    // tone cont motion
    toneContActive(scroll, dist, winW);

    //change background
    changeBg(scroll);
  });

  //tone cont top 구하기
  function savTop() {
    toneCont.each(function () {
      toneContTop = $(this).offset().top;
      toneContTopArr.push(toneContTop);
    });
    lastH = toneCont.last().height();
    toneContTopArr.push(toneContTopArr[toneContLen - 1] + lastH);

    //stetp top 값
    stepCont.each(function () {
      let stepTop = $(this).offset().top;
      stepTopArr.push(stepTop);
    });
  }
  savTop();

  //top visual
  function topAction(scroll, topTrigger) {
    if (scroll > topTrigger) {
      topTxtBox.addClass("active");
      skinTone.find(toneContTit).first().addClass("active");
      motionWrap.find(".ani_line").removeClass("active");
    } else {
      topTxtBox.removeClass("active");
      motionWrap.find(".ani_line").addClass("active");
    }
  }

  //tone cont motion
  function toneContActive(scroll, dist) {
    //title
    for (let i = 1; i < toneContLen; i++) {
      if (
        scroll > toneContTopArr[i] - dist &&
        scroll < toneContTopArr[i + 1] - dist
      ) {
        toneContTit.eq(i).addClass("active");
      }
    }

    //img
    dist = winH;
    let gap = 250;

    for (let i = 0; i < stepContLen; i++) {
      let stepTopDist = stepTopArr[i] - dist;

      if (scroll > stepTopDist && winW > tbW) {
        const stepLi = stepCont.eq(i).find("li");
        const stepLiLen = stepLi.length;

        for (let j = 0; j <= stepLiLen; j++) {
          if (scroll > stepTopDist + j * gap) {
            stepLi.eq(j).addClass("ir");
          }
        }
      }
    }
  }

  //change background
  function changeBg(scroll) {
    let colorCgTop = $(".skin_tone_picker").offset().top;
    if (scroll > colorCgTop - 200) {
      toneCont.addClass("change_bg");
    } else {
      toneCont.removeClass("change_bg");
    }
  }

  //motion
  function motionIr() {
    if (motionWrap.length) {
      motionItem.each(function (i) {
        setTimeout((i) => {
          $(this).addClass("ir");
        }, speed * i);
      });
      setTimeout(() => {
        motionWrap.find(".ani_line").addClass("active");
      }, speed * motionItem.length);
    }
  }
  motionIr();

  // resize Width
  function reWid(winW, tbW) {
    if (winW <= tbW) {
      stepCont.find("li").removeClass("ir");
    }
  }
  reWid(winW, tbW);

  //step 스와이퍼
  function stepSwiper() {
    let stepSwiperArr = [];
    $(".skin_tone .swiper-container").each(function (idx) {
      $(this).addClass("step-swiper" + idx);

      stepSwiperArr[idx] = undefined;
      if (winW < tbW && stepSwiperArr[idx] == undefined) {
        stepSwiperArr[idx] = new Swiper(".step-swiper" + idx, {
          slidesPerView: 1.34,
          loop: false,
          freeMode: true,
          preloadImages: true,
          updateOnImagesReady: true,
          spaceBetween: 16,
          followFinger: true,
          observer: true,
          observeParents: true,
          breakpoints: {
            769: {
              slidesPerView: 2.5,
            },
          },
        });
      } else if (winW >= tbW && stepSwiperArr[idx] != undefined) {
        stepSwiperArr[idx].destroy();
        stepSwiperArr[idx] = undefined;
      }
    });
  }
  stepSwiper();
} //피부측청

//폼 셀렉트 박스
function selectBoxAddClass(el) {
  $(el).parents(".select_box").addClass("has_value");
}

//체크박스 전체선택
function allCheck() {
  const checkall = $('.input_check.checkall');
  const item = $('.input_check_wrap').find('.item');
  checkall.change(function(){
    if (this.checked) {
      $(this).parents('.input_check_wrap').find('.item:not(:checked)').prop('checked', true);
    } else {
      $(this).parents('.input_check_wrap').find('.item').prop('checked', false);
    }
  })
  item.change(function(){
    const allChecked = $(this).parents('.input_check_wrap').find('.item:not(:checked)').length == 0;
    $(this).parents('.input_check_wrap').find(checkall).prop('checked', allChecked);
  })
} 

//toggle 버튼
function toggleBtn() {
  $('.btn_toggle .btn').change(function(){
    if (this.checked) {
      $(this).next().text('On');
      if ($(this).parents('.sns_connect').length == 1) {
        $(this).parents('li').find('.txt').addClass('on');
      }
    } else {
      $(this).next().text('Off');
      $(this).parents('li').find('.txt').removeClass('on');
    }
  }) 
}