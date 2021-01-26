$(document).ready(function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems);
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el);
});