import React from "react";
import styles from "./Header.module.css";
import { GiSpellBook } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <div style={{ display: "flex" }}>
        <GiSpellBook size={64} />
        <Link to={"/"}>
          <div className={styles.headline}>
            <h1 className={styles.headlinetext}>My Journey</h1>
          </div>
        </Link>
      </div>
      <Link to={"/create"}>CREATE</Link>
    </div>
  );
};

export default Header;
