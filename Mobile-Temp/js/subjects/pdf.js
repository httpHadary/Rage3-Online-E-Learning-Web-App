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
     BACK (PDF → CONTENT)
  =============================== */

  window.goBack = function () {

    const subject = getQueryParam("subject");
    const branch  = getQueryParam("branch");

    if (!subject) {

      animateAndGo("subjects.html");
      return;
    }


    /* Back to content */

    let url = `content.html?subject=${subject}`;

    if (branch) {
      url += `&branch=${branch}`;
    }

    animateAndGo(url);
  };



  /* ===============================
     TEMP PDF DATA (API LATER)
  =============================== */

  const PDFS = {

    arabic: {

      nahw: {

        f1: {
          title: "ملف القواعد PDF",
          url: "../../PDFs/pdfDemo.pdf"
        },

        f2: {
          title: "واجب تدريبي",
          url: "../../PDFs/pdfDemo.pdf"
        }

      }

    },


    geography: {

      f1: {
        title: "ملف المناخ",
        url: "../../PDFs/pdfDemo.pdf"
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
    const fileId  = getQueryParam("file");


    if (!subject || !fileId) {

      $("#pdf-title").text("الملف غير متوفر");
      return;
    }


    let file = null;


    /* With branch */

    if (branch) {

      file = PDFS?.[subject]?.[branch]?.[fileId];
    }

    /* No branch */

    else {

      file = PDFS?.[subject]?.[fileId];
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