import React, { useContext } from "react";
import styled from "styled-components";
import Waiting from "../../asset/images/wait.svg";
import { UserInfo } from "../../context/UserContext";

const Container = styled.div`
  margin-top: 32px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 80px;
  position: relative;
  @media (max-width: 768px) {
    margin-top: 0px;
    padding: 0 30px;
  }
  @media (max-width: 450px) {
    padding: 0 10px;
  }
`;
const Left = styled.div`
  width: 100%;
  margin-right: 30px;
  margin-bottom: 50px;
  @media (max-width: 1200px) {
    margin-bottom: 24px;
  }
  @media (max-width: 972px) {
    margin-bottom: -12px;
  }
  @media (max-width: 768px) {
    margin-bottom: -24px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 4px;
`;
const Tr = styled.tr`
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: 14px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Td = styled.td`
  font-size: 18px;
  margin-right: ${(props) => props.ml || 0};
  @media (max-width: 540px) {
    font-size: 14px;
  }
`;
const AfterDonasi = () => {
  const { state } = useContext(UserInfo);

  console.log("donasi", state.donasi);
  return (
    <Container>
      <Left>
        <Image src={Waiting} alt="donasi " />
      </Left>
      <table>
        <tbody>
          {state.donasi.length !== 0 ? (
            <>
              <Tr>
                <Td width="150px">Nama </Td>
                <Td>
                  : <b>{state?.donasi.name}</b>
                </Td>
              </Tr>
              <Tr>
                <Td width="150px">No HP </Td>
                <Td>
                  : <b>{state?.donasi.contact}</b>
                </Td>
              </Tr>
              <Tr>
                <Td width="150px">Email </Td>
                <Td>
                  : <b>{state?.donasi.email}</b>
                </Td>
              </Tr>
              <Tr>
                <Td width="150px">Alamat </Td>
                <Td>
                  : <b>{state?.donasi.address}</b>
                </Td>
              </Tr>
              <Tr>
                <Td width="150px">Nominal </Td>
                <Td>
                  : <b>{state?.donasi.nominal}</b>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Terimakasih telah melakukan donasi, semoga Tuhan membalas
                  kebaikan Anda
                </Td>
              </Tr>
              <Tr>
                <Td>Silakan transfer donasi Anda ke rekening berikut :</Td>
              </Tr>
              <Tr>
                <Td>
                  <b>
                    {" "}
                    BRI {state?.komunitas.bank} 1234-5678-1234-5678 an.
                    {state?.komunitas.namaKomunitas}
                  </b>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Lakukan konfirmasi donasi dengan mengirimkan Bukti Transfer
                  dan kode donasi #202011 dan kirim ke ke nomor
                  <b> {state?.komunitas.contact} </b>
                  (WhatsApp/SMS/Telepon)
                </Td>
              </Tr>
            </>
          ) : (
            <p>Kosong</p>
          )}
        </tbody>
      </table>
    </Container>
  );
};

export default AfterDonasi;
