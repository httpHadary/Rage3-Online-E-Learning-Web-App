let lastScrollY = 0;

$(function () {
  "use strict";

  /* ===============================
     SIDEBAR MENU
  =============================== */

  $('.menu-trigger').on('click', function (e) {
    e.preventDefault();

    // Save scroll
    lastScrollY = window.scrollY || window.pageYOffset;

    // Go to top
    window.scrollTo(0, 0);

    // Open menu
    $('body').addClass('menu-active');

    // Hide bars
    $('.navbar, .bottom-navigation').css('opacity', '0');
  });


  $('.menu-overlay').on('click', function () {

    // Close menu
    $('body').removeClass('menu-active');

    // Show bars
    $('.navbar, .bottom-navigation').css('opacity', '1');

    // Restore scroll
    window.scrollTo(0, lastScrollY);
  });



  /* ===============================
     SEARCH OVERLAY
  =============================== */

  const searchOverlay = $('#searchOverlay');
  const searchInput   = $('#searchInput');

  $(document).on('click', '.fa-search', function (e) {

    e.preventDefault();

    searchOverlay.addClass('active');

    setTimeout(() => {
      searchInput.focus();
    }, 300);
  });


  $('#closeSearch').on('click', function () {
    searchOverlay.removeClass('active');
  });


  searchOverlay.on('click', function (e) {

    if ($(e.target).hasClass('search-overlay')) {
      searchOverlay.removeClass('active');
    }
  });



  /* ===============================
     JOIN / ADD CODE OVERLAY
  =============================== */

  const joinOverlay  = $('#joinOverlay');
  const courseInput = $('#courseCodeInput');


  $(document).on('click', '.fa-plus', function (e) {

    e.preventDefault();

    joinOverlay.addClass('active');

    setTimeout(() => {
      courseInput.focus();
    }, 300);
  });


  $('#closeJoin').on('click', function () {
    joinOverlay.removeClass('active');
  });


  joinOverlay.on('click', function (e) {

    if ($(e.target).hasClass('search-overlay')) {
      joinOverlay.removeClass('active');
    }
  });


  // Temporary submit (backend later)
  $('#submitCodeBtn').on('click', function () {

    const code = courseInput.val().trim();

    if (!code) return;

    console.log("Submitting code:", code);

    $(this)
      .prop('disabled', true)
      .text('جاري التحقق...');
  });



  /* ===============================
     DEV OVERLAY (UNDER DEVELOPMENT)
  =============================== */

  const devOverlay      = document.getElementById("devOverlay");
  const closeDevOverlay = document.getElementById("closeDevOverlay");


  document.querySelectorAll(".dev-link").forEach(link => {

    link.addEventListener("click", function (e) {

      e.preventDefault();

      devOverlay.classList.add("active");
    });
  });


  closeDevOverlay.addEventListener("click", function () {

    devOverlay.classList.remove("active");
  });

});