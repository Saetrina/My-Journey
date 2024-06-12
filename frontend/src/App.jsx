import React from "react";
import { Route, Routes } from "react-router-dom";
import NotesPage from "./pages/NotesPage/NotesPage.jsx";
import CreatePage from "./pages/CreatePage/CreatePage.jsx";
import Header from "./components/Header/Header.jsx";
import styles from "./index.module.css";

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.opacity}>
        <Header />
        <Routes>
          <Route path="/" element={<NotesPage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
          
        </Routes>
      </div>
    </div>
  );
};

export default App;
