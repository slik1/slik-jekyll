(function($) {
  skel.breakpoints({
    xlarge: '(max-width: 1680px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)'
  });

  $(function() {
    var $window = $(window),
      $body = $('body');
    $hamburger = $('.hamburger-menu');
    // Disable animations/transitions until the page has loaded.
    $body.addClass('is-loading');

    $window.on('load', function() {
      window.setTimeout(function() {
        $body.removeClass('is-loading');
      }, 100);
    });

    // var offset = $(".site-header").offset();
    // //var sticky = document.getElementById("sticky-header")

    // $window.scroll(function () {
    // 	console.log(offset);
    // 	if ($('body').scrollTop() > offset.top) {
    // 		$('.site-header').addClass('fixed');
    // 	} else {
    // 		$('.site-header').removeClass('fixed');
    // 	}

    // });

    // // Setup a timer
    // var timeout;

    // // Listen for resize events
    // window.addEventListener('scroll', function (event) {

    // 	//console.log('no debounce');

    // 	// If there's a timer, cancel it
    // 	if (timeout) {
    // 		window.cancelAnimationFrame(timeout);
    // 	}

    // 	// Setup the new requestAnimationFrame()
    // 	timeout = window.requestAnimationFrame(function () {
    // 		console.log($('body').scrollTop());
    // 		if ($('body').scrollTop() > window.top) {
    // 			$('.site-header').addClass('fixed');
    // 		} else {
    // 			$('.site-header').removeClass('fixed');
    // 		}
    // 		// Run our scroll functions
    // 		console.log('debounced');

    // 	});

    // }, false);

    var scrollTimeOut = true,
      lastYPos = 0,
      yPos = 0,
      yPosDelta = 5,
      nav = $('.site-header'),
      navHeight = nav.outerHeight(),
      setNavClass = function() {
        scrollTimeOut = false;
        yPos = $(window).scrollTop();

        console.log(yPos);

        if (yPos == 0) {
          nav.removeClass('fixed');
        } else {
          nav.addClass('fixed');
        }

        if (Math.abs(lastYPos - yPos) >= yPosDelta) {
          if (yPos > lastYPos && yPos > navHeight) {
            nav.addClass('hide-nav');
          } else {
            nav.removeClass('hide-nav');
          }
          lastYPos = yPos;
        }
      };

    $(window).scroll(function(e) {
      scrollTimeOut = true;
    });

    setInterval(function() {
      if (scrollTimeOut) {
        setNavClass();
      }
    }, 250);

    // Touch?
    if (skel.vars.touch) $body.addClass('is-touch');

    // Forms.
    var $form = $('form');

    // Auto-resizing textareas.
    $form.find('textarea').each(function() {
      var $this = $(this),
        $wrapper = $('<div class="textarea-wrapper"></div>'),
        $submits = $this.find('input[type="submit"]');

      $this
        .wrap($wrapper)
        .attr('rows', 1)
        .css('overflow', 'hidden')
        .css('resize', 'none')
        .on('keydown', function(event) {
          if (event.keyCode == 13 && event.ctrlKey) {
            event.preventDefault();
            event.stopPropagation();

            $(this).blur();
          }
        })
        .on('blur focus', function() {
          $this.val($.trim($this.val()));
        })
        .on('input blur focus --init', function() {
          $wrapper.css('height', $this.height());

          $this
            .css('height', 'auto')
            .css('height', $this.prop('scrollHeight') + 'px');
        })
        .on('keyup', function(event) {
          if (event.keyCode == 9) $this.select();
        })
        .triggerHandler('--init');

      // Fix.
      if (skel.vars.browser == 'ie' || skel.vars.mobile)
        $this.css('max-height', '10em').css('overflow-y', 'auto');
    });

    // Fix: Placeholder polyfill.
    $form.placeholder();

    // Prioritize "important" elements on medium.
    skel.on('+medium -medium', function() {
      $.prioritize(
        '.important\\28 medium\\29',
        skel.breakpoint('medium').active
      );
    });

    // Menu.
    var $menu = $('#menu');

    $menu.wrapInner('<div class="inner"></div>');

    $menu._locked = false;

    $menu._lock = function() {
      if ($menu._locked) return false;

      $menu._locked = true;

      window.setTimeout(function() {
        $menu._locked = false;
      }, 350);

      return true;
    };

    $menu._show = function() {
      if ($menu._lock()) $body.addClass('is-menu-visible');
      $hamburger.addClass('animate');
    };

    $menu._hide = function() {
      if ($menu._lock()) $body.removeClass('is-menu-visible');
      $hamburger.removeClass('animate');
    };

    $menu._toggle = function() {
      if ($menu._lock()) $body.toggleClass('is-menu-visible');
      $hamburger.toggleClass('animate');
    };

    $menu
      //.appendTo($body)
      .on('click', function(event) {
        event.stopPropagation();
      })
      .on('click', 'a', function(event) {
        var href = $(this).attr('href');

        event.preventDefault();
        event.stopPropagation();

        // Hide.
        $menu._hide();

        // Redirect.
        if (href == '#menu') return;

        window.setTimeout(function() {
          window.location.href = href;
        }, 350);
      });
    //.append('<a class="close" href="#menu">Close</a>');

    $body
      .on('click', 'a[href="#menu"]', function(event) {
        event.stopPropagation();
        event.preventDefault();

        // Toggle.
        $menu._toggle();
      })
      .on('click', function(event) {
        // Hide.
        $menu._hide();
      })
      .on('keydown', function(event) {
        // Hide on escape.
        if (event.keyCode == 27) $menu._hide();
      });
    //Homepage hero
    if ($('.homepage.hero').length) {
      console.log('yup has homepage hero');
      // window.setInterval(function () {
      // 	/// call your function here
      // 	//console.log('check');
      // }, 1000);
    }
  });
})(jQuery);
