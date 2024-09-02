/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Stack, Modal, Box } from "@mui/material";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./style.css";
import CreateForm from "components/CreateForm/CreateForm";
import ChangeForm from "components/ChangeForm/ChangeForm";

function Dashboard() {
  const [artists, setArtists] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setColDefs([
      { field: "id", headerName: "ID" },
      { field: "title", headerName: "Название альбома" },
      {
        field: "artist_id",
        headerName: "Исполнитель",
        valueFormatter: (p) => findArtistById(p.value),
      },
      { field: "genre", headerName: "Жанр" },
      {
        field: "publication_date",
        headerName: "Дата релиза",
        valueFormatter: (p) => new Date(p.value).toLocaleDateString(),
      },
      { field: "duration", headerName: "Длительность", valueFormatter: (p) => timeFormat(p.value) },
    ]);
  }, [artists]);

  const loadData = () => {
    (async function () {
      await axios
        .get("http://localhost:8000/albums")
        .then((res) => setRowData(res.data))
        .catch((err) => console.error(err));
    })();
    (async function () {
      await axios
        .get("http://localhost:8000/artists")
        .then((res) => setArtists(res.data))
        .catch((err) => console.error(err));
    })();
  };

  const findArtistById = (id) => {
    const artist = artists.find((artist) => artist.id === id);
    return artist ? artist.name : "Безымянный";
  };

  const timeFormat = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const handleModal = (content) => {
    setIsOpen(!isOpen);
    setModalContent(content);
  };

  const deleteItem = async (e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8000/albums/${selected.id}`)
      .then((_) => loadData())
      .catch((err) => console.error(err));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack pt={1} gap={1} direction="row">
        <MDButton onClick={() => handleModal(<CreateForm onCreate={loadData} />)}>Создать</MDButton>
        {selected ? (
          <MDButton
            onClick={() =>
              handleModal(
                <ChangeForm
                  selected={{ ...selected, artist_id: findArtistById(selected.artist_id) }}
                  onChange={loadData}
                />
              )
            }
          >
            Изменить
          </MDButton>
        ) : (
          <MDButton disabled>Изменить</MDButton>
        )}
        {selected ? (
          <MDButton onClick={deleteItem}>Удалить</MDButton>
        ) : (
          <MDButton disabled>Удалить</MDButton>
        )}
      </Stack>
      <MDBox py={3}>
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            onRowClicked={(e) => setSelected(e.data)}
          />
        </div>
      </MDBox>
      <Modal
        open={isOpen}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal" sx={{ width: "500px" }}>
          <Stack gap={1}>
            <form className="modal__form">{modalContent}</form>
          </Stack>
        </Box>
      </Modal>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
