// Sign In 
var firebaseSignIn = function(){
    var signInEmail = document.getElementById('signInEmail').value;
    var signInPassword = document.getElementById('signInPassword').value;
    firebase.auth().signInWithEmailAndPassword(signInEmail,signInPassword)
    .then( function(user){
        console.log("Success Sign In by Email&Password.");
        $('#signin-modal').modal('hide')
    })
    .catch( function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Failed Sign In by Email&Password.");
        document.getElementById('signInAlert').innerText = errorMessage;
    });
}