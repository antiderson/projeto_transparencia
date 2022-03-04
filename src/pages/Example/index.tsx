/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import Body from "../../components/Body";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Path from "../../components/Path";
import SubHeader from "../../components/SubHeader";
import { Container, Content } from "./styles";

const Example: React.FC = () => {
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

export default Example;
