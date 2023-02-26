$(function(){

  const skinTone = $('.skin_tone');
  const toneCont = skinTone.find('.tone_cont');
  const toneContLen = toneCont.length;
  const toneContTit = toneCont.find('.section_tit');
  const topVisual = skinTone.find('.top_visual');
  const topTxtBox = skinTone.find('.brand_philosophy');
  const stepCont = $('.step_cont');
  const stepContLen = $('.step_cont').length;
  const motionWrap = $('.motion_wrap');
  const motionItem = motionWrap.find('.motion_item');
  let speed = 500;
  let toneContTopArr = [];
  let stepTopArr = [];


  //window resize
  // $(window).on('resize',function() {
  //   winHeight();
  // })


  
  $(window).on('scroll', function() {
    let scroll = $(this).scrollTop();
    let dist = 300;
    
    let topTrigger = topVisual.height() / 2; //resize
    
    //top visual
    if(scroll > topTrigger) {
      topTxtBox.addClass('active');
      skinTone.find('.tone_finder').addClass('active');
      motionWrap.find('.ani_line').removeClass('active')
    } else {
      topTxtBox.removeClass('active');
      skinTone.find('.tone_finder').removeClass('active');
      motionWrap.find('.ani_line').addClass('active')
    }

    // tone cont motion
    toneContActive(scroll,dist);
    
    //change background
    changeBg(scroll);
    

    


  })//window scroll



  







  

  //tone cont top 구하기
  function savTop() {
    let topMargin = parseInt(skinTone.find('.tone_finder').css('margin-top'));
    toneCont.each(function() {
      let toneContTop = $(this).offset().top - topMargin;
      toneContTopArr.push(toneContTop);
    })
    let lastH = toneCont.last().height();
    toneContTopArr.push((toneContTopArr[toneContLen-1] + lastH ));

    //stetp top 값
    stepCont.each(function() {
      let stepTop = $(this).offset().top - topMargin;
      stepTopArr.push(stepTop);
    })
  } savTop();

  //tone cont motion
  function toneContActive(scroll,dist) {
    //title
    for (let i = 0; i < toneContLen; i++) {
      if(scroll > toneContTopArr[i] - dist && scroll < toneContTopArr[i+1] - dist) {
        toneContTit.eq(i).addClass('active');
      } else {
        toneContTit.eq(i).removeClass('active');
      }
    }

    //img
    dist = 1000;
    for(let i = 0; i < stepContLen; i++) {
      let stepTopDist = stepTopArr[i] - dist;

      if(scroll > stepTopDist) {
        const stepLI = stepCont.eq(i).find('li');
        const stepLILen = stepLI.length;

        for (let j = 0; j <= stepLILen; j++) {
          if (scroll > stepTopDist + (j * 150) ) {
            stepLI.eq(j).addClass('ir')
          } else {
            stepLI.eq(j-1).removeClass('ir')
          }
        }
      }
    }
  }

  //change background
  changeBg(scroll);
  function changeBg(scroll) {
    if(scroll > toneContTopArr[1] - 100) {
      $('.change_bg').removeClass('change_bg').addClass('change_bg_active');
    } else {
      $('.change_bg_active').removeClass('change_bg_active').addClass('change_bg');
    }
  }
  
  //motion 
  function motionIr() {
    
    if (motionWrap.length) {
      motionItem.each(function(i) {
        setTimeout((i) => {
          $(this).addClass('ir');
        }, speed * i)
        
        setTimeout(() => {
          motionWrap.find('.ani_line').addClass('active')
        }, speed * motionItem.length);
      })
    }
  } motionIr();















  
});



