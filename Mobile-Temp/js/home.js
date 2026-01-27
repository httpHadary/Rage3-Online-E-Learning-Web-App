$(function () {
  "use strict";
  const bannerSwiper = new Swiper("[data-swiper='banner']", {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    speed: 700,
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

  const termsSwiper = new Swiper("[data-swiper='terms']", {
    slidesPerView: 1.5,
    spaceBetween: 20,
    speed: 700,
    grabCursor: true,
    lazy: {
      loadPrevNext: true,
      enabled: true,
    },
    autoplay: {
      delay: 3000,
      reverseDirection: true,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 2.5,
      },
      768: {
        slidesPerView: 4,
      },
    },
  });

  const coursesSwiper = new Swiper("[data-swiper='courses']", {
    slidesPerView: 2.25,
    spaceBetween: 15,
    speed: 700,
    grabCursor: true,
    autoplay: {
      delay: 5000,
      reverseDirection: true,
      disableOnInteraction: false,
    },
    lazy: {
      loadPrevNext: true,
      enabled: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 3.25,
      },
      768: {
        slidesPerView: 4.25,
      },
    },
  });
});
