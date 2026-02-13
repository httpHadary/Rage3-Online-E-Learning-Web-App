$(function() {
    "use strict";

    const sections = {
        "1": ["الكل"],
        "2": ["علمي", "أدبي"],
        "3": ["علمي رياضة", "علمي علوم", "أدبي", "أزهري"]
    };

    const terms = {
        "1": ["الأول", "الثاني"],
        "2": ["الأول", "الثاني"],
        "3": ["الكل"]
    };

    function updateOptions(gradeId) {
        const secContainer = $('#section-options');
        secContainer.empty();
        sections[gradeId].forEach(text => {
            secContainer.append(`<button type="button" class="opt-btn" data-value="${text}">${text}</button>`);
        });
        secContainer.find('.opt-btn').first().addClass('active');

        const termContainer = $('#term-options');
        termContainer.empty();
        terms[gradeId].forEach(text => {
            termContainer.append(`<button type="button" class="opt-btn" data-value="${text}">${text}</button>`);
        });
        termContainer.find('.opt-btn').first().addClass('active');
    }

    $(document).on('click', '.opt-btn', function() {
        $(this).parent().find('.opt-btn').removeClass('active');
        $(this).addClass('active');

        if ($(this).parent('#grade-options').length) {
            updateOptions($(this).data('value').toString());
        }
    });

    updateOptions("3"); 

    $('#save-department').on('click', function() {const btn = $(this);
        if(btn.hasClass('disabled')) return;

        btn.addClass('disabled').text("جاري الحفظ...").css("pointer-events", "none");

        const finalSelection = {
            grade: $('#grade-options .active').text().trim(),
            section: $('#section-options .active').text().trim(),
            secondLanguage: $('#sec-lang-options .active').text().trim(),
            term: $('#term-options .active').text().trim(),
            lang: $('#lang-options .active').text().trim()
        };

        const userProfile = JSON.parse(sessionStorage.getItem("pendingRegistration") || "{}");

        const fullRegistrationData = { ...userProfile, ...finalSelection };

        $(this).text("تم الحفظ...").css("opacity", "0.7");
        
        setTimeout(() => {
            window.location.href = "../home-page/home.html";
        }, 800);
    });
});