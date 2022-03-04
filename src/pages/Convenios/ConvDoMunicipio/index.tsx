import React from "react";

import { Container, Content } from "./styles";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";

const ConvDoMunicipio: React.FC = () => {
  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content />
      </Body>

      <Footer />
    </Container>
  );
};

export default ConvDoMunicipio;
