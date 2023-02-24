$(function(){

  const skinTon = $('.skin_tone');
  const motionWrap = $('.motion_wrap');
  const motionTxt = motionWrap.find('.motion_txt');
  const toneCont = skinTon.find('.tone_cont');
  const toneContLen = toneCont.length;
  let speed = 500;

  
  
  let toneContArr = [];

  //tone cont top 구하기
  toneCont.each(function() {
    let toneContTop = $(this).offset().top;
    toneContArr.push(toneContTop);
  })
  let lastH = toneCont.last().height();
  toneContArr.push(toneContArr[toneContLen-1] + lastH);
    
  //motion txt ir
  if(motionWrap.length) {
    motionTxt.each(function(i) {
      setTimeout((i) => {
        $(this).addClass('ir');
      }, speed * i)
      
      setTimeout(() => {
        motionWrap.find('.ani_line').addClass('active')
      }, speed * motionTxt.length);
    })
  }

  $(window).on('scroll', function() {
    let scroll = $(this).scrollTop();
    let dist = 0;

    //top visual 
    if(scroll > $('.top_visual').height() /2) {
      skinTon.find(motionWrap).addClass('active').find('.ani_line').removeClass('active');
    } else {
      skinTon.find(motionWrap).removeClass('active').find('.ani_line').addClass('active');
    }

    for (let i = 0; i < toneContLen; i++) {
      //tone cont
      if (i == 0) {
        dist = toneCont.height() / 2 + 200;
        
      } else {
        
      }
      if (scroll > toneContArr[i] - dist && scroll < toneContArr[i+1] - dist) {
        console.log(dist)
        toneCont.eq(i).addClass('active');
        toneCont.find('.section_tit').removeClass('active');
        toneCont.eq(i).find('.section_tit').addClass('active');
      } else if (scroll < toneContArr[0] - dist) { //첫번째 tone cont
        toneCont.eq(0).removeClass('active');
        toneCont.eq(0).find('.section_tit').removeClass('active');
      }
    }
    


  })//window scroll



  // let topArr = [];
  // // test
  // $('.exwrap .section').each(function() {
  //   let top = $(this).offset().top;
  //   topArr.push(top);
  // })
  // topArr.push($('.exwrap .section').last().height()+topArr[1])
  // console.log(topArr)

  // $(window).on('scroll', function() {
  //   let scroll = $(this).scrollTop();

  //   for (i=0; i < $('.exwrap .section').length; i++ ) {
      
  //     if(scroll > topArr[i] && scroll < topArr[i+1]) {
  //       console.log(i, scroll,topArr)
  //     }
  //   }
  // })
  
});



