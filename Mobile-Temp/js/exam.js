$(function () {
  "use strict";
  const endExamModal = new bootstrap.Modal("#examEndModal", {
    backdrop: "static",
  });

  // Start of Timer
  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;

  const COLOR_CODES = {
    info: {
      color: "green",
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD,
    },
  };

  let TIME_LIMIT = $("#countDownTime").val() || 300;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let timerInterval = null;
  let remainingPathColor = COLOR_CODES.info.color;

  document.getElementById("countdown").innerHTML = `
  <div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
  </div>
  `;

  startTimer();

  function onTimesUp() {
    clearInterval(timerInterval);

    endExamModal.length !== 0 && endExamModal.show();
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML =
        formatTime(timeLeft);
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
  }

  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
  // End of Timer

  // Start of Questions Stepper
  const questionsStepper = $("#questionsStepper"),
    stepsLabel = $("#stepsNumber"),
    stepsProgress = $("#currentProgress"),
    prevBtn = $("#prevStep"),
    nextBtn = $("#nextStep"),
    finishBtn = $("#finishGame");

  if (questionsStepper.length !== 0) {
    questionsStepper.steps({
      headerTag: "h2",
      cssClass: "quizes-wizard",
      bodyTag: "section",
      // transitionEffect: "slideLeft",
      enablePagination: false,
      onInit: function (event, currentIndex) {
        stepsProgress.css(
          "width",
          `${(1 / questionsStepper.steps("getTotalSteps")) * 100}`
        );
        stepsLabel.text(`1 / ${questionsStepper.steps("getTotalSteps")}`);
        prevBtn.hasClass("show") && prevBtn.removeClass("show");
        !nextBtn.hasClass("show") && prevBtn.addClass("show");
        nextBtn.addClass("disabled").attr("disabled", true);
        finishBtn.hasClass("show") && finishBtn.removeClass("show");
      },
      onStepChanged: function (event, currentIndex, priorIndex) {
        if (currentIndex === 0) {
          prevBtn.hasClass("show") && prevBtn.removeClass("show");
        } else {
          !prevBtn.hasClass("show") && prevBtn.addClass("show");
        }

        if (
          $(".question-wrapper .answers")
            .eq(currentIndex)
            .find(".answer-item.active").length !== 0
        ) {
          nextBtn.is(":disabled") &&
            $("#nextStep").attr("disabled", false).removeClass("disabled");
        } else {
          !nextBtn.is(":disabled") && nextBtn.attr("disabled", true);
        }

        finishBtn.addClass("disabled");

        const progress =
          (currentIndex + 1) / questionsStepper.steps("getTotalSteps");

        stepsProgress.css("width", `${progress * 100}%`);

        stepsLabel.text(
          `${currentIndex + 1} / ${questionsStepper.steps("getTotalSteps")}`
        );

        if (currentIndex + 1 === questionsStepper.steps("getTotalSteps")) {
          nextBtn.hasClass("show") && nextBtn.removeClass("show");
          !finishBtn.hasClass("show") && finishBtn.addClass("show");

          if (
            $(".question-wrapper .answers")
              .eq(currentIndex)
              .find(".answer-item.active").length !== 0
          ) {
            finishBtn.hasClass("disabled") && finishBtn.removeClass("disabled");
          }
        } else {
          !nextBtn.hasClass("show") && nextBtn.addClass("show");
          finishBtn.hasClass("show") && finishBtn.removeClass("show");
        }
      },
    });
  }
  // End of Questions Stepper

  // Start of Select Answer
  const questions = $(".question-wrapper .answers");

  if (questions.length !== 0) {
    questions.on("click", ".answer-item", function (e) {
      e.preventDefault();
      e.stopPropagation();

      !$(this).hasClass("active") &&
        $(this)
          .addClass("active")
          .siblings(".answer-item")
          .removeClass("active");

      nextBtn.is(":disabled") &&
        $("#nextStep").attr("disabled", false).removeClass("disabled");

      finishBtn.is(":visible") && $("#finishGame").removeClass("disabled");
    });
  }
  // End of Select Answer

  // Start of Next Step Action
  nextBtn.on("click", function (e) {
    e.preventDefault();

    questionsStepper.steps("next");
  });
  // End of Next Step Action

  // Start of Prev Step Action
  prevBtn.on("click", function (e) {
    e.preventDefault();

    questionsStepper.steps("previous");
  });
  // End of Prev Step Action

  // Start of Finish Action
  finishBtn.on("click", function (e) {
    e.preventDefault();

    clearInterval(timerInterval);
    endExamModal.length !== 0 && endExamModal.show();
  });
  // End of Finish Action

  // Start of Return to Exam
  if ($("#resumeExam").length !== 0) {
    $("#resumeExam").on("click", function(e) {
      e.preventDefault();

      startTimer();
      endExamModal.hide();
    })
  }
  // End of Return to Exam
});
