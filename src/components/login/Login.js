import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl, UserContext, UserInfo } from "../../context/UserContext";
import useInput from "../../context/useInput";
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
  cursor: pointer;
  border: none;
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

const Login = () => {
  const [email, bindEmail, resetEmail] = useInput();
  const [password, bindPassword, resetPassword] = useInput();
  const { state, dispatch } = useContext(UserInfo);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.userInfo) {
      navigate("/home");
    }
  }, [state.userInfo]);

  const handleLogin = () => {
    const options = {
      method: "POST",
      url: `${baseUrl}/users/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { email, password },
    };
    closeSnackbar();
    if (!email || !password) {
      return enqueueSnackbar("Name, Email dan Password wajib diisi!", {
        variant: "warning",
      });
    }
    setLoading(true);

    axios
      .request(options)
      .then((response) => {
        console.log(response);
        dispatch({ type: "USER_INFO", payload: response.data.user });
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        enqueueSnackbar(`Selamat datang ${response.data.user.email}`, {
          variant: "success",
        });
        setLoading(false);
        resetEmail();
        resetPassword();
        navigate("/home");
      })
      .catch((error) => {
        enqueueSnackbar("email atau password salah", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <Container>
      <BoxLogin>
        <h2 style={{ textAlign: "center" }}>Masuk</h2>
        <hr />
        <Label htmlFor="email">Email :</Label>
        <Input type="email" {...bindEmail} id="email" required />
        <Label htmlFor="password">Password :</Label>
        <Input type="password" {...bindPassword} id="password" required />
        <WrappButton>
          <Button onClick={handleLogin} disabled={loading}>
            Masuk
          </Button>
          <Button inputColor="grey" onClick={() => navigate("/")}>
            Batal
          </Button>
        </WrappButton>
      </BoxLogin>
    </Container>
  );
};

export default Login;
