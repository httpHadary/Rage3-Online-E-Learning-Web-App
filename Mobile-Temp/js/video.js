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
     BACK (VIDEO → CONTENT)
  =============================== */

  window.goBack = function () {

    const subject = getQueryParam("subject");
    const branch  = getQueryParam("branch");

    if (!subject) {

      animateAndGo("subjects.html");
      return;
    }


    let url = `content.html?subject=${subject}`;

    if (branch) {
      url += `&branch=${branch}`;
    }

    animateAndGo(url);
  };



  /* ===============================
     LOAD VIDEO
  =============================== */

  function loadVideoPlayer() {

    const ytId  = getQueryParam("yt");
    const title = getQueryParam("title");

    const iframe   = document.getElementById("video-player");
    const titleBox = document.getElementById("video-title");


    /* Safety */

    if (!ytId || !iframe) {

      console.warn("No YouTube ID found");
      return;
    }


    /* Title */

    if (title && titleBox) {

      titleBox.textContent =
        decodeURIComponent(title);
    }


    /* Embed URL */

    const embedUrl =
      `https://www.youtube.com/embed/${ytId}` +
      `?rel=0&modestbranding=1&autoplay=1`;


    iframe.src = embedUrl;
  }



  /* ===============================
     INIT
  =============================== */

  $(document).ready(function () {

    loadVideoPlayer();

  });

});
