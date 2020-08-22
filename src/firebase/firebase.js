import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyA5GQY8M_XA4HGVePUBoQs5StC6voB-6fk",
	authDomain: "instagram-clone-project-808b8.firebaseapp.com",
	databaseURL: "https://instagram-clone-project-808b8.firebaseio.com",
	projectId: "instagram-clone-project-808b8",
	storageBucket: "instagram-clone-project-808b8.appspot.com",
	messagingSenderId: "358199065483",
	appId: "1:358199065483:web:36826a2a9d96170e8a8d8e",
	measurementId: "G-7CNBDGMJY2",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
