import React from "react";
import styles from "../assets/custom.module.scss";

const BookListItem: React.FC<IBookListItem> = ({ title, content }) => {
  return (
    <li
      className={`${styles["list-group-item"]} ${styles["d-flex"]} ${styles["justify-content-between"]} ${styles["lh-condensed"]}`}
    >
      <article>
        <h5 className={styles["mb-2"]}>{title}</h5>
        <div
          className={`${styles["book-content"]} ${styles["text-muted"]}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </li>
  );
};

export default React.memo(BookListItem);
