$(function () {
  "use strict";

  const eyeBtn = $(".eye-btn");
  
  if (eyeBtn.length !== 0) {
    eyeBtn.on("click", function (e) {
      e.preventDefault();

      const input = $(this).prev(".form-input");
      const icon = $(this).find("i");

      if (input.attr("type") === "password") {
        input.attr("type", "text");

        icon.removeClass("fa-eye-slash").addClass("fa-eye");
      } else {
        input.attr("type", "password");

        icon.removeClass("fa-eye").addClass("fa-eye-slash");
      }
    });
  }
});