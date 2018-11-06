import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'

import { compose, createStore, applyMiddleware } from 'redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import * as firebase from 'firebase'

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

// react-redux-firebase options
const rrfConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
  profileParamsToPopulate: [
    'contacts:users'
  ],
  attachAuthIsReady: true, // attaches auth is ready promise to store
  firebaseStateName: 'firebase', // should match the reducer name ('firebase' is default)
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions' // where list of user sessions is stored in database (presence must be enabled)
}



// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  applyMiddleware(thunk.withExtraArgument(getFirebase))
)(createStore)

// Add firebase to reducers
// const rootReducer = combineReducers({
//   firebase: firebaseReducer,
//   // firestore: firestoreReducer // <- needed if using firestore
// })

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)
//const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'))