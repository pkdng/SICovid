import React from "react";
import styled from "styled-components";
import LandingImg from "../../asset/images/rafiki.svg";
import Ambulance from "../../asset/images/ambulance.svg";
import Vaksin from "../../asset/images/vaksin.svg";
import Oxygen from "../../asset/images/oksigen.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin-top: 30px;
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
  width: 100px;
  color: #fff;
  padding: 10px 14px;
  text-align: center;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  display: block;
  margin-top: 20px;
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

const ContainerLayanan = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 0 80px;
  @media (max-width: 768px) {
    padding: 0 30px;
  }
  @media (max-width: 450px) {
    padding: 0 10px;
  }
`;

const BoxLayanan = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Box = styled.div`
  display: flex;
  border-radius: 4px;
  width: 30%;
  box-sizing: border-box;
  box-shadow: 2px 4px 4px 2px rgb(0 0 0 /20%);
  padding: 20px;
  background-color: #5a8cdc;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 30px;
  }
`;

const BoxLogo = styled.img`
  width: 100%;
  height: 100px;
`;

const H1 = styled.h1`
  font-weight: 500;
  @media (max-width: 450px) {
    font-size: 20px;
  }
`;

const Home = () => {
  return (
    <>
      <Container>
        <Left>
          <Tagline>
            Bersama Bantu Tenaga Kesehatan Melawan <br />
            COVID - 19
          </Tagline>
          <Description>
            Jutaan Tenaga medis berjuang dengan kita untuk mengalahkan pandemi
            ini, Uluran tanganmu sangat berarti bagi mereka
          </Description>
          <Button to="/komunitas">Donasi</Button>
        </Left>

        <Right>
          <ImageDescription src={LandingImg} alt="lading page" />
        </Right>
      </Container>
      <ContainerLayanan>
        <H1>Layanan-layanan kami :</H1>
        <BoxLayanan>
          <Box>
            <Link to="/informasi/info-vaksin">
              <BoxLogo src={Vaksin} alt="vaksin"></BoxLogo>
            </Link>
          </Box>
          <Box>
            <Link to="/informasi/info-ambulance">
              <BoxLogo src={Ambulance} alt="ambulance"></BoxLogo>
            </Link>
          </Box>
          <Box>
            <Link to="/informasi/info-oksigen">
              <BoxLogo src={Oxygen} alt="oksigen"></BoxLogo>
            </Link>
          </Box>
        </BoxLayanan>
      </ContainerLayanan>
    </>
  );
};

export default Home;
