//Authored by Team STA
//For LUC COMP424 Fall 2016
//shows the search form and map
//some code provided by Firebase API Guides
//https://firebase.google.com/docs/auth/web/password-auth

function checkUser() {
    if (firebase.auth().currentUser) {
      callUser(true);
      callTransition('#searchform');
    }
}

//This function processes the login
function login() {
  var email = $("#loginEmail").val();
  var password = $("#loginPassword").val();

  //prevents the form from being submitted
  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
  });

  //hides the red banner if visible
  if ($("#incorrect").is(":visible")) {
    $("#incorrect").hide();
  }

  //This calls to firebase to log in the user
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    //displays error message if email or password is wrong
    if (errorCode === "auth/invalid-email" || errorCode === "auth/wrong-password") {
      $("#incorrect").show(1000);
    }
  });

  //resets the form for the next submission
  $("form").trigger("reset");
  return false;
}

//this function logs the user out
function logout() {
  firebase.auth().signOut().then(function() {
    callUser(false);
    callTransition("#searchform");
  }, function(error) {

  });
}

//This function handles the user signup
function signup() {
  var email = $("#email").val();
  var password = $("#password").val();

  //prevents the form from being submitted
  $("form").on("submit", function(event) {
    event.preventDefault();
  });

  //hides the red banner if visible
  if ($("#badPass").is(":visible")) {
    $("#badPass").hide();
  }

  //checks that both passwords match
  if ($("#password").val() !== $("#confirm").val()) {
    $("#badPass").show(1000);
    return false;
  } else {

    //signs the user up with the firebase API
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      firebase.auth().currentUser.sendEmailVerification().then(function() {
      }, function(error) {

      });
        setSearchEntry("recentSearch/");
        setSearchEntry("savedSearch/");
    }, function(error) {

    });

    //resets the form for next submission
    $("form").trigger("reset");
    return false;
  }
}

//allows user to change password
function changePassword() {
  $("form").on("submit", function(event) {
    event.preventDefault();
  });

  var user = firebase.auth().currentUser;
  var credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    $("#oldpassword").val()
  );

  if ($("#newpassword").val() !== $("#confirmpassword").val()) {
    $("#badPass").show(1000);
    return false;
  }

  user.reauthenticate(credential).then(function() {
    user.updatePassword($("#newpassword").val()).then(function() {
      $("#update").show(1000);
    }, function(error) {

    });
  }, function(error) {
    var errorCode = error.code;
    if (errorCode === "auth/wrong-password") {
      $("#badDelete").show(1000);
    }
  });
}

//allows user to change their email
function changeEmail() {
  $("form").on("submit", function(event) {
    event.preventDefault();
  });

  var user = firebase.auth().currentUser;
  var credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    $("#passwordemail").val()
  );

  user.reauthenticate(credential).then(function() {
    user.updateEmail($("#newemail").val()).then(function() {
      $("#update").show(1000);
    }, function(error) {

    });
  }, function(error) {
    var errorCode = error.code;
    if (errorCode === "auth/wrong-password") {
      $("#badDelete").show(1000);
    }
  });
}

//allows user to delete their account
function deleteAccount() {
  $("form").on("submit", function(event) {
    event.preventDefault();
  });

  var user = firebase.auth().currentUser;
  var credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    $("#passworddelete").val()
  );

  user.reauthenticate(credential).then(function() {
    deleteRecords("recentSearch/");
    deleteRecords("savedSearch/");
    user.delete().then(function() {
      callUser(false);
      callTransition("#searchform");
    }, function(error) {

    });
  }, function(error) {
    var errorCode = error.code;
    if (errorCode === "auth/wrong-password") {
      $("#badDelete").show(1000);
    }
  });
}

//this function sends a reset password email
function resetPassword() {
  firebase.auth().sendPasswordResetEmail($("#loginEmail").val()).then(function() {
    $("#emailSent").show(1000);
  }, function(error) {
    var errorCode = error.code;
    if (errorCode === "auth/invalid-email") {
      $("#badEmail").show(1000);
    }
  });
}

//listener for auth state change for Firebase
function setAuthListener() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      callTransition("#searchform");
      callUser(true);
      setSearchListeners();
    }
  });
}
