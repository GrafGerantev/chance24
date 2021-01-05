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

	$("a[href^='#']").on('click', function () {
			const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		$('.menu__btn').removeClass('menu__btn--active');
		$('.header-menu__inner').removeClass('header-menu__inner--active');
		if($('.menu__btn').hasClass('menu__btn--active')) {
				$("html,body").css("overflow","hidden");
		} else {
		$("html,body").css("overflow","visible");
		}
			return false;
	});

	$('[data-fancybox="gallery"]').fancybox({
		// Options will go here
	});

	$('[data-fancybox="licenses"]').fancybox({
		// Options will go here
	});

	$(window).on('scroll',function () {


			if ($(this).scrollTop() > 500) {
					$('.header').addClass('header--fixed');
			}
			else {
					$('.header').removeClass('header--fixed');
			}
	});


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
	}

	let validator = $('#modal-form').validate({
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


	validateForms('#consultation1');
	validateForms('#consultation2');
	validateForms('#contacts-form');

   $('[data-modal=consultation]').on('click', function() {
        $('.modal, .modal__dialog').fadeIn('slow');
				document.body.style.overflow = 'hidden';
    });
    $('.modal__close').on('click', function() {
        $('.modal, .modal__dialog').fadeOut('slow');
				document.body.style.overflow = '';
				validator.resetForm();

    });

	$('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "assets/mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
           	$('.modal, .modal__dialog').fadeOut('slow');
						document.body.style.overflow = '';
						validator.resetForm();

            $('form').trigger('reset');
            $('.form-modal').trigger('reset');
        });
        return false;
    });

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
			arrows: false,
			asNavFor: '.centerlife-slider',
			focusOnSelect: true,
});

	$('.care__item').hover(function() {
			$(this).find('.care__img svg').addClass('animate__animated animate__zoomIn');
	}, function() {
			$(this).find('.care__img svg').removeClass('animate__animated animate__zoomIn');
	});

/* 	$('.questions__title').on('click', function(){
		$(this).toggleClass('questions__title--active');
		$(this).next().slideToggle(300);

}); */

    $(".questions-accordion").accordionjs({

        // The section open on first init. A number from 1 to X or false.(data-active-index)
        activeIndex : false,
    });
});
