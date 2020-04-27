// const messaging = firebase.messaging();
// messaging.requestPermission()
//     .then(function() {
//         console.log('Have permission');
//     })
//     .catch(function(err) {
//         console.log('Error Occured!');
//     })

const db = firebase.firestore();

db.collection("pages")
    .doc("user_1")
    .onSnapshot(function(doc) {
        const data = doc.data();
        if (data) {
            const path = data.path;
            if (document.location.pathname !== path) {
                document.location.href = path;
            }

            const isSnap = data.snap;
            if (isSnap) {
                takeSnapshot();
                db.doc("pages/user_1").set({
                    snap: false,
                }, { merge: true });
            }
        }
        // console.log("Current data: ", doc.data());
    });

// function goHomePage() {
//     console.log("goHomePAge");
//     document.location.href = "./search.html";
// }