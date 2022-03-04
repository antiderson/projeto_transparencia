/* eslint-disable react/no-unescaped-entities */
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
import ItemLink from "../../../components/ItemLink";

/*
interface LinkListProps {
  id: number;
  nome: string;
  link: string;
}

*/
interface Ano {
  id: number;
  ano: number;
  pareceres: Pareceres[];
}

interface Pareceres {
  id: number;
  titulo: string;
  link: string;
  link_arquivo: string;
}

const ParecerTCE: React.FC = () => {
  const [ano, setAno] = useState<Ano[]>([]);

  useEffect(() => {
    async function loadAno() {
      const res = await axios.get(
        `https://sistemas.pmfi.pr.gov.br/RP/PORTALTRANSPARENCIAAPI/portal/ListarAnosParecerTCE`,
        {},
      );
      let arrayP = [];
      let pareceresP = [];
      res.data.AnoList.forEach(async (item: Ano, index: number) => {
        arrayP = res.data.AnoList;
        pareceresP = await loadPareceres(item.ano);
        arrayP[index].pareceres = pareceresP;

        setAno(arrayP);
      });
    }

    async function loadPareceres(anoNew: number) {
      const res = await axios.get(
        `https://sistemas.pmfi.pr.gov.br/RP/PORTALTRANSPARENCIAAPI/portal/ListarPareceresTCE`,
        {
          params: {
            ano: anoNew,
          },
        },
      );
      return res.data.ParecerList;
    }

    loadAno();
  }, []);

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />

        <Content>
          <ContainerBlue>
            <Title>Pareceres TCE</Title>
            {ano.map(item => (
              <>
                <ItemText
                  text={`Parecer Previo das Contas do ano de ${item.ano.toString()}`}
                />

                {item.pareceres.map(parecer => (
                  <ItemDownload
                    subItem={2}
                    text={parecer.titulo}
                    link={parecer.link_arquivo}
                  />
                ))}
              </>
            ))}
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default ParecerTCE;
