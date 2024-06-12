import { useEffect, useState } from "react";

export const useFetchNotesByDate = (type, date) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!date) return;
    fetch(`http://localhost:5555/${type}/${date}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [date]);

  return data;
};
