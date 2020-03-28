import React from "react";
import styles from "../assets/custom.module.scss";

const Header: React.FC = () => {
  return (
    <header className={`${styles["py-5"]} ${styles["text-center"]}`}>
      <div className={`${styles["logo"]} ${styles["mx-auto"]} ${styles["mb-4"]}`} />
      <h2>Каталог книг</h2>
      <p className={styles["lead"]}>
        Данное приложение построено на базе WordPress (REST-сервер) и React /
        Redux.
        <br />
        Вы можете добавлять в базу новые книги с помощью формы, доступной только
        авторизованным пользователям.
        <br />
        Список книг обновляется один раз в секунду без перезагрузки страницы
        (используется технология Server-Sent Events).
      </p>
    </header>
  );
};

export default Header;
