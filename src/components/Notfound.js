import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ImageNotfound from "../asset/images/notfound.svg";

const Container = styled.div`
  margin-top: 80px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    padding: 0 30px;
  }
  @media (max-width: 450px) {
    padding: 0 10px;
  }
`;
const Image = styled.img`
  width: 300px;
`;

const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  @media (max-width: 540px) {
    font-size: 14px;
  }
`;
const Button = styled.div`
  width: 180px;
  text-align: center;
  cursor: pointer;
  margin-top: 30px;
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
const Notfound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Image src={ImageNotfound} alr="notfound" />
      <H1>Halaman yang anda cari tidak ditemukan atau Link salah</H1>
      <Button onClick={() => navigate("/")}>Halaman Utama</Button>
    </Container>
  );
};

export default Notfound;
