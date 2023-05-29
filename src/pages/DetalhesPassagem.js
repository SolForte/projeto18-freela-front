import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DetalhesPassagem() {
  const { id } = useParams();

  const [flight, setFlight] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/flights/${id}`)
      .then((res) => {
        console.log(res.data);
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
          <h1>
            Passagem para {flight.destination ? flight?.destination : "cidade"}
          </h1>
          {flight.length !== 0 ? (
            <Flight>
              <p>Cidade de Destino: {flight?.destination}</p>
              <p>Cidade de Origem: {flight?.origin}</p>
              <p>Companhia aérea: {flight?.companyName}</p>
              <p>Horário de partida: {flight?.departureDate}</p>
              <p>Horário previsto de chegada: {flight?.arrivalDate}</p>
              <p>Preço da passagem: R$ {flight?.price}</p>
            </Flight>
          ) : (
            <Nenhuma>Passagem não encontrada</Nenhuma>
          )}
          <Link to={`/cidades/${flight?.destinationCityId}/hospedagens`}>
            <Linkage>
              Ver hospedagens para{" "}
              {flight.destination ? flight?.destination : "cidade"}
            </Linkage>
          </Link>
        </MainContent>
      </HomeContainer>
    </>
  );
}

const Flight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  background-color: #98eecc;
  p {
    font-family: 'Roboto', sans-serif;
  }
`;

const Linkage = styled.p`
  margin-top: 20px;
  color: #79e0ee;
  font-weight: bold;
  font-size: 30px;
  font-family: "Lexend Deca", sans-serif;
  text-align: center;
`;

const Nenhuma = styled.p`
  color: #00c4ff;
  font-family: "Lexend Deca", sans-serif;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 290px;
    border-radius: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #79e0ee;
  h1 {
    margin-left: 20px;
    color: white;
    font-family: "Lexend Deca", sans-serif;
    font-weight: bold;
  }
  h2 {
    margin-right: 20px;
    color: black;
    font-family: "Lexend Deca", sans-serif;
    font-weight: bold;
    cursor: pointer;
  }
`;

const MainContent = styled.div`
  margin-top: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-family: "Lexend Deca", sans-serif;
    font-weight: bold;
    font-size: 20px;
    color: #30a2ff;
    margin-bottom: 20px;
  }
`;
