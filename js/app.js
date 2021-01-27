var fab = document.getElementById('fab');
var header = document.getElementById('header');

var initialPos = 0;

window.onscroll = function () { manageScroll() };



function manageScroll() {
    console.log(window.scrollY);
    if (window.scrollY != initialPos) {

        if (window.scrollY >= initialPos) {
            fab.style.transform = "scale(0)";
            // fab.style.transform = "translateX(90px)";
        } else {
            fab.style.transform = "scale(1)";
            // fab.style.transform = "translateX(0px)";
        }
        initialPos = window.scrollY;

    }


}