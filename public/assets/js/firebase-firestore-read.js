// Read the data from Firestore(Database)
var firestoreRead = function(user){
    var docRef = firebase.firestore().collection("main").doc("latest");
    docRef.onSnapshot(function(documentSnapshot){
        if(documentSnapshot.exists){
            document.getElementById('post1').innerHTML = documentSnapshot.get('post1.word');
            document.getElementById('post2').innerHTML = documentSnapshot.get('post2.word');
            document.getElementById('post3').innerHTML = documentSnapshot.get('post3.word');
            document.getElementById('post4').innerHTML = documentSnapshot.get('post4.word');
            document.getElementById('post5').innerHTML = documentSnapshot.get('post5.word');
            document.getElementById('post6').innerHTML = documentSnapshot.get('post6.word'); 
        }
    });
}