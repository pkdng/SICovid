import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { baseUrl, UserInfo } from "../../context/UserContext";
import axios from "axios";
import useInput from "../../context/useInput";
import InfoAmbulance from "./info-ambulance/InfoAmbulance";
import InfoVaksin from "./info-vaksin/InfoVaksin";
import InfoOksigen from "./info-oksigen/InfoOksigen";

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 60px 80px 20px 80px;
  background: #5a8cdc;
  position: relative;
  @media (max-width: 768px) {
    padding: 60px 30px 20px 30px;
  }
  @media (max-width: 450px) {
    padding: 60px 10px 20px 10px;
  }
`;

const IconLocation = styled(MdLocationOn)`
  width: 26px;
  color: black;
  position: absolute;
  height: 26px;
  margin-left: 10px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  width: 700px;
  position: relative;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 600px;
  /* width: 100%; */
  box-sizing: border-box;
  outline: none;
  font-size: 18px;
  border: 1px solid grey;
  padding: 12px 12px 12px 35px;
  border-radius: 4px;
  margin-right: 20px;
  @media (max-width: 768px) {
    width: 80%;
    padding: 8px 8px 8px 35px;
    font-size: 14px;
  }
`;
const Button = styled.button`
  color: #fff;
  border: none;
  padding: 12px;
  text-align: center;
  font-size: 18px;
  outline: none;
  font-weight: bold;
  letter-spacing: 2px;
  background-color: ${(props) => props.inputColor || "#EBBF1C"};
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
  @media (max-width: 768px) {
    width: 20%;
    font-size: 14px;
    padding: 8px;
  }
`;

const Route = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLink = styled(NavLink)`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Informasi = () => {
  const [query, bindQuery, resetQuery] = useInput();
  // const [dataQuery, setDataQuery] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useContext(UserInfo);

  let pathUrl = "";
  const handleQuery = () => {
    if (location.pathname.includes("ambulance")) {
      pathUrl = "ambulance";
    }

    if (location.pathname.includes("vaksin")) {
      pathUrl = "vaccine";
    }

    if (location.pathname.includes("oksigen")) {
      pathUrl = "oxygen";
    }

    console.log("path", pathUrl);
    const options = {
      method: "POST",
      url: `${baseUrl}/${pathUrl}/a/?search=${query}`,
      headers: {
        "Content-type": "application/json",
      },
      data: { search: query },
    };

    axios
      .request(options)
      .then((response) => {
        dispatch({ type: "SEARCH", payload: response.data.result });
        // localStorage.setItem("search", JSON.stringify(response.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <Search>
          <IconLocation />
          <Input
            type="text"
            {...bindQuery}
            placeholder="Ketikan lokasi kota anda..."
            required
          />
          <Button onClick={handleQuery}>Cari</Button>
        </Search>
        <Route>
          <NavLink
            style={({ isActive }) => ({
              borderBottom: isActive ? "4px solid #EBBF1C" : "none",
              paddingBottom: isActive ? "8px" : "none",
              textDecoration: "none",
              color: "#fff",
              marginLeft: "10px",
            })}
            to="/informasi/info-vaksin"
          >
            Info Vaksin
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              borderBottom: isActive ? "4px solid #EBBF1C" : "none",
              paddingBottom: isActive ? "8px" : "none",
              textDecoration: "none",
              color: "#fff",
              marginLeft: "10px",
            })}
            to="/informasi/info-ambulance"
          >
            Info Ambulance
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              borderBottom: isActive ? "4px solid #EBBF1C" : "none",
              paddingBottom: isActive ? "8px" : "none",
              textDecoration: "none",
              color: "#fff",
              marginLeft: "10px",
            })}
            to="/informasi/info-oksigen"
          >
            Info Oksigen
          </NavLink>
        </Route>
      </Container>
      <Outlet />
    </>
  );
};

export default Informasi;
