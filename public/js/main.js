jQuery(document).ready(function ($) {
  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow')
    } else {
      $('.back-to-top').fadeOut('slow')
    }
  })
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo')
    return false
  })

  // Initiate the wowjs animation library
  new WOW().init()

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show',
    },
    speed: 400,
  })

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav',
    })
    $mobile_nav.find('> ul').attr({
      class: '',
      id: '',
    })
    $('body').append($mobile_nav)
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>')
    $('body').append('<div id="mobile-body-overly"></div>')
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>')

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active')
      $(this).nextAll('ul').eq(0).slideToggle()
      $(this).toggleClass('fa-chevron-up fa-chevron-down')
    })

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active')
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars')
      $('#mobile-body-overly').toggle()
    })

    $(document).click(function (e) {
      var container = $('#mobile-nav, #mobile-nav-toggle')
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active')
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars')
          $('#mobile-body-overly').fadeOut()
        }
      }
    })
  } else if ($('#mobile-nav, #mobile-nav-toggle').length) {
    $('#mobile-nav, #mobile-nav-toggle').hide()
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash)
      if (target.length) {
        var top_space = 0

        if ($('#header').length) {
          top_space = $('#header').outerHeight()

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20
          }
        }

        $('html, body').animate(
          {
            scrollTop: target.offset().top - top_space,
          },
          1500,
          'easeInOutExpo'
        )

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active')
          $(this).closest('li').addClass('menu-active')
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active')
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars')
          $('#mobile-body-overly').fadeOut()
        }
        return false
      }
    }
  })

  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled')
    } else {
      $('#header').removeClass('header-scrolled')
    }
  })

  // Intro carousel
  var introCarousel = $('.carousel')
  var introCarouselIndicators = $('.carousel-indicators')
  introCarousel
    .find('.carousel-inner')
    .children('.carousel-item')
    .each(function (index) {
      index === 0
        ? introCarouselIndicators.append(
            "<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>"
          )
        : introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>")
    })

  $('.carousel').swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == 'left') $(this).carousel('next')
      if (direction == 'right') $(this).carousel('prev')
    },
    allowPageScroll: 'vertical',
  })

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 900,
  })

  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows',
  })

  $('#portfolio-flters li').on('click', function () {
    $('#portfolio-flters li').removeClass('filter-active')
    $(this).addClass('filter-active')

    portfolioIsotope.isotope({ filter: $(this).data('filter') })
  })

  // Clients carousel (uses the Owl Carousel library)
  $('.clients-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 } },
  })

  // Testimonials carousel (uses the Owl Carousel library)
  $('.testimonials-carousel').owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  })
})

$(document).ready(function () {
  var cookie = false
  var cookieContent = $('.cookie-disclaimer')

  checkCookie()

  if (cookie === true) {
    cookieContent.hide()
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toGMTString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  }

  function getCookie(cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
    }
    return ''
  }

  function checkCookie() {
    var check = getCookie('acookie')
    if (check !== '') {
      return (cookie = true)
    } else {
      return (cookie = false) //setCookie("acookie", "accepted", 365);
    }
  }
  $('.accept-cookie').click(function () {
    setCookie('acookie', 'accepted', 365)
    cookieContent.hide(500)
  })
})

/* Fundraising Grader
 *
 * Generic Copyright, yadda yadd yadda
 *
 * Plug-ins: jQuery Validate, jQuery
 * Easing
 */

