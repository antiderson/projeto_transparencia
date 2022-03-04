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
import LoaderPage from "../../../components/LoaderPage";
import DatePicker from "../../../components/DatePicker";
import Footer from "../../../components/Footer";
import SubHeader from "../../../components/SubHeader";
import Header from "../../../components/Header";

interface SearchFormData {
  search: string;
  EMPRESA: string;
  NOME: string;
  CARGO: string;
  LOTACAO: string;
  REGIME: string;
  initial: Date;
  final: Date;
  [key: string]: any;
}

interface QuadroFuncionalProps {
  ADMISSAO: string;
  CPF: number;
  CARGAHORARIA: number;
  CARGO: string;
  DATADEMISSAO: string | null;
  DATAULTIMAATUALIZACAO: string;
  EMPRESA: string;
  ESCALA: string;
  LOTACAO: string;
  MATRICULA: number;
  NOME: string;
  REGIME: string;
  SITUACAO: string;
  SITUACAOFormatada: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
  defaultChecked?: boolean | false;
}

interface SelectOptionProps {
  label: string;
  value: string;
}

const QuadroFuncional: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [typeOfSearch, setTypeOfSearch] = useState(comumOptions.search[0]);
  const [results, setResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState<QuadroFuncionalProps[]>([]);
  const [empresa, setEmpresa] = useState(comumOptions.entidades[0]);
  const [ativo, setAtivo] = useState(true);
  const [demitido, setDemitido] = useState(true);
  const [cargo, setCargo] = useState<SelectOptionProps[]>([]);
  const [lotacao, setLotacao] = useState<SelectOptionProps[]>([]);
  const [regime, setRegime] = useState<SelectOptionProps[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  // Carregar todos os funcionarios e selects
  useEffect(() => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 1,
        parametros: [],
      })
      .then(response => {
        setLastUpdate(
          format(
            new Date(response.data.data[0].DATAULTIMAATUALIZACAO),
            "dd/MM/yyyy HH:mm",
          ),
        );
        const responseFormatted = response.data.data.map(
          (res: QuadroFuncionalProps) => {
            return {
              ...res,
              SITUACAOFormatada:
                res.SITUACAO === "DEMITIDO" ? "DESLIGADO" : res.SITUACAO,
            };
          },
        );
        setTotalResults(responseFormatted);
        const resultFilteredByEmpresa: QuadroFuncionalProps[] =
          responseFormatted.filter(
            (result: QuadroFuncionalProps) => result.EMPRESA === empresa.value,
          );
        setCargo(
          arrayNoDuplicateAndSelect(responseFormatted, "CARGO", "label"),
        );

        setLotacao(
          arrayNoDuplicateAndSelect(responseFormatted, "LOTACAO", "label"),
        );
        setRegime(
          arrayNoDuplicateAndSelect(responseFormatted, "REGIME", "label"),
        );
        setResults(resultFilteredByEmpresa);
        setLoading(false);
      });
  }, []);

  // Carregar funcionarios com consulta
  const handleSubmit = useCallback(
    async (data: SearchFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        let resultFilteredBySearch = [] as QuadroFuncionalProps[];
        resultFilteredBySearch = filterArray(
          totalResults,
          "EMPRESA",
          data.EMPRESA,
        );

        resultFilteredBySearch = resultFilteredBySearch.filter(
          (result: QuadroFuncionalProps) =>
            (ativo && result.SITUACAO === "ATIVO") ||
            (demitido && result.SITUACAO === "DEMITIDO"),
        );
        if (data.initial || data.final) {
          resultFilteredBySearch = resultFilteredBySearch.filter(
            (result: QuadroFuncionalProps) =>
              (data.initial &&
                getTime(new Date(result.ADMISSAO)) >= getTime(data.initial)) ||
              (data.final &&
                getTime(new Date(result.ADMISSAO)) <= getTime(data.final)),
          );
        }

        if (data.search !== "NOME") {
          resultFilteredBySearch = filterArray(
            resultFilteredBySearch,
            data.search,
            data[data.search],
          );
          setResults(resultFilteredBySearch);
        }
        if (data.search === "NOME") {
          const fuse = new Fuse(resultFilteredBySearch, {
            keys: ["NOME"],
            threshold: 0,
          });
          if (data.NOME === "") {
            setResults(resultFilteredBySearch);
          } else {
            const res = fuse.search(data.NOME).map(result => {
              return result.item;
            });
            setResults(res);
          }
        }

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [ativo, demitido, totalResults],
  );

  const handleTypeOfSearch = (value: any) => {
    setTypeOfSearch(value);
  };
  const handleEmpresa = (value: any) => {
    setEmpresa(value);
  };

  const headers = [
    {
      label: "Nome",
      value: "NOME",
      sortable: true,
    },
    {
      label: "Situação",
      value: "SITUACAOFormatada",
    },
    {
      label: "Cargo",
      value: "CARGO",
      sortable: true,
    },
    {
      label: "Regime",
      value: "REGIME",
    },
    {
      label: "Lotação",
      value: "LOTACAO",
    },
  ] as HeaderProps[];
  const checkboxOptions: CheckboxOption[] = [
    { id: "ativo", value: "ativo", label: "Ativo", defaultChecked: true },
    {
      id: "demitido",
      value: "demitido",
      label: "Demitido",
      defaultChecked: true,
    },
  ];
  const handleSituacao = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "ativo") {
        setAtivo(e.target.checked);
      }
      if (e.target.value === "demitido") {
        setDemitido(e.target.checked);
      }
    },
    [],
  );

  const typeSearch = (name: string) => {
    if (name === "CARGO") return cargo;
    if (name === "LOTACAO") return lotacao;
    if (name === "REGIME") return regime;
    return [];
  };

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <LoaderPage loading={loading} />
          <ContainerRetract title="Buscar Servidores">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <ContainerForm>
                <p>Selecione o tipo de busca:</p>
                <Select
                  placeholder="Tipo da Busca"
                  name="search"
                  options={comumOptions.search}
                  defaultValue={comumOptions.search[0]}
                  onChange={handleTypeOfSearch}
                />
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Entidade:</p>
                  <Select
                    placeholder="Entidade"
                    name="EMPRESA"
                    value={empresa}
                    onChange={handleEmpresa}
                    options={comumOptions.entidades}
                    defaultValue={comumOptions.entidades[0]}
                  />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Situação:</p>
                  <CheckBox
                    onChange={e => handleSituacao(e)}
                    name="SITUACAO"
                    options={checkboxOptions}
                  />
                </LabelContainer>
                <LabelContainer>
                  <p>Admissão (Início):</p>

                  <DatePicker
                    name="initial"
                    placeholderText="Data Inicial"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </LabelContainer>
                <LabelContainer>
                  <p>Admissão (Final):</p>
                  <DatePicker
                    name="final"
                    placeholderText="Data Final"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>{`${typeOfSearch.value}:`}</p>
                  {typeOfSearch.value === "NOME" ? (
                    <Input name="NOME" placeholder="Nome" />
                  ) : (
                    <Select
                      placeholder={typeOfSearch.label}
                      name={typeOfSearch.value}
                      options={typeSearch(typeOfSearch.value)}
                    />
                  )}
                </LabelContainer>
              </ContainerForm>
              <Button type="submit">Consultar</Button>
            </Form>
          </ContainerRetract>
          <NewTable
            data={results}
            header={headers}
            isSelected
            path="detalhe/:MATRICULA"
            exportFile="all"
            pagination
            maxItemsPerPage={50}
            lastUpdate={lastUpdate}
          />
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default QuadroFuncional;
