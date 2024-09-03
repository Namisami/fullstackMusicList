import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const CreateForm = ({ onCreate }) => {
  const [data, setData] = useState({
    title: "",
    artist_id: "",
    genre: "",
    publication_date: "2024-09-01",
    duration: 0,
  });

  const create = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/albums", data)
      .then((_) => onCreate())
      .catch((err) => console.error(err));
  };

  const handleInput = (e, label) => {
    setData({ ...data, [label]: e.target.value });
  };

  return (
    <>
      <MDInput
        onChange={(e) => handleInput(e, "title")}
        required
        label="Название альбома"
        value={data.title}
      />
      <MDInput
        onChange={(e) => handleInput(e, "artist_id")}
        required
        label="Исполнитель"
        value={data.artist_id}
      />
      <MDInput onChange={(e) => handleInput(e, "genre")} required label="Жанр" value={data.genre} />
      <MDInput
        onChange={(e) => handleInput(e, "publication_date")}
        required
        label="Дата релиза"
        type="date"
        value={data.publication_date}
      />
      <MDInput
        onChange={(e) => handleInput(e, "duration")}
        required
        label="Длительность (в секундах)"
        value={data.duration}
      />
      <MDButton onClick={create}>Создать</MDButton>
    </>
  );
};

export default CreateForm;
