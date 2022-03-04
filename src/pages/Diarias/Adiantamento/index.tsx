import React, { useCallback, useEffect, useRef, useState } from "react";

import Fuse from "fuse.js";

import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { format, getTime } from "date-fns";
import { Container, Content, ContainerForm, LabelContainer } from "./styles";

import comumOptions from "../../../config/comumOptions";

import arrayNoDuplicateAndSelect from "../../../utils/arrayNoDuplicateAndSelect";
import filterArray from "../../../utils/filterArray";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerRetract from "../../../components/ContainerRetract";
import getValidationErrors from "../../../utils/getValidationError";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import NewTable, { HeaderProps } from "../../../components/NewTable";
import CheckBox from "../../../components/CheckBox";

import api from "../../../services/api";
import DatePicker from "../../../components/DatePicker";

import LoaderPage from "../../../components/LoaderPage";
import Footer from "../../../components/Footer";
import SubHeader from "../../../components/SubHeader";
import Header from "../../../components/Header";

interface AdiantamentoProps {
  data: Date;
  dataEmpenho: Date;
  dataLiquidacao: Date;
  dataPagamento: Date;
  justificativa: string;
  matricula: string;
  nome: string;
  numeroEmpenho: string;
  numeroLiquidacao: string;
  numeroPagamento: string;
  valor: number;
}

interface EntidadesProps {
  value: number;
  label: string;
}

const Adiantamento: React.FC = () => {
  const [results, setResults] = useState<AdiantamentoProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("");
  const [entidades, setEntidades] = useState<EntidadesProps[]>([]);
  const [filtroidentidade, setFiltroIdEntidade] = useState(1);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    carregaEntidades();
    carregaAdiantamento();
  }, []);

  const formatar = (minhadata: string) => {
    const data = new Date(minhadata);
    const ano = data.getFullYear();
    const mes = `00${data.getMonth() + 1}`.slice(-2);
    const dia = `00${data.getDate()}`.slice(-2);

    return `${dia}/${mes}/${ano}`;
  };
  const carregaAdiantamento = async () => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 42,
        parametros: [
          {
            key: "@idempresa",
            value: filtroidentidade,
          },
          {
            key: "@dtinicio",
            value:
              formRef.current?.getFieldValue("data_inicial") == null
                ? "01/01/2000"
                : formatar(formRef.current?.getFieldValue("data_inicial")),
          },
          {
            key: "@dtfim",
            value:
              formRef.current?.getFieldValue("data_final") == null
                ? "01/01/2050"
                : formatar(formRef.current?.getFieldValue("data_final")),
          },
          {
            key: "@pessoa",
            value: formRef.current?.getFieldValue("pessoa"),
          },
          {
            key: "@justificativa",
            value: formRef.current?.getFieldValue("justificativa"),
          },
        ],
      })
      .then(response => {
        setResults(response.data.data);
        // console.log(response);
        setLastUpdate(response.data.data[0].lastupdate);
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
  const mudaEntidade = (dados: any) => {
    setFiltroIdEntidade(dados.value);
  };

  const headers = [
    {
      label: "Data",
      value: "data",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Data do empenho",
      value: "dataEmpenho",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Data da liquidação",
      value: "dataLiquidacao",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Data do pagamento",
      value: "dataPagamento",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Justificativa",
      value: "justificativa",
      sortable: true,
    },
    {
      label: "Matricula",
      value: "matricula",
      sortable: true,
    },
    {
      label: "Nome",
      value: "nome",
      sortable: true,
    },
    {
      label: "Nº empenho",
      value: "numeroEmpenho",
      sortable: true,
    },
    {
      label: "Nº da liquidação",
      value: "numeroLiquidacao",
      sortable: true,
    },
    {
      label: "Nº do pagamento",
      value: "numeroPagamento",
      sortable: true,
    },
    {
      label: "Valor",
      value: "valor",
      sortable: true,
      type: "currency",
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
          <ContainerRetract title="Buscar adiantamento">
            <Form ref={formRef} onSubmit={carregaAdiantamento}>
              <ContainerForm>
                <Select
                  placeholder="Entidade"
                  name="filtroidentidade"
                  options={entidades}
                  onChange={mudaEntidade}
                />
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <DatePicker
                    name="data_inicial"
                    placeholderText="Data inicial"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    dropdownMode="select"
                  />
                </LabelContainer>
                <LabelContainer>
                  <DatePicker
                    name="data_final"
                    placeholderText="Data final"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    dropdownMode="select"
                  />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <Input name="pessoa" placeholder="Pessoa" />
                <Input name="justificativa" placeholder="justificativa" />
              </ContainerForm>
              <Button type="submit">Consultar</Button>
            </Form>
          </ContainerRetract>

          <NewTable
            data={results}
            header={headers}
            exportFile="all"
            pagination
          />
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default Adiantamento;
