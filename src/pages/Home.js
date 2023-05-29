import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  const [cities, setCities] = useState([]);
  const [select, setSelect] = useState("");

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
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
          <h1>Viagens Alucinantes</h1>
        </Header>
        <MainContent>
          <Select value={select} onChange={handleSelect}>
            <option disabled value="">
              Selecione a cidade de destino
            </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Select>
          <Link to={select === "" ? `/` : `/cidades/${select}/passagens`}>
            <p>Passagens</p>
          </Link>
          <Link to={select === "" ? `/` :`/cidades/${select}/hospedagens`}>
            <p>Hospedagens</p>
          </Link>
        </MainContent>
      </HomeContainer>
    </>
  );
}

const Select = styled.select``;

//=================================================

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
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #00c4ff;
  h1 {
    margin-left: 20px;
  }
`;

const MainContent = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