$(document).ready(function () {
  var current_fs, next_fs, previous_fs
  var left, opacity, scale
  var animating
  $('.steps').validate({
    errorClass: 'invalid',
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.insertAfter(element.next('span').children())
    },
    highlight: function (element) {
      $(element).next('span').show()
    },
    unhighlight: function (element) {
      $(element).next('span').hide()
    },
  })
  $('.next').click(function () {
    $('.steps').validate({
      errorClass: 'invalid',
      errorElement: 'span',
      errorPlacement: function (error, element) {
        error.insertAfter(element.next('span').children())
      },
      highlight: function (element) {
        $(element).next('span').show()
      },
      unhighlight: function (element) {
        $(element).next('span').hide()
      },
    })
    if (!$('.steps').valid()) {
      return true
    }
    if (animating) return false
    animating = true
    current_fs = $(this).parent()
    next_fs = $(this).parent().next()
    $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active')
    next_fs.show()
    current_fs.animate(
      {
        opacity: 0,
      },
      {
        step: function (now, mx) {
          scale = 1 - (1 - now) * 0.2
          left = now * 50 + '%'
          opacity = 1 - now
          current_fs.css({
            transform: 'scale(' + scale + ')',
          })
          next_fs.css({
            left: left,
            opacity: opacity,
          })
        },
        duration: 800,
        complete: function () {
          current_fs.hide()
          animating = false
        },
        easing: 'easeInOutExpo',
      }
    )
  })
  $('.submit').click(function () {
    $('.steps').validate({
      errorClass: 'invalid',
      errorElement: 'span',
      errorPlacement: function (error, element) {
        error.insertAfter(element.next('span').children())
      },
      highlight: function (element) {
        $(element).next('span').show()
      },
      unhighlight: function (element) {
        $(element).next('span').hide()
      },
    })
    if (!$('.steps').valid()) {
      return false
    }
    if (animating) return false
    animating = true
    current_fs = $(this).parent()
    next_fs = $(this).parent().next()
    $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active')
    next_fs.show()
    current_fs.animate(
      {
        opacity: 0,
      },
      {
        step: function (now, mx) {
          scale = 1 - (1 - now) * 0.2
          left = now * 50 + '%'
          opacity = 1 - now
          current_fs.css({
            transform: 'scale(' + scale + ')',
          })
          next_fs.css({
            left: left,
            opacity: opacity,
          })
        },
        duration: 800,
        complete: function () {
          current_fs.hide()
          animating = false
        },
        easing: 'easeInOutExpo',
      }
    )
  })
  $('.previous').click(function () {
    if (animating) return false
    animating = true
    current_fs = $(this).parent()
    previous_fs = $(this).parent().prev()
    $('#progressbar li').eq($('fieldset').index(current_fs)).removeClass('active')
    previous_fs.show()
    current_fs.animate(
      {
        opacity: 0,
      },
      {
        step: function (now, mx) {
          scale = 0.8 + (1 - now) * 0.2
          left = (1 - now) * 50 + '%'
          opacity = 1 - now
          current_fs.css({
            left: left,
          })
          previous_fs.css({
            transform: 'scale(' + scale + ')',
            opacity: opacity,
          })
        },
        duration: 800,
        complete: function () {
          current_fs.hide()
          animating = false
        },
        easing: 'easeInOutExpo',
      }
    )
  })
})
jQuery(document).ready(function () {
  jQuery(
    '#edit-submitted-acquisition-amount-1,#edit-submitted-acquisition-amount-2,#edit-submitted-cultivation-amount-1,#edit-submitted-cultivation-amount-2,#edit-submitted-cultivation-amount-3,#edit-submitted-cultivation-amount-4,#edit-submitted-retention-amount-1,#edit-submitted-retention-amount-2,#edit-submitted-constituent-base-total-constituents'
  ).keyup(function () {
    calcTotal()
  })
})

