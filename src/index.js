import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'

import firebase from 'firebase'
import { compose, createStore, combineReducers } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'

// Firebase config
const fbConfig = {
  apiKey: 'AIzaSyAqf8SvuAXmD0zV9VWHG9H0KnHh4Cq3GUM',
  authDomain: 'chat-app-b0d15.firebaseapp.com',
  databaseURL: 'https://chat-app-b0d15.firebaseio.com',
  projectId: "chat-app-b0d15",
  storageBucket: 'https://chat-app-b0d15.firebaseio.com',
  messagingSenderId: "748929482744"
}
// react-redux-firebase options
const rrfConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
  attachAuthIsReady: true, // attaches auth is ready promise to store
  firebaseStateName: 'firebase' // should match the reducer name ('firebase' is default)
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'))