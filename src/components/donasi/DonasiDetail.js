import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ImageMenuDonasi from "../../asset/images/menudonasi.svg";
import { MdLocationOn } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { BsCreditCardFill } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import Modal from "@mui/material/Modal";
import useInput from "../../context/useInput";
import { baseUrl, UserInfo } from "../../context/UserContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  margin-top: 80px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 80px;
  position: relative;
  display: flex;
  @media (max-width: 768px) {
    padding: 0 30px;
    flex-direction: column;
  }
  @media (max-width: 450px) {
    padding: 0 10px;
  }
`;

const Left = styled.div`
  width: 50%;
  margin-right: 30px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Tagline = styled.p`
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Description = styled.p`
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const IconLocation = styled(MdLocationOn)`
  width: 26px;
  color: #5a8cdc;
  height: 26px;
  margin-right: 20px;
`;
const Gmail = styled(SiGmail)`
  width: 26px;
  color: #5a8cdc;
  height: 26px;
  margin-right: 20px;
`;
const Telepon = styled(BsTelephoneFill)`
  width: 26px;
  color: #5a8cdc;
  height: 26px;
  margin-right: 20px;
`;
const Rekening = styled(BsCreditCardFill)`
  width: 26px;
  color: #5a8cdc;
  height: 26px;
  margin-right: 20px;
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
  border-radius: 4px;
  box-shadow: 2px 2px 4px 2px rgb(0 0 0 /10%);
`;

const H2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
  @media (max-width: 540px) {
    font-size: 16px;
  }
`;
const Div = styled.div`
  display: flex;
  align-items: center;
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
  margin-top: 18px;
  margin-right: 10px;
  &:hover {
    opacity: 0.9;
  }
`;

const DonasiDetail = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(UserInfo);
  const [name, bindName, resetName] = useInput();
  const [contact, bindContact, resetContact] = useInput();
  const [address, bindAddress, resetAddress] = useInput();
  const [email, bindEmail, resetEmail] = useInput();
  const [nominal, bindNominal, resetNominal] = useInput();
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDataDetail = async () => {
    const getData = await axios.get(`${baseUrl}/community/${id}`);
    console.log(getData);
    dispatch({ type: "KOMUNITAS", payload: getData.data.result });
    setData(getData.data.result);
  };

  useEffect(() => {
    fetchDataDetail();
  }, []);

  const handlePostData = () => {
    const postData = {
      method: "POST",
      url: `${baseUrl}/community/donateform`,

      data: {
        nominal,
        contact,
        address,
        name,
        email,
      },
    };

    closeSnackbar();
    if (!nominal || !contact || !address || !name || !email) {
      return enqueueSnackbar("Semua kolom wajib diisi!", {
        variant: "warning",
      });
    }
    setLoading(true);
    axios
      .request(postData)
      .then((postResponse) => {
        dispatch({ type: "DONASI", payload: postResponse.data.result });
        enqueueSnackbar("Success", { variant: "success" });
        navigate("/detail-donasi");
        setLoading(false);
        handleClose();
      })
      .catch((err) => {
        enqueueSnackbar("Oops terjadi kesalahan", { variant: "error" });
      });
  };
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
            <Label htmlFor="lokasi">Nama :</Label>
            <Input type="text" id="lokasi" {...bindName} required />
            <Label htmlFor="kontak">No HP :</Label>
            <Input
              type="text"
              id="kontak"
              {...bindContact}
              name="kontak"
              required
            />
            <Label htmlFor="email">Email :</Label>
            <Input
              type="email"
              id="email"
              {...bindEmail}
              name="email"
              required
            />
            <Label htmlFor="biaya"> Alamat :</Label>
            <Input
              type="text"
              id="biaya"
              {...bindAddress}
              name="biaya"
              required
            />
            <Label htmlFor="link"> Nominal :</Label>
            <Input
              type="text"
              id="link"
              {...bindNominal}
              name="link"
              required
            />
            <Tagline>
              Silahkan Transfer Ke no Rek <b>{data?.bank}</b> a/n{" "}
              <b>{data?.namaKomunitas}</b>
            </Tagline>

            <WrappButton>
              <Button onClick={handlePostData}>Donasi</Button>
              <Button bg="grey" onClick={handleClose}>
                Batal
              </Button>
            </WrappButton>
          </Box>
        </Modal>
      </div>
      <Container>
        <Left>
          <ImageDescription src={ImageMenuDonasi} alt="Image Komunitas" />
        </Left>

        <Right>
          <H2>{data?.namaKomunitas}</H2>
          <Div>
            <IconLocation />
            <p>{data?.lokasi}</p>
          </Div>
          <Div>
            <Gmail />
            <p>{data?.email}</p>
          </Div>
          <Div>
            <Telepon />
            <a href={`https://api.whatsapp.com/send?phone=${data?.contact}`} target="blank">{data?.contact}</a>
          </Div>
          <Div>
            <Rekening />
            <p>{data?.bank}</p>
          </Div>
          {/* <Tagline>{data?.bank}</Tagline> */}
          <Button onClick={handleOpen}>Donasi</Button>
        </Right>
      </Container>
    </>
  );
};

export default DonasiDetail;
