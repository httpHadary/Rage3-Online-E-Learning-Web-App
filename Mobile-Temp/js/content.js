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
     URL PARAMS
  =============================== */

  function getQueryParam(name) {

    const urlParams = new URLSearchParams(window.location.search);

    return urlParams.get(name);
  }



    /* ===============================
        BACK NAVIGATION (LESSONS → CHAPTERS)
    =============================== */

    window.goBack = function () {

        const subject = getQueryParam("subject");
        const branch  = getQueryParam("branch");
        const chapter = getQueryParam("chapter");

        if (!subject || !chapter) {

            animateAndGo("subjects.html");
            return;
        }

        let url = `chapters.html?subject=${subject}`;

        if (branch) {
            url += `&branch=${branch}`;
        }

        animateAndGo(url);
    };


  /* ===============================
     INTERCEPT INTERNAL LINKS
  =============================== */

  $(document).on("click", "a[href]", function (e) {

    const url = $(this).attr("href");

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
        LESSON CONTENT (TEMP DATA)
    =============================== */

    const LESSONS = {

    arabic: {

        nahw: {

        ch1: {

            videos: [
            { id: "v1", 
              title: "شرح الباب الأول - الجزء الأول",
              youtubeId: "tP49cWxRMPk"
            },
            { id: "v2", 
              title: "تدريبات نحوية",
              youtubeId: "tP49cWxRMPk"
            }
            ],

            files: [
            { id: "f1", title: "ملف القواعد PDF" },
            { id: "f2", title: "واجب تدريبي" }
            ]

        }

        }

    },


    geography: {

        ch1: {

        videos: [
            { id: "v1", title: "شرح الخرائط" }
        ],

        files: [
            { id: "f1", title: "ملف المناخ" }
        ]

        }

    }

    };


    /* ===============================
        LOAD LESSON CONTENT
    =============================== */

    function loadLessonContent() {

    const subject = getQueryParam("subject");
    const branch  = getQueryParam("branch");
    const chapter = getQueryParam("chapter");

    if (!subject || !chapter) return;


    let data = null;

    /* Has Branch */
    if (branch) {

        data = LESSONS?.[subject]?.[branch]?.[chapter];

    }

    /* No Branch */
    else {

        data = LESSONS?.[subject]?.[chapter];

    }


    const videosBox = $("#videos-container");
    const filesBox  = $("#files-container");

    videosBox.empty();
    filesBox.empty();


    /* ===============================
        NO DATA
    =============================== */

    if (!data) {

        videosBox.html(`
        <p style="text-align:center;color:#888">
            لا توجد فيديوهات
        </p>
        `);

        filesBox.html(`
        <p style="text-align:center;color:#888">
            لا توجد ملفات
        </p>
        `);

        return;
    }


    /* ===============================
        VIDEOS
    =============================== */

    if (!data.videos || !data.videos.length) {

        videosBox.html(`
        <p style="text-align:center;color:#888">
            لا توجد فيديوهات
        </p>
        `);

    } else {

        data.videos.forEach(video => {

          if (!video.youtubeId) return;

          const url =
            `video.html?subject=${subject}` +
            (branch ? `&branch=${branch}` : "") +
            `&chapter=${chapter}` +
            `&yt=${video.youtubeId}` +
            `&title=${encodeURIComponent(video.title)}`;

          const card = `
            <a href="${url}"
              class="lesson-item video-link"
              data-url="${url}">

              <div class="lesson-row">

                <div class="lesson-info">
                  <span class="lesson-title">${video.title}</span>
                </div>

                <i class="fas fa-chevron-left lesson-arrow"></i>

              </div>

            </a>
          `;

          videosBox.append(card);

        });


    }

    /* ===============================
      FILES
    =============================== */

    if (!data.files || !data.files.length) {

      filesBox.html(`
        <p style="text-align:center;color:#888">
            لا توجد ملفات
        </p>
      `);

    } else {

      data.files.forEach(file => {

        const url =
          `pdf.html?subject=${subject}` +
          (branch ? `&branch=${branch}` : "") +
          `&chapter=${chapter}` +
          `&file=${file.id}`;

        const card = `
          <a href="${url}"
            class="lesson-item file-link"
            data-url="${url}">

            <div class="lesson-row">

              <div class="lesson-info">
                <span class="lesson-title">${file.title}</span>
              </div>

              <i class="fas fa-chevron-left lesson-arrow"></i>

            </div>

          </a>
        `;

        filesBox.append(card);

      });

    }

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

    $("#page-title").text("المحتوى");
    loadLessonContent();

  });

  /* ===============================
    VIDEO CLICK
  =============================== */

  $(document).on("click", ".video-link", function (e) {

    e.preventDefault();

    const url = $(this).data("url");

    animateAndGo(url);

  });

  /* ===============================
    PDF CLICK
  =============================== */

  $(document).on("click", ".file-link", function (e) {

    e.preventDefault();

    const url = $(this).data("url");

    animateAndGo(url);

  });


});
