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

const myApp = Object.create(null)

var lat = 40.712;
var long = -74.006;
var zoom = 14;

function drawRectInCenter(x, y, width, height) {
    return [x - width / 2, y - height / 2, width, height]
}

function initmap(lat, long, zoom) {
    var openSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 1,
        maxZoom: 16,
        ext: 'png'
    });

    return L.map('map', { layers: [openSM] }).setView([lat, long], zoom);
}


L.Canvas.FPCanvas = L.Canvas.extend({
    options: {
        width: 1,
        height: 1
    },
    initialize: function(name, options) {
        this.name = name;
        L.setOptions(this, options);
        L.Canvas.prototype.initialize.call(this, { padding: 0.5 })
    },
    _draw: function() {
        var layer, bounds = this._redrawBounds;
        this._ctx.save();
        if (bounds) {
            var size = bounds.getSize();
            this._ctx.beginPath();
            this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
            this._ctx.clip();
        }

        this._drawing = true;

        for (var order = this._drawFirst; order; order = order.next) {
            layer = order.layer;
            if (!bounds || (layer._pxBounds && layer._pxBounds.intersects(bounds))) {
                layer._updatePath();
            }
        }
        this._drawing = false;
        this._ctx.restore(); // Restore state before clipping.
    },
});
L.canvas.fpCanvas = function(id, options) {
    return new L.Canvas.FPCanvas(id, options)
}

// ==================== ON LOAD ======================

var loaded = function() {
    var myRenderer = L.canvas({ padding: 0.5 });
    // Handler when the DOM is fully loaded
    myApp.map = initmap(lat, long, zoom);

    var fpRender = L.canvas.fpCanvas({ padding: 0.5 })
};

if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    callback();
} else {
    document.addEventListener("DOMContentLoaded", loaded);
}
// =========================================================