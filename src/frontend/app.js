// var firebaseConfig = {
//     apiKey: "AIzaSyClo52cLq4nyObUQl7PdkRpBb4E67z9Q3E",
//     authDomain: "designproject-f97d8.firebaseapp.com",
//     databaseURL: "https://designproject-f97d8.firebaseio.com",
//     projectId: "designproject-f97d8",
//     storageBucket: "designproject-f97d8.appspot.com",
//     messagingSenderId: "251561500310",
//     appId: "1:251561500310:web:27d06ed4cbae22cc0facb7",
//     measurementId: "G-YZJ0SMV54N"
// };
// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();
// messaging.requestPermission()
//     .then(function() {
//         console.log('Have permission');
//     })
//     .catch(function(err) {
//         console.log('Error Occured!');
//     })

function goHomePage() {
    console.log("goHomePAge")
    document.location.href = './search.html';
}

const AWS = require('aws-sdk')
AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIAZXJCGQUH4YE3X76Z',
    secretAccessKey: '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'
})

var s3 = new AWS.S3()
s3.listBuckets(function(err, data) {
    if (err) {
        console.log(err, err.stack)
    } else {
        console.log(data)
    }
})