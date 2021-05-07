var fab = document.getElementById('fab');
var header = document.querySelector('.header');

var lastScrollTop = 0;


var nav_mobile = document.querySelector(".nav-mobile");
var mobile_button = document.querySelector(".open-menu");
var mobile_overlay = document.querySelector(".js-overlay");

mobile_button.addEventListener('click', function() {
    nav_mobile.classList.toggle('active');
    mobile_overlay.classList.toggle('active');
})

mobile_overlay.addEventListener('click', function() {
    nav_mobile.classList.remove('active');
    mobile_overlay.classList.remove('active');
})



window.onscroll = manageScroll;



function manageScroll() {

    if (window.scrollY >= "150") {
        fab.style.transform = "scale(1)";

        // var st = window.pageYOffset || document.documentElement.scrollTop;
        // if (st > lastScrollTop) {
        //     header.classList.remove('hide');
        // } else {
        //     header.classList.add('hide');
        //     // upscroll code
        // }
        // lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

    } else {
        fab.style.transform = "scale(0)";
    }

}

