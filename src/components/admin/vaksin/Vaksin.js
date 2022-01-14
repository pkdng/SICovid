import React, { useEffect, useState } from "react";
import renderCellExpand from "../CellExpand";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import useInput from "../../../context/useInput";
import { useSnackbar } from "notistack";
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
  margin-top: 6px;
  margin-bottom: 6px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const Textarea = styled.textarea`
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  width: 100%;
  font-size: 18px;
  border: 1px solid black;
  padding: 8px 12px;
  resize: none;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const BoxInput = styled.div`
  max-width: 375px;
  margin: 0 10px;
  padding: 10px;
  border-radius: 4px;
  margin: auto;
  background-color: #fff;
`;
const WrappButton = styled.div`
  display: flex;
`;
const Vaksin = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [vaksin, setVaksin] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [lokasi, bindLokasi, resetLokasi] = useInput();
  const [jenis, bindJenis, resetJenis] = useInput();
  const [tanggal, bindTanggal, resetTanggal] = useInput();
  const [contact, bindContact, resetContact] = useInput();
  const [waktu, bindWaktu, resetWaktu] = useInput();
  const [link, bindLink, resetLink] = useInput();
  const [keterangan, bindKeterangan, resetKeterangan] = useInput();

  const options = {
    method: "GET",
    url: `${baseUrl}/vaccine`,
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
        setVaksin(response.data);
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
      url: `${baseUrl}/vaccine`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: {
        location: lokasi,
        date: tanggal,
        name: jenis,
        time: waktu,
        registlink: link,
        description: keterangan,
        contact,
      },
    };
    closeSnackbar();
    if (
      !lokasi ||
      !tanggal ||
      !jenis ||
      !waktu ||
      !link ||
      !keterangan ||
      !contact
    ) {
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
    { field: "lokasi", headerName: "Lokasi", flex:0.7, minWidth: 300, renderCell: renderCellExpand },
    { field: "jenis", headerName: "Jenis", flex:0.1, minWidth: 100, renderCell: renderCellExpand },
    { field: "tanggal", headerName: "Tanggal", width: 110, renderCell: renderCellExpand },
    { field: "waktu", headerName: "Waktu (WIB)", flex:0.2, minWidth: 130, renderCell: renderCellExpand },
    { field: "kontak", headerName: "Kontak", flex:0.3, minWidth: 150, renderCell: renderCellExpand },
    { field: "pendaftaran", headerName: "Pendaftaran", flex:0.5, minWidth: 180, renderCell: renderCellExpand },
    { field: "keterangan", headerName: "keterangan", flex:0.6, minWidth: 200, renderCell: renderCellExpand },
  ]

  const rows = [];
  vaksin?.result?.map((item, index) =>
    rows.push({
      id: index + 1,
      lokasi: item.location,
      jenis: item.name,
      tanggal: item.date,
      waktu: item.time,
      kontak: item.contact,
      pendaftaran: item.registlink,
      keterangan: item.description,
    })
  );

  return (
    <>
      <div>
        <Button onClick={handleOpen}>Tambah Data</Button>
        <Modal
          style={{
            paddingTop: "10px",
            marginBottom: "100px",
          }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <BoxInput>
            <Label htmlFor="lokasi">Lokasi Vaksinasi :</Label>
            <Input type="text" id="lokasi" {...bindLokasi} required />
            <Label htmlFor="jenis">Jenis Vaksin :</Label>
            <Input type="text" id="jenis" {...bindJenis} required />
            <Label htmlFor="kontak">Kontak :</Label>
            <Input type="text" id="kontak" {...bindContact} required />
            <Label htmlFor="tanggal">Tanggal Vaksin :</Label>
            <Input type="text" id="tanggal" {...bindTanggal} required />
            <Label htmlFor="waktu"> Waktu Vaksin :</Label>
            <Input type="text" id="waktu" {...bindWaktu} required />
            <Label htmlFor="link"> Link Pendaftaran :</Label>
            <Input type="text" id="link" {...bindLink} required />
            <Label htmlFor="alamat"> Keterangan :</Label>
            <Textarea
              type="text"
              id="alamat"
              {...bindKeterangan}
              rows="4"
              required
            ></Textarea>
            <WrappButton>
              <Button onClick={handlePostData} disabled={loading}>
                Simpan
              </Button>
              <Button bg="grey" onClick={handleClose}>
                Batal
              </Button>
            </WrappButton>
          </BoxInput>
        </Modal>
      </div>
      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
};

export default Vaksin;
