import * as types from '../Constants/index';
import firebase from 'firebase';

export function logout() {
  return (dispatch, getState) => {
    const uid = getState().firebase.auth.uid;
    console.log(uid);
    firebase.database().ref().child(`users/${uid}`).update({
      isActive: false,
      lastTimeLoggedOut: firebase.database.ServerValue.TIMESTAMP
    });
    dispatch({
      type: types.LOG_OUT,
    });
    firebase.auth().signOut();
  }
}

export const fetchUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase.database().ref(`users/${user.uid}`).update(
        {
          isActive: true,
          lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP,
        }
      )
      firebase.database().ref(`users/${user.uid}/favoriteList`)
        .once('value', favoriteList => {
          var _favoriteList = [];
          favoriteList.forEach(user => {
            if (user.val())
              _favoriteList.push(user.key)
          })
          console.log(_favoriteList);
          dispatch({
            type: types.GET_FAVORITE_USER,
            favoriteList: _favoriteList
          });
        });
    }
    else
      dispatch({
        type: types.LOG_OUT,
      });
  });
};

