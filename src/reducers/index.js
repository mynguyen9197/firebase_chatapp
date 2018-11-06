import { combineReducers } from 'redux'
import UserReducer from './userReducer'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  users: UserReducer,
  firebase: firebaseReducer,
});

export default rootReducer;