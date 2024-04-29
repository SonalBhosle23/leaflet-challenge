// STEP-1

// We create the tile layer that will be the background of our map.
console.log("Step 1 working");

// We create the tile layer that will be the background of our map.
let basemap = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
);


// We create the map object with options.
let map = L.map('map',{
  center: [0,0],
  zoom: 2,
  layers: [basemap]
});

// Then we add our 'basemap' tile layer to the map.
basemap.addTo(map);

// Here we make an AJAX call that retrieves our earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the colour and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: markerColor(feature.geometry.coordinates[2]),
      color: "black",
      radius: markerSize(feature.properties.mag),
      stroke: true,
      weight: 0.5
     
    };
  }

  // This function determines the colour of the marker based on the depth of the earthquake.
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

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    const scaleFactor = 5;
    return magnitude * scaleFactor;
  }

  // Here we add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
        
  }).addTo(map);

  // Here we create a legend control object.
  let legend = L.control({ position: 'bottomright' });
  
  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    let grades =  [0, 1, 2, 3, 4, 5]; 
    let colors =  grades.map(depth => getColor(depth));

    // Looping through our intervals to generate a label with a coloured square for each interval.
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> " + grades[i] + '<br>';
    }
    
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);
});




// STEP-2
console.log("Step 2 working");

// We create the tile layer that will be the background of our map.
let topo = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'",
  {
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  }
);

let street = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
);

// We then create the map object with options.
let map = L.map(
});


// Adding our 'street' tile layer to the map.


// We create the layers for our two different sets of data, earthquakes and
// tectonicplates.
let tectonicplates = 
let earthquakes = 

// Defining an object that contains our map for use in the layer control.
let baseMaps = {
//  "Global Earthquakes": basemap,
  "Street Map": 
  "Topographic Map": 
};

// We define an object that contains all of our overlays. Any combination of
// these overlays may be visible at the same time!
let overlays = {
  "Tectonic Plates": 
  "Earthquakes": 
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers()
  

// Our AJAX call retrieves our earthquake geoJSON data.


  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the colour and radius.
  function styleInfo(feature) {
    return {
      
    };
  }

  // This function determines the colour of the marker based on the depth of the earthquake.
  function getColor(depth) {
    switch 
      case 
        return 
     
  }  

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      
  }

  // Here we add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return 
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each marker to display the magnitude and location of
    // the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      
    }
    // We add the data to the earthquake layer instead of directly to the map.
  })

  // Then we add the earthquake layer to our map.


  // Here we create a legend control object.
  let legend = 
    

  legend.onAdd = function () {
    

    // Loop through our intervals and generate a label with a coloured square for each interval.
    for () {
      div.innerHTML += "<i style='background: "
        + colors
        + "'></i> "
        + grades
        + ();
    }
    return div;
  };

  // We add our legend to the map.
  

  // Here we make an AJAX call to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (platedata) {
    // Adding our geoJSON data, along with style information, to the tectonicplates
    // layer.
    L.geoJson(
    }).addTo(tectonicplates);

    // Then add the tectonicplates layer to the map.
    
  });
});
