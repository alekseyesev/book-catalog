/// <reference types="react-scripts" />

type Types = {
  NONCE: "NONCE";
  LOGIN: "LOGIN";
  LOADING: "LOADING";
  RELOAD_ITEMS: "RELOAD_ITEMS";
  NEW_BOOK_SEND_SUCCESSFULLY: "NEW_BOOK_SEND_SUCCESSFULLY";
};

interface IPostBookRequestBody {
  [book_name: string]: string;
  [book_description: string]: string;
  [_wpnonce: string]: string;
}

interface IConfig {
  restServer: string;
  restEndpoint: string;
}

interface IAddBookResponse {
  ok: boolean;
}

interface IAddBookFormAlert extends IAddBookResponse {}

interface IBookListItem {
  title: string;
  content: string;
}

interface IBookList {
  items: Array<{ id: number } & IBookListItem>;
}

interface IBook extends IBookList {
  counter: number;
}

interface IAction {
  type: keyof Types;
}

interface IActionNonce extends IAction {
  nonce: string;
}

interface IActionLogin extends IAction {
  isLoggedIn: boolean;
}

interface IActionLoadingStatus extends IAction {
  loading: boolean;
}

interface IActionReloadItems extends IAction {
  items: Array<IBookListItem>;
}

interface IActionSendNewBookSuccessfuly extends IAction {
  counter: number;
}
