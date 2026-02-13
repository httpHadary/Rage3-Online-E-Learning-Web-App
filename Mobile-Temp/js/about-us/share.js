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
     BACK (PDF → CONTENT)
  =============================== */

  window.goBack = function () {

    const subject = getQueryParam("subject");
    const branch = getQueryParam("branch");

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
     COUNTER ANIMATION
  =============================== */

  function startCounters() {

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    counters.forEach(counter => {

      const target = Number(counter.dataset.target);

      const duration = 1600;
      const start = performance.now();


      function update(now) {

        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);

        const value = Math.floor(progress * target);

        const plus = counter.dataset.plus === "true" ? "+" : "";

        counter.textContent = plus + value.toLocaleString();


        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = plus + target.toLocaleString();
        }
      }

      requestAnimationFrame(update);

    });
  }



  /* ===============================
     SHARE PAGE
  =============================== */

  const appLink = $("#shareLink").val();
  const status = $("#shareStatus");


  // Copy link
  $("#copyBtn").on("click", function () {

    if (!appLink) return;

    navigator.clipboard.writeText(appLink).then(() => {

      status.text("✔️ تم نسخ الرابط");

      setTimeout(() => {
        status.text("");
      }, 2000);

    });

  });


  // Social share
  $(".share-btn").on("click", function () {

    const type = $(this).data("type");

    let url = "";

    const text = "حمّل تطبيق راجع أونلاين الآن 👇";

    if (type === "whatsapp") {

      url = `https://wa.me/?text=${encodeURIComponent(text + " " + appLink)}`;

    }

    else if (type === "facebook") {

      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appLink)}`;

    }

    else if (type === "telegram") {

      url = `https://t.me/share/url?url=${encodeURIComponent(appLink)}&text=${encodeURIComponent(text)}`;

    }

    if (url) {
      window.open(url, "_blank");
    }

  });


  // Native share
  $("#nativeShare").on("click", function () {

    if (navigator.share) {

      navigator.share({
        title: "Rage3 Online",
        text: "حمّل تطبيق راجع أونلاين الآن 👇",
        url: appLink
      });

    } else {

      status.text("❗ المشاركة غير مدعومة على هذا الجهاز");

      setTimeout(() => {
        status.text("");
      }, 2000);

    }

  });



  /* ===============================
     INIT
  =============================== */

  // Start counters after page animation
  setTimeout(function () {

    startCounters();

  }, 1200);


});