import React, { useState, useEffect } from "react";
import renderCellExpand from "../CellExpand";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import { useSnackbar } from "notistack";
import useInput from "../../../context/useInput";
import axios from "axios";
import { baseUrl } from "../../../context/UserContext";

const Button = styled.div`
  width: 120px;
  text-align: center;
  cursor: pointer;
  background: ${(props) => props.bg || "#5a8cdc"};
  padding: 8px 12px;
  border-radius: 4px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 10px;
  &:hover {
    opacity: 0.9;
  }
`;
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  font-size: 18px;
  border: 1px solid black;
  padding: 8px 12px;
  border-radius: 4px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Label = styled.label`
  font-size: 16px;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const Box = styled.div`
  max-width: 375px;
  margin: 0 10px;
  padding: 10px;
  border-radius: 4px;
  margin: auto;
  background-color: #fff;
`;
const WrappButton = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Ambulance = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ambulance, setAmbulance] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [location, bindLocation, resetLocation] = useInput();
  const [contact, bindContact, resetContact] = useInput();
  const [price, bindPrice, resetPrice] = useInput();
  const [name, bindName, resetName] = useInput();
  const [ operationalTime, bindOperationalTime, resetOperationalTime ] = useInput();

  const options = {
    method: "GET",
    url: `${baseUrl}/ambulance`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  const fetchData = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setAmbulance(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // input vaksin
  const handlePostData = () => {
    const postData = {
      method: "POST",
      url: `${baseUrl}/ambulance`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: {
        location,
        contact,
        price,
        name,
        operationalTime,
      },
    };
    closeSnackbar();
    if (!location || !contact || !price || !name || !operationalTime) {
      return enqueueSnackbar("Semua kolom wajib diisi!", {
        variant: "warning",
      });
    }
    setLoading(true);
    axios
      .request(postData)
      .then((postResponse) => {
        enqueueSnackbar("Data Berhasil Ditambahkan", { variant: "success" });
        setLoading(false);
        handleClose();
      })
      .catch((err) => {
        enqueueSnackbar("Oops terjadi kesalahan", { variant: "error" });
      });
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.01, minWidth: 70, renderCell: renderCellExpand },
    { field: "name", headerName: "Nama", flex:0.5, minWidth: 280, renderCell: renderCellExpand },
    { field: "location", headerName: "Lokasi", flex:0.8, minWidth: 320, renderCell: renderCellExpand },
    { field: "contact", headerName: "Kontak", flex:0.1, minWidth: 150, renderCell: renderCellExpand },
    { field: "price", headerName: "Biaya", flex: 0.1, minWidth: 100, renderCell: renderCellExpand },
    { field: "operationalTime", headerName: "Waku Operasional", flex: 0.1, minWidth: 150, renderCell: renderCellExpand },
  ];

  const rows = [];
  ambulance?.result?.map((item, index) =>
    rows.push({
      id: index + 1,
      location: item.location,
      contact: item.contact,
      name: item.name,
      price: item.price,
      operationalTime: item.operationalTime,
    })
  );

  return (
    <>
      <div>
        <Button onClick={handleOpen}>Tambah Data</Button>
        <Modal
          style={{ paddingTop: "40px" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Label htmlFor="lokasi">Lokasi Ambulance :</Label>
            <Input type="text" id="lokasi" {...bindLocation} required />
            <Label htmlFor="kontak">Kontak :</Label>
            <Input
              type="text"
              id="kontak"
              {...bindContact}
              name="kontak"
              required
            />
            <Label htmlFor="nama">Nama Institusi :</Label>
            <Input type="text" id="nama" {...bindName} required />
            <Label htmlFor="biaya"> Biaya :</Label>
            <Input
              type="text"
              id="biaya"
              {...bindPrice}
              name="biaya"
              required
            />
            <Label htmlFor="link"> Waktu Operasional :</Label>
            <Input
              type="text"
              id="link"
              {...bindOperationalTime}
              name="link"
              required
            />
            <WrappButton>
              <Button onClick={handlePostData}>Simpan</Button>
              <Button bg="grey" onClick={handleClose}>
                Batal
              </Button>
            </WrappButton>
          </Box>
        </Modal>
      </div>
      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          // rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};

export default Ambulance;
