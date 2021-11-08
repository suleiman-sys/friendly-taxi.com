"use strict";

jQuery(document).on('ready', function() { 

	initSwiper();
	initEvents();
	initStyles();
	initMap();
	initCollapseMenu();	
	checkCountUp();	
	initParallax();
	
	if (jQuery('#preloader').length) {

		Pace.on('done', function() {
		  initScrollReveal();
		});
	}
		else {

		initScrollReveal();
	}

	jQuery('.matchHeight').matchHeight();
});

jQuery(window).on('scroll', function (event) {

	checkNavbar();
}).scroll();

jQuery(window).on('load', function(){

	initMasonry();
});

/* Collapse menu slide */
function initCollapseMenu() {

	var navbar = jQuery('#navbar'),
		navbar_toggle = jQuery('.navbar-toggle'),
		navbar_wrapper = jQuery("#nav-wrapper");

    navbar_wrapper.on('click', '.navbar-toggle', function (e) {

        navbar_toggle.toggleClass('collapsed');
        navbar.toggleClass('collapse');
        navbar_wrapper.toggleClass('mob-visible');
    });

    navbar.on('click', '.menu-item-has-children > a', function() {

    	var el = jQuery(this);

    	if (!el.closest('#navbar').hasClass('collapse')) {

	    	el.next().toggleClass('show');
	    	el.parent().toggleClass('show');
	    	return false;
	    }
    });

    var lastWidth;
    jQuery(window).on("resize", function () {

    	checkNavbar();

    	var winWidth = jQuery(window).width();

        if (winWidth > 992 && navbar_toggle.is(':hidden')) {
            navbar.addClass('collapse');
            navbar_toggle.addClass('collapsed');
        }

       	lastWidth = winWidth;
    });	
}

/* Navbar is set darker on main page on scroll */
function checkNavbar() {

	var scroll = jQuery(window).scrollTop(),
    	navBar = jQuery('nav.navbar:not(.no-dark)'),
    	topBar = jQuery('.top-bar'),
	    slideDiv = jQuery('.slider-full');

    if (scroll > 1) navBar.addClass('dark'); else navBar.removeClass('dark');
}

/* All keyboard and mouse events */
function initEvents() {

	jQuery('.swipebox').swipebox();

	jQuery('.menu-types').on('click', 'a', function() {

		var el = jQuery(this);

		el.addClass('active').siblings('.active').removeClass('active');
		el.parent().find('.type-value').val(el.data('value'));

		return false;
	});

	/* Scrolling to navbar from "go top" button in footer */
    jQuery('footer').on('click', '.go-top', function() {

	    jQuery('html, body').animate({ scrollTop: 0 }, 800);
	});

    jQuery('.alert').on('click', '.close', function() {

	    jQuery(this).parent().fadeOut();
	    return false;
	});	


	// TopBar Search
    var searchHandler = function(event){

        if (jQuery(event.target).is("#top-search, #top-search *")) return;
        jQuery(document).off("click", searchHandler);
        jQuery('#top-search').toggleClass('show-field');
    }

	jQuery('#top-search-ico').on('click', function (e) {

		e.preventDefault();
		jQuery(this).parent().toggleClass('show-field');
        if (jQuery('#top-search').hasClass('show-field')) {

        	jQuery(document).on("click", searchHandler);
        }
        	else {

        	jQuery(document).off("click", searchHandler);
        }
	});

	jQuery('#top-search input').keypress(function (e) {
		if (e.which == 13) {
			window.location = '/?s=' + jQuery('#top-search input').val();
			return false;
		}
	});

	jQuery('.woocommerce').on('click', 'div.quantity > span', function(e) {

		var f = jQuery(this).siblings('input');
		if (jQuery(this).hasClass('more')) {
			f.val(Math.max(0, parseInt(f.val()))+1);
		} else {
			f.val(Math.max(1, Math.max(0, parseInt(f.val()))-1));
		}
		e.preventDefault();

		jQuery(this).siblings('input').change();

		return false;
	});

	/* Parallax Image Movement */
	jQuery('img.parallax-float').each(function(v, el) {

		var parent = jQuery(el).closest('section'),
			mS = jQuery(el).data('ms'),
			wW = jQuery(window).width(),
			wH = jQuery(window).height();

		var w = mS / wW;

		parent.addClass('parallax-float-section');
		parent.mousemove(function(e) {

			var pageX = e.pageX - (wW / 2);
			var newvalueX = w * pageX * - 1 - 50;
			jQuery(el).css('transform', 'translate('+ newvalueX +'%, -50%)');
		});
	});
}

/* Parallax initialization */
function initParallax() {

	// Only for desktop
	if (/Mobi/.test(navigator.userAgent)) return false;

	jQuery('.like-parallax').each(function() {

		jQuery(this).parallax("100%", 0.5);		
	});

}


