import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import Banner from "../../asset/images/banner2.svg";

const Container = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
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

const WrappImage = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;
const Image = styled.img`
  width: 100%;
`;
const Route = styled.div`
  display: flex;
  align-items: center;
`;
// const Container = styled.div``;

const Admin = () => {
  return (
    <Container>
      <WrappImage>
        <Image src={Banner} alt="Banner" />
      </WrappImage>
      <Route>
        <NavLink
          style={({ isActive }) => ({
            borderBottom: isActive ? "4px solid #EBBF1C" : "none",
            paddingBottom: isActive ? "8px" : "none",
            textDecoration: "none",
            color: "#000",
          })}
          to="/admin/vaksin"
        >
          Vaksin
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            borderBottom: isActive ? "4px solid #EBBF1C" : "none",
            paddingBottom: isActive ? "8px" : "none",
            textDecoration: "none",
            color: "#000",
            marginLeft: "15px",
          })}
          to="/admin/ambulance"
        >
          Ambulance
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            borderBottom: isActive ? "4px solid #EBBF1C" : "none",
            paddingBottom: isActive ? "8px" : "none",
            textDecoration: "none",
            color: "#000",
            marginLeft: "15px",
          })}
          to="/admin/oksigen"
        >
          Oksigen
        </NavLink>
      </Route>
      <hr />

      <Outlet />
    </Container>
  );
};

export default Admin;
