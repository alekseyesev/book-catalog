import React from "react";
import ReactDOM from "react-dom";
import { Store, createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension/logOnlyInProduction";
import App from "./App";
import { nonce, login } from "./redux/actions";
import reducers from "./redux/reducers";

const root: HTMLElement | null = document.getElementById("root");

const store: Store = createStore(
  reducers,
  compose(applyMiddleware(thunk), devToolsEnhancer({}))
);

if (root?.dataset.nonce) store.dispatch(nonce(root.dataset.nonce));

if (root?.dataset.isLoggedIn)
  store.dispatch(login(root.dataset.isLoggedIn === "true"));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  root
);
