import styles from "./CreatePage.module.css";
import { useState } from "react";
import { DateModule } from "../../components/DatePicker/DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [type, setType] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("date", date);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);

    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      date: formData.get("date"),
      type: formData.get("type"),
    };

    axios.put(`http://localhost:5555/${type}s/create`, data);
    navigate("/");
  };

  function handleDate(date) {
    setDate(date);
  }

  return (
    <div className={styles.black}>
      <form className={styles.flex} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          className={styles.input}
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <DateModule sendDate={handleDate} />
        <div>
          <input
            type="radio"
            name="type"
            value="task"
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
          <label htmlFor="task">Task</label>
          <br />
          <input
            type="radio"
            name="type"
            value="thought"
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
          <label htmlFor="thought">Thought</label>
          <br />
          <input
            type="radio"
            name="type"
            value="achievement"
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
          <label htmlFor="achievement">Achievement</label>
        </div>

        <button type="submit">Click</button>
      </form>
    </div>
  );
}

export default CreatePage;
