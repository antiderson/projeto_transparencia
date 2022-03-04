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
import Despesas from "../Despesas";
import formatValue from "../../../utils/formatValue";
import Tabs from "../../../components/Tabs";
import ItemLink from "../../../components/ItemLink";

interface DespesasProps {
  idEmpenho: number;
  idempresa: number;
  nrempenho: number;
  nrano: number;
  Orgao: string;
  dtEmpenho: Date;
  Fornecedor: string;
  Funcional: string;
  ProjAtiv: string;
  NaturezaDespesa: string;
  Fonte: string;
  Modalidade: string;
  vlempenho: string;
  vlAnulado: string;
  vlConsignado: string;
  vlPago: string;
  vlSaldopagar: string;
  idModalidade: number;
  cdOrgao: number;
  NEMPENHOANO: string;
  data_hora_atual: Date;
  LinkEmpenho: string;
}

interface PathProps {
  title: string;
  path: string;
}

interface MovimentacoesProps {
  Mov: string;
  dtLiquidacao: Date;
  dsHistorico: string;
  vlLiquidacao: number;
}

interface ItensProps {
  dsItem: string;
  nrQtde: number;
  vlTotal: number;
  nrLote: number;
}

interface AnexosProps {
  nmAnexo: string;
  dsExtencao: string;
  bnObjeto: string;
}

const DespesasDetalhe: React.FC = () => {
  const [lastPath, setLastPath] = useState<PathProps[]>([]);
  const [despesa, setDespesa] = useState<DespesasProps>();
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [movimentacoes, setMovimentacoes] = useState<MovimentacoesProps[]>([]);
  const [itens, setItens] = useState<ItensProps[]>([]);
  const [anexos, setAnexos] = useState<AnexosProps[]>([]);

  const location = useLocation();
  const params = useParams();

  function formataData(value: Date) {
    return format(new Date(value), "dd/MM/yyyy", {
      locale: ptBR,
    });
  }

  function handleTab(number: number) {
    setCurrentTab(number);
  }

  useEffect(() => {
    const { pathname, state } = location;
    const title =
      `Empenho ${state.data.nrempenho}/${state.data.nrano}` as string;

    const path = [] as PathProps[];

    path.push({
      title,
      path: pathname,
    });

    setDespesa(state.data);
    setLastPath(path);

    api
      .post(`portal/executarapi`, {
        idapi: 38,
        parametros: [
          {
            key: "@idempenho",
            value: state.data.idEmpenho,
          },
        ],
      })
      .then(response => {
        // console.log(response);
        setMovimentacoes(response.data.data);
      });

    api
      .post(`portal/executarapi`, {
        idapi: 39,
        parametros: [
          {
            key: "@idempenho",
            value: state.data.idEmpenho,
          },
        ],
      })
      .then(response => {
        // console.log(response);
        setItens(response.data.data);
      });

    api
      .post(`portal/executarapi`, {
        idapi: 40,
        parametros: [
          {
            key: "@idempenho",
            value: state.data.idEmpenho,
          },
        ],
      })
      .then(response => {
        // console.log(response);
        setAnexos(response.data.data);
      });
  }, [params, location]);

  const headersMovimentacoes = [
    {
      label: "Movimentação",
      value: "Mov",
    },
    {
      label: "Data da liquidação",
      value: "dtLiquidacao",
      containerStyle: { textAlign: "center" },
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Histórico",
      value: "dsHistorico",
      containerStyle: { textAlign: "center" },
    },
    {
      label: "Valor da liquidação",
      value: "vlLiquidacao",
      containerStyle: { textAlign: "center" },
      sortable: true,
      type: "currency",
    },
  ] as HeaderProps[];

  const headersItens = [
    {
      label: "Item",
      value: "dsItem",
    },
    {
      label: "Quantidade",
      value: "nrQtde",
    },
    {
      label: "Valor total",
      value: "vlTotal",
      sortable: true,
      type: "currency",
    },
    {
      label: "Lote",
      value: "nrLote",
    },
  ] as HeaderProps[];

  const headersAnexos = [
    {
      label: "Anexo",
      value: "nmAnexo",
    },
  ] as HeaderProps[];

  if (despesa) {
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
                      <b>N° empenho: </b>
                      {despesa.nrempenho}
                    </td>
                    <td>
                      <b>Ano: </b>
                      {despesa.nrano}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Data do empenho: </b>
                      {formataData(despesa.dtEmpenho)}
                    </td>
                    <td>
                      <b>Saldo a pagar: </b>
                      {despesa.vlSaldopagar}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Funcional: </b>
                      {despesa.Funcional}
                    </td>
                    <td>
                      <b>Valor do empenho: </b>
                      {formatValue(parseFloat(despesa.vlempenho))}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Fonte: </b>
                      {despesa.Fonte}
                    </td>
                    <td>
                      <b>Valor anulado: </b>
                      {formatValue(parseFloat(despesa.vlAnulado))}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Fonecedor: </b>
                      {despesa.Fornecedor}
                    </td>
                    <td>
                      <b>Valor do consignado: </b>
                      {formatValue(parseFloat(despesa.vlConsignado))}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Modalidade: </b>
                      {despesa.Modalidade}
                    </td>
                    <td>
                      <b>Valor pago: </b>
                      {formatValue(parseFloat(despesa.vlPago))}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Natureza da despesa: </b>
                      {despesa.NaturezaDespesa}
                    </td>
                    <td>
                      <b>
                        Empenho:{" "}
                        <ItemLink
                          text="Clique aqui"
                          link={despesa.LinkEmpenho}
                        />
                      </b>
                    </td>
                  </Line>
                  <Line>
                    <td colSpan={2}>
                      <b>Pojeto ativo: </b>
                      {despesa.ProjAtiv}
                    </td>
                  </Line>
                </tbody>
              </ContainerDetalhe>
            </ContainerBlue>

            <ContainerBlue>
              <Tabs
                currentTab={currentTab}
                setCurrentTab={handleTab}
                header={[
                  { title: "Movimentações", id: 0 },
                  { title: "Itens", id: 1 },
                  { title: "Anexos", id: 2 },
                ]}
              >
                {currentTab === 0 && movimentacoes.length > 0 && (
                  <NewTable
                    data={movimentacoes}
                    header={headersMovimentacoes}
                    pagination
                    maxItemsPerPage={20}
                  />
                )}
                {currentTab === 0 && movimentacoes.length === 0 && (
                  <p>Não há movimentações</p>
                )}
                {currentTab === 1 && itens.length > 0 && (
                  <NewTable
                    data={itens}
                    header={headersItens}
                    pagination
                    maxItemsPerPage={20}
                  />
                )}
                {currentTab === 1 && itens.length === 0 && <p>Não há itens</p>}
                {currentTab === 2 && anexos.length > 0 && (
                  <NewTable
                    data={anexos}
                    header={headersAnexos}
                    pagination
                    maxItemsPerPage={20}
                    isDownload
                    formatFile="dsExtencao"
                    nameFile="nmAnexo"
                    typeDownload="base64"
                    stringDownload="bnObjeto"
                  />
                )}
                {currentTab === 2 && anexos.length === 0 && (
                  <p>Não há anexos</p>
                )}
              </Tabs>
            </ContainerBlue>
          </Content>
        </Body>

        <Footer />
      </Container>
    );
  }

  return <LoaderPage loading />;
};

export default DespesasDetalhe;
