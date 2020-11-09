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

});
