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

const DosesRecebidas: React.FC = () => {
  const [Recebidas, setRecebida] = useState<string>("");

  useEffect(() => {
    async function loadPas() {
      const res = await axios.get(
        `https://sistemas.pmfi.pr.gov.br/RP/SMTIAPI/ApiSite/Vacina/LinksVacinaTransparencia`,
      );
      setRecebida(res.data.links.link_doses_recebidas);
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
            <Title>Doses Recebidas</Title>

            <IframeContainer url={Recebidas} />
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default DosesRecebidas;
