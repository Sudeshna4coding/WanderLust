//Authored by Team STA
//For LUC COMP424 Fall 2016
//With help from Wunderground
//https://www.wunderground.com/weather/api/
//script to run the wunderground API

var weatherStarted = false;

//this function controls the weather API
function callWeather(place) {
  var lat = place.geometry.location.lat();
  var lng = place.geometry.location.lng();

  removeWeather();

  //request builder
  var request = "http://api.wunderground.com/api/0bb7f6eea7758ad0/forecast/geolookup/conditions/q/" + lat + "," + lng + ".json";

  $("#spinner").spin();
  $.ajax({
    url: request,
    dataType: "json",
    success: function(url) {

      //creating a variable to display nearby_weather_stations
      var current = url.current_observation.display_location.full;

      //creating a variable to display city
      var city = url.current_observation.display_location.city;

      //creating a variable to display country
      var country = url.location.country;

      //creating a variable to display temperature
      var temp = url.current_observation.temperature_string;

      //creating a varaible to display feels like
      var feels = "Feels Like: " + url.current_observation.feelslike_string;

      //creating a variable to display wind
      var wind = "Wind: " + url.current_observation.wind_string;

      //creating a variable to display icon
      var icon = url.current_observation.icon_url;

      // returns the HTML content
      $("#current").append(current);
      $("#country").append(country);
      $("#temp").append(temp);
      $("#feels").append(feels);
      $("#wind").append(wind);
      $("#weather").append("<img id='icon' src=" + icon + ">");
      $("#spinner").spin(false);
    }
  });
}

function removeWeather() {
  $("#current").empty();
  $("#country").empty();
  $("#temp").empty();
  $("#feels").empty();
  $("#wind").empty();
  $("#icon").remove();
}

//calls the default the display when starting the app
function startWeather(lat, lng) {
  if (weatherStarted) {
    return;
  }
  var request = "http://api.wunderground.com/api/0bb7f6eea7758ad0/forecast/geolookup/conditions/q/" + lat + "," + lng + ".json";

  $("#spinner").spin();
  $.ajax({
    url: request,
    dataType: "json",
    success: function(url) {

      //creating a variable to display nearby_weather_stations
      var current = url.current_observation.display_location.full;

      //creating a variable to display city
      var city = url.current_observation.display_location.city;

      //creating a variable to display country
      var country = url.location.country;

      //creating a variable to display temperature
      var temp = url.current_observation.temperature_string;

      //creating a varaible to display feels like
      var feels = "Feels Like: " + url.current_observation.feelslike_string;

      //creating a variable to display wind
      var wind = "Wind: " + url.current_observation.wind_string;

      //creating a variable to display icon
      var icon = url.current_observation.icon_url;

      // returns the HTML content
      $("#current").append(current);
      $("#country").append(country);
      $("#temp").append(temp);
      $("#feels").append(feels);
      $("#wind").append(wind);
      $("#weather").append("<img id='icon' src=" + icon + ">");
      $("#spinner").spin(false);
      weatherStarted = true;
    }
  });
}
