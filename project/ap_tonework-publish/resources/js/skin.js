$(function(){

  const skinTone = $('.skin_tone'),
        toneCont = skinTone.find('.tone_cont'),
        toneContLen = toneCont.length,
        toneContTit = toneCont.find('.section_tit'),
        topVisual = skinTone.find('.top_visual'),
        topTxtBox = skinTone.find('.brand_philosophy'),
        stepCont = $('.step_cont'),
        stepContLen = $('.step_cont').length,
        motionWrap = $('.motion_wrap'),
        motionItem = motionWrap.find('.motion_item'),
        subContainer = skinTone.parent('#sub_container'),
        footer = subContainer.siblings('.footer');
        
  let topTrigger = topVisual.height() / 2,
      winH = $(window).height(),
      widW = $(window).width(),
      tbW = 1263,
      moW = 768,
      speed = 500,
      toneContTopArr = [],
      stepTopArr = [],
      topMargin,
      toneContTop,
      lastH;

  //window resize
  $(window).on('resize',function() {
    topTrigger = topVisual.height() / 2;
    winH = $(window).height();
    widW = $(window).width();
    toneContTopArr = [];
    stepTopArr = [];

    savTop();
    reWid(widW, tbW);
  })
  
  //window scroll
  $(window).on('scroll', function() {
    let scroll = $(this).scrollTop();
    let dist = winH / 3;    

    //top visual
    topAction(scroll, topTrigger);

    // tone cont motion
    toneContActive(scroll, dist);
    
    //change background
    changeBg(scroll);
  })

  //tone cont top 구하기
  function savTop() {
    topMargin = parseInt(skinTone.find('.tone_finder').css('margin-top'));
    toneCont.each(function() {
      toneContTop = $(this).offset().top - topMargin;
      toneContTopArr.push(toneContTop);
    })
    
    lastH = toneCont.last().height();
    toneContTopArr.push((toneContTopArr[toneContLen-1] + lastH ));
    

    //stetp top 값
    stepCont.each(function() {
      let stepTop = $(this).offset().top - topMargin;
      stepTopArr.push(stepTop);
    })
  };

  //top visual
  function topAction(scroll, topTrigger) {
    if(scroll > topTrigger) {
      topTxtBox.addClass('active');
      skinTone.find('.tone_finder').addClass('active');
      motionWrap.find('.ani_line').removeClass('active');
    } else {
      topTxtBox.removeClass('active');
      skinTone.find('.tone_finder').removeClass('active');
      motionWrap.find('.ani_line').addClass('active');
    }
  }

  //tone cont motion
  function toneContActive(scroll, dist) {
    //title
    for (let i = 0; i < toneContLen; i++) {
      if(scroll > toneContTopArr[i] - dist && scroll < toneContTopArr[i+1] - dist) {
        toneContTit.eq(i).addClass('active');
      } else {
        toneContTit.eq(i).removeClass('active');
      }
    }

    //img
    dist = $(window).height();
    for(let i = 0; i < stepContLen; i++) {
      let stepTopDist = stepTopArr[i] - dist;

      if(scroll > stepTopDist) {
        const stepLI = stepCont.eq(i).find('li');
        const stepLILen = stepLI.length;

        for (let j = 0; j <= stepLILen; j++) {
          if (scroll > stepTopDist + (j * 90) ) {
            stepLI.eq(j).addClass('ir')
          } else {
            stepLI.eq(j-1).removeClass('ir')
          }
        }
      }
    }
  }

  //change background
  function changeBg(scroll) {
    if(scroll > toneContTopArr[1] - 200) {
      toneCont.addClass('change_bg');
    } else {
      toneCont.removeClass('change_bg');
    }
  }
  
  //motion 
  function motionIr() {
    if (motionWrap.length) {
      motionItem.each(function(i) {
        setTimeout((i) => {
          $(this).addClass('ir');
        }, speed * i)
      })
      setTimeout(() => {
        motionWrap.find('.ani_line').addClass('active');
        setTimeout(() => {
          block();
        }, speed * 3)
      }, speed * motionItem.length);
    }
  } motionIr();

  //resize Width
  function reWid(widW, tbW) {
    if(widW <= tbW) {
      stepCont.css('display','grid');
    } else {
      stepCont.css('display','flex');
    }
  } reWid();

  //초기화
  function init() {
    subContainer.css('padding-bottom', 0);
    toneCont.css('display','none');
    footer.css('display','none');
  } init();

  //컨텐츠 푸터 block
  function block() {
    toneCont.css('display','block');
    footer.css('display','block');
    savTop(); //컨텐츠 block 후 top 값 구하기
  }
  
});



