/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Container, Content, Title } from "./styles";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import HtmlContainer from "../../../components/HtmlContainer";
import ItemLink from "../../../components/ItemLink";
import ItemDownload from "../../../components/ItemDownload";
import sortArray from "../../../utils/sortArray";
import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";

interface PlanoProps {
  data_inclusao?: string;
  extensao: string;
  id: number;
  id_publicacao: number;
  nome: string;
  nrordenamento: number;
}

const EscalasmedicasUPAWalterCavalcantiBarbosa: React.FC = () => {
  const [planos, setPlanos] = useState<PlanoProps[]>([]);

  useEffect(() => {
    async function loadPas() {
      const res = await axios.get(
        `https://sistemas.pmfi.pr.gov.br/RP/SMTIAPI/ApiSite/Prefeitura/ListarArquivosPublicacao`,
        {
          params: {
            id_publicacao: 367,
          },
        },
      );

      setPlanos(sortArray(res.data.ArqPublicacaoList, "nrordenamento"));
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
            <Title>Escalas Médicas UPA Walter Cavalcanti Barbosa</Title>
            {planos.map(plan => (
              <ItemDownload
                key={plan.id}
                link={`https://www5.pmfi.pr.gov.br/pdf-${plan.id}&publicacao`}
                text={plan.nome}
              />
            ))}
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default EscalasmedicasUPAWalterCavalcantiBarbosa;
