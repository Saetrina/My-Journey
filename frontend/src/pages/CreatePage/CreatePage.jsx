import styles from "./CreatePage.module.css";
import { useState } from "react";

function CreatePage() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(name);
  };

  const handleChange = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className={styles.black}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          value={name}
          placeholder="Description"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button type="submit">Click</button>
      </form>
    </div>
  );
}

export default CreatePage;
