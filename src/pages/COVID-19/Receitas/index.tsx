import React, { useCallback, useEffect, useRef, useState } from "react";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { getYear } from "date-fns";
import { Container, Content, ContainerForm, LabelContainer } from "./styles";

import comumOptions from "../../../config/comumOptions";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import LoaderPage from "../../../components/LoaderPage";
import ContainerRetract from "../../../components/ContainerRetract";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import ContainerBlue from "../../../components/ContainerBlue";
import TableReceita from "../../../components/TableReceita";
import Tabs from "../../../components/Tabs";
import NewTable, { HeaderProps } from "../../../components/NewTable";
import api from "../../../services/api";
import ModalDetailReceita from "../../../components/ModalDetailReceita";
import Grafico from "../../../components/Grafico";
import getDataGraficoFromTableData from "../../../utils/getDataGraficoFromTableData";
import Footer from "../../../components/Footer";
import SubHeader from "../../../components/SubHeader";
import Header from "../../../components/Header";

interface SearchFormData {
  entidade: string;
  ano: string;
}

interface ReceitaAPIProps {
  NRCNPJ: string;
  NMRAZAOSOCIAL: string;
  CDRECEITA: string;
  DSRECEITA: string;
  VLORCADO: number;
  VLCORRIGIDO: number;
  JANEIRO: number;
  FEVEREIRO: number;
  MARÇO: number;
  ABRIL: number;
  MAIO: number;
  JUNHO: number;
  JULHO: number;
  AGOSTO: number;
  SETEMBRO: number;
  OUTUBRO: number;
  NOVEMBRO: number;
  DEZEMBRO: number;
  ACUMULADO: number;
  TIPO: string;
}

interface ReceitaProps {
  [key: string]: string | number;
  receita: string;
  descricao: string;
  nivel: number;
  inicio: number;
  tamanho: number;
  valorOrcado: number;
  valorAtualizado: number;
  valorArrecadado: number;
  JANEIRO: number;
  FEVEREIRO: number;
  MARÇO: number;
  ABRIL: number;
  MAIO: number;
  JUNHO: number;
  JULHO: number;
  AGOSTO: number;
  SETEMBRO: number;
  OUTUBRO: number;
  NOVEMBRO: number;
  DEZEMBRO: number;
  TIPO: string;
}

interface SelectOptionYearProps {
  value: number;
  label: number;
}

const Receitas: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [empresa, setEmpresa] = useState(comumOptions.entidades[0]);
  const [ano, setAno] = useState(comumOptions.year[0]);
  const [receita, setReceita] = useState<ReceitaProps[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const headerTable: HeaderProps[] = [
    { label: "Receita", value: "receita" },
    { label: "Descrição", value: "descricao" },
    { label: "Arrecado", value: "valorArrecadado", type: "currency" },
  ];

  useEffect(() => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 21,
        parametros: [
          {
            key: "@NRANO",
            value: ano.value,
          },
        ],
      })

      .then(response => {
        const receitaAPI = response.data.data as ReceitaAPIProps[];

        const receitaFormatted: ReceitaProps[] = receitaAPI.map(
          (rec: ReceitaAPIProps) => {
            const code = rec.CDRECEITA.split(".");
            const index = checkIndex(code);
            return {
              ...rec,
              receita: code
                .join("")
                .substring(0, solveInicio(index) + solveTamanho(index) - 1),
              descricao: rec.DSRECEITA,
              nivel: index + 1,
              inicio: solveInicio(index),
              tamanho: solveTamanho(index),
              valorOrcado: rec.VLORCADO,
              valorAtualizado: rec.VLCORRIGIDO,
              valorArrecadado: rec.ACUMULADO,
            };
          },
        );
        setReceita(receitaFormatted);
        setLoading(false);
      });
  }, [ano]);

  function checkIndex(data: string[]): number {
    let findIndex = 0;
    data.forEach((item, index) => {
      if (item !== "0" && item !== "00") {
        if (findIndex <= index) {
          findIndex = index;
        }
      }
    });
    return findIndex;
  }

  function solveInicio(num: number): number {
    const tabelaInicio = [1, 2, 3, 4, 5, 7, 8, 9, 11, 13, 15, 17];
    return tabelaInicio[num];
  }
  function solveTamanho(num: number): number {
    const tabelaTamanho = [1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2];
    return tabelaTamanho[num];
  }

  function handleTab(number: number) {
    setCurrentTab(number);
  }

  const handleSubmit = useCallback(
    async (data: SearchFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        api
          .post(`portal/executarapi`, {
            idapi: 9,
            parametros: [
              {
                key: "@NRANO",
                value: ano.value,
              },
            ],
          })

          .then(response => {
            const receitaAPI = response.data.data as ReceitaAPIProps[];

            const receitaFormatted: ReceitaProps[] = receitaAPI.map(
              (rec: ReceitaAPIProps) => {
                const code = rec.CDRECEITA.split(".");
                const index = checkIndex(code);
                return {
                  ...rec,
                  receita: code
                    .join("")
                    .substring(0, solveInicio(index) + solveTamanho(index) - 1),
                  descricao: rec.DSRECEITA,
                  nivel: index + 1,
                  inicio: solveInicio(index),
                  tamanho: solveTamanho(index),
                  valorOrcado: rec.VLORCADO,
                  valorAtualizado: rec.VLCORRIGIDO,
                  valorArrecadado: rec.ACUMULADO,
                };
              },
            );
            setReceita(receitaFormatted);

            setLoading(false);
          });

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
    [ano.value],
  );

  const handleEmpresa = (value: any) => {
    setEmpresa(value);
  };

  const handleAno = (value: any) => {
    setAno(value);
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
                <LabelContainer>
                  <p>Entidade:</p>
                  <Select
                    placeholder="Entidade"
                    name="Empresa"
                    value={empresa}
                    isDisabled
                    onChange={handleEmpresa}
                    options={comumOptions.entidades}
                    defaultValue={comumOptions.entidades[0]}
                  />
                </LabelContainer>
                <LabelContainer>
                  <p>Ano:</p>
                  <Select
                    placeholder="Ano"
                    name="ano"
                    value={ano}
                    onChange={handleAno}
                    options={comumOptions.year.slice(0, 5)}
                    defaultValue={comumOptions.year[0]}
                  />
                </LabelContainer>
              </ContainerForm>
            </Form>
          </ContainerRetract>
          <ContainerBlue>
            <Tabs
              header={[
                { title: "Detalhado", id: 0 },
                { title: "Todos", id: 1 },
                { title: "Gráficos", id: 2 },
              ]}
              currentTab={currentTab}
              setCurrentTab={handleTab}
            >
              {currentTab === 0 && (
                <TableReceita data={receita} exportFile="all" />
              )}
              {currentTab === 1 && (
                <NewTable
                  header={headerTable}
                  data={receita}
                  pagination
                  maxItemsPerPage={20}
                  isDetails
                  exportFile="all"
                  ModalDetails={ModalDetailReceita}
                />
              )}
              {currentTab === 2 && (
                <Grafico chartType="Bar" data={[]} title="Receita por Mês" />
              )}
            </Tabs>
          </ContainerBlue>
        </Content>
      </Body>

      <Footer />
    </Container>
  );
};

export default Receitas;
