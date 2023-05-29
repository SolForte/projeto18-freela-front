import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DetalhesPassagem() {
  const { id } = useParams();

  const [flight, setFlight] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/flights/${id}`)
      .then((res) => {
        setFlight(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <>
      <HomeContainer>
        <Header>
          <Link to={`/`}>
            <h1>Viagens Alucinantes</h1>
          </Link>
          <h2 onClick={handleVoltar}>Voltar</h2>
        </Header>
        <MainContent>
          <h1>Passagem para {flight?.destination}</h1>
          <div>
            <p>Cidade de destino: {flight?.destination}</p>
            <p>Cidade de Origem: {flight?.origin}</p>
            <p>Companhia aérea: {flight?.companyName}</p>
            <p>Horário de partida: {flight?.departureDate}</p>
            <p>Horário previsto de chegada: {flight?.arrivalDate}</p>
            <p>Preço da passagem: R$ {flight?.price}</p>
          </div>
          <Link to={`/cidades/${flight?.destinationCityId}/hospedagens`}>
            <p>Ver hospedagens</p>
          </Link>
        </MainContent>
      </HomeContainer>
    </>
  );
}

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
