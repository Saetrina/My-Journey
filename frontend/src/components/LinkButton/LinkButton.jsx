import React from "react";
import { Link } from "react-router-dom";
import styles from "./LinkButton.module.css";

const LinkButton = ({ value, destination }) => {
  return (
    <Link className={styles.linkButton} to={"/" + destination}>
      {value}
    </Link>
  );
};

export default LinkButton;
