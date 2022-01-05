import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Donasi from "./components/donasi/Donasi";

function App() {
  const Routing = () => (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/donasi" element={<Donasi />} />
    </Routes>
  );

  return (
    <div className="app">
      {/* <BrowserRouter> */}
      <Navbar />
      <Routing />
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
