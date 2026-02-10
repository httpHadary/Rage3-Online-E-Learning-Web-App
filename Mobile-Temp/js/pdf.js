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
     URL PARAMS
  =============================== */

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }



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

    setTimeout(() => {
      searchInput.focus();
    }, 300);
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

    setTimeout(() => {
      courseInput.focus();
    }, 300);
  });


  $('#closeJoin').on('click', function () {
    joinOverlay.removeClass('active');
  });


  joinOverlay.on('click', function (e) {

    if ($(e.target).hasClass('search-overlay')) {
      joinOverlay.removeClass('active');
    }
  });



  /* ===============================
     DEV OVERLAY
  =============================== */

  const devOverlay      = document.getElementById("devOverlay");
  const closeDevOverlay = document.getElementById("closeDevOverlay");


  document.querySelectorAll(".dev-link").forEach(link => {

    link.addEventListener("click", function (e) {

      e.preventDefault();

      devOverlay.classList.add("active");
    });
  });


  if (closeDevOverlay) {

    closeDevOverlay.addEventListener("click", function () {

      devOverlay.classList.remove("active");
    });
  }



  /* ===============================
     BACK (PDF → CONTENT)
  =============================== */

  window.goBack = function () {

    const subject = getQueryParam("subject");
    const branch  = getQueryParam("branch");
    const chapter = getQueryParam("chapter");

    if (!subject || !chapter) {
      animateAndGo("subjects.html");
      return;
    }

    let url = `content.html?subject=${subject}&chapter=${chapter}`;

    if (branch) url += `&branch=${branch}`;

    animateAndGo(url);
  };



  /* ===============================
     TEMP PDF DATA (API LATER)
  =============================== */

  const PDFS = {

    arabic: {

      nahw: {

        ch1: {

          f1: {
            title: "ملف القواعد PDF",
            url: "../PDFs/pdfDemo.pdf"
          },

          f2: {
            title: "واجب تدريبي",
            url: "../PDFs/pdfDemo.pdf"
          }

        }

      }

    },


    geography: {

      ch1: {

        f1: {
          title: "ملف المناخ",
          url: "../PDFs/pdfDemo.pdf"
        }

      }

    }

  };



  /* ===============================
     PDF VIEWER STATE
  =============================== */

  let pdfDoc  = null;
  let pageNum = 1;
  let scale   = 1.4;
  let canvas  = null;
  let ctx     = null;
  let pdfUrl  = "";



  /* ===============================
     RENDER PAGE
  =============================== */

  function renderPage(num) {

    if (!pdfDoc) return;

    pdfDoc.getPage(num).then(function (page) {

      const viewport = page.getViewport({ scale });

      canvas.width  = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: ctx,
        viewport
      };

      page.render(renderContext);

    });
  }



  /* ===============================
     LOAD PDF
  =============================== */

  function loadPDF() {

    const subject = getQueryParam("subject");
    const branch  = getQueryParam("branch");
    const chapter = getQueryParam("chapter");
    const fileId  = getQueryParam("file");

    if (!subject || !chapter || !fileId) {

      $("#pdf-title").text("الملف غير متوفر");
      return;
    }


    let file = null;

    if (branch) {
      file = PDFS?.[subject]?.[branch]?.[chapter]?.[fileId];
    } else {
      file = PDFS?.[subject]?.[chapter]?.[fileId];
    }


    if (!file) {

      $("#pdf-title").text("الملف غير متوفر");

      return;
    }


    /* Title */

    $("#pdf-title").text(file.title);


    /* Store URL */

    pdfUrl = file.url;


    /* Canvas */

    canvas = document.getElementById("pdf-canvas");
    ctx    = canvas.getContext("2d");


    /* Worker */

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


    /* Load */

    pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {

      pdfDoc = pdf;

      pageNum = 1;

      renderPage(pageNum);

    }).catch(function () {

      $("#pdf-title").text("خطأ في تحميل الملف");

    });
  }



  /* ===============================
     DOWNLOAD OVERLAY
  =============================== */

  const pdfOverlay = $("#pdfDownloadOverlay");
  const pdfFrame   = $("#pdf-download-frame");


  $("#download-pdf").on("click", function (e) {

    e.preventDefault();

    if (!pdfUrl) return;

    // Load PDF inside overlay
    pdfFrame.attr("src", pdfUrl);

    pdfOverlay.addClass("active");
  });


  $("#closePdfOverlay").on("click", function () {

    pdfOverlay.removeClass("active");

    pdfFrame.attr("src", "");
  });


  pdfOverlay.on("click", function (e) {

    if ($(e.target).hasClass("search-overlay")) {

      pdfOverlay.removeClass("active");

      pdfFrame.attr("src", "");
    }
  });



  /* ===============================
     INIT
  =============================== */

  $(document).ready(function () {

    loadPDF();

  });

});
