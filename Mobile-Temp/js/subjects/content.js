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

    return new URLSearchParams(window.location.search).get(name);
  }


  /* ===============================
     TEMP DATA (API LATER)
  =============================== */

  const LESSONS = {

    arabic: {

      nahw: {

        videos: [
          {
            id: "v1",
            title: "شرح الباب الأول - الجزء الأول",
            youtubeId: "tP49cWxRMPk"
          },
          {
            id: "v2",
            title: "تدريبات نحوية",
            youtubeId: "tP49cWxRMPk"
          }
        ],

        files: [
          { id: "f1", title: "ملف القواعد PDF" },
          { id: "f2", title: "واجب تدريبي" }
        ]

      }

    },

    geography: {

      videos: [
        { id: "v1", title: "شرح الخرائط" }
      ],

      files: [
        { id: "f1", title: "ملف المناخ" }
      ]

    }

  };


  /* ===============================
     BACK BUTTON
  =============================== */

  window.goBack = function () {

    const subject = getQueryParam("subject");
    const branch  = getQueryParam("branch");


    /* Came from branches */

    if (subject && branch) {

      animateAndGo(`branches.html?subject=${subject}`);
      return;
    }


    /* Came from subjects */

    if (subject) {

      animateAndGo("subjects.html");
      return;
    }


    /* Fallback */

    animateAndGo("subjects.html");
  };


  /* ===============================
     LOAD CONTENT
  =============================== */

  function loadLessonContent() {

    const subject = getQueryParam("subject");
    const branch  = getQueryParam("branch");

    if (!subject) return;


    let data = null;


    /* With branch */

    if (branch) {

      data = LESSONS?.[subject]?.[branch];
    }

    /* No branch */

    else {

      data = LESSONS?.[subject];
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

    if (data.videos && data.videos.length) {

      data.videos.forEach(video => {

      const ytId = video.youtubeId || "";

      if (!ytId) {
        videosBox.append(`
          <p class="empty-msg">لا توجد فيديوهات حالياً</p>
        `);
        return;
      }

        const url =
          `video.html?subject=${subject}` +
          (branch ? `&branch=${branch}` : "") +
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

    } else {

      videosBox.html(`<p class="empty-msg">لا توجد فيديوهات</p>`);

    }


    /* ===============================
       FILES
    =============================== */

    if (data.files && data.files.length) {

      data.files.forEach(file => {

        const url =
          `pdf.html?subject=${subject}` +
          (branch ? `&branch=${branch}` : "") +
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

    } else {

      filesBox.html(`<p class="empty-msg">لا توجد ملفات</p>`);

    }

  }


  /* ===============================
     VIDEO CLICK
  =============================== */

  $(document).on("click", ".video-link", function (e) {

    e.preventDefault();

    const url = $(this).data("url");

    if (url) {
      animateAndGo(url);
    }

  });


  /* ===============================
     FILE CLICK
  =============================== */

  $(document).on("click", ".file-link", function (e) {

    e.preventDefault();

    const url = $(this).data("url");

    if (url) {
      animateAndGo(url);
    }

  });


  /* ===============================
     INIT
  =============================== */

  $("#page-title").text("المحتوى");

  loadLessonContent();

});
