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


// Form Without Validation
$(function () {
  "use strict";

  const loginForm = $("#loginForm");
  const loginError = $("#login-error");

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

  // Clear errors when user types
  $(".form-input").on("input", function() {
    $(this).removeClass("input-error");
    loginError.fadeOut(200);
  });

  loginForm.on("submit", function (e) {
    e.preventDefault();

    const email = $('input[name="email"]').val().trim();
    const password = $('input[name="password"]').val().trim();

    if (true) {
      
      $(".login-card").addClass("card-exit");
      
      setTimeout(function () {
        window.location.href = "../home%20page/home.html";
      }, 500);

    } else {
      loginError.fadeIn(300);
      $(".form-input").addClass("input-error");
    }
  });

  $(document).on("click", ".btn-google", function (e) {
    e.preventDefault();

    $(".login-card").addClass("card-exit");
    
    setTimeout(function () {
      window.location.href = "../home%20page/home.html";
    }, 500);
  });

  $(document).on("click", ".btn-facebook", function (e) {
    e.preventDefault();

    $(".login-card").addClass("card-exit");
    
    setTimeout(function () {
      window.location.href = "../home%20page/home.html";
    }, 500);
  });

});