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

interface EntidadesProps {
  value: number;
  label: string;
}

interface OrgaosProps {
  value: number;
  label: string;
}

interface ModalidadesProps {
  value: number;
  label: string;
  nrCNPJ?: string;
}

interface FontesProps {
  value: number;
  label: string;
  nrCNPJ?: string;
}

const Despesas: React.FC = () => {
  const [results, setResults] = useState<DespesasProps[]>([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const [filtroidentidade, setFiltroIdEntidade] = useState(1);
  const [filtroidorgao, setFiltroIdOrgao] = useState(0);
  const [entidades, setEntidades] = useState<EntidadesProps[]>([]);
  const [orgaos, setOrgaos] = useState<OrgaosProps[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [filtromodalidade, setFiltroModalidade] = useState(0);
  const [modalidades, setModalidades] = useState<ModalidadesProps[]>([]);

  const [filtrofontes, setFiltroFontes] = useState(0);
  const [fontes, setFontes] = useState<FontesProps[]>([]);

  useEffect(() => {
    carregaEntidades();
    carregaModalidades();
    carregaFontes();
    carregaOrgaos();

    carregaDespesas();
  }, []);

  const newCar = async () => {
    carregaFontes();
    carregaOrgaos();
  };

  const carregaDespesas = async () => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 14,
        parametros: [
          {
            key: "@FILTROANO",
            value:
              formRef.current?.getFieldValue("ano") === ""
                ? 2021
                : formRef.current?.getFieldValue("ano"),
          },
          {
            key: "@FILTROEMPRESA",
            value: filtroidentidade,
          },
          {
            key: "@FILTROFORNECEDOR",
            value: formRef.current?.getFieldValue("fornecedor"),
          },
          {
            key: "@CNPJ_fornecedor",
            value: formRef.current?.getFieldValue("CNPJ_fornecedor"),
          },
          {
            key: "@n_empenho",
            value:
              formRef.current?.getFieldValue("n_empenho") === ""
                ? 0
                : formRef.current?.getFieldValue("n_empenho"),
          },
          {
            key: "@FILTROPROJETO",
            value: formRef.current?.getFieldValue("projeto"),
          },
          {
            key: "@FILTRODATAEMPENHODE",
            value:
              formRef.current?.getFieldValue("data_empenho_de") == null
                ? "01/01/1950"
                : formatar(formRef.current?.getFieldValue("data_empenho_de")),
          },
          {
            key: "@FILTRODATAEMPENHOATE",
            value:
              formRef.current?.getFieldValue("data_empenho_ate") == null
                ? "01/01/2050"
                : formatar(formRef.current?.getFieldValue("data_empenho_ate")),
          },
          {
            key: "@FILTROVALOREMPENHODE",
            value:
              formRef.current?.getFieldValue("valor_empenho_de") === ""
                ? "0"
                : formatar(formRef.current?.getFieldValue("valor_empenho_de")),
          },
          {
            key: "@FILTROVALOREMPENHOATE",
            value:
              formRef.current?.getFieldValue("valor_empenho_ate") === ""
                ? "9999999999"
                : formatar(formRef.current?.getFieldValue("valor_empenho_ate")),
          },
          {
            key: "@FILTROIDMODALIDADE",
            value:
              formRef.current?.getFieldValue("filtroidmodalidade") == null
                ? "0"
                : formRef.current?.getFieldValue("filtroidmodalidade"),
          },
          {
            key: "@FILTROIDORGAO",
            value:
              formRef.current?.getFieldValue("filtroorgao") == null
                ? "0"
                : formRef.current?.getFieldValue("filtroorgao"),
          },
          {
            key: "@FILTROIDFONTE",
            value:
              formRef.current?.getFieldValue("filtrofonte") == null
                ? "0"
                : formRef.current?.getFieldValue("filtrofonte"),
          },
        ],
      })
      .then(response => {
        setResults(response.data.data);
        setLastUpdate(response.data.data_atual);
        setLoading(false);
      });
  };

  const formatar = (minhadata: string) => {
    const data = new Date(minhadata);
    const ano = data.getFullYear();
    const mes = `00${data.getMonth() + 1}`.slice(-2);
    const dia = `00${data.getDate()}`.slice(-2);

    return `${dia}/${mes}/${ano}`;
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

  const carregaOrgaos = async () => {
    api
      .post(`portal/executarapi`, {
        idapi: 16,
        parametros: [
          {
            key: "@FILTROANO",
            value:
              formRef.current?.getFieldValue("ano") === ""
                ? "2021"
                : formRef.current?.getFieldValue("ano"),
          },
          {
            key: "@FILTROEMPRESA",
            value: filtroidentidade === 0 ? 1 : filtroidentidade,
          },
        ],
      })
      .then(response => {
        setOrgaos(response.data.data);
      });
    setFiltroIdEntidade(0);
  };

  const carregaFontes = async () => {
    api
      .post(`portal/executarapi`, {
        idapi: 17,
        parametros: [
          {
            key: "@FILTROANO",
            value:
              formRef.current?.getFieldValue("ano") === ""
                ? "2021"
                : formRef.current?.getFieldValue("ano"),
          },
          {
            key: "@FILTROEMPRESA",
            value: filtroidentidade === 0 ? 1 : filtroidentidade,
          },
        ],
      })
      .then(response => {
        setFontes(response.data.data);
      });
    setFiltroFontes(0);
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
    newCar();
  };

  const mudaOrgao = (dados: any) => {
    setFiltroIdOrgao(dados.value);
  };

  const mudaFontes = (dados: any) => {
    setFontes(dados.value);
  };

  const mudaModalidade = (dados: any) => {
    setFiltroModalidade(dados.value);
  };
  /*



  const formatar = (minhadata: string) => {
    const data = new Date(minhadata);
    const ano = data.getFullYear();
    const mes = `00${data.getMonth() + 1}`.slice(-2);
    const dia = `00${data.getDate()}`.slice(-2);

    return `${dia}/${mes}/${ano}`;
  };


  const mudaNomeEmpresa = (dados: any) => {
    console.log(dados);
  };
  */
  const headers = [
    {
      label: "Empenho",
      value: "NEMPENHOANO",
      sortable: true,
    },
    {
      label: "Data do empenho",
      value: "dtEmpenho",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "??rg??o",
      value: "Orgao",
      sortable: true,
    },
    {
      label: "Fornecedor",
      value: "Fornecedor",
      sortable: true,
    },
    {
      label: "Projeto ativo",
      value: "ProjAtiv",
      sortable: true,
    },
    {
      label: "Modalidade",
      value: "Modalidade",
      sortable: true,
    },
    {
      label: "Empenhado",
      value: "vlempenho",
      sortable: true,
      type: "currency",
    },
    {
      label: "Anulado",
      value: "vlAnulado",
      sortable: true,
      type: "currency",
    },
    {
      label: "Consignado",
      value: "vlConsignado",
      sortable: true,
      type: "currency",
    },
    {
      label: "Pago",
      value: "vlPago",
      sortable: true,
      type: "currency",
    },
    {
      label: "A pagar",
      value: "vlSaldopagar",
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
          <ContainerRetract title="Buscar Servidores">
            <Form ref={formRef} onSubmit={carregaDespesas}>
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
                  <p>??rg??o:</p>

                  <Select
                    placeholder="??rg??o"
                    name="filtroorgao"
                    options={orgaos}
                    onChange={mudaOrgao}
                  />
                </LabelContainer>
                <LabelContainer>
                  <p>Fonte:</p>

                  <Select
                    placeholder="Fonte"
                    name="filtrofonte"
                    options={fontes}
                    onChange={mudaFontes}
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
                  <p>N?? empenho:</p>
                  <Input
                    name="n_empenho"
                    placeholder="N?? empenho"
                    onChange={newCar}
                  />
                </LabelContainer>
                <LabelContainer>
                  <p>Ano:</p>
                  <Input name="ano" placeholder="Ano" onChange={newCar} />
                </LabelContainer>

                <LabelContainer>
                  <p>Data do contrato at??: </p>
                  <DatePicker
                    name="data_empenho_de"
                    placeholderText="Data do empenho de"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    dropdownMode="select"
                  />
                </LabelContainer>

                <LabelContainer>
                  <p>Data do contrato at??: </p>
                  <DatePicker
                    name="data_empenho_ate"
                    placeholderText="Data do empenho at??"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    dropdownMode="select"
                  />
                </LabelContainer>
              </ContainerForm>

              <ContainerForm>
                <LabelContainer>
                  <p>CNPJ do fornecedor:</p>
                  <Input
                    name="CNPJ_fornecedor"
                    placeholder="CNPJ do fornecedor"
                  />
                </LabelContainer>
                <LabelContainer>
                  <p>Nome do fornecedor:</p>
                  <Input name="fornecedor" placeholder="Nome do fornecedor" />
                </LabelContainer>
              </ContainerForm>

              <ContainerForm>
                <LabelContainer>
                  <p>Projeto:</p>
                  <Input name="projeto" placeholder="Projeto" />
                </LabelContainer>
              </ContainerForm>

              <ContainerForm>
                <LabelContainer>
                  <p>Valor do empenho de:</p>
                  <Input
                    name="valor_empenho_de"
                    placeholder="Valor do empenho de"
                  />
                </LabelContainer>
                <LabelContainer>
                  <p>Valor do empenho at??:</p>
                  <Input
                    name="valor_empenho_ate"
                    placeholder="Valor do empenho at??"
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
            path="detalhe/:idEmpenho"
          />
        </Content>
      </Body>

      <Footer />
    </Container>
  );

  return <Container />;
};

export default Despesas;
