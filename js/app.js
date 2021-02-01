var fab = document.getElementById('fab');
var header = document.getElementById('header');

window.onscroll = manageScroll;



function manageScroll() {
    if (window.scrollY >= "150") {
        fab.style.transform = "scale(1)";
    } else {
        fab.style.transform = "scale(0)";
    }
}