import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 60px;
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

const DivRegistration = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  width: 600px;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const H1 = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

const P1 = styled.p`
  font-size: 18px;
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

const Button = styled.div`
  width: 70px;
  color: #fff;
  cursor: pointer;
  padding: 10px 14px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  letter-spacing: 2px;
  margin-bottom: 50px;
  margin-right: 10px;
  background-color: ${(props) => props.inputColor || "#5a8cdc"};
  border-radius: 4px;
  &:hover {
    opacity: 0.9;
  }
`;

const Textarea = styled.textarea`
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  font-size: 18px;
  border: 1px solid black;
  padding: 8px 12px;
`;

const Daftar = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <DivRegistration>
        <H1>Form Pendaftaran</H1>
        <P1>
          Harap lengkapi Identitas Rumah Sakit dengan benar karena kami tidak
          bisa menerima semua pendaftaran
        </P1>
        <Label htmlFor="instansi">Nama Instansi :</Label>
        <Input type="text" id="instansi" name="instansi" required />
        <Label htmlFor="kepemilikan">Nama Kepemilikan :</Label>
        <Input type="text" id="kepemilikan" name="kepemilikan" required />
        <Label htmlFor="Notelepon">Telepon :</Label>
        <Input type="number" id="Notelepon" name="telepon" required />
        <Label htmlFor="email"> Email :</Label>
        <Input type="email" id="email" name="email" required />
        <Label htmlFor="alamat"> Alamat :</Label>
        <Textarea
          type="text"
          id="alamat"
          name="alamat"
          rows="6"
          required
        ></Textarea>
        <P1>Scan Surat Izin Operasional Instansi dengan format pdf</P1>
        <Input type="file" required />
        <WrappButton>
          <Button onClick={() => navigate("/register")}>Submit</Button>
          <Button inputColor="grey" onClick={() => navigate("/")}>
            Batal
          </Button>
        </WrappButton>
      </DivRegistration>
    </Container>
  );
};

export default Daftar;
