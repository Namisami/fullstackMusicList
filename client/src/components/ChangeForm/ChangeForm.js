import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ChangeForm = ({ selected, onChange }) => {
  const [data, setData] = useState({
    ...selected,
    // eslint-disable-next-line react/prop-types
    publication_date: new Date(selected.publication_date).toISOString().slice(0, 10),
  });

  const change = async (e) => {
    e.preventDefault();
    await axios
      // eslint-disable-next-line react/prop-types
      .put(`http://localhost:8000/albums/${selected.id}`, data)
      .then((_) => onChange())
      .catch((err) => console.error(err));
  };

  const handleInput = (e, label) => {
    setData({ ...data, [label]: e.target.value });
  };

  return (
    <>
      <MDInput
        onChange={(e) => handleInput(e, "title")}
        label="Название альбома"
        value={data.title}
      />
      <MDInput
        onChange={(e) => handleInput(e, "artist_id")}
        label="Исполнитель"
        value={data.artist_id}
      />
      <MDInput onChange={(e) => handleInput(e, "genre")} label="Жанр" value={data.genre} />
      <MDInput
        onChange={(e) => handleInput(e, "publication_date")}
        label="Дата релиза"
        type="date"
        value={data.publication_date}
      />
      <MDInput
        onChange={(e) => handleInput(e, "duration")}
        label="Длительность (в секундах)"
        value={data.duration}
      />
      <MDButton onClick={change}>Изменить</MDButton>
    </>
  );
};

export default ChangeForm;
