$(function () {
  "use strict";

  const swiperTriggers = new Swiper("#profileTriggerSwiper", {
    spaceBetween: 10,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const swiperProfile = new Swiper("#profileSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoHeight: true,
    thumbs: {
      swiper: swiperTriggers,
    },
  });

  const eyeIcon = $(".eye-icon");
  if (eyeIcon.length !== 0) {
    eyeIcon.on("click", function (e) {
      e.preventDefault();

      $(this).toggleClass("show");

      if ($(this).hasClass("show")) {
        $(this).next("input").attr("type", "text");
      } else {
        $(this).next("input").attr("type", "password");
      }
    });
  }

  const logoutBtn = $("#btnLogout");
  logoutBtn.on("click", function (e) {
    e.preventDefault();

    location.href = "home.html";
  });
});
