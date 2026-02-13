/* ==================================
   GLOBAL SCRIPT
================================== */

let player;
let iframe;
let time_update_interval = 0;
let controlsTimeout;
let lastScrollY = 0;


/* ===============================
   YouTube Init
=============================== */

const pageVideos = $("[data-video]");
const videoControls = $("[data-video] .video-controls");
const btnsPlay = $("[data-video] .btn-play");

if ($("#player").length) {

  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(script);

  window.onYouTubeIframeAPIReady = function () {

    player = new YT.Player("player", {

      videoId:
        sessionStorage.getItem("currentVideoId") ||
        pageVideos.data("video"),

      playerVars: {
        playsinline: 1,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        disablekb: 1,
      },

      events: {
        onReady: onPlayerReady,
      },

    });

  };

}


/* ===============================
   Document Ready
=============================== */

$(document).ready(function () {

  "use strict";


  /* ---------- Loader ---------- */

  if ($(".sweet-loader").length) {
    $(".sweet-loader").addClass("hide").hide();
  }


  /* ---------- Lazy Load ---------- */

  if (window.LazyLoad && $(".lazy").length) {
    new LazyLoad();
  }


  /* ---------- Floating Button ---------- */

  if ($("#btncollapzion").length) {

    const fabLinks = [
      {
        url: "https://wa.me/3934567879",
        icon: '<i class="fab fa-whatsapp fa-fw"></i>',
        className: "social-icon whatsapp",
      },
      {
        url: "http://m.me/test",
        icon: '<i class="fab fa-facebook-messenger fa-fw"></i>',
        className: "social-icon messenger",
      },
    ];

    $("#btncollapzion").Collapzion({

      _main_btn_color: "#005356",
      _child_btn_color: "#fff",

      _child_attribute: fabLinks,

      _pos: {
        position: "fixed",
        left: "20px",
        bottom: "65px",
        "z-index": 999,
      },

    });

  }


  /* ---------- Section Observer ---------- */

  const sections = document.querySelectorAll(".section-animate");

  if (sections.length) {

    const observer = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }

        });

      },

      { threshold: 0.15 }

    );

    sections.forEach(sec => observer.observe(sec));

  }


  /* ---------- Page Exit (Unified Navigation) ---------- */

  document.addEventListener("click", function (e) {

    const link = e.target.closest("a");

    if (!link) return;

    const url = link.getAttribute("href");

    // Ignore external / anchors / empty
    if (
      !url ||
      url.startsWith("#") ||
      url.startsWith("http") ||
      link.hasAttribute("download") ||
      link.target === "_blank"
    ) {
      return;
    }

    e.preventDefault();

    const app = document.querySelector(".app");
    const cards = document.querySelectorAll(".login-card, .splash-card, .content");

    // Card pages
    if (cards.length) {
      cards.forEach(el => el.classList.add("card-exit"));
    }

    // App pages
    if (app) {
      app.classList.add("page-exit");
    }

    setTimeout(() => {
      window.location.href = url;
    }, 450);

  });


  /* ---------- Back Cache Fix ---------- */

  window.addEventListener("pageshow", function (e) {

    if (e.persisted) {
      document.querySelector(".app")?.classList.remove("page-exit");
    }

  });


  /* ---------- Video Controls ---------- */

  if (pageVideos.length) {

    handleOrientation();

    $(window).on("resize orientationchange", handleOrientation);

    btnsPlay.on("click", toggleVideoPlay);

    videoControls.on("click", function (e) {

      e.preventDefault();
      e.stopPropagation();

      showControls($(this));
      hideControlsTimeout($(this), 5000);

    });

    $("body").on("click", function () {

      hideControls(videoControls);
      clearTimeout(controlsTimeout);

    });

    videoControls
      .find(".btn-play-wrapper")
      .on("dblclick", toggleVideoPlay);

    $("#volButton").on("click", toggleVolume);

    $("#volumeRange").on("input", function () {

      adjustVolume($(this), $(this).val());

    });

  }


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
  const searchInput = $('#searchInput');

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
     JOIN / ADD CODE
  =============================== */

  const joinOverlay = $('#joinOverlay');
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

  const devOverlay = document.getElementById("devOverlay");
  const closeDevOverlay = document.getElementById("closeDevOverlay");


  if (devOverlay && closeDevOverlay) {

    document.querySelectorAll(".dev-link").forEach(link => {

      link.addEventListener("click", function (e) {

        e.preventDefault();

        devOverlay.classList.add("active");

      });

    });


    closeDevOverlay.addEventListener("click", function () {

      devOverlay.classList.remove("active");

    });

  }

});


