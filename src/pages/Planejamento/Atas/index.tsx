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

interface AtasProps {
  IdArquivo: number;
  dsArquivo: string;
  dsNomeArquivo: string;
  bnArquivo: string;
  nrMesCompetencia: number;
  nrAnoCompetencia: number;
  dsCategoria: string;
  extencao: string;
}

interface EntidadesProps {
  value: number;
  label: string;
}

const Atas: React.FC = () => {
  const [results, setResults] = useState<AtasProps[]>([]);
  const [entidades, setEntidades] = useState<EntidadesProps[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtroidentidade, setFiltroIdEntidade] = useState(1);

  const formRef = useRef<FormHandles>(null);
  const carregaAtas = async () => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 24,
        parametros: [
          {
            key: "@idempresa",
            value: filtroidentidade === 0 ? 1 : filtroidentidade,
          },
          {
            key: "@IdLinkItem",
            value: 93,
          },

          {
            key: "@nrAno",
            value:
              formRef.current?.getFieldValue("ano") === ""
                ? 0
                : formRef.current?.getFieldValue("ano"),
          },

          {
            key: "@nrMes",
            value:
              formRef.current?.getFieldValue("mes") === ""
                ? 0
                : formRef.current?.getFieldValue("mes"),
          },

          {
            key: "@desc",
            value: formRef.current?.getFieldValue("descricao"),
          },
        ],
      })
      .then(response => {
        setResults(
          response.data.data.sort((a: any, b: any) => {
            const n = (a.nrAnoCompetencia - b.nrAnoCompetencia) * -1;
            if (n !== 0) {
              return n;
            }

            return a.nrMesCompetencia - b.nrMesCompetencia;
          }),
        );
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
  useEffect(() => {
    carregaEntidades();

    carregaAtas();
  }, []);

  const mudaEntidade = (dados: any) => {
    setFiltroIdEntidade(dados.value);
  };

  const mudaNomeEmpresa = (dados: any) => {
    console.log(dados);
  };

  const headers = [
    {
      label: "Descri????o",
      value: "dsArquivo",
      sortable: true,
    },
    {
      label: "Categoria",
      value: "dsCategoria",
      sortable: true,
    },
    {
      label: "Ano",
      value: "nrAnoCompetencia",
      sortable: true,
      containerStyle: {
        textAlign: "center",
      },
    },
    {
      label: "M??s",
      value: "nrMesCompetencia",
      sortable: true,
      containerStyle: {
        textAlign: "center",
      },
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
          <ContainerRetract title="Buscar atas">
            <Form ref={formRef} onSubmit={carregaAtas}>
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
                  <p>Ano:</p>
                  <Input name="ano" placeholder="Ano" />
                </LabelContainer>
                <LabelContainer>
                  <p>M??s:</p>
                  <Input name="mes" placeholder="M??s" />
                </LabelContainer>
              </ContainerForm>
              <ContainerForm>
                <LabelContainer>
                  <p>Descri????o:</p>
                  <Input
                    name="descricao"
                    placeholder="Descri????o"
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
            isDownload
            formatFile="extencao"
            nameFile="bnArquivo"
            typeDownload="base64"
            stringDownload="dsNomeArquivo"
          />
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default Atas;
