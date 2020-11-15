$(function () {
	$('.menu__btn').on('click', function() {
		$(this).toggleClass('menu__btn--active');	
		$('.header-menu__inner').toggleClass('header-menu__inner--active');
		if($(this).hasClass('menu__btn--active')) {
				$("html,body").css("overflow","hidden");
		} else {
		$("html,body").css("overflow","visible");
		}

	});

	$('[data-fancybox="gallery"]').fancybox({
		// Options will go here
	});

/* 	$(window).on('scroll',function () {


			if ($(this).scrollTop() > 500) {
					$('.header').addClass('header--fixed');
			}
			else {
					$('.header').removeClass('header--fixed');
			}
	}); */


	$('.appeal__item').hover(function() {
			$(this).find('.appeal__img svg').addClass('animate__animated animate__zoomIn');
	}, function() {
			$(this).find('.appeal__img svg').removeClass('animate__animated animate__zoomIn');
	});


	function validateForms(form){
			$(form).validate({
					rules: {
							name: {
									required: true
							},
							phone: "required",
					},
					messages: {
							name: {
									required: "Пожалуйста, введите свое имя",
									minlength: jQuery.validator.format("Введите {0} символа!")
								},
							phone: "Пожалуйста, введите свой номер телефона",
					}
			});
	};

	validateForms('#consultation-form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");


	$('.video-reviews__slider').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: true,
			prevArrow: '<button class="video-reviews__slider-btn video-reviews__slider-btnprev"><img src = "assets/images/icons/icon-arrowLeft.svg"></button>',
			nextArrow: '<button class="video-reviews__slider-btn video-reviews__slider-btnnext"><img src = "assets/images/icons/icon-arrowRight.svg"></button>',
			responsive: [{
				breakpoint: 831,
				settings: {
					arrows: false,
				}
			},
			{				
				breakpoint: 665,
				settings: {
					slidesToShow: 2,
				arrows: false,
				}
			},

			{				
				breakpoint: 524,
				settings: {
					slidesToShow: 1,
				arrows: false,
				}
			},

		],
	});

	$('.centerlife-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<button class="centerlife-slider__slider-btn centerlife-slider__slider-btnprev"><img src = "assets/images/icons/icon-arrowLeft.svg"></button>',
			nextArrow: '<button class="centerlife-slider__slider-btn centerlife-slider__slider-btnnext"><img src = "assets/images/icons/icon-arrowRight.svg"></button>',
			asNavFor: '.centerlife-bottom__slider',
			responsive: [{
							breakpoint: 873,
							settings: {
								arrows: false,
								dots: true,
							}
						},

					],
	});

	$('.centerlife-bottom__slider').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			asNavFor: '.centerlife-slider',
			focusOnSelect: true,
});

});
