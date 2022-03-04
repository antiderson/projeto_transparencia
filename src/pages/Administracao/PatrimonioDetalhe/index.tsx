/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-template */
/* eslint-disable radix */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from "react";

import { useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios, { AxiosRequestConfig } from "axios";
import { Container, Content, ContainerDetalhe, Line } from "./styles";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import NewTable, { HeaderProps } from "../../../components/NewTable";
import ModalDetailPessoal from "../../../components/ModalDetailPessoal";

import LoaderPage from "../../../components/LoaderPage";
import api from "../../../services/api";
import formatValue from "../../../utils/formatValue";

interface PatrimoniosProps {
  idEmpresa: number;
  idBem: number;
  cdItem: number;
  dsItem: string;
  Detalhamento: string;
  dsTipoBem: string;
  dsBem: string;
  dtAquisicao: Date;
  dtIncorporacao: Date;
  idServidor: number;
  nmServidor: string;
  nrMatricula: number;
  idUnidade: number;
  nmUnidade: string;
  nrPlaqueta: number;
  nmLocalFisico: string;
  vlBem: number;
}

interface PathProps {
  title: string;
  path: string;
}

const LicitacoesDetalhes: React.FC = () => {
  const [lastPath, setLastPath] = useState<PathProps[]>([]);
  const [patrimonio, setPatrimonio] = useState<PatrimoniosProps>();

  const location = useLocation();
  const params = useParams();

  function formataData(value: Date) {
    return format(new Date(value), "dd/MM/yyyy", {
      locale: ptBR,
    });
  }

  useEffect(() => {
    async function load() {
      const { pathname, state } = location;
      const title = state.data.dsBem as string;
      const path = [] as PathProps[];

      path.push({
        title,
        path: pathname,
      });
      setPatrimonio(state.data);
      setLastPath(path);
    }
    load();
  }, [params, location]);

  if (patrimonio) {
    return (
      <Container>
        <Header />
        <SubHeader />
        <Body>
          <Path lastPath={lastPath} />
          <Content>
            <ContainerBlue>
              <ContainerDetalhe>
                <tbody>
                  <Line>
                    <td>
                      <b>Número da plaqueta: </b>
                      {patrimonio.nrPlaqueta}
                    </td>
                    <td>
                      <b>Item: </b>
                      {patrimonio.dsItem}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Tipo de bem: </b>
                      {patrimonio.dsTipoBem}
                    </td>
                    <td>
                      <b>Bem: </b>
                      {patrimonio.dsBem}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Data de aquisição: </b>
                      {patrimonio.dtAquisicao}
                    </td>
                    <td>
                      <b>Data de incorporação: </b>
                      {patrimonio.dtIncorporacao}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Servidor: </b>
                      {patrimonio.nmServidor}
                    </td>
                    <td>
                      <b>Matrícula: </b>
                      {patrimonio.nrMatricula}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Unidade: </b>
                      {patrimonio.nmUnidade}
                    </td>
                    <td>
                      <b>Valor do bem: </b>
                      {patrimonio.vlBem}
                    </td>
                  </Line>
                  <Line>
                    <td colSpan={2}>
                      <b>Local físcio: </b>
                      {patrimonio.nmLocalFisico}
                    </td>
                  </Line>
                  <Line>
                    <td colSpan={2}>
                      <b>Detalhamento: </b>
                      {patrimonio.Detalhamento}
                    </td>
                  </Line>
                </tbody>
              </ContainerDetalhe>
            </ContainerBlue>
          </Content>
        </Body>

        <Footer />
      </Container>
    );
  }
  return <LoaderPage loading />;
};

export default LicitacoesDetalhes;
