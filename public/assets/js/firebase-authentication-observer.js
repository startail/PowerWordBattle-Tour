// Watch out "Menu Item" & "LATEST POWER WORDS" section changed.
firebase.auth().onAuthStateChanged( function(user){
    
    // Create default DataSet ( check word-generator.js )
    firebase.firestore().collection("main").doc("anonymous").get().then( function(documentSnapshot){
        if(!documentSnapshot.exists){
            generateDefaultSet();
        }
    });

    // Change the sign in/out menu item
    if(user && !user.isAnonymous){
        document.getElementById('signIn').style = "display:none;";
        document.getElementById('signOut').style = "display:list-item;";
        firestoreRead(user);
    }else if(user){
        firestoreRead(user);
    }else{
        document.getElementById('signIn').style = "display:list-item;";
        document.getElementById('signOut').style = "display:none;";
    }
});