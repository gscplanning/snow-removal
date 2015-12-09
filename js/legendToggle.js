var priorityLegend = ('<div class="priorityLegend"><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #2196F3;stroke-width:1.75;" transform="rotate(90 8 8)"/></svg> Emergency</div><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #F44336;stroke-width:1.75;" transform="rotate(90 8 8)"/></svg> Secondary</div><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #4CAF50;stroke-width:1.75;" transform="rotate(90 8 8)"/></svg> Tertiary</div><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #FFEE58;stroke-width:1.75;stroke-opacity:0.5;" transform="rotate(90 8 8)"/></svg> Not Prioritized</div><div><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #9E9E9E;stroke-width:1.75;stroke-opacity:0.5;" transform="rotate(90 8 8)"/></svg> Not Plowed by City</div></div>')
var zonesLegend = ('<div class="zonesLegend"><div><svg height="16" width="16"><rect width="16" height="16" style="fill:#E74C3C;fill-opacity:0.25"/></svg> Zone 1</div><div><svg height="16" width="16"><rect width="16" height="16" style="fill:#2ECC71;fill-opacity:0.25"/></svg> Zone 2</div><div><svg height="16" width="16"><rect width="16" height="16" style="fill:#3498DB;fill-opacity:0.25"/></svg> Zone 3</div><div><svg height="16" width="16"><rect width="16" height="16" style="fill:#9B59B6;fill-opacity:0.25"/></svg> Zone 4</div></div>')
var bridgesLegend = ('<div class="bridgesLegend" style="padding-left: 3px; padding-top: 3px"><img src="../img/bridges-marker.svg" height="12" width="12"></div>')
var curvesLegend = ('<div class="curvesLegend" style="padding-left: 3px; padding-top: 3px"><img src="../img/curves-marker.svg" height="14" width="14"></div>')
var emergencyServicesLegend = ('<div class="emergencyServicesLegend" style="padding-left: 3px; padding-top: 3px"><img src="../img/emergency-services-marker.svg" height="16" width="16"></div>')
var hillsLegend = ('<div class="hillsLegend" style="padding-left: 3px; padding-top: 3px"><svg height="16" width="16"><line x1="0" y1="0" x2="16" y2="16" style="stroke: #fff;stroke-width:3;" stroke-dasharray="4, 4" stroke-linecap="butt" transform="rotate(90 8 8)"/></svg></div>')
var schoolsLegend = ('<div class="schoolsLegend" style="padding-left: 3px; padding-top: 3px"><img src="../img/schools-marker.svg" height="12" width="12"></div>')

// Toggle layers
$( "input" ).click(function( event ) {
    layerClicked = window[event.target.value];
    layerClickedIDValue = event.target.id;
    layerClickedItemID = "#" + layerClickedIDValue;
    layerClickedItemClass="." + layerClickedIDValue + "Item";
    layerClickedItemLegendClass = "." + layerClickedIDValue + "Legend";

    if (map.hasLayer(layerClicked)) {
        map.removeLayer(layerClicked);  
        $(layerClickedItemLegendClass).remove()
    }
    else{
        map.addLayer(layerClicked);
        $(layerClickedItemClass).append(window[layerClickedIDValue + "Legend"])
    } ;
});