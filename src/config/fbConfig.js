import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Firebase config
const fbConfig = {
  apiKey: 'AIzaSyAqf8SvuAXmD0zV9VWHG9H0KnHh4Cq3GUM',
  authDomain: 'chat-app-b0d15.firebaseapp.com',
  databaseURL: 'https://chat-app-b0d15.firebaseio.com',
  projectId: "chat-app-b0d15",
  storageBucket: 'https://chat-app-b0d15.firebaseio.com',
  messagingSenderId: "748929482744"
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)
firebase.firestore().settings({ timestampsInSnapshots: true })

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;