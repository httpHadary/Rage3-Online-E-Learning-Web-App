$(function () {
  "use strict";

  /* ===============================
     SWIPERS
  =============================== */

  new Swiper("[data-swiper='banner']", {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    speed: 700,
    rtl: true,
    lazy: { enabled: true },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    effect: "fade",
    grabCursor: true,
  });

  new Swiper("[data-swiper='subjects']", {
    slidesPerView: 1.5,
    spaceBetween: 20,
    speed: 700,
    rtl: true,
    lazy: { enabled: true },
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

  new Swiper("[data-swiper='courses']", {
    slidesPerView: 1.5,
    spaceBetween: 20,
    speed: 700,
    rtl: true,
    lazy: { enabled: true },
    autoplay: {
      delay: 3000,
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

  new Swiper("[data-swiper='reviews']", {
    slidesPerView: 1,
    loop: true,
    speed: 700,
    rtl: true,
    lazy: { enabled: true },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    effect: "fade",
  });

  /* ===============================
     POPUP
  =============================== */

  $(".popup-trigger").magnificPopup({

    type: "inline",
    midClick: true,

    callbacks: {

      open() {
        loadPDF("../../img/Hadary/Schedules/Schedule Demo PDF.pdf");
      },

      close() {
        resetViewer();
      }
    }
  });


  /* ===============================
     SCHEDULE → VIEWER
  =============================== */

  $(document).on("click", ".course-item", function (e) {

    e.preventDefault();

    const title = $(this).find(".title").text().trim();
    const month = $(this).find(".course-stage").text().trim();

    const fullTitle = title + " " + month;

    const pdf = "pdfDemo.pdf";

    const url =
      "../schedules/schedule-pdf.html" +
      "?pdf=" + encodeURIComponent(pdf) +
      "&title=" + encodeURIComponent(fullTitle);

    window.location.href = url;
  });

});