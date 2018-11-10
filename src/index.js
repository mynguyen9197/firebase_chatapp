import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'

import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'

// react-redux-firebase options
const rrfConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
  attachAuthIsReady: true, // attaches auth is ready promise to store
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions' // where list of user sessions is stored in database (presence must be enabled)
}

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, rrfConfig)
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
  	<Provider store={store}>
  		<App />
  	</Provider>,
  	document.getElementById('root')
  );
})