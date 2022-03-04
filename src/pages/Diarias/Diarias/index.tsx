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

interface DiariasProps {
  IdDiaria: number;
  cnpj: string;
  razaosocial: string;
  cnpjcpf: string;
  pessoa: string;
  data_inicial: Date;
  data_final: Date;
  nrDiarias: number;
  dsDestino: string;
  // objetivo: string;
  tipo_locomocao: string;
  id_entidade: number;
  cargo: string;
  matricula: string;
  dsObjetivo: string;
  vlUnitario: number;
  vlTotal: number;
}

interface EntidadesProps {
  value: number;
  label: string;
}

const Diarias: React.FC = () => {
  const [results, setResults] = useState<DiariasProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("");
  const [entidades, setEntidades] = useState<EntidadesProps[]>([]);
  const [filtroidentidade, setFiltroIdEntidade] = useState(1);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    carregaEntidades();
    carregaDiarias();
  }, []);

  const formatar = (minhadata: string) => {
    const data = new Date(minhadata);
    const ano = data.getFullYear();
    const mes = `00${data.getMonth() + 1}`.slice(-2);
    const dia = `00${data.getDate()}`.slice(-2);

    return `${dia}/${mes}/${ano}`;
  };
  const carregaDiarias = async () => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 18,
        parametros: [
          {
            key: "@FILTROIDENTIDADE",
            value: filtroidentidade,
          },
          {
            key: "@FILTRODATADE",
            value:
              formRef.current?.getFieldValue("data_inicial") == null
                ? "01/01/2000"
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
            key: "@FILTROPESSOA",
            value: formRef.current?.getFieldValue("pessoa"),
          },
          {
            key: "@FILTRODESTINO",
            value: formRef.current?.getFieldValue("destino"),
          },
          {
            key: "@FILTROOBJETIVO",
            value: formRef.current?.getFieldValue("objetivo"),
          },
        ],
      })
      .then(response => {
        setResults(response.data.data);
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
      label: "PESSOA",
      value: "pessoa",
      sortable: true,
    },
    {
      label: "MATRICULA",
      value: "matricula",
      sortable: true,
    },
    {
      label: "CARGO",
      value: "cargo",
      sortable: true,
    },
    {
      label: "DATA INICIAL",
      value: "data_inicial",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "DATA FINAL",
      value: "data_final",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "N° DIÁRIAS",
      value: "nrDiarias",
      sortable: true,
    },
    {
      label: "DESTINO",
      value: "dsDestino",
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
          <ContainerRetract title="Buscar diária">
            <Form ref={formRef} onSubmit={carregaDiarias}>
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
                <Input name="destino" placeholder="Destino" />
              </ContainerForm>
              <Input name="objetivo" placeholder="Objetivo" />
              <Button type="submit">Consultar</Button>
            </Form>
          </ContainerRetract>

          <NewTable
            data={results}
            header={headers}
            exportFile="all"
            pagination
            isSelected
            path="detalhe/:IdDiaria"
            maxItemsPerPage={50}
            lastUpdate={lastUpdate}
          />
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default Diarias;
