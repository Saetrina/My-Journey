import React, { useEffect, useState } from "react";
import styles from "./NotesThumbnail.module.css";
import { MdOutlineTimer } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";

const NotesThumbnail = ({ title, description, pending }) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(pending);
  }, [pending]);

  const changeStatus = () => {
    status ? setStatus(false) : setStatus(true);
  };

  return (
    <div className={styles.note}>
      <h3 id="title">{title}</h3>
      <p id="description">{description}</p>
      {status ? (
        <MdOutlineTimer
          onClick={changeStatus}
          className={styles.icon}
          style={{ color: "orange" }}
          size={50}
        />
      ) : (
        <IoCheckmarkCircle
          onClick={changeStatus}
          className={styles.icon}
          style={{ color: "green" }}
          size={50}
        />
      )}
    </div>
  );
};

export default NotesThumbnail;
