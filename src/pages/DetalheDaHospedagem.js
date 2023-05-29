import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function DetalhesDaHospedagem() {
  const { id } = useParams();

  const [lodging, setLodging] = useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/lodgings/${id}`)
      .then((res) => {
        console.log(res.data);
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
          {lodging !== undefined ? (
            <SubContents>
              <h1>{lodging?.name}</h1>
              <Photos>
                <img src={lodging?.mainPhoto} alt={lodging?.name} />
              </Photos>
              <ShowPhotos onClick={openModal}>
                <p>Clique aqui para ver todas as fotos</p>
              </ShowPhotos>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
              >
                <ModalContents>
                  <Modalheader>
                    <button onClick={closeModal}>X</button>
                  </Modalheader>
                  <ModalPhotos>
                    <img src={lodging?.mainPhoto} alt={lodging?.name} />
                    {lodging?.photos.map((lodging) => (
                      <img
                        key={lodging.photoId}
                        src={lodging.url}
                        alt={lodging.name}
                      />
                    ))}
                  </ModalPhotos>
                </ModalContents>
              </Modal>
              <Information>
                <Caracteristicas>
                  <h2>Características</h2>
                  <p>● Local: {lodging?.cityName}</p>
                  <p>● Preço: R$ {lodging?.price}</p>
                  <p>● Descrição: {lodging?.description}</p>
                </Caracteristicas>
                <Comodidades>
                  <h2>Comodidades</h2>
                  {lodging?.commodities.length !== 0 ? (
                    lodging?.commodities.map((commodity) => (
                      <p key={commodity.commodityId}>
                        ● {commodity.commodityName}
                      </p>
                    ))
                  ) : (
                    <p>● N/A</p>
                  )}
                </Comodidades>
              </Information>
            </SubContents>
          ) : (
            <Nenhuma>Hospedagem não encontrada</Nenhuma>
          )}
        </MainContent>
      </HomeContainer>
    </>
  );
}

const ModalPhotos = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  img {
    width: 120px;
    background-color: #F3BCC8;
    padding: 10px;
    border-radius: 15px;
  }
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const Modalheader = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    border: none;
    border-radius: 5px;
    padding: 5px;
    background-color: red;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

const ShowPhotos = styled.div`
  margin-bottom: 5px;
  color: #e893cf;
  p {
    font-family: "Lexend Deca", sans-serif;
    font-weight: bold;
  }
`;

const SubContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Caracteristicas = styled.div`
  background-color: #98eecc;
  padding: 20px;
  border-radius: 10px;
  h2 {
    font-family: "Roboto", sans-serif;
    text-align: center;
    margin-bottom: 5px;
    font-weight: bold;
  }
  p {
    font-family: "Roboto", sans-serif;
  }
`;

const Comodidades = styled.div`
  background-color: #d0f5be;
  padding: 20px;
  border-radius: 10px;
  h2 {
    font-family: "Roboto", sans-serif;
    text-align: center;
    margin-bottom: 5px;
    font-weight: bold;
  }
  p {
    font-family: "Roboto", sans-serif;
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Photos = styled.div`
  background-color: #79e0ee;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
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
