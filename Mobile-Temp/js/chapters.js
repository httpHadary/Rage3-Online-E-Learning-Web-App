let lastScrollY = 0;

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


  /* ===============================
     BACK NAVIGATION
  =============================== */

    window.goBack = function () {
        const subject = getQueryParam("subject");
        const branch  = getQueryParam("branch");

        if (!branch) {
            animateAndGo("subjects.html");
            return;
        }

        animateAndGo(`branches.html?subject=${subject}`);
    };


  /* ===============================
     INTERCEPT INTERNAL LINKS
  =============================== */

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
     JOIN OVERLAY
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

    const CHAPTERS = {

    arabic: {

            nahw: [
            { id: "ch1", name: "الباب الأول" },
            { id: "ch2", name: "الباب الثاني" },
            { id: "ch3", name: "الباب الثالث" }
            ],

            adab: [
            { id: "ch1", name: "عصر الجاهلية" },
            { id: "ch2", name: "العصر العباسي" }
            ],

            balagha: [
            { id: "ch1", name: "التشبيه" },
            { id: "ch2", name: "الاستعارة" }
            ]

        },


        maths: {

            algebra: [
            { id: "ch1", name: "المعادلات" },
            { id: "ch2", name: "الدوال" }
            ],

            geometry: [
            { id: "ch1", name: "المثلثات" },
            { id: "ch2", name: "الدائرة" }
            ]

        },
        
        geography: [
            { id: "ch1", name: "الخرائط" },
            { id: "ch2", name: "المناخ" },
            { id: "ch3", name: "السكان" }
        ]

    };


    /* ===============================
        LOAD CHAPTERS
    =============================== */

    function loadChaptersPage() {

    const subject = getQueryParam("subject");
    const branch  = getQueryParam("branch");

    if (!subject) return;

    let chapters = null;


    /* ===============================
        CASE 1: Subject → Branch → Chapters
    =============================== */
    if (branch) {

        chapters = CHAPTERS?.[subject]?.[branch];

    }

    /* ===============================
        CASE 2: Subject → Chapters (No Branches)
    =============================== */
    else {

        chapters = CHAPTERS?.[subject];

    }


    const container = $("#chapters-container");

    if (!container.length) return;

    container.empty();


    /* ===============================
        NO DATA
    =============================== */
    if (!chapters || !chapters.length) {

        container.html(`
        <p style="text-align:center;color:#888">
            لا توجد فصول حالياً
        </p>
        `);

        return;
    }


    /* ===============================
        TITLE
    =============================== */
    $("#page-title").text("الفصول");


    /* ===============================
        RENDER
    =============================== */

    chapters.forEach(chapter => {

        const url =
        `content.html?subject=${subject}` +
        (branch ? `&branch=${branch}` : "") +
        `&chapter=${chapter.id}`;


        const card = `
        <a href="${url}"
            class="subject-item chapter-link"
            data-url="${url}">

            <div class="subject-item-content">
            <h3 class="title">${chapter.name}</h3>
            </div>

            <i class="fas fa-chevron-left subject-arrow"></i>

        </a>
        `;

        container.append(card);
    });

    }


    /* ===============================
        CHAPTER CLICK
    =============================== */

    $(document).on("click", ".chapter-link", function (e) {

    e.preventDefault();

    const url = $(this).data("url");

    animateAndGo(url);
    });


  /* ===============================
     INIT
  =============================== */

     $(document).ready(function () {

         loadChaptersPage();

    });


});