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

interface Contrato {
  IDCONTRATO: number;
  NMRAZAOSOCIAL: string;
  NRCONTRATO: number;
  NRCONTRATOANOCONTRATO: string;
  NRANO: number;
  DTCONTRATO: Date;
  CDORGAO: number;
  NMORGAO: string;
  CONTRATADO: string;
  VLCONTRATO: string;
  ANOLICITACAO: number;
  DSMODALIDADE: string;
  NUMEROLICITACAO: number;
  DSOBJETO: string;
  VALORADITIVO: number;
  VALORTOTAL: number;
  TIPOCONTRATO: string;
  SITUACAO: string;
}

interface PathProps {
  title: string;
  path: string;
}

interface Aditivos {
  IdContrato: number;
  nmTipoAtoContratual: string;
  nrAditivo: number;
  dsTipoAditivo: Date;
  dtTermo: Date;
  DataAto: Date;
  NovoTermino: string;
  Valor: number;
  dsMotivo: string;
}

interface Fiscalizacao {
  nrCNPJCPF: string;
  nmPessoa: string;
  dsTipoParteContrato: string;
  dtInicio: Date;
  dtFim: Date;
}

interface Anexos {
  mAnexo: string;
  bnObjeto: string;
  dsExtencao: string;
  dsObjeto: string;
}

const ContratoDetalhe: React.FC = () => {
  const [lastPath, setLastPath] = useState<PathProps[]>([]);
  const [aditivos, setAditivos] = useState<Aditivos[]>([]);
  const [fiscalizacao, setFiscalizacao] = useState<Fiscalizacao[]>([]);
  const [anexos, setAnexos] = useState<Anexos[]>([]);
  const [contrato, setContrato] = useState<Contrato>();

  const location = useLocation();
  const params = useParams();

  function formataData(value: Date) {
    return format(new Date(value), "dd/MM/yyyy", {
      locale: ptBR,
    });
  }

  useEffect(() => {
    async function loadContrato() {
      const { pathname, state } = location;
      console.log(pathname);
      console.log(state);
      const title = state.data.CONTRATADO as string;

      api
        .post(`portal/executarapi`, {
          idapi: 13,
          parametros: [
            {
              key: "@idcontrato",
              value: state.data.IDCONTRATO,
            },
          ],
        })
        .then(response => {
          setAditivos(response.data.data);
        });

      api
        .post(`portal/executarapi`, {
          idapi: 23,
          parametros: [
            {
              key: "@idcontrato",
              value: state.data.IDCONTRATO,
            },
          ],
        })
        .then(response => {
          setFiscalizacao(response.data.data);
        });

      api
        .post(`portal/executarapi`, {
          idapi: 22,
          parametros: [
            {
              key: "@idcontrato",
              value: state.data.IDCONTRATO,
            },
          ],
        })
        .then(response => {
          setAnexos(response.data.data);
        });

      const path = [] as PathProps[];

      path.push({
        title,
        path: pathname,
      });

      setContrato(state.data);
      setLastPath(path);
    }
    loadContrato();
  }, [params, location]);

  const headers = [
    {
      label: "Tipo Ato",
      value: "nmTipoAtoContratual",
    },
    {
      label: "N° aditivo",
      value: "nrAditivo",
    },
    {
      label: "Tipo de aditivo",
      value: "dsTipoAditivo",
    },
    {
      label: "Data do termo",
      value: "dtTermo",
      type: "date",
    },
    {
      label: "Data do ato",
      value: "DataAto",
      type: "date",
    },
    {
      label: "Termino",
      value: "NovoTermino",
      type: "date",
    },
    {
      label: "Valor",
      value: "Valor",
      type: "currency",
    },
    {
      label: "Motivo",
      value: "dsMotivo",
    },
  ] as HeaderProps[];

  const headersDois = [
    {
      label: "Anexo",
      value: "nmAnexo",
    },
    {
      label: "Objeto",
      value: "dsObjeto",
    },
  ] as HeaderProps[];

  const headersTres = [
    {
      label: "CPF/CNPJ",
      value: "nrCNPJCPF",
    },
    {
      label: "Pessoa",
      value: "nmPessoa",
    },
    {
      label: "Parte do contrato",
      value: "dsTipoParteContrato",
    },
    {
      label: "Data de início",
      value: "dtInicio",
      type: "date",
    },
    {
      label: "Data de fim",
      value: "dtFim",
      type: "date",
    },
  ] as HeaderProps[];

  if (contrato) {
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
                      <b>Razão social: </b>
                      {contrato.NMRAZAOSOCIAL}
                    </td>
                    <td>
                      <b>N° contrato: </b>
                      {contrato.NRCONTRATO}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Ano do contrato: </b>
                      {contrato.NRANO}
                    </td>
                    <td>
                      <b>Data do contrato: </b>
                      {formataData(contrato.DTCONTRATO)}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>N° Licitação: </b>
                      {contrato.NUMEROLICITACAO}
                    </td>
                    <td>
                      <b>Órgão: </b>
                      {contrato.NMORGAO}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Contratado: </b>
                      {contrato.CONTRATADO}
                    </td>
                    <td>
                      <b>Valor: </b>
                      {formatValue(parseFloat(contrato.VLCONTRATO))}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Tipo de contrato: </b>
                      {contrato.TIPOCONTRATO}
                    </td>
                    <td>
                      <b>Valor aditivo: </b>
                      {formatValue(contrato.VALORADITIVO)}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Situação: </b>
                      {contrato.SITUACAO}
                    </td>
                    <td>
                      <b>Valor total: </b>
                      {formatValue(contrato.VALORTOTAL)}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Ano licitado: </b>
                      {contrato.ANOLICITACAO}
                    </td>
                    <td>
                      <b>Modalidades: </b>
                      {contrato.DSMODALIDADE}
                    </td>
                  </Line>
                  <Line>
                    <td colSpan={2}>
                      <b>OBJETO: </b>
                      {contrato.DSOBJETO}
                    </td>
                  </Line>
                </tbody>
              </ContainerDetalhe>
            </ContainerBlue>
            <h1>ADITIVOS:</h1>
            {aditivos.length > 0 && (
              <NewTable
                data={aditivos}
                header={headers}
                pagination
                maxItemsPerPage={20}
              />
            )}
            {aditivos.length === 0 && <p>Não há aditivos</p>}
            <br />
            <h1>FISCALIZAÇÃO DO CONTRATO:</h1>

            {fiscalizacao.length > 0 && (
              <NewTable
                data={fiscalizacao}
                header={headersTres}
                pagination
                maxItemsPerPage={20}
              />
            )}
            {fiscalizacao.length === 0 && (
              <p>Não há fiscalizações no contrato</p>
            )}

            <br />
            <h1>ANEXOS:</h1>

            {anexos.length > 0 && (
              <NewTable
                data={anexos}
                header={headersDois}
                pagination
                maxItemsPerPage={20}
                isDownload
                formatFile="dsExtencao"
                nameFile="nmAnexo"
                typeDownload="base64"
                stringDownload="bnObjeto"
              />
            )}
            {anexos.length === 0 && <p>Não há anexos</p>}
          </Content>
        </Body>

        <Footer />
      </Container>
    );
  }
  return <LoaderPage loading />;
};

export default ContratoDetalhe;
