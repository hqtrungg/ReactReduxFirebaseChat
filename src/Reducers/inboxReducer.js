import * as types from '../Constants/index';

export const userInbox = (state = '', action) => {
    switch (action.type) {
        case types.SET_FAVORITE_USER:
            return {
                ...state,
                isFavoriteUser: action.isFavoriteUser
            }
        case types.INBOX_JOINED_IN:
            return {
                ...action.user,
            };
        case types.INBOX_LEFT:
            return '';
        default:
            return state;
    }
};

