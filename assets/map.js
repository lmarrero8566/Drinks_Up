var mapDB = L.map('map').setView([40.712, -74.006], 18);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapDB);

$.ajax({
    url: `https://json.geoiplookup.io/`,
    type: "GET"
}).then(function(res) {
    //getBreweries(res.region);
}).catch((er) => {
    console.log(er);
})

function popMap(places) {
    for (var i = 0; i < places.length; i++) {
        let lat = places[i].latitude;
        let lon = places[i].longitude;
        if (lat != null && lon != null) {
        L.marker([lat, lon]).addTo(mapDB)
            .bindPopup(`${places[i].name}`)
            .openPopup();
        }
    }
}
