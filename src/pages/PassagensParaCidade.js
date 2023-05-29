import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-input-slider";

export default function PassagensParaCidade() {
  const { id } = useParams();

  const [city, setCity] = useState("");
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cities/${id}/flights`)
      .then((res) => {
        setCity(res.data);
        setFlights(res.data.flights);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  useEffect(() => {
    if (flights.length > 0) {
      flightFilter();
    }
  }, [minPrice, maxPrice, flights]);

  const flightFilter = () => {
    const filter = flights.filter((flight) => {
      return flight.price >= minPrice && flight.price <= maxPrice;
    });
    setFilteredFlights(filter);
  };

  const selectFlight = (id) => {
    navigate(`/passagens/${id}`);
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
            <h1>Passagens para {city?.name}</h1>
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
          <Flights>
            {filteredFlights.map((flight) => (
              <div key={flight.id} onClick={() => selectFlight(flight.id)}>
                <img src={city?.photo} alt={city?.name} />
                <p>Horário de saída: {flight.departureDate}</p>
                <p>Horário de chegada: {flight.arrivalDate}</p>
                <p>Preço: R$ {flight.price}</p>
                <p>Local de partida: {flight.destination}</p>
              </div>
            ))}
          </Flights>
        </MainContent>
      </HomeContainer>
    </>
  );
}

const Filters = styled.div``;

const Filter = styled.div``;

const Flights = styled.div``;

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
