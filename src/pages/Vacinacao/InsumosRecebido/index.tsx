/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Container, Content, Title } from "./styles";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";

import IframeContainer from "../../../components/IframeContainer";
import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";

const InsumosRecebidos: React.FC = () => {
  const [insumo, setInsumo] = useState<string>("");

  useEffect(() => {
    async function loadPas() {
      const res = await axios.get(
        `https://sistemas.pmfi.pr.gov.br/RP/SMTIAPI/ApiSite/Vacina/LinksVacinaTransparencia`,
      );

      setInsumo(res.data.links.link_insumos_recebidos);
    }

    loadPas();
  }, []);

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerBlue>
            <Title>Insumos Recebidos</Title>

            <IframeContainer url={insumo} />
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default InsumosRecebidos;
