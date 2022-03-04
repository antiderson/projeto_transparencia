import React from "react";

import { Container, Content, Title } from "./styles";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";

const RegistroSobra: React.FC = () => {
  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerBlue>
            <Title>REGISTRO DE SOBRA IDENTIFICADA</Title>
            <br />
            <br />
            <p>
              No final do expediente no serviço de saúde, se houver frasco de
              vacina aberta, para que não haja desperdício de doses, as unidades
              estão orientadas a manter cadastro de usuários elencados nos
              grupos prioritários para vacinação para que essas doses sejam
              aplicadas nesse grupo.
            </p>
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default RegistroSobra;
