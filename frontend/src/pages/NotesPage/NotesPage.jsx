import React, { useEffect, useState } from "react";
import NotesContainer from "../../components/NotesContainer/NotesContainer.jsx";
import styles from "./NotesPage.module.css";
import { DateModule } from "../../components/DatePicker/DatePicker.jsx";

const NotesPage = () => {
  const [date, setDate] = useState(null);

  function handleDate(date) {
    setDate(date);
  }

  return (
    <div className={styles.notespage}>
      <div className={styles.navbar}>
        <DateModule sendDate={handleDate} />
      </div>

      <div className={styles.wrapper}>
        <NotesContainer notesType="tasks" date={date} />
        <NotesContainer notesType="thoughts" date={date} />
        <NotesContainer notesType="achievements" date={date} />
      </div>
    </div>
  );
};

export default NotesPage;
