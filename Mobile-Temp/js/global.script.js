let player;
let iframe;
let time_update_interval = 0;
let controlsTimeout;
const pageVideos = $("[data-video]"),
  videoControls = $("[data-video] .video-controls"),
  btnsPlay = $("[data-video] .video-controls .btn-play");

if ($("#player").length !== 0) {
  let scriptTag = $("script");
  $('<script src="https://www.youtube.com/iframe_api"></script>').insertAfter(
    scriptTag[0]
  );

  function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
      width: "190",
      height: "290",
      videoId:
        sessionStorage.getItem("currentVideoId") || pageVideos.data("video"),
      playerVars: {
        playsinline: 1,
        controls: 0,
        autoplay: 0,
        rel: 0,
        showinfo: 0,
        egm: 0,
        showsearch: 0,
        controls: 0,
        modestbranding: 1,
        disablekb: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }
}

$(document).ready(function () {
  "use strict";

  // Trigger Lazy Load Images
  if ($(".lazy").length !== 0) {
    const lazyLoadInstance = new LazyLoad();
  }

  // Hide Preloader on Document Load
  $(".sweet-loader").length !== 0 && $(".sweet-loader").addClass("hide").hide();

  // Floating Action Button
  if ($("#btncollapzion").length !== 0) {
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
        right: "auto",
        left: "20px",
        bottom: "65px",
        "text-align": "center",
        padding: "0px 8px",
        display: "block",
        "margin-bottom": 0,
        "z-index": 999,
      },
    });
  }

  // Video full height when screen rotate
  if (pageVideos.length !== 0) {
    // Check start with rotated screen and make video full height if true
    if (
      screen.orientation.type === "landscape-primary" ||
      screen.orientation.type === "landscape-secondary"
    ) {
      !pageVideos.hasClass("full-height") && pageVideos.addClass("full-height");
    }
    // Full Screen if phone rotated
    $(window).on("orientationchange resize", function () {
      pageVideos.each(function () {
        if (
          screen.orientation.type === "landscape-primary" ||
          screen.orientation.type === "landscape-secondary"
        ) {
          !$(this).hasClass("full-height") && $(this).addClass("full-height");
        } else {
          $(this).hasClass("full-height") && $(this).removeClass("full-height");
        }
      });
    });
    // Handle Click play / pause video
    btnsPlay.on("click", (e) => toggleVideoPlay(e));
    // Show controls on video click
    videoControls.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      showControls($(this));
      hideControlsTimeout($(this), 5000);
    });
    // Hide controls on body click
    $("body").on("click", function () {
      hideControls(videoControls);
      clearTimeout(controlsTimeout);
    });
    // Toggle Video play on video double click
    videoControls
      .find(".btn-play-wrapper")
      .on("dblclick", (e) => toggleVideoPlay(e));
    // Mute | unMute Volume
    $("#volButton").on("click", (e) => toggleVolume(e));
    // Adjust volume slider
    $("#volumeRange").on("change", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const sliderVal = $(this).val();
      adjustVolume($(this), sliderVal);
    });
    // Trigger Full Screen
    if ($("#redirectToFullScreen").length !== 0) {
      $("#redirectToFullScreen").on("click", function (e) {
        e.preventDefault();

        location.href = $(this).attr("href");
      });
    }
  }
});

