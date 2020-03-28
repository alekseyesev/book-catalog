import React from "react";
import styles from "../assets/custom.module.scss";

const Loader: React.FC<{}> = () => {
  return (
    <div
      id="loader"
      className={`${styles["d-flex"]} ${styles["flex-column"]} ${styles["justify-content-center"]} ${styles["align-self-center"]} ${styles["flex-fill"]} ${styles["mt-5"]} ${styles["mb-5"]}`}
    >
      <div className={styles["spinner-border"]} role="status">
        <span className={styles["sr-only"]}>Загрузка...</span>
      </div>
    </div>
  );
};

export default Loader;
