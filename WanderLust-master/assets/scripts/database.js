//Authored by Team STA
//For LUC COMP424 Fall 2016
//handles the interaction with the database
//some code provided by Firebase API Guides
//https://firebase.google.com/docs/database/

var recentIndex = 0;
var savedIndex = 0;
var database = firebase.database();
var databaseStarted = false;

//Creates the first database entry for the inputted search
function setSearchEntry(search) {
  if (firebase.auth().currentUser) {
    var user = firebase.auth().currentUser.uid;
    database.ref(search + user + "/").set({
      input: "zero entry",
    });
    database.ref(search + user + "/count/").set({
      number: 0
    });
  }
}

//Sets the search count listeners for the index
function setSearchListeners() {
  var user = firebase.auth().currentUser;
  database.ref("recentSearch/" + user.uid + "/count/" + "number/").on("value", function(snapshot) {
    updateIndex(snapshot, false);
    startDisplay();
  });
  database.ref("savedSearch/" + user.uid + "/count/" + "number/").on("value", function(snapshot) {
    updateIndex(snapshot, true);
  });
}

//Updates the recent searches as they are entered by the user
function updateRecentSearch(search) {
  if (firebase.auth().currentUser) {
    var user = firebase.auth().currentUser.uid;
    database.ref("recentSearch/" + user + "/" + recentIndex).update({
      input: search,
    });
    database.ref("recentSearch/" + user + "/count/").set({
      number: recentIndex
    });
    updateDisplay(search);
  }
}

//Updates the index for the targeted search type
function updateIndex(snapshot, save) {
  if (save) {
    savedIndex = snapshot.val() + 1;
  } else {
    if (snapshot.val() + 1 === 11) {
      recentIndex = 1;
    } else {
      recentIndex = snapshot.val() + 1;
    }
  }
}

//this function updates the recent searches as they are made
function updateDisplay(search) {
  var display = "<p " + "id='" + recentIndex + "'>" + search + "</p>";
  if ($("#" + recentIndex).length) {
    display = search;
    $("#" + recentIndex).text(display);
  }
  else {
    $("#recentsearch").append(display);
  }
}

//this function initializes the recent search display
function startDisplay() {
  var i;
  var user = firebase.auth().currentUser.uid;
  if (databaseStarted) {
    return;
  }
  var index = 10;
  database.ref("recentSearch/" + user + "/").once('value').then(function(snapshot) {
    for (i = 1; i <= index; i++) {
      if (snapshot.child(i).val() !== null) {
        var display = "<p " + "id='" + i + "'>" + snapshot.child(i).val().input + "</p>";
        $("#recentsearch").append(display);
      }
      else {
        return;
      }
    }
  });
  databaseStarted = true;
}

//Removes the records when account is delete
function deleteRecords(search) {
  var user = firebase.auth().currentUser;
  database.ref(search + user.uid + "/").remove();
}
