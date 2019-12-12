// Sign Out
var firebaseSignOut = function(){
    if(firebase.auth().currentUser){
        firebase.auth().signOut().then( function(){
            alert("logoutしました");
        });
    }
}