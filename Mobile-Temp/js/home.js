let lastScrollY = 0;

$(function () {
  "use strict";

  /* ===============================
     1. Home Banner Swiper
  =============================== */
  const bannerSwiper = new Swiper("[data-swiper='banner']", {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    speed: 700,
    rtl: true,
    lazy: {
      loadPrevNext: true,
      enabled: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    effect: "fade",
    grabCursor: true,
  });


  /* ===============================
     2. Stages Swiper
  =============================== */
  const stagesSwiper = new Swiper("[data-swiper='stages']", {
    slidesPerView: 1.5,
    spaceBetween: 20,
    speed: 700,
    grabCursor: true,
    rtl: true,
    lazy: {
      loadPrevNext: true,
      enabled: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".stages-next",
      prevEl: ".stages-prev",
    },
    breakpoints: {
      576: { slidesPerView: 2.5 },
      768: { slidesPerView: 4 },
    },
  });

    /* ===============================
     3. Subjects Swiper
  =============================== */
  const subjectsSwiper = new Swiper("[data-swiper='subjects']", {
    slidesPerView: 1.5,
    spaceBetween: 20,
    speed: 700,
    grabCursor: true,
    rtl: true,
    lazy: {
      loadPrevNext: true,
      enabled: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".subjects-next",
      prevEl: ".subjects-prev",
    },
    breakpoints: {
      576: { slidesPerView: 2.5 },
      768: { slidesPerView: 4 },
    },
  });

  /* ===============================
     4. Courses Swiper
  =============================== */
  const coursesSwiper = new Swiper("[data-swiper='courses']", {
    slidesPerView: 1.5,
    spaceBetween: 15,
    speed: 700,
    grabCursor: true,
    rtl: true,
    lazy: {
      loadPrevNext: true,
      enabled: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".courses-next",
      prevEl: ".courses-prev",
    },
    breakpoints: {
      576: { slidesPerView: 2.5 },
      768: { slidesPerView: 4 },
    },
  });

});

  /* ===============================
     4. Students Reviews Banner Swiper
  =============================== */
  const reviewsSwiper = new Swiper("[data-swiper='reviews']", {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    speed: 700,
    rtl: true,
    lazy: {
      loadPrevNext: true,
      enabled: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    effect: "fade",
    grabCursor: true,
  });

/* ===============================
   5. Page Load Animations
=============================== */
$(window).on("load", function () {

  const sections = document.querySelectorAll(
    ".home-banner, .section-stages, .section-subjects, .section-courses"
  );

  sections.forEach((section, index) => {
    setTimeout(() => {
      section.classList.add("animate-in");
    }, index * 180); // stagger delay
  });

});

/* ===============================
   5. UI Logic (Sidebar & Navbars)
=============================== */
$(document).ready(function () {
  $('.menu-trigger').on('click', function (e) {
    e.preventDefault();

    // 1. Save current scroll position
    lastScrollY = window.scrollY || window.pageYOffset;
    // 2. Scroll to top immediately
    window.scrollTo(0, 0);
    // 3. Activate menu
    $('body').addClass('menu-active');
    // Hide navbars
    $('.navbar, .bottom-navigation').css('opacity', '0');
  });

  $('.menu-overlay').on('click', function () {
    // 1. Close menu
    $('body').removeClass('menu-active');
    // Show navbars
    $('.navbar, .bottom-navigation').css('opacity', '1');
    // 2. Restore scroll position
    window.scrollTo(0, lastScrollY);
  });
});

/* ===============================
   6. Search Feature
=============================== */

$(document).ready(function () {
  const searchOverlay = $('#searchOverlay');
  const searchInput = $('#searchInput');
  
  $(document).on('click', '.fa-search', function (e) {
    e.preventDefault();
    searchOverlay.addClass('active');
    
    setTimeout(() => {
      searchInput.focus();
    }, 400);
  });

  $('#closeSearch').on('click', function () {
    searchOverlay.removeClass('active');
  });

  searchOverlay.on('click', function (e) {
    if ($(e.target).hasClass('search-overlay')) {
      searchOverlay.removeClass('active');
    }
  });
});

/* ===============================
   7. The Add Code Feature
=============================== */
$(document).ready(function () {
  const joinOverlay = $('#joinOverlay');
  const courseInput = $('#courseCodeInput');

  $(document).on('click', '.fa-plus', function (e) {
    e.preventDefault();
    joinOverlay.addClass('active');
    
    setTimeout(() => {
      courseInput.focus();
    }, 400);
  });

  $('#closeJoin').on('click', function () {
    joinOverlay.removeClass('active');
  });

  joinOverlay.on('click', function (e) {
    if ($(e.target).hasClass('search-overlay')) {
      joinOverlay.removeClass('active');
    }
  });

  // $('#submitCodeBtn').on('click', function() {
  //   const code = courseInput.val().trim();
  //   if(code !== "") {
  //       // Backend here
  //       console.log("Submitting code:", code);
  //       $(this).prop('disabled', true).text('جاري التحقق...');
  //   }
  // });

  // Temporary
    $('#submitCodeBtn').on('click', function() {
    const code = courseInput.val().trim();
    if(true) {
        // Backend here
        console.log("Submitting code:", code);
        $(this).prop('disabled', true).text('جاري التحقق...');
    }
  });
});

// Temporary "still under development" screen
const devOverlay = document.getElementById("devOverlay");

document.querySelectorAll(".dev-link").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();          // stop navigation
    devOverlay.classList.add("active"); // show popup
  });
});

closeDevOverlay.addEventListener("click", () => {
  devOverlay.classList.remove("active");
});


$(document).ready(function () {

/* =========================
   POPUP
========================= */

    $('.popup-trigger').magnificPopup({

        type: 'inline',
        midClick: true,

        callbacks: {

            open() {

              loadPDF('../../img/Hadary/Schedules/Schedule Demo PDF.pdf');
            },

            close() {

                resetViewer();
            }
        }
    });

    /* ===============================
        SCHEDULE → VIEWER
    =============================== */

  $(document).on('click', '.course-item', function (e) {

    e.preventDefault();

    const month = $(this).find('.course-stage').text().trim();

    let pdf = "pdfDemo.pdf"; // change per month later

    const url =
      "../schedules/schedule-pdf.html" +
      "?pdf=" + encodeURIComponent(pdf) +
      "&title=" + encodeURIComponent(month);

    window.location.href = url;
  });

});
