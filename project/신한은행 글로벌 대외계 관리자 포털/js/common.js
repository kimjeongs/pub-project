
//search Form common datepickerOption
var datepickerOption = {
	showOn: "button",
	dayNamesMin:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
	monthNames :["1","2","3","4","5","6","7","8","9","10","11","12"],
	monthNamesShort:["1","2","3","4","5","6","7","8","9","10","11","12"],
	changeMonth: true,
	changeYear: true,
    showOtherMonths: true,
    dateFormat: 'yy-mm-dd',
	buttonImage: "../img/ico_calendar.png",
	buttonImageOnly: true,
	buttonText: "Select date"
}

$(document).ready(function(){
    var $myInfoBtn = $('.my-info>a');
    var $gnb =$('#gnb');
    var $gnbBtn = $('.btn-gnb');
    var $gnbDepth1 = $('.gnb-menu>li>a');
    var $gnbDepth2 = $('#gnb .depth2>li>a');
    var $tabMenu = $('.tab-menu li');
    var $tabCont = $('.tab-cont')
    var $checkList = $('.table-col td');
    var speed = 200;


   
    
    //정보변경 메뉴
    function tempBind(e) {
        var myMenu = $('.my-menu');
         e.stopPropagation();
        
        if (myMenu.has(e.target).length === 0) {
            myMenu.removeClass('on');
            $(document).unbind('click', tempBind);
        }
    }

    $myInfoBtn.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(this).next('.my-menu').is('.on')){
            $('.my-menu').removeClass('on');
        }else{
            $(this).next('.my-menu').addClass('on');
            $(document).bind('click', tempBind)
        }

    });


   
    //gnb slide   
	
    $gnbBtn.on('click',function(e){
        e.preventDefault();
        
        var hasOn = $gnb.hasClass('on');
        $gnb.stop().toggleClass('on');
		
		speed = (!e.originalEvent) ? 0 : 200; //trigger를 통해 click이 호출되었다면 - 페이지진입시

        if(hasOn) {
            $gnb.stop().animate({
                left:'-220px'
            }, speed,function(){
                slideInit ();
            });

            $('#container').stop().animate({
                left: '0px'
            }, speed);

        }else {
            $gnb.stop().animate({
                left: '0px'
            }, speed);

            $('#container').stop().animate({
                left: '220px'
            }, speed);
        }
		speed = 200;
    })
    
    //depth2
    $gnbDepth1.on('click',function(e){
        e.preventDefault();

        slideInit();

        $(this).stop().toggleClass('on');
        
        if (!$(this).next('ul').is('.on')){//열림
            
            var _height = 0;
            $(this).next('ul').parent('li').siblings().find('>ul').removeClass('on')
            $(this).next('ul').addClass('on').css('height',0);
            $(this).next('ul').show().css('opacity',0).find('>li').each(function(){
                _height+= $(this).height();
            })

            $(this).next('ul').css('opacity',1).stop().animate({
                'height': _height
            }, speed, function () {
                    $(this).css('height','auto');
            })

        }else{//닫힘

            $(this).next('ul').stop().animate({
                'height': 0
            }, speed, function () {
                
               $(this).hide().removeClass('on');
            })
        }
    })

    //depth3
    $gnbDepth2.on('click',function(e){
        e.preventDefault();

        var hasChild = $(this).next().length > 0;
        console.log(hasChild);

        if (hasChild) {
            $(this).toggleClass('on');
            $(this).next('ul').stop().slideToggle();
        }
    })



     //테이블 td 선택시
    $checkList.on('click', function (e) {
      var targetTr = $(this).parent('tr');
      var problem = targetTr.hasClass('problem');
      var checkbox = targetTr.find('input[type=checkbox]');
      var isChecked = checkbox.is(':checked');


        //  if(!isChecked){//선택되지않은 부분 선택시
        //     targetTr.addClass('select-list');
        //     if(!checkbox.length){
        //        targetTr.siblings().removeClass('select-list checked');
        //     }else{
        //        checkbox.prop('checked',"checked").trigger('change');
        //     }
        //  }else{ //동일한 라인 다시 선택시
        //     targetTr.removeClass('select-list checked');
        //     if(checkbox.length){
        //        checkbox.prop('checked',false).trigger('change');
        //     }
        //  }


        //체크박스와 별개로 td클릭시 색바뀜
        if (targetTr.hasClass('select-list')) {
            targetTr.removeClass('select-list');

        } else {
            targetTr.addClass('select-list');
            targetTr.siblings().removeClass('select-list checked');
        }
    });
    
    
    //문제(red) 행 색바뀜
    $('tr.problem').on('click',function(e){
      if($(this).hasClass('checked')){
          $(this).removeClass('checked')
      }else{
          $(this).addClass('checked')
      }
    });

    
   //테이블 thead All checkbox input 
   (function inputAllCheckd(){
      $('.table-col').on('click','thead th input[type=checkbox]',function(){
         var isCheck = $(this).is(':checked');
         var allTr = $(this).parents('.table-col').eq(0).find('tr');
         var problem = $('.problem')
         $(this).parents('.table-col').eq(0).find('tbody input[type=checkbox]').each(function(){
            $(this).get(0).checked = isCheck;
         })
        //  if(isCheck){
        //     allTr.addClass('select-list');
        //     if(problem){
        //     	problem.addClass('checked')
        //     }
        //  }else{
        //     allTr.removeClass('select-list');
        //     if(problem.is('.checked')){
        //     	problem.removeClass('checked')
        //     }
        //  }
      })

      //하위 체크박스와 연동
      $('.table-col').on('change','tbody td input[type=checkbox]',function(){
         
         var isCheck = $(this).is(':checked');
         var _Tr = $(this).parents('tr').eq(0);
         var AllisCheck = $(this).parents('.table-col').eq(0).find('thead input[type=checkbox]').is(':checked');
         if(!isCheck && AllisCheck != isCheck){
            //$(this).parents('.table-col').eq(0).find('thead input[type=checkbox]').get(0).checked = isCheck;
            $(this).parents('.table-col').eq(0).find('thead input[type=checkbox]').prop('checked',isCheck);
	         
         }

      })
   })();

    // 탭메뉴
    $tabMenu.on('click', function(e){
        e.preventDefault();

        $tabMenu.children('a').removeClass('on');
        $(this).children('a').addClass('on')

        var target = $(this).index();

        $tabCont.find('>div').stop().hide().removeClass('on');
        $tabCont.find('>div').eq(target).stop().show().addClass('on');
    });

	
	(function init(){
		$('button.btn-gnb').trigger('click');
    })();
    

    //트리메뉴
   (function(){
	   
		/*  +를 클릭하면 폴더구조의 하위 모든 메뉴가 다 펼쳐짐
			- 클릭 시 모두 닫히고 1depth메뉴만 남음 
		*/
		var $tree = $('.team-tree');
		var $listBtn = $('.team-tree .depth1>li>a');
		var $treeOpen = $('.list-open-btn > .open');
		var $treeClose = $('.list-open-btn > .close');
		
		(function init(){
			$tree.find('ul>li>a+ul').removeClass('open');
		})();

		function foldDown(el){ //+표시하고 펼침
			$(el).removeClass('close').next('ul').show().find('ul').show();
		};
		function foldUp(el){//-표시하고 접기
			$(el).addClass('close').next('ul').hide().find('ul').hide();
		};
		
		$listBtn.on('click', function (e) {
			e.preventDefault();
			var openCheck = ($(this).is('.close')) ? 1 : 0;

			if(openCheck){ //접혀있다면
				foldDown(this);
			}else{ //펼쳐져있다면
				foldUp(this);
			}

		})


		//전체 닫기, 열기
		$treeOpen.on('click', function (e) {
			e.preventDefault();
			$tree.find('ul>li>a').each(function(){
				foldDown(this);
			})
		})

		$treeClose.on('click', function (e) {
			e.preventDefault();
			$tree.find('ul>li>a').each(function(){
				foldUp(this);
			})
		});

		/* 암호화필드 행추가,행삭제 */
		var dataListRowEdit = function(){
			var watchEl = $('.tab-box');
			//행추가
			watchEl.on('click','button.dataListAddRow',function(){

				//기본정보
				var htmlTempleat = ['<tr>',
										'<td></td>',
										'<td></td>',
										'<td></td>',
									'</tr>'];

				var _tbody = $(this).parents('.message-box').eq(0).find('.data1 table tbody');
				$(htmlTempleat.join('')).appendTo(_tbody);

				//커스텀속성
				var htmlTempleat2 = ['<tr>',
										'<td></td>',
										'<td></td>',
										'<td></td>',
										'<td></td>',
									'</tr>'];

				var _tbody2 = $(this).parents('.tab-box').eq(0).find('.data2 table tbody');
				$(htmlTempleat2.join('')).appendTo(_tbody2);


			});  

			//행삭제
			watchEl.on('click','button.dataListRemoveRow',function(){

				//기본정보
				var _tbody = $(this).parents('.message-box').eq(0).find('.data1 table tbody');
				if(_tbody.find('tr').length > 1){ //행이 1줄 이상인경우만 삭제
					_tbody.find('tr:last-child').remove();
				}

				//커스텀속성
				var _tbody2 = $(this).parents('.tab-box').eq(0).find('.data2 table tbody');
				if(_tbody2.find('tr').length > 1){ //행이 1줄 이상인경우만 삭제
					_tbody2.find('tr:last-child').remove();
				}
			});
		}();
   })();



   // system menu
	$('.folder .dpth1').on('click',function(){
		var isUp = $(this).is('.up')

		if(!isUp){
			
			$(this).addClass('up');
			$(this).parents("tr").next('tr').hide();
			
		}else{
			$(this).removeClass('up');
			$(this).parents("tr").next('tr').show();
			
		}
		
    })
    
    //테이블 높이 자동
    var $th = $('.tableFixhead').find('thead th');
    $('.tableFixhead').on('scroll', function () {

        $(this).find('thead th').css({
            'transform': 'translateY(' + (this.scrollTop) + 'px)',
            'position': 'relative',
            'zIndex': 1
        });
        $(this).find('tbody th').css({
            'transform': 'translateX(' + (this.scrollLeft) + 'px)',
            'position': 'relative',
            'zIndex': 0
        });

    })


    //슬라이드 초기화
    function slideInit (){
        $gnbDepth1.removeClass('on');
        $gnbDepth2.removeClass('on');
        $('#gnb .depth2').stop().slideUp();
        $('#gnb .depth3').stop().slideUp();
    }
   
});