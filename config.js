import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2H3FD1ew3S0mM6BmHwZxOUT1vVqtB3Vo",
  authDomain: "todo-app-f37ec.firebaseapp.com",
  projectId: "todo-app-f37ec",
  storageBucket: "todo-app-f37ec.appspot.com",
  messagingSenderId: "985260480050",
  appId: "1:985260480050:web:790d00642578b9470f8e2b",
  measurementId: "G-ZKPC5G606E",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
