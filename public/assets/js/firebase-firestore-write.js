// Write a new power word to the Firestore(Database)
var firestoreWrite = function(){
    var word = document.getElementById('powerword').value;
    var explanation = document.getElementById('explanation').value;
    console.log(word,explanation);

    // Prepare firestore infomation with Anonymous account
    var currentUser = firebase.auth().currentUser;
    if(!currentUser){
        firebase.auth().signInAnonymously()
        .then( function(user){
            console.log("Success Sign In by Anonymous.");
            var word = document.getElementById('powerword').value;
            var explanation = document.getElementById('explanation').value;
            
            firebase.firestore().collection("main").doc("anonymous").update({
                words: firebase.firestore.FieldValue.arrayUnion(word)
            });
        
            firebase.firestore().collection("main").doc("latest").get().then( function(documentSnapshot){
                var oldestPost = documentSnapshot.get("latest6.post1");
                var timeRef = "latest6.post1";
                var postRef = "post1";
                if( oldestPost > documentSnapshot.get("latest6.post2") ){
                    oldestPost = documentSnapshot.get("latest6.post2");
                    timeRef = "latest6.post2";
                    postRef = "post2";
                }
                if( oldestPost > documentSnapshot.get("latest6.post3") ){
                    oldestPost = documentSnapshot.get("latest6.post3");
                    timeRef = "latest6.post3";
                    postRef = "post3";
                } 
                if( oldestPost > documentSnapshot.get("latest6.post4") ){
                    oldestPost = documentSnapshot.get("latest6.post4");
                    timeRef = "latest6.post4";
                    postRef = "post4";
                } 
                if( oldestPost > documentSnapshot.get("latest6.post5") ){
                    oldestPost = documentSnapshot.get("latest6.post5");
                    timeRef = "latest6.post5";
                    postRef = "post5";
                } 
                if( oldestPost > documentSnapshot.get("latest6.post6") ){
                    oldestPost = documentSnapshot.get("latest6.post6");
                    timeRef = "latest6.post6";
                    postRef = "post6";
                }
                firebase.firestore().collection("main").doc("latest").update({
                    [timeRef]: new Date(),
                    [postRef]: {
                        word: word,
                        ref: firebase.firestore().collection("main").doc("anonymous")
                    }
                });
            });
        })
        .catch( function(error){
            // Handle errors here
            console.log("Failed Sign In  by Anonymous.");
        });
    }else{
        console.log("You Already Sign In");

        if(!currentUser.isAnonymous){
            console.log("Your are NamedUser", currentUser.uid);
            firebase.firestore().collection("users").doc(currentUser.uid).collection("words").add({
                word: word,
                explanation: explanation,
                posted: new Date()
            }).then( function(documentRef){
                firebase.firestore().collection("main").doc("latest").get().then( function(documentSnapshot){
                    var oldestPost = documentSnapshot.get("latest6.post1");
                    var timeRef = "latest6.post1";
                    var postRef = "post1";
                    if( oldestPost > documentSnapshot.get("latest6.post2") ){
                        oldestPost = documentSnapshot.get("latest6.post2");
                        timeRef = "latest6.post2";
                        postRef = "post2";
                    }
                    if( oldestPost > documentSnapshot.get("latest6.post3") ){
                        oldestPost = documentSnapshot.get("latest6.post3");
                        timeRef = "latest6.post3";
                        postRef = "post3";
                    } 
                    if( oldestPost > documentSnapshot.get("latest6.post4") ){
                        oldestPost = documentSnapshot.get("latest6.post4");
                        timeRef = "latest6.post4";
                        postRef = "post4";
                    } 
                    if( oldestPost > documentSnapshot.get("latest6.post5") ){
                        oldestPost = documentSnapshot.get("latest6.post5");
                        timeRef = "latest6.post5";
                        postRef = "post5";
                    } 
                    if( oldestPost > documentSnapshot.get("latest6.post6") ){
                        oldestPost = documentSnapshot.get("latest6.post6");
                        timeRef = "latest6.post6";
                        postRef = "post6";
                    }
                    firebase.firestore().collection("main").doc("latest").update({
                        [timeRef]: new Date(),
                        [postRef]: {
                            word: word,
                            ref: documentRef
                        }
                    });
                });
            });
        }else{
            console.log("Your are Anonymous");
            anonymousPostHandle(currentUser);
        }
    }
}