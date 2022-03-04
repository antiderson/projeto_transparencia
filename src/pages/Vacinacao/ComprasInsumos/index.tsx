import React from "react";

import { Container, Content, Title } from "./styles";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";

const ComprasInsumos: React.FC = () => {
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

export default ComprasInsumos;
