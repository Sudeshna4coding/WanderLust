//Authored by Team STA
//For LUC COMP424 Fall 2016
//With help from Google
//https://developers.google.com/maps/
//script to run the Google Map and Places API

var markers = [];

function updateMap() {
  //prevents the form from being submitted and ruining the map and search
  $("form").on("submit", function(event) {
    event.preventDefault();
  });

  //creates starting map centered on Chicago
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 41.8781, lng: -87.6298},
    zoom: 8
  });
  var search = document.getElementById("search");
  var searchBox = new google.maps.places.SearchBox(search);
  var infoWindow = new google.maps.InfoWindow();

  startWeather(41.89755, -87.625365);

  //adds listener to search bar so search area can change when bounds do
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  //adds listener to update map when places change
  searchBox.addListener('places_changed', function() {

    var places = searchBox.getPlaces();
    var bounds = new google.maps.LatLngBounds();

    updatePlace(places);
    updateRecentSearch(search.value);
    removeMarks(markers);

    //returns if no places found
    if (places.length === 0) {
      return;
    }
    //calling Weather.js for calling Weather
    callWeather(places[0]);

    //adds the markers returned from the search
    places.forEach(function(place) {
      if (!place.geometry) {
        return;
      }

      //creates an icon for the marker
      var icon = {
        url: place.icon,
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      };

      //creates a new marker for the place
      var mark = new google.maps.Marker({
      map: map,
        icon: icon,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
      });

      markers.push(mark);

      addInfo(map, mark, infoWindow, place);

      //updates the bounds of the map if necessary to fit the markers
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      }
      else {
        bounds.extend(place.geometry.location);
      }
    });

    //updates the map view to fit the bounds
    map.fitBounds(bounds);
  });
}

//adds information to the infoWindow for a marker
function addInfo(map, mark, infoWindow, place) {
  google.maps.event.addListener(mark, "click", function() {
    infoWindow.setContent(place.name);
    infoWindow.open(map, mark);
  });
}

//this function removes from the map any markers sent to it
function removeMarks(markers) {
  markers.forEach(function(mark) {
    mark.setMap(null);
  });
  markers = [];
}
