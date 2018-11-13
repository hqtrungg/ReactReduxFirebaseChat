import * as types from '../Constants/index';

export const userMessageItems = (state, action) => {
  switch (action.type) {
    case types.SEND_MESSAGE:
      const { uid, displayName, message, createdAt } = action;
      return [
        ...state,
        {
          uid,
          displayName,
          message,
          createdAt
        }
      ];
    case types.SEND_MESSAGE_ERROR:
    default:
      return state;
  }
};

const userMessageInitialState = {
  isSending: false,
  isTyping: false,
  items: []
};

export const userMessage = (state = userMessageInitialState, action) => {
  switch (action.type) {
    case types.SEND_MESSAGE:
      return {
        ...state,
        isSending: true,
        items: userMessageItems(state.items, action)
      };
    case types.SEND_MESSAGE_ERROR:
      return {
        ...state,
        hasError: true,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};



export const messageThread = (state = "", action) => {
  switch (action.type) {
    case types.INBOX_JOINED_IN:
      if (state !== action.messageThread)
        return action.messageThread;
      return state;
    default:
      return state;
  }
};

