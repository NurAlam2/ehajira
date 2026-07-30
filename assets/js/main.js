

(function () {
  "use strict";



  const headerEl = document.querySelector('.e-header');
  const headerWrap = document.querySelector('.e-header-wrap');
  const STICKY_THRESHOLD = 40;

  function updateSticky() {
    const shouldStick = window.scrollY > STICKY_THRESHOLD;
    headerEl.classList.toggle('is-stuck', shouldStick);
    if (shouldStick) {
      document.body.style.paddingTop = headerWrap.offsetHeight + 'px';
    } else {
      document.body.style.paddingTop = '';
    }
  }

  window.addEventListener('scroll', updateSticky);
  window.addEventListener('resize', updateSticky);
  updateSticky();

  // Video modal: load the YouTube embed only when opened, remove it on close so playback stops
  const eVideoModal = document.getElementById('eVideoModal');
  const eVideoFrame = document.getElementById('eVideoFrame');

  eVideoModal.addEventListener('shown.bs.modal', function () {
    eVideoFrame.src = eVideoFrame.getAttribute('data-src') + '&autoplay=1';
  });

  eVideoModal.addEventListener('hidden.bs.modal', function () {
    eVideoFrame.src = '';
  });



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



  // ===== Pricing: monthly/yearly + currency (combined) =====
  const ePricingToggle = document.getElementById('ePricingToggle');
  const CURRENCY_RATES = { BDT: 1, AED: 1 / 30, SAR: 1 / 29.3 }; // approximate rates, for display only
  let currentBilling = 'monthly';
  let currentCurrency = 'BDT';
  let currentSymbol = '৳';

  function refreshPrices() {
    document.querySelectorAll('.e-price-value').forEach(function (el) {
      const raw = el.getAttribute('data-' + currentBilling);
      if (!raw) return;
      const bdtNumber = parseFloat(raw.replace(/,/g, ''));
      const converted = Math.round(bdtNumber * CURRENCY_RATES[currentCurrency]);
      el.textContent = converted.toLocaleString('en-US');
    });
    document.querySelectorAll('.e-price-currency').forEach(function (el) {
      el.textContent = currentSymbol;
    });
  }

  if (ePricingToggle) {
    const toggleBtns = ePricingToggle.querySelectorAll('.e-toggle-btn');
    const billedNotes = document.querySelectorAll('.e-price-billed-note');

    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentBilling = btn.getAttribute('data-billing');
        toggleBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        billedNotes.forEach(function (el) {
          el.textContent = el.getAttribute('data-' + currentBilling + '-note');
        });

        refreshPrices();
      });
    });
  }

  // ===== Currency dropdown (header + offcanvas, synced) =====
  document.querySelectorAll('.e-curr-opt').forEach(function (opt) {
    opt.addEventListener('click', function (e) {
      e.preventDefault();
      currentCurrency = opt.getAttribute('data-currency');
      currentSymbol = opt.getAttribute('data-symbol');

      document.querySelectorAll('.e-curr-opt').forEach(function (o) {
        o.classList.toggle('active', o.getAttribute('data-currency') === currentCurrency);
      });
      document.querySelectorAll('.e-curr-label').forEach(function (el) {
        el.textContent = currentCurrency;
      });
      document.querySelectorAll('.e-curr-symbol').forEach(function (el) {
        el.innerHTML = currentSymbol;
      });

      refreshPrices();
    });
  });

  // ===== Language dropdown (drives hidden Google Translate widget) =====
  function triggerGoogleTranslate(lang) {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event('change'));
    } else {
      // Google Translate script may still be loading — retry briefly
      setTimeout(function () { triggerGoogleTranslate(lang); }, 400);
    }
  }

  document.querySelectorAll('.e-lang-opt').forEach(function (opt) {
    opt.addEventListener('click', function (e) {
      e.preventDefault();
      const lang = opt.getAttribute('data-lang');
      const label = opt.getAttribute('data-label');

      document.querySelectorAll('.e-lang-opt').forEach(function (o) {
        o.classList.toggle('active', o.getAttribute('data-lang') === lang);
      });
      document.querySelectorAll('.e-lang-label').forEach(function (el) {
        el.textContent = label;
      });

      triggerGoogleTranslate(lang === 'en' ? 'en' : lang);
    });
  });

  // Safety net: forcibly remove/hide Google's translate banner if it ever slips through
  function killGoogleBanner() {
    document.body.style.top = '0px';
    const frame = document.querySelector('iframe.goog-te-banner-frame, #goog-te-banner-frame');
    if (frame) { frame.style.display = 'none'; frame.style.visibility = 'hidden'; frame.style.height = '0'; }
  }
  const eBannerObserver = new MutationObserver(killGoogleBanner);
  eBannerObserver.observe(document.body, { childList: true, subtree: false });
  setInterval(killGoogleBanner, 800);

  // ===== Book a Demo form (client-side only — connect to your backend/email service) =====
  const eDemoForm = document.getElementById('eDemoForm');
  const eDemoSuccess = document.getElementById('eDemoSuccess');
  const eDemoModalEl = document.getElementById('eDemoModal');

  if (eDemoForm) {
    eDemoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      eDemoForm.classList.add('d-none');
      eDemoSuccess.classList.remove('d-none');
    });
  }

  if (eDemoModalEl) {
    eDemoModalEl.addEventListener('hidden.bs.modal', function () {
      setTimeout(function () {
        eDemoForm.reset();
        eDemoForm.classList.remove('d-none');
        eDemoSuccess.classList.add('d-none');
      }, 200);
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
