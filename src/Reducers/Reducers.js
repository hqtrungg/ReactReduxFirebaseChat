import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import * as authReducers from './authReducer'
import * as messageReducers from './messageReducers';
import * as inboxReducer from './inboxReducer';

export default combineReducers({
  firebase: firebaseReducer,
  userMessage: messageReducers.userMessage,
  favoriteList: authReducers.favoriteList,
  messageThread: messageReducers.messageThread,
  userInbox: inboxReducer.userInbox,
});
