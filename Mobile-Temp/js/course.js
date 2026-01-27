$(function () {
  "use strict";

  const butWrapper = $("[data-scroll]");
  const initialOffsetTop = butWrapper.offset().top;

  if (butWrapper.length !== 0) {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > initialOffsetTop) {
        !butWrapper.hasClass("sticky-bottom") &&
          butWrapper.addClass("sticky-bottom");
      } else {
        butWrapper.hasClass("sticky-bottom") &&
          butWrapper.removeClass("sticky-bottom");
      }
    });
  }
});
