import React from "react";
import styles from "../assets/custom.module.scss";

const Footer: React.FC = () => {
  return (
    <footer
      className={`${styles["my-5"]} ${styles["text-muted"]} ${styles["text-center"]}`}
    >
      <p className={styles["mb-1"]}>
        &copy; {new Date().getFullYear()} Алексей Есев
      </p>
    </footer>
  );
};

export default Footer;
