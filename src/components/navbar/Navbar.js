import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../../asset/logo/logocovid.svg";

const Container = styled.div`
  background-color: #5a8cdc;
  width: 100%;
  box-sizing: border-box;
  padding: 0 80px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    padding: 0 30px;
  }
  @media (max-width: 450px) {
    padding: 0 10px;
  }
`;

const Logo = styled.img`
  width: 200px;
  height: 80px;
  @media (max-width: 768px) {
    width: 140px;
    height: 60px;
  }
`;

const Right = styled.div`
  display: flex;
`;

const RouteLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  margin-left: 10px;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Navbar = () => {
  return (
    <Container>
      <Link to="/">
        <Logo src={LogoImg} alt="Logo png" />
      </Link>

      <Right>
        <RouteLink to="/login">Masuk</RouteLink>
        <RouteLink to="/daftar">Daftar</RouteLink>
      </Right>
    </Container>
  );
};

export default Navbar;
