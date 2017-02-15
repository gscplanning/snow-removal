// SET GLOBAL VARIABLES FOR FEATURE LAYERS
var priority;
var statePriority;
var zones;
var hills;
var bridges;
var curves;
var emergencyServices;
var schools;

// Legend patches
var priorityLegend = ('<div class="priorityLegend"><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #2196F3;stroke-width:1.75;" transform="rotate(90 8 8)"/></svg> Emergency</div><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #F44336;stroke-width:1.75;" transform="rotate(90 8 8)"/></svg> Secondary</div><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #4CAF50;stroke-width:1.75;" transform="rotate(90 8 8)"/></svg> Tertiary</div><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #FFEE58;stroke-width:1.75;stroke-opacity:0.5;" transform="rotate(90 8 8)"/></svg> Not Prioritized</div></div>');
var statePriorityLegend = ('<div class="statePriorityLegend"><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #2196F3;stroke-width:1;" stroke-dasharray="3, 4" transform="rotate(90 8 8)"/></svg> A</div><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #F44336;stroke-width:1;" stroke-dasharray="3, 4" transform="rotate(90 8 8)"/></svg> B</div><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #4CAF50;stroke-width:1;" stroke-dasharray="3, 4" transform="rotate(90 8 8)"/></svg> C</div><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #FFEE58;stroke-width:1;" stroke-dasharray="3, 4" transform="rotate(90 8 8)"/></svg> D</div><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #9E9E9E;stroke-width:1;stroke-opacity:0.5;" stroke-dasharray="3, 4" transform="rotate(90 8 8)"/></svg> U</div>');
var zonesLegend = ('<div class="zonesLegend"><div><svg height="16" width="16"><rect width="16" height="16" style="fill:#E74C3C;fill-opacity:0.25"/></svg> Zone 1</div><div><svg height="16" width="16"><rect width="16" height="16" style="fill:#2ECC71;fill-opacity:0.25"/></svg> Zone 2</div><div><svg height="16" width="16"><rect width="16" height="16" style="fill:#3498DB;fill-opacity:0.25"/></svg> Zone 3</div><div><svg height="16" width="16"><rect width="16" height="16" style="fill:#9B59B6;fill-opacity:0.25"/></svg> Zone 4</div></div>');
var bridgesLegend = ('<div class="bridgesLegend" style="padding-left: 3px; padding-top: 3px"><img src="resources/images/bridges-marker.svg" height="20" width="20"></div>');
var curvesLegend = ('<div class="curvesLegend" style="padding-left: 3px; padding-top: 3px"><img src="resources/images/curves-marker.svg" height="18" width="18"></div>');
var emergencyServicesLegend = ('<div class="emergencyServicesLegend" style="padding-left: 3px; padding-top: 3px"><img src="resources/images/emergency-services-marker.svg" height="20" width="20"></div>');
var hillsLegend = ('<div class="hillsLegend" style="padding-left: 3px; padding-top: 3px"><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #fff;stroke-width:5;" stroke-dasharray="3, 4" stroke-linecap="butt" transform="rotate(90 8 8)"/></svg></div>');
var schoolsLegend = ('<div class="schoolsLegend" style="padding-left: 3px; padding-top: 3px"><img src="resources/images/schools-marker.svg" height="16" width="16"></div>');

// MAP

var map = L.map('map')
    .setView([38.209985, -84.559826], 14);

var featurePanes = ["zones", "stateRoads", "cityRoads", "hills"];
var featurePaneIndex = 302;
for (var i = 0; i < featurePanes.length; i++) {
    var fp = featurePanes[i];
    map.createPane(fp);
    map.getPane(fp).style.zIndex = featurePaneIndex;
    featurePaneIndex += 2;
}

var mapboxKey = 'pk.eyJ1IjoiZ3NjcGxhbm5pbmciLCJhIjoiRVZMNXpsQSJ9.5OxUlJTCDplPkdkKNlB91A';

var geocoderOptions = {
    position: 'topleft',
    placeholder: "Search an address...",
    geocoder: L.Control.Geocoder.mapbox(mapboxKey),
    proximity: [38.20994, -84.559847]
};

var geocoder = new L.Control.geocoder(geocoderOptions).addTo(map);

