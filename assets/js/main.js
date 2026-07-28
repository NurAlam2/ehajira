/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Feb 22 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";







  const testiSwiper = new Swiper('.e-testi-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: '.e-testi-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.e-testi-nav.next',
      prevEl: '.e-testi-nav.prev'
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 }
    }
  });



  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  document.addEventListener('DOMContentLoaded', aosInit);


  // Pricing monthly / yearly toggle
  const ePricingToggle = document.getElementById('ePricingToggle');
  if (ePricingToggle) {
    const toggleBtns = ePricingToggle.querySelectorAll('.e-toggle-btn');
    const priceValues = document.querySelectorAll('.e-price-value');
    const billedNotes = document.querySelectorAll('.e-price-billed-note');

    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const billing = btn.getAttribute('data-billing');

        toggleBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        priceValues.forEach(function (el) {
          el.textContent = el.getAttribute('data-' + billing);
        });

        billedNotes.forEach(function (el) {
          el.textContent = el.getAttribute('data-' + billing + '-note');
        });
      });
    });
  }


  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);


  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  // Back to top button
  const eBackTop = document.getElementById('eBackTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      eBackTop.classList.add('show');
    } else {
      eBackTop.classList.remove('show');
    }
  });
  eBackTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
