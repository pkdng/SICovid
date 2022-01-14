import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Donasi from "./components/donasi/Donasi";
import Daftar from "./components/daftar/Daftar";
import Informasi from "./components/informasi/Informasi";
import InfoVaksin from "./components/informasi/info-vaksin/InfoVaksin";
import InfoAmbulance from "./components/informasi/info-ambulance/InfoAmbulance";
import InfoOksigen from "./components/informasi/info-oksigen/InfoOksigen";
import DetailVaksin from "./components/informasi/info-vaksin/DetailVaksin";
import DetailAmbulance from "./components/informasi/info-ambulance/DetailAmbulance";
import DetailOksigen from "./components/informasi/info-oksigen/DetailOksigen";
import HomeAdmin from "./components/admin/HomeAdmin";
import Vaksin from "./components/admin/vaksin/Vaksin";
import Oksigen from "./components/admin/oksigen/Oksigen";
import Ambulance from "./components/admin/ambulance/Ambulance";
import Admin from "./components/admin/Admin";
import Notfound from "./components/Notfound";
import { useContext, useEffect } from "react";
import { UserContext, UserInfo } from "./context/UserContext";
import Register from "./components/login/Register";
import DonasiDetail from "./components/donasi/DonasiDetail";
import AfterDonasi from "./components/donasi/AfterDonasi";

function App() {
  const Routing = () => {
    return (
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/komunitas" element={<Donasi />} />
        <Route path="/detail-donasi" element={<AfterDonasi />} />
        <Route path="/komunitas/:id" element={<DonasiDetail />} />
        <Route path="/informasi" element={<Informasi />}>
          <Route path="info-vaksin" element={<InfoVaksin />} />
          <Route path="info-ambulance" element={<InfoAmbulance />} />
          <Route path="info-oksigen" element={<InfoOksigen />} />
        </Route>
        <Route path="/info-vaksin/:id" element={<DetailVaksin />} />
        <Route path="/info-ambulance/:id" element={<DetailAmbulance />} />
        <Route path="/info-oksigen/:id" element={<DetailOksigen />} />
        <Route path="/home" element={<HomeAdmin />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/vaksin" element={<Vaksin />} />
          <Route path="/admin/oksigen" element={<Oksigen />} />
          <Route path="/admin/ambulance" element={<Ambulance />} />
        </Route>
      </Routes>
    );
  };

  return (
    <div className="app">
      {/* <BrowserRouter> */}
      <UserContext>
        <Navbar />
        <Routing />
      </UserContext>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
