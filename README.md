# Web map to show snow removal priority streets in Georgetown, KY

## How to do stuff

This map originally relied on exporting data from a feature class, reprojecting to WGS84, and then transforming into GeoJSON/TopoJSON. This workflow has been simplified with the help of [shapefile.js](https://github.com/calvinmetcalf/shapefile-js). Now the data need only to be exported to a shapefile, zipped and replaced on a webserver.

There are 5 datasets included in the map. The city prioritization data is part of the StreetOwnership dataset. To map the plowing data, you'll need to create an event layer from the StreetNetwork layer. 

1. Open `SnowRemovalPrioritization_EDITOR.mxd`.
2. Right-click the StreetOwnership table. If you are editing, make sure it is the table for your version.
3. Navigate to and click **Display Route Event**.
4. Fill out the fields for the route event layer:
	- Route Reference: Streets
	- Route Identifier: Local ID
	- Event Table: <Current Table - It should be the StreetOwnership table>
	- Route Identifier: Local ID
	- Select *Line Events*
	- From-Measure: From Point
	- To-Measure: To Point
	- Offset: <None>

Export as a shapefile called `SnowRemovalPrioritization`. Zip the .shp, .shx, .dbf, and .prj files. The resulting zipped file should be called `SnowRemovalPrioritization.zip`. 

The following four layers are in the GSCPC SnowRemovalPrioritzation feature dataset on SDE and after editing should be exported to a shapefile with the names below. Again, only the .shp, .shx, .dbf, and .prj files are necessary:

1. `GeorgetownPlowZones` -> `GeorgetownPlowZones.zip`
2. `Hazard_lines` -> `Hazard_lines.zip`
3. `Hazard_pts` -> `Hazard_pts.zip`
4. `State_SNIC` -> `State_SNIC.zip`

As you update these layers, replace the old version in the directory `/resources/data/` of the map on the web server.

### Classification Guide

Classification codes for the Georgetown priority layer

#### General Ownership Codes

- State = 10
- County = 20
- City = 30
- Private = 40
- Not Dedicated = 50
- Other = 60

#### Priority Codes

- Primary/Emergency = x1
- Secondary = x2
- Tertiary = x3

### Getting this thing online

This map is available at [http://gscplanning.github.io/snow-removal/](http://gscplanning.github.io/snow-removal/ "gscplanning.github.io/snow-removal"), but we want to be able to access it from [http://gis.gscplanning.com/snow-removal
](http://gis.gscplanning.com/snow-removal). Really, just copy this project into the root directory of the webserver. If it's already there as older version, just remove it and replace with the most up-to-date version.

### Sharing on GitHub

This map was born out of work done by LFUCG GIS in 2015. Although this map is a complete rewrite and borrows no code from that map, in order to maintain the spirit of sharing, please push changes to the project repo on GitHub: [https://github.com/gscplanning/snow-removal](https://github.com/gscplanning/snow-removal).

### Contributors

This code was written for the City of Georgetown by Ryan Cooper ([Email](mailto:rcooper@gscplanning.com) | [GitHub](https://github.com/maptastik) | [Twitter](https://twitter.com/maptastik)).

Originally a fork of [this map](http://lfucg.github.io/snow-removal/) created by LFUCG ([Code](https://github.com/lfucg/snow-removal)), this map of snow removal prioritization and hazards in Georgetown was rebuilt using Leaflet and Bootstrap. Thanks to LFUCG for the inspiration! In the spirit of this map's origins, please feel free to fork and adapt this code for your own map!



