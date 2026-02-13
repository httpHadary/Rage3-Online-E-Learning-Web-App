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
     COUNTER ANIMATION (FINAL FIX)
  =============================== */

  function startCounters() {

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    counters.forEach(counter => {

      const target = Number(counter.dataset.target);

      const duration = 1600; // animation time (ms)
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
            const plus = counter.dataset.plus === "true" ? "+" : "";
            counter.textContent = plus + target.toLocaleString();
        }
      }

      requestAnimationFrame(update);

    });
  }

  /* ===============================
     RUN AFTER PAGE LOAD
  =============================== */

  // Wait for animations + layout
  setTimeout(function () {

    startCounters();

  }, 1200); // slightly longer than page animation


});