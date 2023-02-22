$(function() {
  const section = $('.ex-container .section-wrap > section');
  const sectionLen = section.length; 
  const sectionTopArr = [];
  const topSection =  section.eq(0);
  const dist = 300;
  let winH = $(window).height();
  let motionItem;

  $(window).scroll(function() {
    let scroll = $(this).scrollTop();

    for (let i = 0; i < sectionLen; i++) {
      if (scroll > sectionTopArr[i] - dist && scroll < sectionTopArr[i+1] - dist) {
        section.eq(i).find('.cont-wrap').removeClass('cont-wrap').addClass('motion-area');

        //section 02 모션이지만 공통 사용 가능
        if(section.eq(i).find('.visaul-txt-motion').length) {
          $('.visaul-txt-motion').addClass('active');
        }
      } else {
        //section 02 모션이지만 공통 사용 가능
        if(section.eq(i).find('.visaul-txt-motion').length) {
          $('.visaul-txt-motion').removeClass('active');
        }
      }
      let currentIdx = i;

      //fixed
      pinFix(scroll, currentIdx);
      
      //motion
      motionItem = $('.motion-area .motion-item');
      section.eq(i).find(motionItem).each(function(idx) {
        const item = $(this);
        addIr(item, idx);
      })
  
      //section 02
      const section02 = section.eq(1);
      if (scroll > sectionTopArr[1] && scroll < sectionTopArr[2] - winH) {
        section02.find('.pin').removeClass('pin').addClass('pin-fixed');
      } else if (scroll > section02.height()) {
        section02.find('.pin-fixed').removeClass('pin-fixed').addClass('pin').css({
          top:'auto',
          bottom: 0
        })
      } else {
        section02.find('.pin-fixed').removeClass('pin-fixed').addClass('pin').css({
          top: 0,
          bottom: 'auto'
        })
      }
    

    }

    //top section
    topSectionLoad(scroll);

    
    
    

    
    
    
  })//window scroll

  //top section
  function topSectionLoad(scroll) {
    if(scroll > 0) {
      //배경 이미지 사이즈
      topSection.find('.visual-img').css({
        transform : 'translateZ('+ scroll * 0.3 +'px)'
      })

      //스크롤 0 되면 fadeOut
      topSection.find('.visual-txt-wrap').removeClass('hello').addClass('bye')
    } else {
      topSection.find('.bye').removeClass('bye').addClass('hello')
    }
  }

  //window 로드시 바로 실행
  topSection.find('.cont-wrap').removeClass('cont-wrap').addClass('motion-area');
  topSection.find('.motion-area .motion-item').each(function(idx) {
    const item = $(this);
    addIr(item, idx);
  })

  //pin 고정
  function pinFix(scroll , currentIdx) {
    if (currentIdx == 1) return;
    if (scroll > sectionTopArr[currentIdx] && scroll < sectionTopArr[currentIdx+1]) {
      section.eq(currentIdx).find('.pin').removeClass('pin').addClass('pin-fixed');      
    } else {
      section.eq(currentIdx).find('.pin-fixed').removeClass('pin-fixed').addClass('pin');
    }
  }

  //인터랙션 클래스 추가
  function addIr(item, idx) {
    setTimeout((idx) => {
      item.addClass('ir')
    },idx * 300)
  }
  
  //section top 값
  sectionTopPos(); 
  function sectionTopPos() {
    section.each(function() {
      const sectionTop = $(this).offset().top;
      sectionTopArr.push(sectionTop);
    })
    const lastTop = sectionTopArr[sectionLen-1] + section.last().outerHeight();
    sectionTopArr.push(lastTop);
  }

})