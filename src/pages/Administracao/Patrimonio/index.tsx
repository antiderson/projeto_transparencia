import React, { useCallback, useEffect, useRef, useState } from "react";

import Fuse from "fuse.js";

import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { format, getTime, startOfYear } from "date-fns";
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

interface EntidadesProps {
  value: number;
  label: string;
}

const Patrimonio: React.FC = () => {
  const [results, setResults] = useState<PatrimoniosProps[]>([]);
  const [entidades, setEntidades] = useState<EntidadesProps[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtroidentidade, setFiltroIdEntidade] = useState(1);

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    carregaEntidades().then(() => {
      carregaPatrimonio();
    });
  }, []);

  const formatar = (minhadata: string) => {
    const data = new Date(minhadata);
    const ano = data.getFullYear();
    const mes = `00${data.getMonth() + 1}`.slice(-2);
    const dia = `00${data.getDate()}`.slice(-2);

    return `${dia}/${mes}/${ano}`;
  };

  const carregaPatrimonio = async () => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 35,
        parametros: [
          {
            key: "@FILTROIDENTIDADE",
            value: filtroidentidade,
          },
          {
            key: "@FILTRODATADE",
            value:
              formRef.current?.getFieldValue("data_aquisicao_de") == null
                ? format(startOfYear(new Date()), "dd/MM/yyyy")
                : formatar(formRef.current?.getFieldValue("data_aquisicao_de")),
          },
          {
            key: "@FILTRODATAATE",
            value:
              formRef.current?.getFieldValue("data_aquisicao_ate") == null
                ? format(new Date(), "dd/MM/yyyy")
                : formatar(
                    formRef.current?.getFieldValue("data_aquisicao_ate"),
                  ),
          },
          {
            key: "@FILTROVALORDE",
            value:
              formRef.current?.getFieldValue("valor_do_bem_de") === ""
                ? "0"
                : formRef.current?.getFieldValue("valor_do_bem_de"),
          },
          {
            key: "@FILTROVALORATE",
            value:
              formRef.current?.getFieldValue("valor_bem_ate") === ""
                ? 9999999999
                : formRef.current?.getFieldValue("valor_bem_ate"),
          },
          {
            key: "@dsBem",
            value: formRef.current?.getFieldValue("bem"),
          },
        ],
      })
      .then(response => {
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

  const mudaEntidade = (dados: any) => {
    setFiltroIdEntidade(dados.value);
  };

  const headers = [
    {
      label: "Plaqueta",
      value: "nrPlaqueta",
      sortable: true,
    },
    {
      label: "Tipo de bem",
      value: "dsTipoBem",
      sortable: true,
    },
    {
      label: "Bem",
      value: "dsBem",
      sortable: true,
    },
    {
      label: "Data de aquisição",
      value: "dtAquisicao",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Unidade",
      value: "nmUnidade",
      sortable: true,
    },
    {
      label: "Valor do bem",
      value: "vlBem",
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
          <ContainerRetract title="Buscar licitações">
            <Form
              ref={formRef}
              onSubmit={carregaPatrimonio}
              initialData={{
                data_aquisicao_de: startOfYear(new Date()),
                data_aquisicao_ate: new Date(),
              }}
            >
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
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Bem :</p>
                  <Input name="bem" placeholder="Bem" />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Data da aqusição de: </p>
                  <DatePicker
                    name="data_aquisicao_de"
                    placeholderText="Data da aqusição de"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    dropdownMode="select"
                  />
                </LabelContainer>
                <LabelContainer>
                  <p>Data da aqusição até: </p>
                  <DatePicker
                    name="data_aquisicao_ate"
                    placeholderText="Data da aqusição até"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    dropdownMode="select"
                  />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Valor do bem de:</p>
                  <Input name="valor_do_bem_de" placeholder="Valor do bem de" />
                </LabelContainer>
                <LabelContainer>
                  <p>Valor do bem até:</p>
                  <Input name="valor_bem_ate" placeholder="Valor do bem até" />
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
            path="detalhe/:idBem"
          />
        </Content>
      </Body>

      <Footer />
    </Container>
  );
};

export default Patrimonio;
