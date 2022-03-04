import React, { useEffect, useState } from "react";

import axios from "axios";
import { Container, Content, Title } from "./styles";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import ItemText from "../../../components/ItemText";

import ItemDownload from "../../../components/ItemDownload";
import HtmlContainer from "../../../components/HtmlContainer";

interface Publicacao {
  id: number;
  texto: string;
}

const SIC: React.FC = () => {
  const [pub, setPub] = useState<Publicacao[]>([]);

  useEffect(() => {
    async function loadPub() {
      const res = await axios.get(
        `https://rptreinamentos.pmfi.pr.gov.br/RP/SMTIAPI/ApiSite/Prefeitura/InfoDadosPublicacao`,
        {
          params: {
            id_publicacao: 413,
          },
        },
      );
      setPub(res.data.PublicacaoList);
    }

    loadPub();
  }, []);

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />

        <Content>
          {pub.map(item => (
            <HtmlContainer txtHtml={item.texto} />
          ))}
        </Content>
      </Body>

      <Footer />
    </Container>
  );
};

export default SIC;
