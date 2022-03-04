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

interface LinkListProps {
  id: number;
  nome: string;
  link: string;
}

interface DownloadListProps {
  id: number;
  nome: string;
  link_arquivo: string;
}

interface Passagem {
  id: number;
  html: string;
  LinkList: LinkListProps[];
  ArquivoList: DownloadListProps[];
}

const TabelaPassagem: React.FC = () => {
  const [pas, setPas] = useState<Passagem[]>([
    { id: 0, html: "", LinkList: [], ArquivoList: [] },
  ]);

  useEffect(() => {
    async function loadPas() {
      const res = await axios.get(
        `https://sistemas.pmfi.pr.gov.br/RP/PORTALTRANSPARENCIAAPI/portal/ListarDadosPublicacao`,
        {
          params: {
            id: 2,
          },
        },
      );

      setPas(res.data.dados);
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
            {pas.map(item => (
              <HtmlContainer txtHtml={item.html} />
            ))}
            <br />
            <br />

            {pas[0].LinkList.length > 0 && (
              <Container>
                <Title>Link's</Title>
                {pas.map(item =>
                  item.LinkList.map(link => (
                    <ItemLink text={link.nome} link={link.link} />
                  )),
                )}
              </Container>
            )}

            <br />
            <br />
            {pas[0].ArquivoList.length > 0 && (
              <Container>
                <Title>Arquivos</Title>
                {pas.map(item =>
                  item.ArquivoList.map(link => (
                    <ItemLink text={link.nome} link={link.link_arquivo} />
                  )),
                )}
              </Container>
            )}
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default TabelaPassagem;
function setPassagem(dados: any) {
  throw new Error("Function not implemented.");
}