// Trigger on youtube iframe ready
function onPlayerReady(event) {
  player = event.target;
  iframe = document.getElementById("player");

  initialize();

  event.target.hideVideoInfo();
  if (pageVideos.find(".placeholder").length !== 0) {
    pageVideos.find(".placeholder").slideUp(300, function () {
      playVideo(event.target);
    });
  }

  adjustVolume($("#volumeRange"), $("#volumeRange").val());
}
// Trigger on each player state change
function onPlayerStateChange(event) {}
// Play the video
function playVideo(media) {
  videoControls.addClass("play");
  media.playVideo();
}
// Pause the video
function pauseVideo(media) {
  videoControls.removeClass("play");
  media.pauseVideo();
}
// Toggle play the video
function toggleVideoPlay(e) {
  e.preventDefault();
  e.stopPropagation();

  if (videoControls.hasClass("play")) {
    pauseVideo(player);
  } else {
    if (Math.round(player.getCurrentTime()) === player.getDuration()) {
      $("#displayProgressBar").val(0);
      initialize();
    }
    playVideo(player);
  }
}
// Show video controls
function showControls(el) {
  !el.hasClass("show-controls") && el.addClass("show-controls");
}
// Hide video controls
function hideControls(el) {
  el.hasClass("show-controls") && el.removeClass("show-controls");
}
// Hide Controls after 2s
function hideControlsTimeout(el, duration) {
  controlsTimeout = setTimeout(() => {
    hideControls(el);
  }, duration);
}
// Mute Volume
function muteVol(media) {
  media.mute();
  videoControls.find(".audio").hasClass("on") &&
    videoControls.find(".audio").removeClass("on");
}
// Unmute Volume
function unMuteVol(media) {
  media.unMute();
  !videoControls.find(".audio").hasClass("on") &&
    videoControls.find(".audio").addClass("on");
}
// Toggle Volume on || Off
function toggleVolume(e) {
  e.preventDefault();
  e.stopPropagation();

  if (!player.isMuted()) {
    muteVol(player);
  } else {
    unMuteVol(player);
  }
}
// Handle Adjust Volume Slider
function adjustVolume(el, val) {
  const minSliderVal = parseInt(el.attr("min")) || 0,
    maxSliderVal = parseInt(el.attr("max")) || 5,
    sliderStep = parseInt(el.attr("step")) || 1,
    playerMin = 0,
    playerMax = 100,
    playerStep =
      (playerMax - playerMin) / ((maxSliderVal - minSliderVal) / sliderStep);

  player.setVolume(parseInt(val) * playerStep);
}
// Format Time
function formatTime(time) {
  time = Math.round(time);

  let minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}
// Intialize timer
function initialize() {
  // Update the controls on load
  updateTimerDisplay();
  updateProgressBar();

  // Clear any old interval.
  clearInterval(time_update_interval);

  // Start interval to update elapsed time display and
  // the elapsed part of the progress bar every second.
  time_update_interval = setInterval(function () {
    updateTimerDisplay();
    updateProgressBar();
    if (Math.round(player.getCurrentTime()) >= player.getDuration()) {
      clearInterval(time_update_interval);

      pauseVideo(player);
    }
  }, 1000);

  // $("#volume-input").val(Math.round(player.getVolume()));
}
// This function is called by initialize()
function updateTimerDisplay() {
  // Update current time text display.
  $("#current-time").text(formatTime(player.getCurrentTime()));
  $("#duration").text(formatTime(player.getDuration()));
}
// This function is called by initialize()
function updateProgressBar() {
  // Update the value of our progress bar accordingly.
  $("#displayProgressBar").val(
    (player.getCurrentTime() / player.getDuration()) * 100
  );
}
$("#displayProgressBar").on("mouseup touchend", function (e) {
  e.preventDefault();
  e.stopPropagation();
  // Calculate the new time for the video.
  // new time in seconds = total duration in seconds * ( value of range input / 100 )
  var newTime = player.getDuration() * (e.target.value / 100);

  // Skip video to new time.
  player.seekTo(newTime);
});

$(document).ready(function() {
    "use strict";

    $('a').on('click', function(e) {
        const destination = $(this).attr('href');

        if (destination && !destination.startsWith('http') && !destination.startsWith('#')) {
            e.preventDefault();

            // 1. Start the exit animation
            $('.login-card, .splash-card, .content').addClass('card-exit');
            
            // 2. Reduce wait time to 400ms for a "snappier" handoff
            setTimeout(function() {
                window.location.href = destination;
            }, 400); 
        }
    });

    /* ===============================
      FORCE ANIMATION ON BACK
    =============================== */

  window.addEventListener("pageshow", function (e) {

    if (e.persisted) {
      document.querySelector(".app")?.classList.remove("page-exit");
    }

  });

});