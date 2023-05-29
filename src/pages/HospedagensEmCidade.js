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
            <h1>Hospedagens em {city?.name}</h1>
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
            {filteredLodgings.map((lodging) => (
              <div key={lodging.id} onClick={() => selectLodging(lodging.id)}>
                  <img src={lodging?.mainPhoto} alt={lodging?.name} />
                  <p>Nome: {lodging.name}</p>
                  <p>Preço: R$ {lodging.price}</p>
              </div>
            ))}
          </Lodgings>
        </MainContent>
      </HomeContainer>
    </>
  );
}

const Filters = styled.div``;

const Filter = styled.div``;

const Lodgings = styled.div``;

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
