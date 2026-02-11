let lastScrollY = 0;

$(function () {
  "use strict";

  /* ===============================
     PAGE TRANSITION
  =============================== */

  function animateAndGo(url) {

    const app = document.querySelector(".app");

    if (!app) {
      window.location.href = url;
      return;
    }

    app.classList.add("page-exit");

    setTimeout(() => {
      window.location.href = url;
    }, 350);
  }


  /* ===============================
     GLOBAL PDF URL
  =============================== */

  let pdfUrl = null;



  /* ===============================
     SIDEBAR MENU
  =============================== */

  $('.menu-trigger').on('click', function (e) {

    e.preventDefault();

    lastScrollY = window.scrollY || window.pageYOffset;

    window.scrollTo(0, 0);

    $('body').addClass('menu-active');

    $('.navbar, .bottom-navigation').css('opacity', '0');
  });


  $('.menu-overlay').on('click', function () {

    $('body').removeClass('menu-active');

    $('.navbar, .bottom-navigation').css('opacity', '1');

    window.scrollTo(0, lastScrollY);
  });



  /* ===============================
     SEARCH OVERLAY
  =============================== */

  const searchOverlay = $('#searchOverlay');
  const searchInput   = $('#searchInput');


  $(document).on('click', '.fa-search', function (e) {

    e.preventDefault();

    searchOverlay.addClass('active');

    setTimeout(() => searchInput.focus(), 300);
  });


  $('#closeSearch').on('click', function () {

    searchOverlay.removeClass('active');
  });


  searchOverlay.on('click', function (e) {

    if ($(e.target).hasClass('search-overlay')) {

      searchOverlay.removeClass('active');
    }
  });



  /* ===============================
     JOIN OVERLAY
  =============================== */

  const joinOverlay  = $('#joinOverlay');
  const courseInput = $('#courseCodeInput');


  $(document).on('click', '.fa-plus', function (e) {

    e.preventDefault();

    joinOverlay.addClass('active');

    setTimeout(() => courseInput.focus(), 300);
  });


  $('#closeJoin').on('click', function () {

    joinOverlay.removeClass('active');
  });


  joinOverlay.on('click', function (e) {

    if ($(e.target).hasClass('search-overlay')) {

      joinOverlay.removeClass('active');
    }
  });



  $('#submitCodeBtn').on('click', function () {

    const code = courseInput.val().trim();

    if (!code) return;

    $(this)
      .prop('disabled', true)
      .text('جاري التحقق...');
  });



  /* ===============================
     PDF CORE VARS
  =============================== */

  const $viewport = $('.pdf-viewport');
  const canvas    = document.getElementById('pdf-canvas');

  let ctx = canvas ? canvas.getContext('2d') : null;

  let pdfDoc   = null;
  let pdfPage  = null;

  let zoomScale  = 0.5;
  let isDragging = false;



  /* ===============================
     MAGNIFIC POPUP
  =============================== */

  $('.popup-trigger').magnificPopup({

    type: 'inline',
    midClick: true,

    callbacks: {

      open() {

        // Get clicked card
        const $card = $.magnificPopup.instance.st.el;

        // Get PDF path
        pdfUrl = $card.data('pdf');

        if (!pdfUrl) {

          console.error('No PDF found');
          return;
        }

        // Reset zoom
        zoomScale = 0.5;
        updateZoomLabel();

        // Update title
        const month = $card.find('.schedule-month').text();
        $('#pdf-title').text(month + ' Schedule');

        // Load PDF
        loadPDF(pdfUrl);
      },


      close() {

        resetViewer();

        pdfUrl = null;
      }
    }
  });



  /* ===============================
     LOAD PDF
  =============================== */

  async function loadPDF(url) {

    try {

      const loadingTask = pdfjsLib.getDocument(url);

      pdfDoc = await loadingTask.promise;

      pdfPage = await pdfDoc.getPage(1);

      renderPage();

    } catch (err) {

      console.error('PDF Load Error:', err);
    }
  }



  /* ===============================
     RENDER PAGE
  =============================== */

  function renderPage() {

    if (!pdfPage || !canvas) return;

    const viewport = pdfPage.getViewport({ scale: zoomScale });

    canvas.width  = viewport.width;
    canvas.height = viewport.height;

    pdfPage.render({
      canvasContext: ctx,
      viewport
    });
  }



  /* ===============================
     ZOOM HELPERS
  =============================== */

  function applyZoom() {

    renderPage();
  }


  function fitToContainer() {

    if (!pdfPage || !canvas) return;

    const containerWidth = $viewport.width();

    const base = pdfPage.getViewport({ scale: 1 });

    zoomScale = containerWidth / base.width;

    zoomScale = Math.min(Math.max(zoomScale, 0.5), 2.5);

    applyZoom();

    updateZoomLabel();
  }



  /* ===============================
     RESET
  =============================== */

  function resetViewer() {

    $viewport.removeClass('is-fullscreen');

    $('body').css('overflow', '');

    zoomScale = 0.5;

    if (ctx && canvas) {

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    $('#zoom-level').text('50%');
  }



  /* ===============================
     WINDOW RESIZE
  =============================== */

  $(window).on('resize', function () {

    if (!$viewport.hasClass('is-fullscreen')) {

      fitToContainer();
    }
  });



  /* ===============================
     FULLSCREEN
  =============================== */

  function enterFullscreen() {

    $viewport.addClass('is-fullscreen');

    $('body').css('overflow', 'hidden');

    fitToContainer();

    $viewport.scrollTop(0).scrollLeft(0);
  }


  function exitFullscreen() {

    $viewport.removeClass('is-fullscreen');

    $('body').css('overflow', '');

    fitToContainer();

    $viewport.scrollTop(0).scrollLeft(0);
  }



  $('#fullscreen-btn').on('click', function () {

    if ($viewport.hasClass('is-fullscreen')) {

      exitFullscreen();

    } else {

      enterFullscreen();
    }
  });



  /* ===============================
     DRAG
  =============================== */

  let startX, startY, scrollX, scrollY;


  $viewport.on('mousedown', function (e) {

    isDragging = false;

    startX = e.pageX;
    startY = e.pageY;

    scrollX = $viewport.scrollLeft();
    scrollY = $viewport.scrollTop();

    $(this).addClass('dragging');
  });


  $viewport.on('mousemove', function (e) {

    if (!$viewport.hasClass('dragging')) return;

    isDragging = true;

    const dx = e.pageX - startX;
    const dy = e.pageY - startY;

    $viewport.scrollLeft(scrollX - dx);
    $viewport.scrollTop(scrollY - dy);
  });


  $viewport.on('mouseup mouseleave', function () {

    $(this).removeClass('dragging');
  });



  /* ===============================
     EXIT FULLSCREEN
  =============================== */

  $viewport.on('click', function () {

    if (!$viewport.hasClass('is-fullscreen')) return;

    if (isDragging) return;

    exitFullscreen();
  });



  /* ===============================
     BUTTON ZOOM
  =============================== */

  $('#zoom-in').on('click', function () {

    zoomScale = Math.min(zoomScale + 0.15, 2.5);

    applyZoom();

    updateZoomLabel();
  });


  $('#zoom-out').on('click', function () {

    zoomScale = Math.max(zoomScale - 0.15, 0.5);

    applyZoom();

    updateZoomLabel();
  });



  function updateZoomLabel() {

    $('#zoom-level').text(Math.round(zoomScale * 100) + '%');
  }



  /* ===============================
     MOBILE PINCH
  =============================== */

  let lastTouchDistance = null;


  $viewport.on('touchstart', function (e) {

    if (e.touches.length === 2) {

      const dx = e.touches[0].pageX - e.touches[1].pageX;
      const dy = e.touches[0].pageY - e.touches[1].pageY;

      lastTouchDistance = Math.hypot(dx, dy);
    }
  });


  $viewport.on('touchmove', function (e) {

    if (e.touches.length === 2) {

      e.preventDefault();

      const dx = e.touches[0].pageX - e.touches[1].pageX;
      const dy = e.touches[0].pageY - e.touches[1].pageY;

      const distance = Math.hypot(dx, dy);

      if (lastTouchDistance) {

        zoomScale *= distance / lastTouchDistance;

        zoomScale = Math.min(Math.max(zoomScale, 0.5), 2.5);

        applyZoom();

        updateZoomLabel();
      }

      lastTouchDistance = distance;
    }
  });


  $viewport.on('touchend touchcancel', function () {

    lastTouchDistance = null;
  });



  /* ===============================
     DOWNLOAD OVERLAY
  =============================== */

  const pdfOverlay = $('#pdfDownloadOverlay');
  const pdfFrame   = $('#pdf-download-frame');


  $('#download-pdf').on('click', function (e) {

    e.preventDefault();

    if (!pdfUrl) return;

    pdfFrame.attr('src', pdfUrl);

    pdfOverlay.addClass('active');
  });


  $('#closePdfOverlay').on('click', function () {

    pdfOverlay.removeClass('active');

    pdfFrame.attr('src', '');
  });


  pdfOverlay.on('click', function (e) {

    if ($(e.target).hasClass('search-overlay')) {

      pdfOverlay.removeClass('active');

      pdfFrame.attr('src', '');
    }
  });

});