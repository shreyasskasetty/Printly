import * as firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/performance";

firebase.initializeApp({
  apiKey: 'AIzaSyC1jLMMPlhRcyXjDu5Pd1YWFWrpxdK36Oc',
  authDomain: 'printly-3ea29.firebaseapp.com',
  databaseURL: 'https://printly-3ea29.firebaseio.com',
  projectId: 'printly-3ea29',
  storageBucket: 'printly-3ea29.appspot.com',
  messagingSenderId: '750162446335',
  appId: '1:750162446335:web:1c99ebdbc91aca9f7b09ca',
  measurementId: 'G-XPQLS75RK'
});

// firebase.firestore().enablePersistence()
//   .catch(function(err) {
//       if (err.code == 'failed-precondition') {
//           // Multiple tabs open, persistence can only be enabled
//           // in one tab at a a time.
//           // ...
//       } else if (err.code == 'unimplemented') {
//           // The current browser does not support all of the
//           // features required to enable persistence
//           // ...
//       }
//   });
// // Subsequent queries will use persistence, if it was enabled successfully


export default firebase;
export const analytics = firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const performance = firebase.performance();