import React, { FormEvent, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { newBookSend } from "../redux/actions";
import AddBookFormAlert from "./AddBookFormAlert";
import styles from "../assets/custom.module.scss";

const AddBookForm: React.FC = () => {
  const [formChecked, checkForm] = useState<boolean>(false);
  const [alertVisible, toggleAlert] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const nonce: string = useSelector(
    (state: {
      status: { nonce?: string; isLoggedIn: boolean; loading: boolean };
    }) => (state.status.nonce ? state.status.nonce : "")
  );
  const { dispatch } = useStore();
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newBookData = new FormData(form);
    if (form.checkValidity()) {
      dispatch(
        newBookSend(newBookData, nonce, (response: IAddBookResponse) => {
          checkForm(false);
          setStatus(response.ok);
          toggleAlert(true);
          form.reset();
          setTimeout(() => {
            toggleAlert(false);
          }, 3000);
        })
      );
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className={
        formChecked
          ? `${styles["needs-validation"]} ${styles["has-been-validated"]}`
          : styles["needs-validation"]
      }
      noValidate
    >
      <div className={styles["mb-3"]}>
        <label htmlFor="book-name">Название книги</label>
        <input
          onInput={() => checkForm(true)}
          type="text"
          name="book_name"
          className={styles["form-control"]}
          id="book-name"
          autoComplete="off"
          maxLength={50}
          required
        />
        <div className={styles["invalid-feedback"]}>
          Пожалуйста, заполните название книги.
        </div>
      </div>

      <div className={styles["mb-3"]}>
        <label htmlFor="book_description">Описание книги</label>
        <textarea
          onInput={() => checkForm(true)}
          rows={8}
          name="book_description"
          className={styles["form-control"]}
          id="book-description"
          maxLength={200}
          required
        />
        <div className={styles["invalid-feedback"]}>
          Пожалуйста, заполните описание книги.
        </div>
      </div>

      <hr className={`${styles["mt-4"]} ${styles["mb-4"]}`} />
      <button
        onClick={() => checkForm(true)}
        className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["btn-lg"]} ${styles["btn-block"]}`}
        type="submit"
      >
        Добавить книгу
      </button>
      {alertVisible && <AddBookFormAlert ok={status} />}
    </form>
  );
};

export default AddBookForm;
