import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  const [cities, setCities] = useState([]);
  const [select, setSelect] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cities`)
      .then((res) => {
        setCities(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const handleSelect = (event) => {
    setSelect(event.target.value);
  };

  return (
    <>
      <HomeContainer>
        <Header>
          <Link to={`/`}>
            <h1>Viagens Alucinantes</h1>
          </Link>
        </Header>
        <MainContent>
          <Guide>Primeiro, selecione uma cidade:</Guide>
          <Select value={select} onChange={handleSelect}>
            <option disabled value="">
              Selecione a sua cidade de destino
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Select>
          <ChoiceBox>
            <Choice>
              <Link to={select === "" ? `/` : `/cidades/${select}/passagens`}>
                <p>Clique para ver passagens para a cidade selecionada.</p>
              </Link>
            </Choice>
            <Choice>
              <Link to={select === "" ? `/` : `/cidades/${select}/hospedagens`}>
                <p>Clique para ver hospedagens para a cidade selecionada.</p>
              </Link>
            </Choice>
          </ChoiceBox>
        </MainContent>
      </HomeContainer>
    </>
  );
}

const Guide = styled.h1`
  margin-bottom: 10px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: #30A2FF;
`;

const ChoiceBox = styled.div`
  display: flex;
  gap: 20px;
`;

const Choice = styled.div`
  width: 140px;
  background-color: #98EECC;
  justify-content: center;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  p{
    color: #30A2FF;
    font-weight: bold;
    font-family: "Lexend Deca", sans-serif;
  }
`;

const Select = styled.select`
  font-family: "Roboto", sans-serif;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
  cursor: pointer;
  margin-bottom: 40px;
`;

//=================================================

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
`;

const MainContent = styled.div`
  margin-top: 80px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
