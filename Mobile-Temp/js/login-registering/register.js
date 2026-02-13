// Form validation
// $(function () {
//   "use strict";

//   // Mock Data
//   const existingUsers = [
//     { email: "test@test.com", phone: "0123456789" },
//     { email: "user@rage3.com", phone: "0111111111" }
//   ];

//   const registerForm = $("#registerForm");

//   // Reset errors when user types
//   $('.form-input').on('input', function() {
//     $(this).removeClass('input-error');
//     $(this).next('.field-error').fadeOut(200);
//     $("#error-message").fadeOut(200);
//   });

//   if (registerForm.length !== 0) {
//     registerForm.on("submit", function (e) {
//       e.preventDefault();
      
//       let hasError = false;
//       const emailVal = $('input[name="email"]').val().toLowerCase();
//       const phoneVal = $('input[name="phoneNumber"]').val();
//       const pass = $('input[name="password"]').val();
//       const confirmPass = $('input[name="confirmPassword"]').val();

//       const emailExists = existingUsers.find(u => u.email === emailVal);
//       if (emailExists) {
//         $('input[name="email"]').addClass('input-error');
//         $('#email-error').fadeIn(300);
//         hasError = true;
//       }

//       const phoneExists = existingUsers.find(u => u.phone === phoneVal);
//       if (phoneExists) {
//         $('input[name="phoneNumber"]').addClass('input-error');
//         $('#phone-error').fadeIn(300);
//         hasError = true;
//       }

//       if (pass !== confirmPass) {
//         $("#error-message").fadeIn(300);
//         $('input[name="confirmPassword"]').addClass('input-error');
//         hasError = true;
//       }

//       if (hasError) return;

//       const userData = {
//         name: $('input[name="fullName"]').val(),
//         email: emailVal,
//         phone: phoneVal,
//         password: pass
//       };
      
//       sessionStorage.setItem("pendingRegistration", JSON.stringify(userData));

//       $(".login-card").addClass("card-exit");
//       setTimeout(function () {
//         window.location.href = "department.html";
//       }, 450);
//     });
//   }

  // $(document).on("click", ".eye-btn", function (e) {
  //   e.preventDefault();

  //   const input = $(this).siblings(".form-input");
  //   const icon = $(this).find("i");

  //   if (input.attr("type") === "password") {
  //     input.attr("type", "text");
  //     icon.removeClass("fa-eye-slash").addClass("fa-eye");
  //   } else {
  //     input.attr("type", "password");
  //     icon.removeClass("fa-eye").addClass("fa-eye-slash");
  //   }
  // });

// });


$(function () {
  "use strict";

  const registerForm = $("#registerForm");

  /* ===============================
     Toggle Password
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
     Reset Errors
  =============================== */
  $(".form-input").on("input", function () {
    $(this).removeClass("input-error");
    $(this).next(".field-error").fadeOut(200);
    $("#error-message").fadeOut(200);
  });

  /* ===============================
     Page Transition
  =============================== */
  function goNext() {
    $(".login-card").addClass("card-exit");

    setTimeout(() => {
      window.location.href = "department.html";
    }, 450);
  }

  /* ===============================
     Submit (Temporary)
  =============================== */
  registerForm.on("submit", function (e) {
    e.preventDefault();

    // TEMP: no validation yet
    goNext();
  });

});
