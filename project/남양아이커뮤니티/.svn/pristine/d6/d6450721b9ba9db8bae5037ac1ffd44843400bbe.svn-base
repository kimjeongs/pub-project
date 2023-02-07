$(function(){
	var sDateList = $('.slt-date-list'),
	otpListItem = $('.option-date-item');
	$('.inp-chk-box label').click(function(){
		if (!$(this).parent().find('input').is(':checked')) {
			$(this).parent().find('input').prop('checked', true);
		} else {
			$(this).parent().find('input').prop('checked', false);
		}
	});

	sDateList.click(function(){
		if ($(this).hasClass('on')) {
			$(this).closest('.slt-date-wrap').find(otpListItem).show();
			if ($('.slt-date-list.on').length > 0) {
				$('html').click(function (e) {
					var sltDateTarItem = $('.option-date-item *');
					if (!$(e.target).is(sltDateTarItem)) {
						$(otpListItem).hide();
						$('.slt-date-list').removeClass('on');
					}
				});
			}
		} else {
			$(this).closest('.slt-date-wrap').find(otpListItem).hide();
		}
		return false;
	});

	otpListItem.find('li').click(function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		if ($(this).hasClass('selected')) {
			var sltText = $(this).text();
			$(this).closest('.slt-date-wrap').find('.slt-date-list span').text(sltText);
			$(this).closest('.slt-date-wrap').find('.slt-date-list').removeClass('on');
			$(this).closest(otpListItem).hide();
		}
		// $(this)
	});
});