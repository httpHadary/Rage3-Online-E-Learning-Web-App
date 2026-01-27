$(function () {
  "use strict";

  const videosList = $("[data-videoId]");
  if (videosList.length !== 0) {
    const currentVideoId = sessionStorage.getItem("currentVideoId");

    if (currentVideoId) {
      videosList.removeClass("active");
      $(`[data-videoId="${currentVideoId}"]`).addClass("active");
    }

    videosList.on("click", function (e) {
      e.preventDefault();

      $(this)
        .addClass("active")
        .siblings("[data-videoId]")
        .removeClass("active");

      const videoId = $(this).attr("data-videoId");
      sessionStorage.setItem("currentVideoId", videoId);
      location.reload();
    });
  }
});
