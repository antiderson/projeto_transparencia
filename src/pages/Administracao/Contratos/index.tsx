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

interface ContratosProps {
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

interface EntidadesProps {
  value: number;
  label: string;
}

interface ModalidadesProps {
  value: number;
  label: string;
}

const Contratos: React.FC = () => {
  const [results, setResults] = useState<ContratosProps[]>([]);
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

    carregaContratos();
  }, []);

  const formatar = (minhadata: string) => {
    const data = new Date(minhadata);
    const ano = data.getFullYear();
    const mes = `00${data.getMonth() + 1}`.slice(-2);
    const dia = `00${data.getDate()}`.slice(-2);

    return `${dia}/${mes}/${ano}`;
  };

  const carregaContratos = async () => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 10,
        parametros: [
          {
            key: "@FILTROANO",
            value: 0,
          },
          {
            key: "@FILTROIDENTIDADE",
            value: filtroidentidade,
          },
          {
            key: "@FILTROIDMODALIDADE",
            value: filtromodalidade,
          },
          {
            key: "@FILTRONOMEEMPRESA",
            value: formRef.current?.getFieldValue("empresa"),
          },
          {
            key: "@FILTROOBJETO",
            value: formRef.current?.getFieldValue("objeto"),
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
            key: "@FILTROVALORDE",
            value:
              formRef.current?.getFieldValue("valor_de") === ""
                ? "0"
                : formRef.current?.getFieldValue("valor_de"),
          },
          {
            key: "@FILTROVALORATE",
            value:
              formRef.current?.getFieldValue("valor_ate") === ""
                ? 9999999999
                : formRef.current?.getFieldValue("valor_ate"),
          },
          {
            key: "@FILTROANOLICITACAO",
            value:
              formRef.current?.getFieldValue("ano_licitacao") === ""
                ? 0
                : formRef.current?.getFieldValue("ano_licitacao"),
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

  const carregaModalidades = async () => {
    api
      .post(`portal/executarapi`, {
        idapi: 12,
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
      label: "N° - Ano do contrato",
      value: "NRCONTRATOANOCONTRATO",
      sortable: true,
    },
    {
      label: "Data do contrato",
      value: "DTCONTRATO",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Órgão",
      value: "NMORGAO",
      sortable: true,
    },
    {
      label: "Contratado",
      value: "CONTRATADO",
      sortable: true,
    },
    {
      label: "Valor do contrato",
      value: "VLCONTRATO",
      sortable: true,
      type: "currency",
    },
    {
      label: "Valor do aditivo",
      value: "VALORADITIVO",
      sortable: true,
      type: "currency",
    },
    {
      label: "Valor total",
      value: "VALORTOTAL",
      sortable: true,
      type: "currency",
    },
    {
      label: "Modalidade",
      value: "DSMODALIDADE",
      sortable: true,
    },
    {
      label: "Tipo de contrato",
      value: "TIPOCONTRATO",
      sortable: true,
    },
    {
      label: "Número - Ano da Licitação",
      value: "NLICITACAOANOLICITADO",
      sortable: true,
    },
    {
      label: "Situação",
      value: "SITUACAO",
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
          <ContainerRetract title="Buscar Servidores">
            <Form ref={formRef} onSubmit={carregaContratos}>
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
                  <p>Empresa:</p>
                  <Input
                    name="empresa"
                    placeholder="Empresa"
                    onChange={mudaNomeEmpresa}
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
                  <p>Data do contrato de: </p>
                  <DatePicker
                    name="data_inicial"
                    placeholderText="Data do contrato de"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    dropdownMode="select"
                  />
                </LabelContainer>
                <LabelContainer>
                  <p>Data do contrato até: </p>
                  <DatePicker
                    name="data_final"
                    placeholderText="Data do contrato até"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    dropdownMode="select"
                  />
                </LabelContainer>

                <LabelContainer>
                  <p>Ano da licitação:</p>
                  <Input name="ano_licitacao" placeholder="Ano da licitação" />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Valor de:</p>
                  <Input name="valor_de" placeholder="Valor de" />
                </LabelContainer>
                <LabelContainer>
                  <p>Valor até:</p>
                  <Input name="valor_ate" placeholder="Valor até" />
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
            path="detalhe/:IDCONTRATO"
          />
        </Content>
      </Body>

      <Footer />
    </Container>
  );
};

export default Contratos;
