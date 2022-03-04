import React from "react";

import { Container, Content } from "./styles";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";

const Repasses: React.FC = () => {
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

export default Repasses;
