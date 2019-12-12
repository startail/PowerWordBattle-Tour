// Sign Up
var firebaseSignUp = function(){
    var signUpEmail = document.getElementById('signUpEmail').value;
    var signUpPassword = document.getElementById('signUpPassword').value;
    var signUpName = document.getElementById('signUpName').value;
    console.log(signUpEmail,signUpPassword,signUpName);

    var currentUser = firebase.auth().currentUser;
    if(currentUser && currentUser.isAnonymous){
        var credential = firebase.auth.EmailAuthProvider.credential(signUpEmail, signUpPassword);
        firebase.auth().currentUser.linkWithCredential(credential).then( function(usercred) {
            var user = usercred.user;
            // Create user infomation to Firestore
            firebase.firestore().collection("users").doc(user.uid).set({
                name: signUpName,
                rank: 1,
                signup: new Date()
            }).then( function(){
                firebase.firestore().collection("users").doc(user.uid).collection("words").add({
                    word: "sample",
                    explanation: "explanation",
                    posted: new Date()
                });
            });
            firebase.firestore().collection("main").doc("userlist").update({
                names: firebase.firestore.FieldValue.arrayUnion(signUpName)
            });
            console.log("Anonymous account successfully upgraded", user);
            $('#signup-modal').modal('hide');
            document.getElementById('signIn').style = "display:none;";
            document.getElementById('signOut').style = "display:list-item;";
            firestoreRead(user);
        }, function(error) {
            // Reload wep page
            console.log("Error upgrading anonymous account", error);
            document.getElementById('signUpAlert').innerText = error.message;
        });
    }else{
        firebase.auth().createUserWithEmailAndPassword(signUpEmail,signUpPassword)
        .then( function(userCredential){
            // Create user infomation to Firestore
            console.log(signUpName,userCredential.user.uid);
            firebase.firestore().collection("users").doc(userCredential.user.uid).set({
                name: signUpName,
                rank: 1,
                signup: new Date()
            });
            firebase.firestore().collection("main").doc("userlist").update({
                names: firebase.firestore.FieldValue.arrayUnion(signUpName)
            });
            console.log("Success Sign Up by Email&Password.");
            $('#signup-modal').modal('hide');
        })    
        .catch( function(error){
            console.log("Failed Sign Up by Email&Password.", error);
            document.getElementById('signUpAlert').innerText = error.message;
        });
    }
}
