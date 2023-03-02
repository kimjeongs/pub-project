$(function() {
  const targetCont = $('.store .store_cont .full_visual_img');
  let targetContTop = [];
  const dist = 400;

  $(window).on('resize scroll',function(e) {
    if(e.type == 'scroll') { //window scroll
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

  //width full content
  function fullCont() {
    const winW = $(window).width(); 
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
})