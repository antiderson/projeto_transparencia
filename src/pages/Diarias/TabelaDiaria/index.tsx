import React from "react";

import { Container, Content } from "./styles";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import NewTable from "../../../components/NewTable";
import ItemLink from "../../../components/ItemLink";

const TabelaDiaria: React.FC = () => {
  const headerTable = [
    {
      label: "Grupo",
      value: "group",
    },
    {
      label: "Valor (R$) Por Pernoite",
      value: "value",
    },
  ];

  const data = [
    {
      group: "Prefeito Exemplo",
      value: "1000,00",
    },
    {
      group: "Prefeito Exemplo",
      value: "1000,00",
    },
    {
      group: "Prefeito Exemplo",
      value: "1000,00",
    },
    {
      group: "Prefeito Exemplo",
      value: "1000,00",
    },
    {
      group: "Prefeito Exemplo",
      value: "1000,00",
    },
  ];

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerBlue>
            <NewTable
              exportFile="all"
              title="Diária"
              data={data}
              header={headerTable}
            />
            <ItemLink link="link" text="Lei 0000 - Nome da Lei" />
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default TabelaDiaria;
