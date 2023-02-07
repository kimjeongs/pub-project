$(window).ready(function(){
	// file upload
	var fileTarget = $('.filebox .upload-hidden');

    fileTarget.on('change', function(){
        if(window.FileReader){
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }

        $(this).siblings('.upload-name').val(filename);
    });

	//gnb
	$('.gnb_menu > li').on('click' , function(){
		$('.gnb_menu > li').removeClass('active');
		$('#header').removeClass('open-menu');
		$(this).parents('#header').addClass('open-menu');
	});

	$('#header').on('mouseleave' , function(){
		$(this).removeClass('open-menu');
	});


	/* */
	 if ($('.ip-rating').length > 0) {
		$('.ip-rating').rating({
			language: 'ko',
			showCaption: false,
			showClear: false,
			min: 0,
			max: 5,
			step: 1,
		});
	}

	if ($('.like-badge').length > 0) {
		$('.like-badge').on('click', function (event) {
			event.preventDefault(); 
			var hiddenText;

			$(this).toggleClass('on');
			hiddenText = $(this).hasClass('on') ? '즐겨찾기 추가' : '즐겨찾기 제거';
			$(this).text(hiddenText);
		});
	}
});
