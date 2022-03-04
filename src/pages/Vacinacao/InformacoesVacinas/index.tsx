/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Body from "../../../components/Body";
import ContainerBlue from "../../../components/ContainerBlue";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HtmlContainer from "../../../components/HtmlContainer";
import Path from "../../../components/Path";
import SubHeader from "../../../components/SubHeader";
import { Container, Content, Title } from "./styles";

interface InformacaoProps {
  id: number;
  titulo: string;
  texto: string;
}

const InfoVacina: React.FC = () => {
  const [Informacoes, setInformacoes] = useState<InformacaoProps[]>([]);

  useEffect(() => {
    async function loadPas() {
      const res = await axios.get(
        `https://sistemas.pmfi.pr.gov.br/RP/SMTIAPI/ApiSite/Prefeitura/InfoDadosPublicacao?id_publicacao=549`,
      );

      setInformacoes(res.data.PublicacaoList);
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
            <Title>Informações sobre a vacina</Title>
            <br />
            <br />
            {Informacoes.map(info => (
              <HtmlContainer key={info.id} txtHtml={info.texto} />
            ))}
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default InfoVacina;
