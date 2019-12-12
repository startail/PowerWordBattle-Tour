var generateDefaultSet = function(){
    if(firebase.firestore()){
        firebase.firestore().collection("main").doc("anonymous").set({
            words: [ 
                "書けてるよ！書けてるよ！",
                "おいおい、書き換えてるのはコードか？それとも人類の歴史かい？",
                "泣く子も黙るPullRequest！",
                "コミットがチョモランマ！",
                "仕様が歩いてる！",
                "頭にちっちゃいスパコン載せてるのかい！",
                "キーボードが２つに割れてるよ",
                "ストックオプションでビルが建つぞ！",
                "進捗おばけ",
                "会社にユニコーン宿ってる！",
                "ナイスコード！",
                "CPUが喜んでる！",
                "超コーディング！",
                "仕上がってるよ！仕上がってるよ！"
            ]
        }).then( function(){
            firebase.firestore().collection("main").doc("latest").set({
                latest6 : {
                    post1: new Date(),
                    post2: new Date(),
                    post3: new Date(),
                    post4: new Date(),
                    post5: new Date(),
                    post6: new Date()
                },
                post1: {
                    word: "仕様が歩いてる！",
                    ref: firebase.firestore().collection("main").doc("anonymous")
                },
                post2: {
                    word: "コミットがチョモランマ！",
                    ref: firebase.firestore().collection("main").doc("anonymous")
                },
                post3: {
                    word: "キーボードが２つに割れてるよ",
                    ref: firebase.firestore().collection("main").doc("anonymous")
                },
                post4: {
                    word: "ナイスコード！",
                    ref: firebase.firestore().collection("main").doc("anonymous")
                },
                post5: {
                    word: "会社にユニコーン宿ってる！",
                    ref: firebase.firestore().collection("main").doc("anonymous")
                },
                post6: {
                    word: "CPUが喜んでる！",
                    ref: firebase.firestore().collection("main").doc("anonymous")
                }
            });
            firebase.firestore().collection("main").doc("userlist").set({
                names: ["anonymous"]
            });
            console.log("Default data Set!!");
        })
        .catch( function(error){
            console.log(error);
        });
    }
}