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

    let pdfDoc = null;
    let zoomScale = 1;
    let currentRenderTask = null;

    const canvas = document.getElementById('pdf-canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const $viewport = $('.pdf-viewport');


/* =========================
   LOAD PDF (CACHED)
========================= */

    function loadPDF(url) {

        if (pdfDoc) {
            renderPage();
            return;
        }

        pdfjsLib.getDocument(url).promise
            .then(pdf => {

                pdfDoc = pdf;
                renderPage();

            })
            .catch(console.error);
    }


/* =========================
   RENDER
========================= */

    function renderPage() {

        if (!pdfDoc) return;

        pdfDoc.getPage(1).then(page => {

            if (currentRenderTask) {
                currentRenderTask.cancel();
            }

            const viewport = page.getViewport({ scale: 2 });

            canvas.width  = viewport.width;
            canvas.height = viewport.height;

            currentRenderTask = page.render({
                canvasContext: ctx,
                viewport
            });

            currentRenderTask.promise.then(() => {

                currentRenderTask = null;
                fitToContainer();

            });

        });
    }


/* =========================
   FIT
========================= */

    function fitToContainer() {

        const w = $viewport.width();

        zoomScale = (w * 0.9) / canvas.width;
        zoomScale = Math.min(Math.max(zoomScale, 0.2), 2);

        applyZoom();
    }


/* =========================
   ZOOM
========================= */

    function applyZoom() {

        const w = canvas.width  * zoomScale;
        const h = canvas.height * zoomScale;

        $('#pdf-canvas').css({
            width:  w + 'px',
            height: h + 'px'
        });

        $('#zoom-level').text(Math.round(zoomScale * 100) + '%');
    }


/* =========================
   BUTTONS
========================= */

    $('#zoom-in').click(() => {

        zoomScale = Math.min(zoomScale * 1.1, 5);
        applyZoom();
    });


    $('#zoom-out').click(() => {

        zoomScale = Math.max(zoomScale * 0.9, 0.2);
        applyZoom();
    });


/* Ctrl + Wheel Zoom */

    $viewport.on('wheel', function (e) {

        if (!e.ctrlKey) return;

        e.preventDefault();

        zoomScale *= (e.originalEvent.deltaY > 0 ? 0.9 : 1.1);
        zoomScale = Math.min(Math.max(zoomScale, 0.2), 5);

        applyZoom();
    });


/* =========================
   FULLSCREEN
========================= */

    $('#fullscreen-btn').click(function (e) {

        e.stopPropagation();

        $viewport.hasClass('is-fullscreen')
            ? exitFullscreen()
            : enterFullscreen();
    });


/* =========================
   DRAG / PAN
========================= */

    let isDragging = false;
    let startX, startY, startLeft, startTop;
    let moved = false;


    function canDrag() {

        const canvasWidth  = canvas.getBoundingClientRect().width;
        const canvasHeight = canvas.getBoundingClientRect().height;

        return (
            canvasWidth  > $viewport.width() ||
            canvasHeight > $viewport.height() ||
            $viewport.hasClass('is-fullscreen')
        );
    }


    $viewport.add('#pdf-canvas').on('mousedown touchstart', function (e) {

        // Only left click
        if (e.type === 'mousedown' && e.button !== 0) return;

        if (!canDrag()) return;

        e.preventDefault();

        const point = e.type === 'touchstart'
            ? e.originalEvent.touches[0]
            : e;

        isDragging = true;
        moved = false;

        $viewport.addClass('dragging');

        startX = point.pageX;
        startY = point.pageY;

        startLeft = $viewport.scrollLeft();
        startTop  = $viewport.scrollTop();
    });


    $(document).on('mousemove touchmove', function (e) {

        if (!isDragging) return;

        const point = e.type === 'touchmove'
            ? e.originalEvent.touches[0]
            : e;

        if (
            Math.abs(point.pageX - startX) > 5 ||
            Math.abs(point.pageY - startY) > 5
        ) {
            moved = true;
        }

        const dx = (point.pageX - startX) * 1.3;
        const dy = (point.pageY - startY) * 1.3;

        $viewport.scrollLeft(startLeft - dx);
        $viewport.scrollTop(startTop  - dy);
    });


    $(document).on('mouseup touchend touchcancel', function () {

        isDragging = false;
        $viewport.removeClass('dragging');
    });


/* =========================
   POPUP
========================= */

    $('.popup-trigger').magnificPopup({

        type: 'inline',
        midClick: true,

        callbacks: {

            open() {

                loadPDF('img/Hadary/Schedules/Schedule Demo PDF.pdf');
            },

            close() {

                resetViewer();
            }
        }
    });


/* =========================
   RESET
========================= */

    function resetViewer() {

        $viewport.removeClass('is-fullscreen');

        $('body').css('overflow', '');

        zoomScale = 1;

        ctx.clearRect(0,0,canvas.width,canvas.height);

        $('#zoom-level').text('100%');
    }


/* =========================
   RESIZE
========================= */

    $(window).on('resize', function () {

        if (!$viewport.hasClass('is-fullscreen')) {
            fitToContainer();
        }
    });


/* =========================
   FULLSCREEN HELPERS
========================= */

    function enterFullscreen() {

        $viewport.addClass('is-fullscreen');

        $('body').css('overflow','hidden');

        zoomScale = (window.innerHeight * 0.9) / canvas.height;

        applyZoom();

        $viewport.scrollTop(0).scrollLeft(0);
    }

    function exitFullscreen() {

        $viewport.removeClass('is-fullscreen');

        $('body').css('overflow','');

        fitToContainer();

        $viewport.scrollTop(0).scrollLeft(0);
    }


/* =========================
   CLICK TO EXIT FULLSCREEN
========================= */

    $viewport.on('click', function () {

        if (!$viewport.hasClass('is-fullscreen')) return;

        if (moved) return;

        exitFullscreen();
    });

});
