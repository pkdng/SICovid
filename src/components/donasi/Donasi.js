import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import DonasiImg from "../../asset/images/virus.svg";
import ImageMenuDonasi from "../../asset/images/menudonasi.svg";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import useInput from "../../context/useInput";
import { baseUrl, UserInfo } from "../../context/UserContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import { IconDelete, IconEye } from "../informasi/info-vaksin/InfoVaksin";

const Container = styled.div`
  margin-top: 80px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 80px;
  position: relative;
  @media (max-width: 768px) {
    padding: 0 30px;
  }
  @media (max-width: 450px) {
    padding: 0 10px;
  }
`;

const HeaderDonasi = styled.div`
  box-sizing: border-box;
  display: flex;
  position: relative;
  margin-bottom: 28px;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const Left = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Tagline = styled.h2`
  font-size: 42px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 30px;
    text-align: center;
  }
`;
const Description = styled.p`
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;

const Right = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ImageDescription = styled.img`
  width: 100%;
  height: 400px;
`;

const MenuDonasi = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 30px;
  position: relative;
  margin-top: 42px;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const LinkDonasi = styled(Link)`
  text-decoration: none;
  color: #000;
`;
const CardDonasi = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  border-radius: 4px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  box-shadow: 2px 2px 4px 2px rgb(0 0 0 /20%);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const WrappImageDonasi = styled.div`
  width: 50%;
  margin-right: 15px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ImageDonasi = styled.img`
  width: 100%;
`;

const ContentDonasi = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
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
  font-size: 18px;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
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
const Donasi = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [namaKomunitas, bindNamaKomunitas, resetNamaKomunitas] = useInput();
  const [lokasi, bindLokasi, resetLokasi] = useInput();
  const [contact, bindContact, resetContact] = useInput();
  const [email, bindEmail, resetEmail] = useInput();
  const [bank, bindBank, resetBank] = useInput();
  const [picture, setPicture] = useState();
  const [community, setCommunity] = useState([]);
  const navigate = useNavigate();
  const { state } = useContext(UserInfo);

  const handlePostData = () => {
    const postData = {
      method: "POST",
      url: `${baseUrl}/community`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: { bank, namaKomunitas, lokasi, contact, email },
    };

    closeSnackbar();
    if (!bank || !namaKomunitas || !lokasi || !contact || !email) {
      return enqueueSnackbar("Semua kolom wajib diisi!", {
        variant: "warning",
      });
    }
    axios
      .request(postData)
      .then((postResponse) => {
        enqueueSnackbar("Data Berhasil Ditambahkan", { variant: "success" });
        fetchData();
        handleClose();
      })
      .catch((err) => {
        enqueueSnackbar("Oops anda harus login", { variant: "error" });
      });
  };

  const fetchData = () => {
    const getData = {
      method: "GET",
      url: `${baseUrl}/community`,
    };
    setLoading(true);
    axios
      .request(getData)
      .then((response) => {
        setCommunity(response.data.result);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    closeSnackbar();
    const deleteOptions = {
      method: "DELETE",
      url: `${baseUrl}/community/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    console.log(deleteOptions)
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Modal
          style={{ paddingTop: "40px" }}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Label htmlFor="lokasi">Nama Komunitas :</Label>
            <Input type="text" id="lokasi" {...bindNamaKomunitas} required />
            <Label htmlFor="kontak">Kontak :</Label>
            <Input type="text" id="kontak" {...bindContact} required />
            <Label htmlFor="email">Email :</Label>
            <Input type="email" id="email" {...bindEmail} required />
            <Label htmlFor="alamat"> Alamat :</Label>
            <Input type="text" id="alamat" {...bindLokasi} required />

            <Label htmlFor="link"> No Rekening :</Label>
            <Input type="text" id="link" {...bindBank} required />
            {/* <Label htmlFor="file"> Foto :</Label>
            <Input
              type="file"
              id="file"
              onChange={(e) => setPicture(e.target.files[0])}
              required
            /> */}
            <WrappButton>
              <Button onClick={handlePostData}>Simpan</Button>
              <Button bg="grey" onClick={handleClose}>
                Batal
              </Button>
            </WrappButton>
          </Box>
        </Modal>
      </div>
      <Container>
        <HeaderDonasi>
          <Left>
            <Tagline>
              Donasi Peduli Dampak <br />
              Covid-19
            </Tagline>
            <Description>“Mari Bantu dengan Apa yang Kita Mampu”</Description>
          </Left>

          <Right>
            <ImageDescription src={DonasiImg} alt="donasi img" />
          </Right>
        </HeaderDonasi>
        <Button onClick={handleOpen}>Tambah Komunitas</Button>
        <MenuDonasi>
          {loading ? (
            <p>Mohon Tunggu...</p>
          ) : (
            community?.map((item, index) => (
              <CardDonasi key={index}>
                <WrappImageDonasi>
                  <ImageDonasi
                    src={ImageMenuDonasi}
                    alt="Menu image komunitas"
                  />
                </WrappImageDonasi>
                <ContentDonasi>
                  <h4>{item.namaKomunitas}</h4>
                  <p>Bersama kita saling bantu</p>
                  <hr />
                  <p>{item.location}</p>
                  <span>
                    {state?.userInfo ? (
                      <IconDelete
                        onClick={() => {
                          if (window.confirm("Yakin ingin menghapus ?"))
                            handleDelete(item._id);
                        }}
                      />
                    ) : (
                      ""
                    )}
                    <IconEye
                      onClick={() => navigate(`/komunitas/${item._id}`)}
                    />
                  </span>
                </ContentDonasi>
              </CardDonasi>
            ))
          )}
        </MenuDonasi>
      </Container>
    </>
  );
};

export default Donasi;
