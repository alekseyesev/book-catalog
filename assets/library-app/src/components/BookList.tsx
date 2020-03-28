import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import BookListItem from "./BookListItem";
import styles from "../assets/custom.module.scss";

const BookList: React.FC = () => {
  const loading: boolean = useSelector(
    (state: {
      status: { nonce?: string; isLoggedIn: boolean; loading: boolean };
    }) => state.status.loading
  );
  const items: IBookList["items"] = useSelector(
    (state: { bookList: IBook }) => {
      return state.bookList.items;
    }
  );
  return (
    <div
      id="book-list"
      className={`${styles["d-flex"]} ${styles["flex-column"]} ${styles["col-md-6"]} ${styles["order-md-1"]}`}
    >
      <h4
        className={`${styles["d-flex"]} ${styles["justify-content-between"]} ${styles["align-items-center"]} ${styles["mb-0"]}`}
      >
        <span className="text-muted">Новинки</span>
        <span
          className={`${styles["badge"]} ${styles["badge-secondary"]} ${styles["badge-pill"]}`}
        >
          {items.length}
        </span>
      </h4>
      <hr
        className={`${styles["mt-4"]} ${styles["mb-4"]}`}
        style={{ width: "100%" }}
      />
      {(loading && <Loader />) ||
        (items.length && (
          <ul className={`${styles["list-group"]} ${styles["mb-3"]}`}>
            {items.map((item: { id: number } & IBookListItem) => (
              <BookListItem
                key={item.id}
                {...{ title: item.title, content: item.content }}
              />
            ))}
          </ul>
        )) || <p>В каталоге пока нет ни одной книги.</p>}
    </div>
  );
};

export default BookList;
