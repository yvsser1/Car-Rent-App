import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDYridcQndkkVH-6yxmpYknduKN-GlI8gI",
  authDomain: "rent-car118.firebaseapp.com",
  databaseURL: "https://rent-car118.firebaseio.com",
  projectId: "rent-car118",
  storageBucket: "rent-car118.appspot.com",
  messagingSenderId: "685208685659",
  appId: "1:685208685659:web:00f5e3c5c9d4793b"
};
firebase.initializeApp(config);
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

firebase.firestore().enablePersistence()
  .catch(function(err) {
      if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
const storage = firebase.storage().ref()
// firebase.firestore().settings({ timestampsInSnapshots: true })

// export default firebase

export {
  storage, firebase as default
}