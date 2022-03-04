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

const Vacinometro: React.FC = () => {
  const [linkVacinometro, setLinkVacinometro] = useState<string>("");

  useEffect(() => {
    async function loadPas() {
      const res = await axios.get(
        `https://sistemas.pmfi.pr.gov.br/RP/SMTIAPI/ApiSite/Vacina/LinksVacinaTransparencia`,
      );

      setLinkVacinometro(res.data.links.link_vacinometro);
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
            <Title>Vacinômetro</Title>

            <IframeContainer url={linkVacinometro} />
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default Vacinometro;
