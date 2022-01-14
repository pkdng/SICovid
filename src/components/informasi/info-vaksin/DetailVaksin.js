import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Banner from "../../../asset/images/banner.png";
import { baseUrl } from "../../../context/UserContext";

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
`;
const Image = styled.img`
  width: 100%;
`;
const H1 = styled.h1`
  font-size: 24px;
  @media (max-width: 540px) {
    font-size: 14px;
  }
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

// const Container = styled.div``;

const DetailVaksin = () => {
  const [data, setData] = useState({});
  const [laoding, setLoading] = useState(false);
  const { id } = useParams();

  const fetchData = () => {
    const options = {
      method: "GET",
      url: `${baseUrl}/vaccine/${id}`,
    };

    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setData(response.data.result);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <WrappImage>
        <Image src={Banner} alt="Banner" />
      </WrappImage>
      <hr />
      <H1>{data?.name}</H1>
      <table>
        <tbody>
          <Tr>
            <Td width="150px">Lokasi </Td>
            <Td>
              : {data?.location}
            </Td>
          </Tr>
          <Tr>
            <Td width="150px">Tanggal </Td>
            <Td>
              : {data?.date}
            </Td>
          </Tr>
          <Tr>
            <Td width="150px">Waktu </Td>
            <Td>
              : {data?.time}
            </Td>
          </Tr>
          <Tr>
            <Td width="150px">Link pendaftaran </Td>
            <Td>
              : <a href={data?.registlink} target="blank" noreferer>{data?.registlink}</a>
            </Td>
          </Tr>
          <Tr>
            <Td width="150px">keterangan </Td>
            <Td>
              : {data?.description}
            </Td>
          </Tr>
          <Tr>
            <Td width="150px">Kontak </Td>
            <Td>
              : <a href={`https://api.whatsapp.com/send?phone=${data?.contact}`} target="blank">{data?.contact}</a>
            </Td>
          </Tr>
        </tbody>
      </table>
    </Container>
  );
};

export default DetailVaksin;
