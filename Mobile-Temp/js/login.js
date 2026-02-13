// Form Validation
// $(function () {
//   "use strict";

//   const loginForm = $("#loginForm");
//   const loginError = $("#login-error");

//   $(document).on("click", ".eye-btn", function (e) {
//     e.preventDefault();
//     const input = $(this).siblings(".form-input");
//     const icon = $(this).find("i");

//     if (input.attr("type") === "password") {
//       input.attr("type", "text");
//       icon.removeClass("fa-eye-slash").addClass("fa-eye");
//     } else {
//       input.attr("type", "password");
//       icon.removeClass("fa-eye").addClass("fa-eye-slash");
//     }
//   });

//   // Clear errors when user types
//   $(".form-input").on("input", function() {
//     $(this).removeClass("input-error");
//     loginError.fadeOut(200);
//   });

//   if (loginForm.length !== 0) {
//     loginForm.on("submit", function (e) {
//       e.preventDefault();

//       const email = $('input[name="email"]').val().trim();
//       const password = $('input[name="password"]').val().trim();

//       // MOCK DATA
//       if (email === "test@test.com" && password === "123456") {
        
//         $(".login-card").addClass("card-exit");
        
//         setTimeout(function () {
//           window.location.href = "../home%20page/home.html";
//         }, 500);

//       } else {
//         loginError.fadeIn(300);
//         $(".form-input").addClass("input-error");
//       }
//     });
//   }
// });


$(function () {
  "use strict";

  const loginForm = $("#loginForm");
  const loginError = $("#login-error");

  /* ===============================
     Toggle Password Visibility
  =============================== */
  $(document).on("click", ".eye-btn", function (e) {
    e.preventDefault();

    const input = $(this).siblings(".form-input");
    const icon = $(this).find("i");

    if (input.attr("type") === "password") {
      input.attr("type", "text");
      icon.removeClass("fa-eye-slash").addClass("fa-eye");
    } else {
      input.attr("type", "password");
      icon.removeClass("fa-eye").addClass("fa-eye-slash");
    }
  });

  /* ===============================
     Clear Errors on Input
  =============================== */
  $(".form-input").on("input", function () {
    $(this).removeClass("input-error");
    loginError.fadeOut(200);
  });

  /* ===============================
     Redirect with Animation
  =============================== */
  function goHome() {
    $(".login-card").addClass("card-exit");

    setTimeout(() => {
      window.location.href = "../home%20page/home.html";
    }, 500);
  }

  /* ===============================
     Form Submit (Mock Login)
  =============================== */
  loginForm.on("submit", function (e) {
    e.preventDefault();

    const email = $('input[name="email"]').val().trim();
    const password = $('input[name="password"]').val().trim();

    if (true) {
      goHome();
    } else {
      loginError.fadeIn(300);
      $(".form-input").addClass("input-error");
    }
  });

  /* ===============================
     Social Login (Temp)
  =============================== */
  $(".btn-google, .btn-facebook").on("click", function (e) {
    e.preventDefault();
    goHome();
  });

});