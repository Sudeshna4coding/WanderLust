//Authored by Team STA
//For LUC COMP424 Fall 2016
//With help from Google
//https://developers.google.com/maps/
//script to run the Google Places API

//this function loops through five places to get their data
function updatePlace(places) {

  removeContent();

  places.forEach(function(place){
    var name = place.name;
    var address = place.formatted_address;
    var id = place.place_id;
    var price = place.price_level;
    var rating = place.rating;


    addPlaceInfo(name, address, price, rating);
  });
}

function removeContent() {
  $("#place").empty();
}

//adds the place data to the page
function addPlaceInfo(name, address, price, rating) {

  var placeName = "Name: " + name + "<br />";
  if (address === undefined) {
        var placeAddress = "Address: Unknown <br />";
  }
  else {
    var placeAddress = "Address: " + address + "<br />";
  }
  if (price === undefined) {
    var placePrice = "";
  }
  else {
    var placePrice = "Price: " + price + " out of 4.<br />";
  }
  if (rating === undefined) {
    var placeRating = "";
  }
  else {
    var placeRating = "Rating: " + rating + " out of 5.<br />";
  }

  $("#place").append("<section class='wrapper'>" + placeName + placeAddress + placePrice + placeRating + "</section><br />");
 }
