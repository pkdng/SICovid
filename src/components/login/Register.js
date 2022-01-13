import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../../context/useInput";
import { baseUrl, UserInfo } from "../../context/UserContext";
import axios from "axios";
import { useSnackbar } from "notistack";

const Container = styled.div`
  margin-top: 30px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 80px;
  display: flex;
  position: relative;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 0 30px;
  }
  @media (max-width: 450px) {
    padding: 0 10px;
  }
`;

const BoxLogin = styled.div`
  width: 350px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 4px 3px rgb(0 0 0 / 15%);
`;
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  font-size: 18px;
  border: 1px solid black;
  padding: 8px 12px;
  border-radius: 4px;
`;

const Label = styled.label`
  font-size: 18px;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const WrappButton = styled.div`
  display: flex;
`;

const Button = styled.button`
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 10px 14px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  letter-spacing: 2px;
  margin-right: 10px;
  background-color: ${(props) => props.inputColor || "#5a8cdc"};
  border-radius: 4px;
  &:hover {
    opacity: 0.9;
  }
`;

const Register = () => {
  const [instansi, bindInstansi, resetInstansi] = useInput();
  const [email, bindEmail, resetEmail] = useInput();
  const [password, bindPassword, resetPassword] = useInput();
  const { state } = useContext(UserInfo);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.userInfo) {
      navigate("/home");
    }
  }, [state.userInfo]);

  const handleRegister = () => {
    const options = {
      method: "POST",
      url: `${baseUrl}/users/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { instansi, email, password },
    };
    closeSnackbar();
    if (!instansi || !email || !password) {
      return enqueueSnackbar("Name, Email dan Password wajib diisi!", {
        variant: "warning",
      });
    }
    setLoading(true);

    axios
      .request(options)
      .then((response) => {
        enqueueSnackbar("Register berhasil", { variant: "success" });
        setLoading(false);
        resetInstansi();
        resetEmail();
        resetPassword();
        navigate("/login");
      })
      .catch((error) => {
        enqueueSnackbar("email sudah digunakan", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <Container>
      <BoxLogin>
        <h2 style={{ textAlign: "center" }}>Daftar</h2>
        <hr />
        <Label htmlFor="name">Name :</Label>
        <Input type="text" id="name" {...bindInstansi} required />
        <Label htmlFor="email">Email :</Label>
        <Input type="email" id="email" {...bindEmail} required />
        <Label htmlFor="password">Password :</Label>
        <Input type="password" id="password" {...bindPassword} required />
        <WrappButton>
          <Button onClick={handleRegister} disabled={loading}>
            Daftar
          </Button>
          <Button inputColor="grey" onClick={() => navigate("/")}>
            Batal
          </Button>
        </WrappButton>
      </BoxLogin>
    </Container>
  );
};

export default Register;
