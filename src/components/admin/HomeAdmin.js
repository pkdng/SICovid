import React from "react";
import styled from "styled-components";
import LandingImg from "../../asset/images/Group.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin-top: 10%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 80px;
  display: flex;
  position: relative;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 0 30px;
    flex-direction: column-reverse;
  }
  @media (max-width: 450px) {
    padding: 0 10px;
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
  }
`;
const Description = styled.p`
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Button = styled(Link)`
  width: 240px;
  color: #fff;
  padding: 10px 14px;
  text-align: center;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  display: block;
  margin-top: 50px;
  letter-spacing: 2px;
  display: block;
  text-decoration: none;
  background-color: #5a8cdc;
  border-radius: 4px;
  &:hover {
    /* background-color: #5a7adc; */
    opacity: 0.9;
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

const HomeAdmin = () => {
  return (
    <>
      <Container>
        <Left>
          <Tagline>Selamat Datang Rumah Sakit A</Tagline>
          <Description>
            Bergabung bersama Rakyat Indonesia untuk melawan Pandemi ini ! Kamu
            bisa memberi informasi kepada mereka yang membutuhkan, Informasi
            apapun akan sangat berharga jika dapat menolong sesama
          </Description>
          <Button to="/admin">Tambah Informasi</Button>
        </Left>

        <Right>
          <ImageDescription src={LandingImg} alt="lading page" />
        </Right>
      </Container>
    </>
  );
};

export default HomeAdmin;
