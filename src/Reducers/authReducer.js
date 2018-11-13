import * as types from '../Constants/index';
import {SET_FAVORITE_USER} from "../Constants/index";

const initialState = {
  isUserSignedIn: false,
  isInProgress: false,
  hasError: false,
  errorMessage: '',
  avatarUrl: '',
  displayName: '',
  uid: 0
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}

export function favoriteList(state = [], action) {
    switch (action.type) {
        case types.GET_FAVORITE_USER:
            return action.favoriteList;
        case SET_FAVORITE_USER:
            var favoriteList = state;
            for(let i = 0; i < state.length; i++){
                if(favoriteList[i] === action.uid && !action.isFavoriteUser)
                    favoriteList.splice(i, 1);//Remove non-favorite user from FavoriteList
            }
            if(action.isFavoriteUser){
                favoriteList.push(action.uid);//Add favorite user to FavoriteList
                return favoriteList;
            }
        default:
            return state;
    }
}
