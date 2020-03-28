import { combineReducers } from "redux";
import {
  NONCE,
  LOGIN,
  LOADING,
  RELOAD_ITEMS,
  NEW_BOOK_SEND_SUCCESSFULLY
} from "./types";

const status = (
  state: { nonce?: string; isLoggedIn: boolean; loading: boolean } = {
    isLoggedIn: false,
    loading: true
  },
  action: IActionNonce & IActionLogin & IActionLoadingStatus
) => {
  switch (action.type) {
    case NONCE:
      return { ...state, nonce: action.nonce };
    case LOGIN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};

const bookList = (
  state: IBook = {
    counter: 0,
    items: []
  },
  action: IActionSendNewBookSuccessfuly & IActionReloadItems
) => {
  switch (action.type) {
    case NEW_BOOK_SEND_SUCCESSFULLY:
      return {
        ...state,
        counter: state.counter + action.counter
      };
    case RELOAD_ITEMS:
      return { ...state, items: action.items };
    default:
      return state;
  }
};

const reducers = {
  status,
  bookList
};

const catalogReducers = combineReducers(reducers);

export default catalogReducers;
