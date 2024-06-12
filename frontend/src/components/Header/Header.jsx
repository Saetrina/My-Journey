import React from "react";
import styles from "./Header.module.css";
import { GiSpellBook } from "react-icons/gi";

const Header = () => {
  return (
    <div className={styles.header}>
      <GiSpellBook size={64} />
      <div className={styles.headline}>
        <h1 className={styles.headlinetext}>My Journey</h1>
      </div>
    </div>
  );
};

export default Header;
