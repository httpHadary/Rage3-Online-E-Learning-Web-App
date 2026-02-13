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

  function getParam(name) {

    return new URLSearchParams(window.location.search).get(name);
  }


  /* ===============================
     BACK BUTTON
  =============================== */

  window.goBack = function () {

    animateAndGo("schedules.html");
  };



  /* ===============================
     PDF VIEWER STATE
  =============================== */

  let pdfDoc = null;
  let pageNum = 1;
  let scale = 1.4;

  let canvas = document.getElementById("pdf-canvas");
  let ctx = canvas.getContext("2d");

  let pdfUrl = "";



  /* ===============================
     RENDER PAGE
  =============================== */

  function renderPage(num) {

    if (!pdfDoc) return;

    pdfDoc.getPage(num).then(function (page) {

      const viewport = page.getViewport({ scale });

      canvas.width  = viewport.width;
      canvas.height = viewport.height;

      page.render({
        canvasContext: ctx,
        viewport
      });

    });
  }



  /* ===============================
     LOAD PDF
  =============================== */

  function loadPDF() {

    const pdf = getParam("pdf");
    const title = getParam("title");


    if (!pdf) {

      $("#pdf-title").text("الملف غير متوفر");
      return;
    }


    /* Set title */

    if (title) {

      $("#pdf-title").text(title);

    } else {

      $("#pdf-title").text("الجدول الدراسي");
    }


    /* Build Path */

    pdfUrl = "../../PDFs/" + pdf;



    /* Worker */

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


    /* Load */

    pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDoc_) {

      pdfDoc = pdfDoc_;

      pageNum = 1;

      renderPage(pageNum);

    }).catch(function (err) {

      console.error(err);

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

  loadPDF();

});