/* Adding custom classes to element */
function initStyles() {

	jQuery('form:not(.checkout) select:not(#rating)').wrap('<div class="select-wrap"></div>');
	jQuery('.mc4wp-form .btn').addClass('btn-second color-hover-black color-text-white');
	jQuery('.wpcf7-checkbox').parent().addClass('margin-none');
	jQuery('.form-btn-shadow .btn,.form-btn-shadow input[type="submit"]').addClass('btn-shadow');
	jQuery('.form-btn-wide .btn,.form-btn-wide input[type="submit"]').addClass('btn-lg');

	jQuery('.woocommerce .button').addClass('btn btn-xs');
	jQuery('.widget_price_filter .button').addClass('transform-uppercase btn-black color-hover-second');
	jQuery('.woocommerce .single_add_to_cart_button').addClass('transform-uppercase color-hover-second');


	// Cart quanity change
	jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="more"></span><span class="less"></span>');
	jQuery(document).off('updated_wc_div').on('updated_wc_div', function () {

		jQuery('.woocommerce div.quantity,.woocommerce-page div.quantity').append('<span class="more"></span><span class="less"></span>');
		initStyles();
	});
}

/* Starting countUp function */
function checkCountUp() {

	if (jQuery(".countUp").length){

		jQuery('.countUp').counterUp();
	}
}

/* 
	Scroll Reveal Initialization
	Catches the classes: jtx-sr-fade_in jtx-sr-text_el jtx-sr-delay-200 jtx-sr-duration-300 jtx-sr-sequences-100
*/
function initScrollReveal() {

	if (/Mobi/.test(navigator.userAgent)) return false;

	window.sr = ScrollReveal();

	var srAnimations = {
		zoom_in: {
			
			opacity : 1,
			scale    : 0.01,
		},
		fade_in: {
		},
		slide_from_left: {
			distance: '150%',
			origin: 'left',			
		},
		slide_from_right: {
			distance: '150%',
			origin: 'right',			
		},
		slide_from_top: {
			distance: '150%',
			origin: 'top',			
		},
		slide_from_bottom: {
			distance: '150%',
			origin: 'bottom',			
		},
	};

	var srElCfg = {

		block: [''],
		items: ['article', '.item'],
		text_el: ['.header', '.subheader', '.btn', 'p', 'img'],
		list_el: ['li']
	};


	/*
		Parsing elements class to get variables
	*/
	jQuery('.jtx-sr').each(function() {

		var el = jQuery(this),
			srClass = el.attr('class');

		var srId = srClass.match(/jtx-sr-id-(\S+)/),
			srEffect = srClass.match(/jtx-sr-effect-(\S+)/),
			srEl = srClass.match(/jtx-sr-el-(\S+)/),
			srDelay = srClass.match(/jtx-sr-delay-(\d+)/),
			srDuration = srClass.match(/jtx-sr-duration-(\d+)/),
			srSeq = srClass.match(/jtx-sr-sequences-(\d+)/); 

		var cfg = srAnimations[srEffect[1]];

		var srConfig = {

			delay : parseInt(srDelay[1]),
			duration : parseInt(srDuration[1]),
			easing   : 'ease-in-out',
			afterReveal: function (domEl) { jQuery(domEl).css('transition', 'all .3s ease'); }
		}			

		cfg = jQuery.extend({}, cfg, srConfig);

		var initedEls = [];
		jQuery.each(srElCfg[srEl[1]], function(i, e) {

			initedEls.push('.jtx-sr-id-' + srId[1] + ' ' + e);
		});

		sr.reveal(initedEls.join(','), cfg, parseInt(srSeq[1]));
	});
}


/*
	Slider filter 
	Filters element in slider and reinits swiper slider after
*/
function initSliderFilter(swiper) {

	var btns = jQuery('.slider-filter'),
		container = jQuery('.slider-filter-container');

	if (btns.length) {

		btns.on('click', 'a.cat, span.cat', function() {

			var el = jQuery(this),
				filter = el.data('filter'),
				limit = el.data('limit');

			container.find('.filter-item').show();
			el.parent().parent().find('.btn-active').removeClass('btn-active')
			el.addClass('btn-active');

			if (filter !== '') {

				container.find('.filter-item').hide();
				container.find('.filter-item.filter-type-' + filter + '').fadeIn();
			}

			if (swiper !== 0) {

				swiper.slideTo(0, 0);
				swiper.update();
			}

			return false;
		});

		// First Init, Activating first tab
		var firstBtn = btns.find('.btn:first')

		firstBtn.addClass('btn-active');
		container.find('.filter-item').hide();
		container.find('.filter-item.filter-type-' + firstBtn.data('filter') + '').show();
	}
}


