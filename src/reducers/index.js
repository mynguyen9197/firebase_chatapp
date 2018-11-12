import { combineReducers } from 'redux'
import authReducer from './authReducer'
import userReducer from './userReducer'
import messsageReducer from './messageReducer'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  messages: messsageReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;