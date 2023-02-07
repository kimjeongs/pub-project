$(document).ready(function(){
	$('.smenu a').on('click', function(e){
		if ($(this).next().is('ul')) {
			e.preventDefault();
			$(this).parent().toggleClass('active');
		};
	});

	$('.col-board01 table input[type=checkbox]').on('change', function(){
		if($(this).prop("checked")){
			$(this).closest('tr').addClass('check');
		}else{
			$(this).closest('tr').removeClass('check');
		}
	})
});