/* Swiper slider initialization */
function initSwiper() {


	var products = jQuery('.products-slider'),
		services = jQuery('.services-slider'),
		clientsSwiperEl = jQuery('.testimonials-slider'),
		gallerySwiperEl = jQuery('.swiper-gallery'),
		portfolio = jQuery('.portfolio-slider'),
		textSwiperEl = jQuery('.swiper-text');


	if (portfolio.length) {

	    var portfolioSwiper = new Swiper(portfolio, {

			speed		: 1000,
			direction   : 'horizontal',
	        pagination: '.swiper-pagination',
	        paginationClickable: true,		
			slidesPerView : portfolio.data('cols'),	        
			slidesPerGroup : portfolio.data('cols'),	  	        
		
			autoplay    : 7000,
			autoplayDisableOnInteraction	: false,
	    });

	    initSliderFilter(portfolioSwiper);
	}
		else {

	    initSliderFilter(0);
	}

	if (products.length) {

	    var productsSwiper = new Swiper(products, {

			speed		: 1000,
			direction   : 'horizontal',
			nextButton	: '.arrow-right',
			prevButton	: '.arrow-left',
			slidesPerView : products.data('cols'),	        
			slidesPerGroup : products.data('cols'),	        
		
			autoplay    : products.data('autoplay'),
			autoplayDisableOnInteraction	: false,
	    });

	    initSliderFilter(productsSwiper);
	}
		else {

	    initSliderFilter(0);
	}

	if (services.length) {

	    var serviceSwiper = new Swiper(services, {

			speed		: 1000,
			direction   : 'horizontal',
			nextButton	: '.arrow-right',
			prevButton	: '.arrow-left',
			slidesPerView : services.data('cols'),	        
		
			autoplay    : services.data('autoplay'),
			autoplayDisableOnInteraction	: false,
	    });
	}



	if (clientsSwiperEl.length) {

	    var clientsSwiper = new Swiper(clientsSwiperEl, {
			direction   : 'horizontal',

			speed		: 1000,
			nextButton	: '.arrow-right',
			prevButton	: '.arrow-left',
			slidesPerView : clientsSwiperEl.data('cols'),
		
			autoplay    : 7000,
			autoplayDisableOnInteraction	: false,
	    });
	}

	/* Slider for inner pages */	
	if (gallerySwiperEl.length) {	

	    var gallerySwiperEl = new Swiper(gallerySwiperEl, {
			direction   : 'horizontal',
	        pagination: '.swiper-pagination',
	        paginationClickable: true,		
			autoplay    : 4000,
			autoplayDisableOnInteraction	: false,        
	    });
	}

	if (textSwiperEl.length) {	

	    var textSwiperEl = new Swiper(textSwiperEl, {
			direction   : 'horizontal',
			nextButton	: '.arrow-right',
			prevButton	: '.arrow-left',
			loop		: true,
			autoplay    : 4000,
			autoplayDisableOnInteraction	: false,        
	    });
	}	

	jQuery(window).on('resize', function(){

		var ww = jQuery(window).width()
		if (clientsSwiperEl.length && clientsSwiperEl.data('cols') >= 2) {

			if (ww > 1000) { clientsSwiper.params.slidesPerView = 2; }
			if (ww <= 1000) { clientsSwiper.params.slidesPerView = 2; }
			if (ww <= 768) { clientsSwiper.params.slidesPerView = 1; }
		
			clientsSwiper.update();			
		}


		if (portfolio.length && portfolio.data('cols') >= 3) {

			if (ww > 1000) { portfolioSwiper.params.slidesPerView = 3; }
			if (ww <= 1000) { portfolioSwiper.params.slidesPerView = 2; }
			if (ww <= 479) { portfolioSwiper.params.slidesPerView = 1; }		
		
			portfolioSwiper.update();			
		}		

		if (services.length && services.data('cols') >= 3) {

			if (ww > 1000) { serviceSwiper.params.slidesPerView = 3; }
			if (ww <= 1000) { serviceSwiper.params.slidesPerView = 2; }
			if (ww <= 479) { serviceSwiper.params.slidesPerView = 1; }		
		
			serviceSwiper.update();			
		}

		if (products.length && products.data('cols') >= 4) {

			if (ww > 1000) { productsSwiper.params.slidesPerView = 4; productsSwiper.params.slidesPerGroup = 4; }
			if (ww <= 1000) { productsSwiper.params.slidesPerView = 2; productsSwiper.params.slidesPerGroup = 2; }
			if (ww <= 479) { productsSwiper.params.slidesPerView = 1; productsSwiper.params.slidesPerGroup = 1; }		
		
			productsSwiper.update();			
		}		

	}).resize();
}

/* Masonry initialization */
function initMasonry() {

	jQuery('.masonry').masonry({
	  itemSelector: '.item',
	  columnWidth:  '.item'
	});		
}

/* Google maps init */
function initMap() {

	jQuery('.jtx-google-maps').each(function(i, mapEl) {

		mapEl = jQuery(mapEl);
		if (mapEl.length) {

			var uluru = {lat: mapEl.data('lat'), lng: mapEl.data('lng')};
			var map = new google.maps.Map(document.getElementById(mapEl.attr('id')), {
			  zoom: mapEl.data('zoom'),
			  center: uluru,
			  scrollwheel: false,
			  styles: mapStyles
			});

			var marker = new google.maps.Marker({
			  position: uluru,
			  icon: jtx_scripts.base_href + '/assets/images/location-black.png',
			  map: map
			});
		}
	});
}