// BASEMAPS
var darkBase = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: 'Stamen'
});
var lightBase = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
});
var aerial = L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    id: 'gscplanning.ob337ddj',
    accessToken: 'pk.eyJ1IjoiZ3NjcGxhbm5pbmciLCJhIjoiRVZMNXpsQSJ9.5OxUlJTCDplPkdkKNlB91A'
});
var aerialGray = new L.tileLayer.grayscale('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    id: 'gscplanning.ob337ddj',
    accessToken: 'pk.eyJ1IjoiZ3NjcGxhbm5pbmciLCJhIjoiRVZMNXpsQSJ9.5OxUlJTCDplPkdkKNlB91A',
    quotaDividerTune: 9
});

// Basemap switcher
var iconLayersControl = new L.Control.IconLayers(
    [{
            title: 'Dark Base',
            layer: darkBase,
            icon: 'resources/images/dark-matter-thumb.gif'
        },
        {
            title: 'Light Base',
            layer: lightBase,
            icon: 'resources/images/positron-thumb.gif'
        },
        {
            title: 'Aerial',
            layer: aerial,
            icon: 'resources/images/aerial-thumb.gif'
        },
        {
            title: 'Aerial (Gray)',
            layer: aerialGray,
            icon: 'resources/images/aerial-gray-thumb.gif'
        }
    ], {
        position: 'bottomleft',
        maxLayersInRow: 2
    }
);
iconLayersControl.addTo(map);

// ADD FEATURE DATA AND INTERACTION
// PRIORITY LAYER
function priorityColor(d) {
    return d == 31 || d == 51 ? '#2196F3' :
        d == 32 || d == 52 ? '#F44336' :
        d == 33 || d == 53 ? '#4CAF50' :
        d == 30 ? '#FFEE58' :
        '#9E9E9E';
}

function priorityOpacity(d) {
    return d >= 31 && d <= 33 ? 1 :
        d >= 51 && d <= 53 ? 1 :
        d == 30 ? 0.5 :
        0;
}

function priorityStyle(feature) {
    var legend = feature.properties.plow;
    return {
        weight: 1.75,
        color: priorityColor(legend),
        opacity: priorityOpacity(legend),
        lineCap: "butt",
        lineJoin: "round"
    };
}

priority = L.geoJson({
    features: []
}, {
    style: priorityStyle,
    pane: 'cityRoads'
}).addTo(map);
shp("./resources/data/SnowRemovalPrioritization.zip")
    .then(function(data) {
            priority.addData(data);
        },
        function(a) {
            console.log(a);
        });

// STATE PRIORITY LAYER
function statePriorityColor(d) {
    return d == 'A' ? '#2196F3' :
        d == 'B' ? '#F44336' :
        d == 'C' ? '#4CAF50' :
        d == 'D' ? '#FFEE58' :
        d == 'U' ? '#9E9E9E' :
        "fff";
}

function statePriorityOpacity(d) {
    return d == 'A' ? 1 :
        d == 'B' ? 1 :
        d == 'C' ? 1 :
        d == 'D' ? 1 :
        d == 'U' ? 0.5 :
        0;
}

function statePriorityStyle(feature) {
    var snicPrior = feature.properties.SNIC_Prior;

    return {
        weight: 1.25,
        color: statePriorityColor(snicPrior),
        opacity: statePriorityOpacity(snicPrior),
        dashArray: "3, 4",
        lineCap: "butt",
        lineJoin: "round"
    };
}

statePriority = L.geoJson({
    features: []
}, {
    style: statePriorityStyle,
    attribution: 'KYTC',
    pane: 'stateRoads'
}).addTo(map);
shp("./resources/data/State_SNIC.zip")
    .then(function(data) {
            statePriority.addData(data);
        },
        function(a) {
            console.log(a);
        });

// ZONES LAYER
function zonesColor(d) {
    return d == 1 ? '#E74C3C' :
        d == 2 ? '#2ECC71' :
        d == 3 ? '#3498DB' :
        d == 4 ? '#9B59B6' :
        "fff";
}

