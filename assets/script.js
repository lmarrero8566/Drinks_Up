var map = L.map('map').setView([51.505, -0.09], 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();


$(document).ready(function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems);
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el);
});