$(function () {
	$('.header__slider').slick({
		infinite: true,
		fade: true,
		prevArrow: '<img class="slider-arrows slider-arrows__left" src="assets/img/icon/icon-arrowsLeft.svg" alt="right"></img>',
		nextArrow: '<img class="slider-arrows slider-arrows__right" src="assets/img/icon/icon-arrowsRight.svg" alt="right"></img>',
		asNavFor: '.slider-dotshead',
	});

	$('.slider-dotshead').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		asNavFor: '.header__slider',
	});

	$('.surf-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<img class="slider-arrows slider-arrows__left" src="assets/img/icon/icon-arrowsLeft.svg" alt="right"></img>',
		nextArrow: '<img class="slider-arrows slider-arrows__right" src="assets/img/icon/icon-arrowsRight.svg" alt="right"></img>',
		asNavFor: '.slider-map'
});

	$('.slider-map').slick({
			slidesToShow: 8,
			slidesToScroll: 0,
			arrows: false,
			asNavFor: '.surf-slider',
			focusOnSelect: true
	});
});