function calcTotal() {
  var grade = 0
  var donorTotal = Number(jQuery('#edit-submitted-constituent-base-total-constituents').val().replace(/,/g, ''))
  if (donorTotal) {
    donorTotal = parseFloat(donorTotal)
  } else {
    donorTotal = 0
  }
  grade += getBonusDonorPoints(donorTotal)
  var acqAmount1 = Number(jQuery('#edit-submitted-acquisition-amount-1').val().replace(/,/g, ''))
  var acqAmount2 = Number(jQuery('#edit-submitted-acquisition-amount-2').val().replace(/,/g, ''))
  var acqTotal = 0
  if (acqAmount1) {
    acqAmount1 = parseFloat(acqAmount1)
  } else {
    acqAmount1 = 0
  }
  if (acqAmount2) {
    acqAmount2 = parseFloat(acqAmount2)
  } else {
    acqAmount2 = 0
  }
  if (acqAmount1 > 0 && acqAmount2 > 0) {
    acqTotal = (((acqAmount2 - acqAmount1) / acqAmount1) * 100).toFixed(2)
  } else {
    acqTotal = 0
  }
  jQuery('#edit-submitted-acquisition-percent-change').val(acqTotal + '%')
  grade += getAcquisitionPoints(acqTotal)
  console.log(grade)
  var cultAmount1 = Number(jQuery('#edit-submitted-cultivation-amount-1').val().replace(/,/g, ''))
  var cultAmount2 = Number(jQuery('#edit-submitted-cultivation-amount-2').val().replace(/,/g, ''))
  var cultTotal = 0
  if (cultAmount1) {
    cultAmount1 = parseFloat(cultAmount1)
  } else {
    cultAmount1 = 0
  }
  if (cultAmount2) {
    cultAmount2 = parseFloat(cultAmount2)
  } else {
    cultAmount2 = 0
  }
  if (cultAmount1 > 0 && cultAmount2 > 0) {
    cultTotal = (((cultAmount2 - cultAmount1) / cultAmount1) * 100).toFixed(2)
  } else {
    cultTotal = 0
  }
  jQuery('#edit-submitted-cultivation-percent-change1').val(cultTotal + '%')
  grade += getAcquisitionPoints(cultTotal)
  var cultAmount3 = Number(jQuery('#edit-submitted-cultivation-amount-3').val().replace(/,/g, ''))
  var cultAmount4 = Number(jQuery('#edit-submitted-cultivation-amount-4').val().replace(/,/g, ''))
  if (cultAmount3) {
    cultAmount3 = parseFloat(cultAmount3)
  } else {
    cultAmount3 = 0
  }
  if (cultAmount4) {
    cultAmount4 = parseFloat(cultAmount4)
  } else {
    cultAmount4 = 0
  }
  if (cultAmount3 > 0 && cultAmount4 > 0) {
    cultTotal2 = (((cultAmount4 - cultAmount3) / cultAmount3) * 100).toFixed(2)
  } else {
    cultTotal2 = 0
  }
  jQuery('#edit-submitted-cultivation-percent-change2').val(cultTotal2 + '%')
  grade += getAcquisitionPoints(cultTotal2)
  var retAmount1 = Number(jQuery('#edit-submitted-retention-amount-1').val().replace(/,/g, ''))
  var retAmount2 = Number(jQuery('#edit-submitted-retention-amount-2').val().replace(/,/g, ''))
  var retTotal = 0
  if (retAmount1) {
    retAmount1 = parseFloat(retAmount1)
  } else {
    retAmount1 = 0
  }
  if (retAmount2) {
    retAmount2 = parseFloat(retAmount2)
  } else {
    retAmount2 = 0
  }
  if (retAmount1 > 0 && retAmount2 > 0) {
    retTotal = ((retAmount2 / retAmount1) * 100).toFixed(2)
  } else {
    retTotal = 0
  }
  jQuery('#edit-submitted-retention-percent-change').val(retTotal + '%')
  grade += getAcquisitionPoints(retTotal)
  jQuery('#edit-submitted-final-grade-grade').val(grade + ' / 400')
}

function getAcquisitionPoints(val) {
  if (val < 1) {
    return 0
  } else if (val >= 1 && val < 6) {
    return 50
  } else if (val >= 6 && val < 11) {
    return 60
  } else if (val >= 11 && val < 16) {
    return 70
  } else if (val >= 16 && val < 21) {
    return 75
  } else if (val >= 21 && val < 26) {
    return 80
  } else if (val >= 26 && val < 31) {
    return 85
  } else if (val >= 31 && val < 36) {
    return 90
  } else if (val >= 36 && val < 41) {
    return 95
  } else if (val >= 41) {
    return 100
  }
}

