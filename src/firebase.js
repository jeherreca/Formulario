import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyA7yS3uLiZLVng5zWpxkVXWL0MtcwyCrhk",
    authDomain: "formularioeduconecta-56a8f.firebaseapp.com",
    databaseURL: "https://formularioeduconecta-56a8f.firebaseio.com",
    projectId: "formularioeduconecta-56a8f",
    storageBucket: "formularioeduconecta-56a8f.appspot.com",
    messagingSenderId: "860705601385",
    appId: "1:860705601385:web:6c7f8fb1e7f24665"
}

firebase.initializeApp(config);

export default firebase;