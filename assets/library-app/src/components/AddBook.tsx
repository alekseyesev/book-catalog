import React from "react";
import { useSelector } from "react-redux";
import AddBookForm from "./AddBookForm";
import styles from "../assets/custom.module.scss";

const AddBook: React.FC = () => {
  const isLoggedIn: boolean = useSelector(
    (state: {
      status: { nonce?: string; isLoggedIn: boolean; loading: boolean };
    }) => state.status.isLoggedIn
  );
  return (
    <div
      id="add-book"
      className={`${styles["col-md-6"]} ${styles["order-md-2"]} ${styles["mb-4"]}`}
    >
      <h4 className={styles["mb-3"]}>Новая книга</h4>
      {(isLoggedIn && <AddBookForm />) || (
        <p>
          <a href="/wp-login.php" target="_blank">
            Авторизуйтесь
          </a>
          , чтобы добавлять новые книги.
        </p>
      )}
    </div>
  );
};

export default AddBook;
