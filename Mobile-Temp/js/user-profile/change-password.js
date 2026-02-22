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

});


$(function () {

  "use strict";

  const status = $("#passwordStatus");

  /* ===============================
     TOGGLE PASSWORD VISIBILITY
  =============================== */

  $(".toggle-password").on("click", function () {

    const input = $(this).siblings("input");

    const type = input.attr("type") === "password" ? "text" : "password";
    input.attr("type", type);

    $(this).toggleClass("fa-eye fa-eye-slash");

  });


  /* ===============================
     FORM VALIDATION
  =============================== */

  $(".change-form").on("submit", function (e) {

    e.preventDefault();

    const current = $("#currentPassword").val().trim();
    const newPass = $("#newPassword").val().trim();
    const confirm = $("#confirmPassword").val().trim();

    if (!current || !newPass || !confirm) {
      status.css("color", "red").text("يرجى ملء جميع الحقول");
      return;
    }

    if (newPass.length < 6) {
      status.css("color", "red").text("كلمة السر يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    if (newPass !== confirm) {
      status.css("color", "red").text("كلمتا السر غير متطابقتين");
      return;
    }

    status.css("color", "green").text("✔ تم تغيير كلمة السر بنجاح");

  });

});