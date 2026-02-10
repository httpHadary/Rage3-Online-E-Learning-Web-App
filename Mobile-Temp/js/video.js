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
        BACK NAVIGATION (VIDEO → CONTENT)
    =============================== */

    window.goBack = function () {

    const subject = getQueryParam("subject");
    const branch  = getQueryParam("branch");
    const chapter = getQueryParam("chapter");

    // Fallback safety
    if (!subject || !chapter) {
        animateAndGo("subjects.html");
        return;
    }

    // Go back to content page
    let url = `content.html?subject=${subject}&chapter=${chapter}`;

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
     LESSON DATA (TEMP → API LATER)
  =============================== */

  const LESSONS = {

    arabic: {

      nahw: {

        ch1: {

          videos: [
            { id: "v1", title: "شرح الباب الأول - الجزء الأول" },
            { id: "v2", title: "تدريبات نحوية" }
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

      videosBox.html(`<p class="empty-msg">لا توجد فيديوهات</p>`);
      filesBox.html(`<p class="empty-msg">لا توجد ملفات</p>`);

      return;
    }



    /* ===============================
       VIDEOS
    =============================== */

    if (!data.videos || !data.videos.length) {

      videosBox.html(`<p class="empty-msg">لا توجد فيديوهات</p>`);

    } else {

      data.videos.forEach(video => {

        const url =
          `video.html?subject=${subject}` +
          (branch ? `&branch=${branch}` : "") +
          `&chapter=${chapter}&video=${video.id}`;


        const card = `
          <a href="${url}" class="lesson-item">

            <div class="lesson-row">

              <div class="lesson-info">
                <i class="fas fa-play-circle lesson-icon video"></i>
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

      filesBox.html(`<p class="empty-msg">لا توجد ملفات</p>`);

    } else {

      data.files.forEach(file => {

        const url =
          `pdf.html?subject=${subject}` +
          (branch ? `&branch=${branch}` : "") +
          `&chapter=${chapter}&file=${file.id}`;


        const card = `
          <a href="${url}" class="lesson-item">

            <div class="lesson-row">

              <div class="lesson-info">
                <i class="fas fa-file-pdf lesson-icon pdf"></i>
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
        LOAD VIDEO PLAYER
    =============================== */

    function loadVideoPlayer() {

    const ytId  = getQueryParam("yt");
    const title = getQueryParam("title");

    const iframe = document.getElementById("video-player");
    const titleBox = document.getElementById("video-title");

    // Safety check
    if (!ytId || !iframe) {
        console.log("No YouTube ID found");
        return;
    }

    // Set title
    if (title && titleBox) {
        titleBox.textContent = decodeURIComponent(title);
    }

    // YouTube embed URL
    const embedUrl =
        `https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1&autoplay=1`;

    // Load video
    iframe.src = embedUrl;
    }


  /* ===============================
     INIT
  =============================== */

  $(document).ready(function () {

    $("#page-title").text("المحتوى");

    loadVideoPlayer();

  });

});