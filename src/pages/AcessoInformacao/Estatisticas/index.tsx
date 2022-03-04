import React from "react";
import { Container, Content } from "./styles";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import Grafico from "../../../components/Grafico";

const Estatisticas: React.FC = () => {
  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerBlue>
            <Grafico
              title="Atendimentos no ano 2021"
              chartType="BarChart"
              data={[
                ["Mês", "Pedidos", "Atendidos", "Indeferidos", "Cancelados"],
                ["Janeiro", 1000, 600, 200, 200],
                ["Fevereiro", 1170, 460, 250, 200],
                ["Março", 660, 1120, 300, 200],
                ["Abril", 1030, 540, 350, 200],
              ]}
            />
            <Grafico
              title="Mês atual"
              chartType="PieChart"
              data={[
                ["Situação", "Total"],
                ["Finalizados", 11],
                ["Em andamento", 2],
                ["Indeferido", 2],
              ]}
            />
          </ContainerBlue>
        </Content>
      </Body>

      <Footer />
    </Container>
  );
};

export default Estatisticas;
