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
     BACK BUTTON
  =============================== */

  window.goBack = function () {

    animateAndGo("subjects.html");
  };


  /* ===============================
     TEMP DATA
  =============================== */

  const DATA = {

    arabic: {
      name: "اللغة العربية",
      branches: [
        { id: "nahw", name: "النحو" },
        { id: "adab", name: "الأدب" },
        { id: "balagha", name: "البلاغة" }
      ]
    },

    english: {
      name: "اللغة الإنجليزية",
      branches: [
        { id: "grammar", name: "Grammar" },
        { id: "writing", name: "Writing" }
      ]
    },

    maths: {
      name: "الرياضيات",
      branches: [
        { id: "algebra", name: "الجبر" },
        { id: "geometry", name: "الهندسة" }
      ]
    },

    geography: {
      name: "الجغرافيا",
      branches: []
    },

  };


  /* ===============================
     LOAD BRANCHES
  =============================== */

  function loadBranchesPage() {

    const subjectKey = getQueryParam("subject");

    if (!subjectKey) return;


    const subject = DATA[subjectKey];

    if (!subject) return;


    // Title
    $("#page-title").text(subject.name);


    const container = $("#branches-container");

    if (!container.length) return;

    container.empty();


    /* No branches → go to content */

    if (!subject.branches || !subject.branches.length) {

      animateAndGo(`content.html?subject=${subjectKey}`);
      return;
    }


    /* Render branches */

    subject.branches.forEach(branch => {

      const url =
        `content.html?subject=${subjectKey}&branch=${branch.id}`;

      const card = `
        <a href="${url}"
           class="subject-item branch-link"
           data-url="${url}">

          <div class="subject-item-content">
            <h3 class="title">${branch.name}</h3>
          </div>

          <i class="fas fa-chevron-left subject-arrow"></i>

        </a>
      `;

      container.append(card);
    });
  }


  /* ===============================
     BRANCH CLICK
  =============================== */

  $(document).on("click", ".branch-link", function (e) {

    e.preventDefault();

    const url = $(this).data("url");

    if (url) {
      animateAndGo(url);
    }

  });


  /* ===============================
     INIT
  =============================== */

  loadBranchesPage();

});