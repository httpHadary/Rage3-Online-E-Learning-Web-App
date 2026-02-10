let lastScrollY = 0;

$(function () {
  "use strict";

    /* ===============================
     BACK NAVIGATION
    =============================== */

    window.goBack = function () {
      animateAndGo("subjects.html");
    };


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


  /* Intercept All Internal Links */

  $(document).on("click", "a[href]", function (e) {

    const url = $(this).attr("href");

    // Ignore anchors / empty / external
    if (
      !url ||
      url.startsWith("#") ||
      url.startsWith("javascript") ||
      url.startsWith("http")
    ) {
      return;
    }

    e.preventDefault();

    animateAndGo(url);
  });


  /* Back Button */

  $("#backBtn").on("click", function (e) {

    e.preventDefault();

    const prev = document.referrer || "subjects.html";

    animateAndGo(prev);
  });



  /* ===============================
     SIDEBAR MENU
  =============================== */

  $('.menu-trigger').on('click', function (e) {
    e.preventDefault();

    lastScrollY = window.scrollY || window.pageYOffset;

    window.scrollTo(0, 0);

    $('body').addClass('menu-active');

    $('.navbar, .bottom-navigation').css('opacity', '0');
  });


  $('.menu-overlay').on('click', function () {

    $('body').removeClass('menu-active');

    $('.navbar, .bottom-navigation').css('opacity', '1');

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


  $('#submitCodeBtn').on('click', function () {

    const code = courseInput.val().trim();

    if (!code) return;

    console.log("Submitting code:", code);

    $(this)
      .prop('disabled', true)
      .text('جاري التحقق...');
  });



  /* ===============================
     DEV OVERLAY
  =============================== */

  const devOverlay      = document.getElementById("devOverlay");
  const closeDevOverlay = document.getElementById("closeDevOverlay");


  document.querySelectorAll(".dev-link").forEach(link => {

    link.addEventListener("click", function (e) {

      e.preventDefault();

      devOverlay.classList.add("active");
    });
  });


  if (closeDevOverlay) {

    closeDevOverlay.addEventListener("click", function () {

      devOverlay.classList.remove("active");
    });
  }



  /* ===============================
     URL PARAMS
  =============================== */

  function getQueryParam(name) {

    const urlParams = new URLSearchParams(window.location.search);

    return urlParams.get(name);
  }



  /* ===============================
     TEMP DATA (API LATER)
  =============================== */

  const DATA = {

    arabic: {
      name: "اللغة العربية",
      branches: [
        { id: "nahw", name: "النحو" },
        { id: "adab", name: "الأدب" },
        { id: "balagha", name: "البلاغة" }
      ]
    },

    english: {
      name: "اللغة الإنجليزية",
      branches: [
        { id: "grammar", name: "Grammar" },
        { id: "writing", name: "Writing" }
      ]
    },

    maths: {
      name: "الرياضيات",
      branches: [
        { id: "algebra", name: "الجبر" },
        { id: "geometry", name: "الهندسة" }
      ]
    }

  };



  /* ===============================
    LOAD BRANCHES
  =============================== */

  function loadBranchesPage() {

    const subjectKey = getQueryParam("subject");

    if (!subjectKey) return;


    const subject = DATA[subjectKey];

    if (!subject) return;


    // Set page title
    $(".heading-title").text(subject.name);


    const container = $("#branches-container");

    if (!container.length) return;


    container.empty();


    // No branches → go directly to chapters
    if (!subject.branches || !subject.branches.length) {

      animateAndGo(`chapters.html?subject=${subjectKey}`);
      return;
    }


    subject.branches.forEach(branch => {

      const url = `chapters.html?subject=${subjectKey}&branch=${branch.id}`;

      const card = `
        <a href="${url}"
          class="subject-item branch-link"
          data-url="${url}">

          <div class="subject-item-content">
            <h3 class="title">${branch.name}</h3>
          </div>

          <i class="fas fa-chevron-left subject-arrow"></i>

        </a>
      `;

      container.append(card);
    });
  }

  /* ===============================
    BRANCH CLICK ANIMATION
  =============================== */

  $(document).on("click", ".branch-link", function (e) {

    e.preventDefault();

    const url = $(this).data("url");

    if (!url) return;

    animateAndGo(url);
  });


  /* ===============================
     INIT
  =============================== */

  $(document).ready(function () {

    loadBranchesPage();

  });

});