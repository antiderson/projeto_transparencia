import React from "react";

import { Container, Content, Title } from "./styles";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import Footer from "../../../components/Footer";
import SubHeader from "../../../components/SubHeader";
import Header from "../../../components/Header";

const ComprasVacina: React.FC = () => {
  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerBlue>
            <Title>COMPRAS DE INSUMOS</Title>
            <br />
            <br />
            <p>
              ATÉ A PRESENTE DATA, O PODER EXECUTIVO MUNICIPAL NÃO REALIZOU
              PROCESSOS DE AQUISIÇÃO DE INSUMOS
            </p>
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default ComprasVacina;
