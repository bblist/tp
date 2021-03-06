$(function() {
    $('.selectpicker').selectpicker();
});

let el = $('.switch');
let cur = el.find('.current');
let options = el.find('.options li');
let content = $('#content');

// Open language dropdown panel

el.on('click', function(e) {
    el.addClass('show-options');

    setTimeout(function() {
        el.addClass('anim-options');
    }, 50);

    setTimeout(function() {
        el.addClass('show-shadow');
    }, 200);
});


// Close language dropdown panel

options.on('click', function(e) {
    e.stopPropagation();
    el.removeClass('anim-options');
    el.removeClass('show-shadow');

    let newLang = $(this).data('lang');

    cur.find('span').text(newLang);
    content.attr('class', newLang);

    setLang(newLang);

    options.removeClass('selected');
    $(this).addClass('selected');

    setTimeout(function() {
        el.removeClass('show-options');
    }, 600);
});


// Save selected options into Local Storage

function getLang() {
    let lang;
    if (localStorage.getItem('currentLang') === null) {
        lang = cur.find('span').text();
    } else {
        lang = JSON.parse(localStorage.getItem('currentLang')).toLowerCase();
    }

    // console.log(lang);

    cur.find('span').text(lang);
    options.parent().find(`li[data-lang="${lang}"]`).addClass('selected');

    content.attr('class', lang);
}

getLang();

function setLang(newLang) {
    localStorage.setItem('currentLang', JSON.stringify(newLang).toLowerCase());

    content.attr('class', newLang);
}

if ($('.team .owl-carousel').length > 0) {
    $('.team .owl-carousel').owlCarousel({
        loop: true,
        margin: 60,
        responsiveClass: true,
        autoplay: false,
        dots: false,
        navContainer: '.team .tech-carousel-nav',
        responsive: {
            0: {
                items: 1,
                stagePadding: 60,
                nav: false
            },
            992: {
                items: 4,
                nav: true,
                loop: false
            }
        }
    })
}

if ($('.home-section .owl-carousel').length > 0) {
    $('.home-section .owl-carousel').owlCarousel({
        loop: true,
        margin: 60,
        responsiveClass: true,
        autoplay: false,
        autoWidth: true,
        dots: false,
        nav: false,
        responsive: {
            0: {
                items: 2,
                stagePadding: 60,
            },
            992: {
                items: 6
            }
        }
    })
}

(function() {
    "use strict";

    function copyToClipboard(elem) {
        var target = elem;

        // select the content
        var currentFocus = document.activeElement;

        target.focus();
        target.setSelectionRange(0, target.value.length);

        // copy the selection
        var succeed;

        try {
            succeed = document.execCommand("copy");
        } catch (e) {
            console.warn(e);

            succeed = false;
        }

        // Restore original focus
        if (currentFocus && typeof currentFocus.focus === "function") {
            currentFocus.focus();
        }

        if (succeed) {
            $(".copied").animate({ top: -25, opacity: 0 }, 700, function() {
                $(this).css({ top: 0, opacity: 1 });
            });
        }

        return succeed;
    }

    $("#copyButton, #copyTarget").on("click", function() {
        copyToClipboard(document.getElementById("copyTarget"));
    });
})();