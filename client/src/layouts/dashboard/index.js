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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function Dashboard() {
  const [artists, setArtists] = useState([]);
  const [rowData, setRowData] = useState([]);
  console.log(artists);
  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
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
  }, []);

  const findArtistById = (id) => {
    return artists.find((artist) => artist.id === id).name;
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </div>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
