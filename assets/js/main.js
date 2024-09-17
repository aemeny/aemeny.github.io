(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Easing function for smoother scrolling.
	function easeInOutQuad(t) {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	}

	function smoothScroll(target, duration) {
		let start = window.scrollY;
		let end = $(target).offset().top - $header.outerHeight();
		let startTime = null;

		function scrollAnimation(currentTime) {
			if (!startTime) startTime = currentTime;
			let timeElapsed = currentTime - startTime;
			let progress = Math.min(timeElapsed / duration, 1); // Ensure progress does not exceed 1
			let easedProgress = easeInOutQuad(progress);
			let lerped = start + (end - start) * easedProgress;
			window.scrollTo(0, lerped);

			if (progress < 1) {
				requestAnimationFrame(scrollAnimation);
			}
		}

		requestAnimationFrame(scrollAnimation);
	}

	$('.scrolly').on('click', function (e) {
		e.preventDefault();
		let targetId = $(this).attr('href');
		let target = $(targetId)[0];
		smoothScroll(target, 1500);
	});


	// SLIDESHOW
	let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("slides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 5000); // Change image every 3 seconds
    }

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});


		// HEADER colour interaction
		document.addEventListener("DOMContentLoaded", function () {
			const sections = document.querySelectorAll("section[id]");
			const navLinks = document.querySelectorAll(".nav-link");
		
			function setActiveLink() {
				let index = sections.length;
		
				while (--index && window.scrollY + 500 < sections[index].offsetTop) {}
		
				navLinks.forEach((link) => link.classList.remove("active"));
				navLinks[index].classList.add("active");
			}
		
			window.addEventListener("scroll", setActiveLink);
			setActiveLink(); // Initial call to set active class on page load
		});
	
})(jQuery);