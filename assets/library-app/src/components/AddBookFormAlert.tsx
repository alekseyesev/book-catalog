import React from "react";
import styles from "../assets/custom.module.scss";

const AddBookFormAlert: React.FC<IAddBookFormAlert> = ({ ok }) => {
  return (
    <div
      className={`${styles["alert"]} ${styles["mt-4"]} ${styles["mb-0"]} ${
        styles["show"]
      } ${(ok && styles["alert-success"]) || styles["alert-danger"]}`}
      role="alert"
    >
      <small>
        {(ok && "Данные успешно отправлены на сервер.") ||
          "Во время отправки данных на сервер произошла ошибка."}
      </small>
    </div>
  );
};

export default AddBookFormAlert;
