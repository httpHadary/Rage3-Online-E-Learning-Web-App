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
     2. Terms Swiper
  =============================== */
  const termsSwiper = new Swiper("[data-swiper='terms']", {
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
      nextEl: ".terms-next",
      prevEl: ".terms-prev",
    },
    breakpoints: {
      576: { slidesPerView: 2.5 },
      768: { slidesPerView: 4 },
    },
  });


  /* ===============================
     3. Courses Swiper
  =============================== */
  const coursesSwiper = new Swiper("[data-swiper='courses']", {
    slidesPerView: 2.25,
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
      576: { slidesPerView: 3.25 },
      768: { slidesPerView: 4.25 },
    },
  });

});
