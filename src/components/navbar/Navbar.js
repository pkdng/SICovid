import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../../asset/logo/logocovid.svg";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserInfo } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import { FaUserCircle } from "react-icons/fa";

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
const User = styled(FaUserCircle)`
  width: 30px;
  height: 30px;
  color: #fff;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserInfo);
  const { userInfo } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleLogout = () => {
    closeSnackbar();
    dispatch({ type: "USER_LOGOUT" });
    localStorage.clear();
    navigate("/login");
    enqueueSnackbar("berhasil logout", { variant: "success" });
  };
  function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <User />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
          <MenuItem onClick={handleClose}>{userInfo?.email}</MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink
              style={{ color: "black", textDecoration: "none" }}
              to="/admin"
            >
              Tambah Informasi
            </NavLink>
          </MenuItem>

          <MenuItem onClick={(handleClose, handleLogout)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
  return (
    <Container>
      <Link to="/">
        <Logo src={LogoImg} alt="Logo png" />
      </Link>

      <Right>
        {userInfo ? (
            <BasicMenu />
          ) : (
            <>
              <RouteLink to="/login">Masuk</RouteLink>
              <RouteLink to="/daftar">Daftar</RouteLink>
            </>
          )}
      </Right>
    </Container>
  );
};

export default Navbar;
