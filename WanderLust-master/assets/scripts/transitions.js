//Authored by Team STA
//For LUC COMP424 Fall 2016
//These scripts handle the page transitions

//ID tags of transitions
var tags = [
  "#about",
  "#signupform",
  "#loginform",
  "#landing",
  "#incorrect",
  "#badPass",
  "#searchform",
  "#account",
  "#deleteform",
  "#passwordform",
  "#emailform",
  "#saved",
  "#update",
  "#badEmail",
  "#emailSent",
  "#badDelete"
]

//displays user buttons if user logged in
function callUser(user) {
  if (user) {
    $(".button.non").hide(1000);
    $(".button.user").show(1000);
  }
  else {
    $(".button.non").show(1000);
    $(".button.user").hide(1000);
  }
}

//calls the transitions for the selected tag
function callTransition(toShow) {
  if ($(toShow).is(":visible")) {
    return;
  }
  tags.forEach(function(tag) {
    $(tag).hide(1000);
  });
  if (toShow !== "#searchform")
  {
    $("#map").hide(1000);
    $(".infoblock").hide(1000);
  }
  else if ($("#map").not(":visible")) {
    $("#map").show(1000);
    $(".infoblock").show(1000);
  }
  $(toShow).show(1000);
}
