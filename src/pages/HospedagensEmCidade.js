/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-input-slider";

export default function HospedagensEmCidade() {
  const { id } = useParams();

  const [city, setCity] = useState("");
  const [lodgings, setLodgings] = useState([]);
  const [filteredLodgings, setFilteredLodgings] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cities/${id}/lodgings`)
      .then((res) => {
        setCity(res.data);
        setLodgings(res.data.lodgings);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  useEffect(() => {
    if (lodgings.length > 0) {
      lodgingFilter();
    }
  }, [minPrice, maxPrice, lodgings]);

  const lodgingFilter = () => {
    const filter = lodgings.filter((lodging) => {
      return lodging.price >= minPrice && lodging.price <= maxPrice;
    });
    setFilteredLodgings(filter);
  };

  const selectLodging = (id) => {
    navigate(`/hospedagens/${id}`);
  };

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
          <div>
            <h1>Hospedagens em {city.name ? city.name : "cidade"}</h1>
          </div>
          <Filters>
            <Filter>
              <p>Preço mínimo (R$):</p>
              <Slider
                axis="x"
                x={minPrice}
                xmin={0}
                xmax={1000}
                onChange={({ x }) => setMinPrice(x)}
              />
            </Filter>
            <Filter>
              <p>Preço máximo (R$):</p>
              <Slider
                axis="x"
                x={maxPrice}
                xmin={0}
                xmax={1000}
                onChange={({ x }) => setMaxPrice(x)}
              />
            </Filter>
          </Filters>
          <Lodgings>
            {filteredLodgings.length > 0 ? filteredLodgings.map((lodging) => (
              <Lodging key={lodging.id} onClick={() => selectLodging(lodging.id)}>
                  <img src={lodging?.mainPhoto} alt={lodging?.name} />
                  <p>Nome: {lodging.name}</p>
                  <p>Preço: R$ {lodging.price}</p>
              </Lodging>
            )) : <Nenhuma>Nenhuma hospedagem encontrada para {city.name ? city.name : "cidade"}</Nenhuma>}
          </Lodgings>
        </MainContent>
      </HomeContainer>
    </>
  );
}

const Nenhuma = styled.p`
  color: #00c4ff;
  font-family: "Lexend Deca", sans-serif;
`;

const Filters = styled.div`
  background-color: #98eecc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  gap: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const Filter = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
  p {
    font-family: "Lexend Deca", sans-serif;
    color: #00c4ff;
  }
`;

const Lodgings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 20px;
`;

const Lodging = styled.div`
  background-color: #30A2FF;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    color: white;
    margin-top: 5px;
    font-family: "Lexend Deca", sans-serif;
  }
`;

//=================================================

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
  div {
    h1 {
      font-family: "Lexend Deca", sans-serif;
      font-weight: bold;
      font-size: 20px;
      color: #30a2ff;
      margin-bottom: 20px;
    }
  }
`;
