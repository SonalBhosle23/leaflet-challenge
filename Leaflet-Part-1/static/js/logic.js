// STEP-1: Define base map and initialize map
function createMap() {
  // Create the tile layer that will be the background of our map.
  let basemap = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  );

  // Create the map object with options.
  let map = L.map("map",{
    center: [0,0],
    zoom: 2,
    layers: [basemap]
  });

  // Then add the 'basemap' tile layer to the map.
  basemap.addTo(map);

  return map;
}

// STEP-2: Define functions for styling markers
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.geometry.coordinates[2]),
    color: "red",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

function getColor(depth) {
  switch (true) {
    case depth < 10:
        return "#ffeda0"; // Light yellow for shallow earthquakes
    case depth < 30:
        return "#feb24c"; // Orange for moderate depth earthquakes
    case depth < 50:
        return "#f03b20"; // Red for deeper earthquakes
    default:
        return "#bd0026"; // Darker red for very deep earthquakes
}
} 


function getRadius(magnitude) {
  const scaleFactor = 5;
  return magnitude * scaleFactor;
}

// STEP-3: Define function for adding earthquake data to map
function addEarthquakeData(map) {
  // Make an AJAX call that retrieves earthquake geoJSON data.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data) {
    // Add GeoJSON layer to the map once the file is loaded.
    L.geoJson(data, {
      // Turn each feature into a circleMarker on the map.
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      // Set the style for each circleMarker using the styleInfo function.
      style: styleInfo,
      // Create a popup for each marker to display the magnitude and location of the earthquake.
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }  
    }).addTo(map);
  });
}

// STEP-4: Define function for adding legend to map
function addLegend(map) {
  // Create a legend control object.
  let legend = L.control({ position: 'bottomright' });
  
  // Add all the details for the legend.
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    let grades =  [0, 1, 2, 3, 4, 5]; 
    let colors =  grades.map(depth => getColor(depth));

    // Loop through intervals to generate a label with a colored square for each interval.
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> " + grades[i] + '<br>';
    }
    
    return div;
  };

  // Add the legend to the map.
  legend.addTo(map);
}

// STEP-5: Execute steps in sequence
console.log("Step 1 working");
let map = createMap(); // Step 1
addEarthquakeData(map); // Step 2
addLegend(map); // Step 3