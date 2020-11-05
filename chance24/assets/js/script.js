$(function () {
	$('.menu__btn').on('click', function() {
		$(this).toggleClass('menu__btn--active');	
		$('.header-menu__inner').toggleClass('header-menu__inner--active');

	});
});