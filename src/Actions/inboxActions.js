import * as types from '../Constants/index';
import { leaveRoom } from './roomActions';
import firebase from 'firebase'

export const joinInboxSuccess = (messageThread, user) => {
    return {
        type: types.INBOX_JOINED_IN,
        messageThread,
        user
    }
};

export const setFavoriteUser = (userInbox) => {
    return (dispatch, getState) => {
        const uid = getState().firebase.auth.uid;
        const InboxID = userInbox.uid;

        if(userInbox.isFavoriteUser)
            firebase.database().ref(`users/${uid}/favoriteUserList`).child(InboxID).remove();
        else
            firebase.database().ref(`users/${uid}/favoriteUserList`).child(InboxID).set(true);

        dispatch({
            type: types.SET_FAVORITE_USER,
            uid: userInbox.uid,
            isFavoriteUser: !userInbox.isFavoriteUser
        })

    }
};

export const leaveInbox = () => {
    return {
        type: types.INBOX_LEFT,
    }
};
export const joinInbox = (user) => {
    return (dispatch, getState) => {
        if (user !== getState().userInbox) {
            dispatch(leaveRoom());
            const { uid } = getState().firebase.auth;
            let thread = (uid < user.uid) ? uid + user.uid : user.uid + uid;
            if (uid !== 0) {
                dispatch(joinInboxSuccess(thread, user));
            }
        }
    }
}

