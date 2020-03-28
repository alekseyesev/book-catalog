import { Dispatch } from "redux";
import {
  NONCE,
  LOGIN,
  LOADING,
  RELOAD_ITEMS,
  NEW_BOOK_SEND_SUCCESSFULLY
} from "./types";
import Config from "../App.config";

export const init = (): any => {
  return (dispatch: Dispatch) => {
    const eventSource: EventSource = new EventSource(
      `${Config.restServer}${Config.restEndpoint}`
    );
    eventSource.addEventListener("getBooks", (event: any) => {
      const books: Array<{ id: number } & IBookListItem> = JSON.parse(
        event.data as string
      );
      dispatch(reloadItems(books));
      dispatch(setLoadingStatus(false));
    });
    eventSource.onerror = () => {
      throw new Error("Не удалось подключиться к REST-серверу.");
    };
  };
};

export const newBookSend = (
  data: FormData,
  restNonce: string,
  callback?: (response: IAddBookResponse) => void
): any => {
  return (dispatch: Dispatch) => {
    let body: Partial<IPostBookRequestBody> = {
      "_wpnonce": restNonce
    };
    for (let key of ["book_name", "book_description"]) {
      let value: any = data.get(key);
      if (value) {
        body[key] = value;
      }
    }
    fetch(`${Config.restServer}${Config.restEndpoint}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((body: Response) => {
      body.json().then((response: IAddBookResponse) => {
        dispatch(addItemCounter(response.ok ? 1 : 0));
        if (callback) callback(response);
      });
    });
  };
};

export const nonce = (nonce: string): IActionNonce => {
  return {
    type: NONCE,
    nonce
  };
};

export const login = (isLoggedIn: boolean): IActionLogin => {
  return {
    type: LOGIN,
    isLoggedIn
  };
};

export const setLoadingStatus = (loading: boolean): IActionLoadingStatus => {
  return {
    type: LOADING,
    loading
  };
};

export const reloadItems = (
  items: Array<{ id: number } & IBookListItem>
): IActionReloadItems => {
  return {
    type: RELOAD_ITEMS,
    items
  };
};

export const addItemCounter = (
  counter: number
): IActionSendNewBookSuccessfuly => {
  return {
    type: NEW_BOOK_SEND_SUCCESSFULLY,
    counter
  };
};
