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

import LoaderPage from "../../../components/LoaderPage";
import Footer from "../../../components/Footer";
import SubHeader from "../../../components/SubHeader";
import Header from "../../../components/Header";

interface RREOProps {
  IdArquivo: number;
  dsArquivo: string;
  dsNomeArquivo: string;
  bnArquivo: string;
  nrMesCompetencia: number;
  nrAnoCompetencia: number;
  nmCategoria: string;
  dsCategoria: string;
  extencao: string;
}

interface EntidadesProps {
  value: number;
  label: string;
}

const RREO: React.FC = () => {
  const [results, setResults] = useState<RREOProps[]>([]);
  const [entidades, setEntidades] = useState<EntidadesProps[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [loading, setLoading] = useState(false);
  const [filtroidentidade, setFiltroIdEntidade] = useState(1);

  const formRef = useRef<FormHandles>(null);
  const carregaRREO = async () => {
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
            value: 14,
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
        const resultFiltered = response.data.data.filter(
          (res: any) => res.nmCategoria === "RELAT??RIOS DA LRF -RREO",
        );
        setResults(
          resultFiltered.sort((a: any, b: any) => {
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

    carregaRREO();
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
          <ContainerRetract title="Buscar RREO">
            <Form ref={formRef} onSubmit={carregaRREO}>
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

export default RREO;
