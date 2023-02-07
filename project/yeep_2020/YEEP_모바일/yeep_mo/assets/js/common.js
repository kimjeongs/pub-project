$(function(){
  
  var dim = $('.dim');

  menu();
  fullpopup();
  loadMore();
  accordion();
  inpMaxLen();
  autoSize();
  tab();
  searchBox();
  btnToggle();
  btnTop();
  pjState();
  floatingBtn();
  onlyNum();


  // menu
  function menu() {
    var openMenu = $('.header .btn-menu'),
        closeMenu = $('.header .btn-close'),
        gnbWrap = $('.menu-wrap');

    openMenu.on('click',function() {
      if (!gnbWrap.hasClass('on')) {
        gnbWrap.addClass('on');
        bodyScrollnone(dim);
      } else {
        gnbWrap.removeClass('on');
        bodyScroll(dim);
      };
    });

    closeMenu.on('click',function() {
      gnbWrap.removeClass('on');
      bodyScroll(dim);
    });

    dim.on('click',function(){
      if (gnbWrap.hasClass('on')) {
        gnbWrap.removeClass('on');
      };
      bodyScroll(dim);
    });
  }
  
  //popup
  function fullpopup() {
    var openpopup = $('.btn-pop'),
        closepopup = $('.popup .btn-close'),
        popup = $('.popup');
    
    openpopup.on('click',function() {
      var num = $(this).attr('data-num');
      
      $('.popup'+'[data-num='+num+']').addClass('on');
      $('body, html').css('overflow','hidden');
    });
    
    closepopup.on('click',function() {
      if ($(this).parents(popup).hasClass('on')) {
        $(this).parents(popup).removeClass('on');
        bodyScroll(dim);
      }
    });
  }

  //load more
  function loadMore() {
    var loadLi = $('.load-list > li'),
        loadMoreWrap = $('.more-btn-wrap'),
        btnloadMore = $('.btn-loadmore');

    loadLi.slice(0,10).show();
    btnloadMore.on('click',function() {
      loadHidden = $('.load-list > li:hidden');
      loadHidden.slice(0,10).show();
      loadvisibleLen = $('.load-list > li:visible').length;
      $(this).find('.current').text(loadvisibleLen);
    })

    loadvisible = $('.load-list > li:visible'); 
    if (loadvisible.length >= 10 ) {
      loadMoreWrap.css('display', 'block');
    } else {
      loadMoreWrap.css('display', 'none');
    }

    btnloadMore.find('.total').text(loadLi.length);
  }

  //accordion
  function accordion() {
    var accoHeader = $('.acco-header'),
        AllOpen = $('.open-acco');

    AllOpen.on('click',function() {
      if(!$(this).hasClass('all')) {
        $(this).addClass('all').text('전체 접기');
        $(this).parent().next().find('.acco-header').addClass('active').find('span').text('닫기');        
      } else {
        $(this).removeClass('all').text('전체 펼치기');
        $(this).parent().next().find('.acco-header').removeClass('active').find('span').text('열기');
      }
    })

    accoHeader.on('click',function(e) {
      e.preventDefault();
      if (!$(this).hasClass('active')) {
        $(this).addClass('active').find('span').text('닫기');
      } else {
        $(this).removeClass('active').find('span').text('열기');
      }

      var openLen = $('.acco-header.active').length;
      if(openLen == 0) {
        AllOpen.removeClass('all').text('전체 펼치기');
      } else {
        
        AllOpen.addClass('all').text('전체 접기');
      }
    })
  }
  
  //bodyScrollnone
  function bodyScrollnone(dim) {
    dim.css('display','block');
    $('body, html').css('overflow','hidden').scrollTop(0);
  }

  //bodyScroll 
  function bodyScroll(dim) {
    dim.css('display','none');
    $('body, html').css('overflow','visible').scrollTop('auto');
  }

  //max length
  function inpMaxLen() {
    $('.inp-max').keyup(function(){ 
      if ($(this).val().length > $(this).attr('maxlength')) { 
        $(this).val($(this).val().substr(0, $(this).attr('maxlength')));
      }
      var valLen = $(this).val().length;
      $(this).closest('.inp-max-wrap').find('.current').text(valLen);
    });
  }
  
  //autoj size textarea
  function autoSize() {
    $.each($('[data-autoresize] textarea'), function() {
      var offset = this.offsetHeight - this.clientHeight;
     
      var resizeTextarea = function(el) {
        $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
      };
      $(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
    });
  }

  // tab 
  function tab() {
    var tabBtn = $('.tab-menu li');
    // tabBtn.each(function(index) {
    //   $(this).data('tab-cont > div',$('.tab-cont > div').eq(index));
    // })

    tabBtn.on('click',function(e){
      e.preventDefault();
      var tabTit = $(this).children('a').text();
      $('.tab-cont > .hidden-tit').text(tabTit);

      // $('.tab-cont > div').removeClass('active');
      tabBtn.removeClass('active');
      $(this).addClass('active');
      // $(this).data('tab-cont > div').addClass('active');
    })
  }
  
  //search box
  function searchBox() {
    var openSearch = $('.btn-search-show'),
        searchBox = $('.hidden-search-box'),
        clsoeBtn = $('.hidden-search-box .btn-close');

    openSearch.on('click', function() {
      if (!$(this).hasClass('active')) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }

      if(!searchBox.hasClass('active')) {
        searchBox.addClass('active')
      } else {
        searchBox.removeClass('active');
        searchBox.children('.inp-txt').val('');
      }      
    })
    clsoeBtn.on('click', function() {
      searchBox.removeClass('active');
      searchBox.children('.inp-txt').val('');
    })
  }
  
  //toggle
  function btnToggle() {
    var btnToggle = $('.btn-toggle');
    btnToggle.on('click', function() {
      $(this).toggleClass('on');
    })
  }

  //project state 
  function pjState(){
    $('.my-project .state li').on('click',function(e){
      e.preventDefault();
      $('.my-project .state li').removeClass('active');
      $(this).addClass('active');
    })
  }

  //scroll top
  function btnTop() {
    var btnTop = $('.btn-top');
    btnTop.on('click', function() {
      $('body, html').stop().animate({
          'scrollTop':0
        })
    })
  }

  // floating button
  function floatingBtn(){
    $(window).on('scroll',function(){
      var scroll = $(this).scrollTop(),
          floatingPos = $('.btn-wrap.floating').next().offset().top;

      if(scroll > floatingPos) {
        $('.btn-wrap.floating').addClass('active');
      } else {
        $('.btn-wrap.floating').removeClass('active');
      }
    })
  }

  // only number
  function onlyNum(){
    function addCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $("#onlyNumber").on("keyup", function() {
      $(this).val(addCommas($(this).val().replace(/[^0-9]/g,"")));
    });
  } 


});

