import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function DetalhesDaHospedagem() {
  const { id } = useParams();

  const [lodging, setLodging] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/lodgings/${id}`)
      .then((res) => {
        setLodging(res.data);
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
          <h1>{lodging?.name}</h1>
          <div>
            <img src={lodging?.mainPhoto} alt={lodging?.name} />
            {lodging?.photos.map((lodging) => (
              <img key={lodging.photoId} src={lodging.url} alt={lodging.name} />
            ))}
          </div>
          <div>
            <div>
              <h2>Características:</h2>
              <p>●Local: {lodging?.cityName}</p>
              <p>●Preço: R$ {lodging?.price}</p>
              <p>●Descrição: {lodging?.description}</p>
            </div>
            <div>
              <h2>Comodidades:</h2>
              {lodging?.commodities.map((commodity) => (
                <p key={commodity.commodityId}>●{commodity.commodityName}</p>
              ))}
            </div>
          </div>
        </MainContent>
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #79E0EE;
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