/* ===============================
   Orientation Handler
=============================== */

function handleOrientation() {

  pageVideos.each(function () {

    if (screen.orientation?.type?.includes("landscape")) {
      $(this).addClass("full-height");
    } else {
      $(this).removeClass("full-height");
    }

  });

}


/* ===============================
   YouTube Helpers
=============================== */

function onPlayerReady(event) {

  player = event.target;
  iframe = document.getElementById("player");

  initialize();

  if ($("[data-video] .placeholder").length) {

    $("[data-video] .placeholder").slideUp(300, function () {
      playVideo(player);
    });

  }

  adjustVolume($("#volumeRange"), $("#volumeRange").val());

}


function playVideo(media) {

  videoControls.addClass("play");
  media.playVideo();

}


function pauseVideo(media) {

  videoControls.removeClass("play");
  media.pauseVideo();

}


function toggleVideoPlay(e) {

  e.preventDefault();
  e.stopPropagation();

  if (videoControls.hasClass("play")) {
    pauseVideo(player);
  } else {
    playVideo(player);
  }

}


function showControls(el) {
  el.addClass("show-controls");
}


function hideControls(el) {
  el.removeClass("show-controls");
}


function hideControlsTimeout(el, duration) {

  clearTimeout(controlsTimeout);

  controlsTimeout = setTimeout(() => {
    hideControls(el);
  }, duration);

}


/* ===============================
   Volume
=============================== */

function muteVol(media) {

  media.mute();
  videoControls.find(".audio").removeClass("on");

}


function unMuteVol(media) {

  media.unMute();
  videoControls.find(".audio").addClass("on");

}


function toggleVolume(e) {

  e.preventDefault();
  e.stopPropagation();

  if (!player.isMuted()) {
    muteVol(player);
  } else {
    unMuteVol(player);
  }

}


function adjustVolume(el, val) {

  const min = parseInt(el.attr("min")) || 0;
  const max = parseInt(el.attr("max")) || 5;

  const step = 100 / (max - min);

  player.setVolume(val * step);

}


/* ===============================
   Timer & Progress
=============================== */

function formatTime(time) {

  time = Math.round(time);

  let m = Math.floor(time / 60);
  let s = time % 60;

  if (s < 10) s = "0" + s;

  return m + ":" + s;

}


function initialize() {

  updateTimerDisplay();
  updateProgressBar();

  clearInterval(time_update_interval);

  time_update_interval = setInterval(function () {

    updateTimerDisplay();
    updateProgressBar();

    if (Math.round(player.getCurrentTime()) >= player.getDuration()) {

      clearInterval(time_update_interval);
      pauseVideo(player);

    }

  }, 1000);

}


function updateTimerDisplay() {

  $("#current-time").text(formatTime(player.getCurrentTime()));
  $("#duration").text(formatTime(player.getDuration()));

}


function updateProgressBar() {

  $("#displayProgressBar").val(
    (player.getCurrentTime() / player.getDuration()) * 100
  );

}


$("#displayProgressBar").on("input", function (e) {

  const newTime = player.getDuration() * (e.target.value / 100);

  player.seekTo(newTime);

});

window.animateAndGo = function (url) {

  const app = document.querySelector(".app");

  if (!app) {
    window.location.href = url;
    return;
  }

  app.classList.add("page-exit");

  setTimeout(() => {
    window.location.href = url;
  }, 350);
};
