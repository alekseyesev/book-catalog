import React from "react";
import { useStore, useSelector } from "react-redux";
import Header from "./Header";
import AddBook from "./AddBook";
import BookList from "./BookList";
import Footer from "./Footer";
import { init } from "../redux/actions";
import styles from "../assets/custom.module.scss";

const Main: React.FC = () => {
  const loading: boolean = useSelector(
    (state: {
      status: { nonce?: string; isLoggedIn: boolean; loading: boolean };
    }) => state.status.loading
  );
  const { dispatch } = useStore();

  if (loading) {
    dispatch(init());
  }
  return (
    <div className={styles["container"]}>
      <Header />
      <main>
        <div className={styles["row"]}>
          <AddBook />
          <BookList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Main;
