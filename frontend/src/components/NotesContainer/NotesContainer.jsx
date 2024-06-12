import React, { useEffect, useState } from "react";
import { useNoteMap } from "../../hooks/useNoteMap.jsx";
import styles from "./NotesContainer.module.css";
import { useFetchNotesByDate } from "../../hooks/useFetchNotesByDate.js";

const NotesContainer = ({ notesType, date }) => {
  const [notesMapped, setNotesMapped] = useState([]);
  const notes = useFetchNotesByDate(notesType, date);

  console.log(notes);

  useEffect(() => {
    if (notes) setNotesMapped(useNoteMap(notes));
  }, [notes]);

  return (
    <div className={styles.container}>
      <h1 className={styles.notesName}>{notesType}</h1>
      <div className={styles.notesContainer}>{notesMapped}</div>
    </div>
  );
};

export default NotesContainer;