function zonesStyle(feature) {
    return {
        fillColor: zonesColor(feature.properties.LABEL),
        fillOpacity: 0.25,
        weight: 0
    };
}
zones = L.geoJson({
    features: []
}, {
    style: zonesStyle,
    pane: 'zones'
});
shp("./resources/data/GeorgetownPlowZones.zip")
    .then(function(data) {
            zones.addData(data);
        },
        function(a) {
            console.log(a);
        });
// HAZARDS lAYERS
// HAZARD POINTS
// The hazard points layers are all from a single data set, Hazards_pts. A filter function is used to separate them into different layers based on their TYPE attribute
// BRIDGES LAYER
bridges = L.geoJSON({
    features: []
}, {
    pointToLayer: function(feature, latlng) {
        var bridgesIcon = L.icon({
            iconUrl: 'resources/images/bridges-marker.svg',
            iconSize: [20, 20],
        });
        var bridgesMarker = L.marker(latlng, {
            icon: bridgesIcon
        });
        return bridgesMarker;
    },
    filter: function(feature, latlng) {
        return feature.properties.TYPE == "bridge";
    }
});
// CURVES LAYER
curves = L.geoJSON({
    features: []
}, {
    pointToLayer: function(feature, latlng) {
        var curvesIcon = L.icon({
            iconUrl: 'resources/images/curves-marker.svg',
            iconSize: [18, 18],
        });
        var curvesMarker = L.marker(latlng, {
            icon: curvesIcon
        });
        return curvesMarker;
    },
    filter: function(feature, latlng) {
        return feature.properties.TYPE == "curve";
    }
});
// EMERGENCY SERVICES LAYER
emergencyServices = L.geoJSON({
    features: []
}, {
    pointToLayer: function(feature, latlng) {
        var emergencyServicesIcon = L.icon({
            iconUrl: 'resources/images/emergency-services-marker.svg',
            iconSize: [20, 20],
        });
        var emergencyServicesMarker = L.marker(latlng, {
            icon: emergencyServicesIcon
        });
        return emergencyServicesMarker;
    },
    filter: function(feature, latlng) {
        return feature.properties.TYPE == "emergency services";
    }
});
// SCHOOLS LAYER
schools = L.geoJSON({
    features: []
}, {
    pointToLayer: function(feature, latlng) {
        var schoolsIcon = L.icon({
            iconUrl: 'resources/images/schools-marker.svg',
            iconSize: [16, 16],
        });
        var schoolsMarker = L.marker(latlng, {
            icon: schoolsIcon
        });
        return schoolsMarker;
    },
    filter: function(feature, latlng) {
        return feature.properties.TYPE == "school";
    }
});
// LOAD HAZARD POINT DATA
shp("./resources/data/Hazard_pts.zip")
    .then(function(data) {
            bridges.addData(data);
            curves.addData(data);
            emergencyServices.addData(data);
            schools.addData(data);
        },
        function(a) {
            console.log(a);
        });
// HAZARD LINES
// The hazard lines layers are all from a single data set, Hazards_lines. A filter function is used to separate them into different layers based on their TYPE attribute
// HILLS LAYER
function hillsStyle(feature) {
    return {
        weight: 5,
        color: "#fff",
        opacity: 1,
        dashArray: "3, 4",
        lineCap: "butt"
    };
}

hills = L.geoJSON({
    features: []
}, {
    style: hillsStyle,
    pane: 'hills',
    filter: function(feature, latlng) {
        return feature.properties.TYPE == "hill";
    }
});
// LOAD HAZARD LINES DATA
shp("./resources/data/Hazard_lines.zip")
    .then(function(data) {
            hills.addData(data);
        },
        function(a) {
            console.log(a);
        });

// Toggle layers and legend patches
$("input").on("click", function(event) {
    layerClicked = window[event.target.value];
    layerClickedIDValue = event.target.id;
    layerClickedItemID = "#" + layerClickedIDValue;
    layerClickedItemClass = "." + layerClickedIDValue + "Item";
    layerClickedItemLegendClass = "." + layerClickedIDValue + "Legend";

    if (map.hasLayer(layerClicked)) {
        map.removeLayer(layerClicked);
        $(layerClickedItemLegendClass).remove();
    } else {
        map.addLayer(layerClicked);
        $(layerClickedItemClass).append(window[layerClickedIDValue + "Legend"]);
    }
});
