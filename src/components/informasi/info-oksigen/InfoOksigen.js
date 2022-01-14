import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { baseUrl, UserInfo } from "../../../context/UserContext";
import { IconDelete, IconEye } from "../info-vaksin/InfoVaksin";
const Container = styled.div`
  margin: 54px 0;
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

const GridCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;
const Card = styled.div`
  width: 90%;
  box-shadow: 2px 4px 10px 2px rgb(0 0 0 / 20%);
  padding: 10px 16px;
  border-radius: 4px;
  &:hover {
    transition: 0.5s ease-in-out;
    transform: scale(1.02);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    transition: 0.5s ease-in-out;
    transform: scale(1.01);
  }
`;

const Price = styled.p`
  font-size: 18px;
  text-align: end;
  font-weight: bold;
  color: #ebbf1c;
`;

const InfoOksigen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(UserInfo);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const options = {
    method: "GET",
    url: `${baseUrl}/oxygens`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  const fetchData = () => {
    setLoading(true);
    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [state.search]);

  const handleDelete = (id) => {
    closeSnackbar();
    const deleteOptions = {
      method: "DELETE",
      url: `${baseUrl}/oxygen/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    };
    axios
      .request(deleteOptions)
      .then((result) => {
        enqueueSnackbar("Berhasil dihapus", { variant: "success" });
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("infooksigen", state.search);
  return (
    <Container>
      <h3>Info Oksigen :</h3>
      {!state?.search.length ? (
        <>
          <p style={{ color: "red", fontWeight: "bold" }}>
            <i> hasil pencarian tidak ada</i>
          </p>
          <p style={{ color: "black", fontWeight: "bold" }}>
            <i> all data :</i>
          </p>
        </>
      ) : (
        <p style={{ color: "black", fontWeight: "bold" }}>
          <i>( ditemukan {state?.search.length} data hasil pencarian )</i>
        </p>
      )}
      <GridCard>
        {loading ? (
          <p>Mohon tunggu...</p>
        ) : state?.search.length !== 0 ? (
          state?.search.map((item, index) => (
            <Card>
              <h2>{item.name}</h2>
              <p>{item.location}</p>
              <p>{item.operationalTime}</p>
              <Price>{item.price}</Price>
              <span>
                {state?.userInfo ? (
                  <IconDelete
                    onClick={() => {
                      if (window.confirm("Yakin ingin menghapus ?"))
                        handleDelete(item._id);
                    }}
                  />
                ) : (
                  ""
                )}
                <IconEye
                  onClick={() => navigate(`/info-oksigen/${item._id}`)}
                />
              </span>
            </Card>
          ))
        ) : (
          data?.result?.map((item, index) => (
            <Card>
              <h2>{item.name}</h2>
              <p>{item.location}</p>
              <p>{item.operationalTime}</p>
              <Price>{item.price}</Price>
              <span>
                {state?.userInfo ? (
                  <IconDelete
                    onClick={() => {
                      if (window.confirm("Yakin ingin menghapus ?"))
                        handleDelete(item._id);
                    }}
                  />
                ) : (
                  ""
                )}
                <IconEye
                  onClick={() => navigate(`/info-oksigen/${item._id}`)}
                />
              </span>
            </Card>
          ))
        )}
      </GridCard>
    </Container>
  );
};

export default InfoOksigen;
