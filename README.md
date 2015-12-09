# Web map to show snow removal priority streets in Georgetown, KY

## How to do stuff

### Convert shapefile to geojson & topojson with [Mapshaper](https://github.com/mbloch/mapshaper)

`mapshaper data.shp -o data.geojson format=GeoJSON`

`mapshaper data.geojson -o data.topojson format=TopoJSON`

### Classification Guide

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

#### Ownership & Priority Codes

For the GeoJSON file, these are the simplified classification codes

- Primary/Emergency = 1
- Secondary = 2
- Tertiary = 3
- City (Not Prioritized) = 4
- State = 5
- County = 6
- Private = 7
- Not Dedicated = 8
- Other = 9

##### Field Calculation for legend

*In ArcGIS*

1. Create a new field called `legend`. Make sure it's an integer.
2. Right click the field, select **Field Calculator**.
3. Set **Parser** to `Python`
4. Use the code below to combine the different ownership/priority classifications in the legend.

###### Pre-Code logic

```python
def legend(plow):
 if plow in ('31','51'):
  return 1
 if plow in ('32','52'):
  return 2
 if plow in ('33','53'):
  return 3
 if plow in ('30'):
  return 4
 else:
  return 5
```

###### Function

`legend = legend( !plow! )`

### Getting this thing online

This map is available at [http://gscplanning.github.io/snow-removal/](http://gscplanning.github.io/snow-removal/ "gscplanning.github.io/snow-removal"), but we want to be able to access it from [http://gis.gscplanning.com/snow-removal
](http://gis.gscplanning.com/snow-removal). Really, just copy this project into the root directory of the webserver. If it's already there as older version, just remove it and replace with the most up-to-date version.

### Contributors

This code was written for the City of Georgetown by Ryan Cooper ([Email](mailto:rcooper@gscplanning.com) | [GitHub](https://github.com/maptastik) | [Twitter](https://twitter.com/maptastik)).

Originally a fork of [this map](http://lfucg.github.io/snow-removal/) created by LFUCG ([Code](https://github.com/lfucg/snow-removal)), this map of snow removal prioritization and hazards in Georgetown was rebuilt using Leaflet and Bootstrap. Thanks to LFUCG for the inspiration! In the spirit of this map's origins, please feel free to fork and adapt this code for your own map!



