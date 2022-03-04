import React, { useEffect, useRef, useState } from "react";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { Container, Content, ContainerForm, LabelContainer } from "./styles";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerRetract from "../../../components/ContainerRetract";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import NewTable, { HeaderProps } from "../../../components/NewTable";

import api from "../../../services/api";
import DatePicker from "../../../components/DatePicker";

import LoaderPage from "../../../components/LoaderPage";
import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";

interface LicitacoesProps {
  dsModalidade: string;
  nrLicitacao: number;
  nrAno: number;
  dtEdital: Date;
  dsObjeto: string;
  dtAbertura: Date;
  dsHoraAbertura: string;
  dtJulgamento: Date;
  dsHoraJulgamento: string;
  vlMinimo: number;
  vlMaximo: number;
  idLicitacao: number;
  Natureza: string;
  ProcessoAdm: string;
  Situacao: string;
  ValorHomologado: string;
  RecursosImpugnacoes: string;
  nrLicitacaoAno: string;
  IdEmpresa: number;
  IdModalidade: number;
}

interface EntidadesProps {
  value: number;
  label: string;
}

interface ModalidadesProps {
  value: number;
  label: string;
}

const Licitacoes: React.FC = () => {
  const [results, setResults] = useState<LicitacoesProps[]>([]);
  const [entidades, setEntidades] = useState<EntidadesProps[]>([]);
  const [modalidades, setModalidades] = useState<ModalidadesProps[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtroidentidade, setFiltroIdEntidade] = useState(1);
  const [filtromodalidade, setFiltroModalidade] = useState(0);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    carregaEntidades();
    carregaModalidades();

    carregaLicitacoes();
  }, []);

  const formatar = (minhadata: string) => {
    const data = new Date(minhadata);
    const ano = data.getFullYear();
    const mes = `00${data.getMonth() + 1}`.slice(-2);
    const dia = `00${data.getDate()}`.slice(-2);

    return `${dia}/${mes}/${ano}`;
  };

  const carregaLicitacoes = async () => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 25,
        parametros: [
          {
            key: "@FILTROIDENTIDADE",
            value: filtroidentidade,
          },
          {
            key: "@FILTROIDMODALIDADE",
            value: filtromodalidade,
          },
          {
            key: "@FILTROOBJETO",
            value: formRef.current?.getFieldValue("objeto"),
          },
          {
            key: "@dsItem",
            value: formRef.current?.getFieldValue("dsItem"),
          },
          {
            key: "@FILTRODATADE",
            value:
              formRef.current?.getFieldValue("data_inicial") == null
                ? "01/01/1990"
                : formatar(formRef.current?.getFieldValue("data_inicial")),
          },
          {
            key: "@FILTRODATAATE",
            value:
              formRef.current?.getFieldValue("data_final") == null
                ? "01/01/2050"
                : formatar(formRef.current?.getFieldValue("data_final")),
          },
          {
            key: "@FILTROVALORDE",
            value:
              formRef.current?.getFieldValue("valorHomologadoDe") === ""
                ? "0"
                : formRef.current?.getFieldValue("valorHomologadoDe"),
          },
          {
            key: "@FILTROVALORATE",
            value:
              formRef.current?.getFieldValue("valorHomologadoAte") === ""
                ? 9999999999
                : formRef.current?.getFieldValue("valorHomologadoAte"),
          },
          {
            key: "@FILTROANOLICITACAO",
            value:
              formRef.current?.getFieldValue("ano_licitacao") === ""
                ? new Date().getFullYear()
                : formRef.current?.getFieldValue("ano_licitacao"),
          },
          {
            key: "@FILTRONLICITA",
            value: formRef.current?.getFieldValue("nLicitacaoFiltro"),
          },
        ],
      })
      .then(response => {
        // console.log(response);
        setResults(response.data.data);
        setLoading(false);
      });
  };

  const carregaEntidades = async () => {
    api
      .post(`portal/executarapi`, {
        idapi: 11,
        parametros: [],
      })
      .then(response => {
        setEntidades(response.data.data);
      });
    setFiltroIdEntidade(0);
  };

  const carregaModalidades = async () => {
    api
      .post(`portal/executarapi`, {
        idapi: 26,
        parametros: [],
      })
      .then(response => {
        setModalidades(response.data.data);
      });
    setFiltroIdEntidade(0);
  };

  const mudaEntidade = (dados: any) => {
    setFiltroIdEntidade(dados.value);
  };

  const mudaModalidade = (dados: any) => {
    setFiltroModalidade(dados.value);
  };

  const mudaNomeEmpresa = (dados: any) => {
    console.log(dados);
  };

  const headers = [
    {
      label: "Data de abertura",
      value: "dtAbertura",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Nº Licitação",
      value: "nrLicitacaoAno",
      sortable: true,
    },
    {
      label: "Modalidade",
      value: "dsModalidade",
      sortable: true,
    },
    {
      label: "Objeto",
      value: "dsObjeto",
      sortable: true,
    },
    {
      label: "Valor homologado",
      value: "ValorHomologado",
      sortable: true,
      type: "currency",
    },
    {
      label: "Valor máximo",
      value: "vlMaximo",
      sortable: true,
      type: "currency",
    },
    {
      label: "Natureza",
      value: "Natureza",
      sortable: true,
    },
    {
      label: "Processo administrativo",
      value: "ProcessoAdm",
      sortable: true,
    },
    {
      label: "Situação",
      value: "Situacao",
      sortable: true,
    },
    {
      label: "Recursos impugnações",
      value: "RecursosImpugnacoes",
      sortable: true,
    },
  ] as HeaderProps[];

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <LoaderPage loading={loading} />
          <ContainerRetract title="Buscar licitações">
            <Form ref={formRef} onSubmit={carregaLicitacoes}>
              <ContainerForm>
                <LabelContainer>
                  <p>Entidade:</p>

                  <Select
                    placeholder="Entidade"
                    name="filtroidentidade"
                    options={entidades}
                    onChange={mudaEntidade}
                  />
                </LabelContainer>

                <LabelContainer>
                  <p>Modalidade:</p>

                  <Select
                    placeholder="Modalidades"
                    name="filtroidmodalidade"
                    options={modalidades}
                    onChange={mudaModalidade}
                  />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Data da licitação de: </p>
                  <DatePicker
                    name="data_inicial"
                    placeholderText="Data da licitação de"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    dropdownMode="select"
                  />
                </LabelContainer>
                <LabelContainer>
                  <p>Data da licitação até: </p>
                  <DatePicker
                    name="data_final"
                    placeholderText="Data da licitação até"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    dropdownMode="select"
                  />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Ano da licitação:</p>
                  <Input
                    name="ano_licitacao"
                    placeholder="Ano da licitação"
                    defaultValue={new Date().getFullYear()}
                  />
                </LabelContainer>
                <LabelContainer>
                  <p>Número da licitação:</p>
                  <Input
                    name="nLicitacaoFiltro"
                    placeholder="Número da licitação"
                  />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Valor de:</p>
                  <Input name="valorHomologadoDe" placeholder="Valor de" />
                </LabelContainer>
                <LabelContainer>
                  <p>Valor até:</p>
                  <Input name="valorHomologadoAte" placeholder="Valor até" />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Objeto:</p>
                  <Input
                    name="objeto"
                    placeholder="Obejto"
                    onChange={mudaNomeEmpresa}
                  />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Item:</p>
                  <Input
                    name="dsItem"
                    placeholder="Item"
                    onChange={mudaNomeEmpresa}
                  />
                </LabelContainer>
              </ContainerForm>
              <Button type="submit">Consultar</Button>
            </Form>
          </ContainerRetract>

          <NewTable
            data={results}
            header={headers}
            exportFile="all"
            pagination
            maxItemsPerPage={50}
            lastUpdate={lastUpdate}
            isSelected
            path="detalhe/:idLicitacao"
          />
        </Content>
      </Body>

      <Footer />
    </Container>
  );
};

export default Licitacoes;
