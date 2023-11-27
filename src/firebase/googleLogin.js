import firebase from "firebase";
import "firebase/auth";

export const GoogleLogin = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      return user;
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      return {errorCode, errorMessage, email, credential};

    });
};
