import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DetalhesPassagem() {
  const { id } = useParams();

  const [flight, setFlight] = useState({});
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/flights/${id}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line
  }, [id]);


  return (
    <>
      <HomeContainer>
        <Header>
          <h1>Viagens Alucinantes</h1>
          <Link to={`/`}>
            <h2>Voltar</h2>
          </Link>
        </Header>
        <MainContent></MainContent>
      </HomeContainer>
    </>
  );
}

/*
{
  "id": 2,
  "companyName": "Bol",
  "origin": "Teresina",
  "destination": "São Luís",
  "destinationCityId": 1,
  "departureDate": "29/05/2023 06:00",
  "arrivalDate": "29/05/2023 07:30",
  "price": "200"
}
*/

//============================================================

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #fff5b8;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #00c4ff;
  h1 {
    margin-left: 20px;
  }
  h2 {
    margin-right: 20px;
  }
`;

const MainContent = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