function getCultivationGiftPoints(val) {
  if (val < 1) {
    return 0
  } else if (val >= 1 && val < 4) {
    return 50
  } else if (val >= 4 && val < 7) {
    return 60
  } else if (val >= 7 && val < 10) {
    return 70
  } else if (val >= 10 && val < 13) {
    return 75
  } else if (val >= 13 && val < 16) {
    return 80
  } else if (val >= 16 && val < 21) {
    return 85
  } else if (val >= 21 && val < 26) {
    return 90
  } else if (val >= 26 && val < 51) {
    return 95
  } else if (val >= 51) {
    return 100
  }
}

function getCultivationDonationPoints(val) {
  if (val < 1) {
    return 0
  } else if (val >= 1 && val < 6) {
    return 50
  } else if (val >= 6 && val < 11) {
    return 60
  } else if (val >= 11 && val < 16) {
    return 70
  } else if (val >= 16 && val < 21) {
    return 75
  } else if (val >= 21 && val < 26) {
    return 80
  } else if (val >= 26 && val < 31) {
    return 85
  } else if (val >= 31 && val < 36) {
    return 90
  } else if (val >= 36 && val < 41) {
    return 95
  } else if (val >= 41) {
    return 100
  }
}

function getRetentionPoints(val) {
  if (val < 1) {
    return 0
  } else if (val >= 1 && val < 51) {
    return 50
  } else if (val >= 51 && val < 56) {
    return 60
  } else if (val >= 56 && val < 61) {
    return 70
  } else if (val >= 61 && val < 66) {
    return 75
  } else if (val >= 66 && val < 71) {
    return 80
  } else if (val >= 71 && val < 76) {
    return 85
  } else if (val >= 76 && val < 81) {
    return 90
  } else if (val >= 81 && val < 91) {
    return 95
  } else if (val >= 91) {
    return 100
  }
}

function getBonusDonorPoints(val) {
  if (val < 10001) {
    return 0
  } else if (val >= 10001 && val < 25001) {
    return 10
  } else if (val >= 25001 && val < 50000) {
    return 15
  } else if (val >= 50000) {
    return 20
  }
}
var modules = {
  $window: $(window),
  $html: $('html'),
  $body: $('body'),
  $container: $('.container'),
  init: function () {
    $(function () {
      modules.modals.init()
    })
  },
  modals: {
    trigger: $('.explanation'),
    modal: $('.modal'),
    scrollTopPosition: null,
    init: function () {
      var self = this
      if (self.trigger.length > 0 && self.modal.length > 0) {
        modules.$body.append('<div class="modal-overlay"></div>')
        self.triggers()
      }
    },
    triggers: function () {
      var self = this
      self.trigger.on('click', function (e) {
        e.preventDefault()
        var $trigger = $(this)
        self.openModal($trigger, $trigger.data('modalId'))
      })
      $('.modal-overlay').on('click', function (e) {
        e.preventDefault()
        self.closeModal()
      })
      modules.$body.on('keydown', function (e) {
        if (e.keyCode === 27) {
          self.closeModal()
        }
      })
      $('.modal-close').on('click', function (e) {
        e.preventDefault()
        self.closeModal()
      })
    },
    openModal: function (_trigger, _modalId) {
      var self = this,
        scrollTopPosition = modules.$window.scrollTop(),
        $targetModal = $('#' + _modalId)
      self.scrollTopPosition = scrollTopPosition
      modules.$html.addClass('modal-show').attr('data-modal-effect', $targetModal.data('modal-effect'))
      $targetModal.addClass('modal-show')
      modules.$container.scrollTop(scrollTopPosition)
    },
    closeModal: function () {
      var self = this
      $('.modal-show').removeClass('modal-show')
      modules.$html.removeClass('modal-show').removeAttr('data-modal-effect')
      modules.$window.scrollTop(self.scrollTopPosition)
    },
  },
}
modules.init()
