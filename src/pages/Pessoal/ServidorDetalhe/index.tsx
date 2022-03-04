/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-template */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from "react";

import { useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import axios, { AxiosRequestConfig } from "axios";
import { Container, Content, ContainerDetalhe, Line } from "./styles";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import NewTable, { HeaderProps } from "../../../components/NewTable";
import ModalDetailPessoal from "../../../components/ModalDetailPessoal";

import LoaderPage from "../../../components/LoaderPage";
import api from "../../../services/api";


interface PathProps {
  title: string;
  path: string;
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
}

interface SalaryProps {
  DATAULTIMAATUALIZACAO: string;
  TIPOCALCULO: string;
  MES: number;
  ANO: number;
  PERREF: string;
  EMPRESA: string;
  MATRICULA: number;
  CPF: number;
  NOME: string;
  ADMISSAO: string;
  ID_CALCULO: number;
  BRUTO: number;
  DESCONTOS: number;
  REMUNERACAOLIQUIDA: number;
  mesFormatted: number;
}

const ServidorDetalhe: React.FC = () => {
  const location = useLocation();
  const params = useParams();

  const [ servidor, setServidor ] = useState<QuadroFuncionalProps>();
  const [ lastPath, setLastPath ] = useState<PathProps[]>([]);
  const [ salaries, setSalaries ] = useState<SalaryProps[]>([]);

  useEffect(() => {
    async function loadServidor(){
      const { pathname, state} = location;
      const title = state.data.NOME as string;

      const allSalaries = await api.post(`portal/executarapi`, { idapi: 3, parametros: [{key: '@numcad_param', value: state.data.MATRICULA}] }
      );

      const allSalariesFormatted = allSalaries.data.data.map( (salary: SalaryProps) => {
        return {
          ...salary,
          mesFormatted: format(new Date(salary.ANO, salary.MES -1, 1), 'LLLL', { locale: ptBR}).toUpperCase()
        }
      });

      setSalaries(allSalariesFormatted);

      const path = [] as PathProps[];

      path.push({
        title,
        path: pathname
      })

      setServidor(state.data)
      setLastPath(path)
    }
    loadServidor()

  }, [params, location]);

  const headers = [
    {
      label: "Mês",
      value: "mesFormatted",
      containerStyle: { textAlign: 'center' }
    },
    {
      label: "Ano",
      value: "ANO",
      containerStyle: { textAlign: 'center' },
      sortable: true,
    },
    {
      label: "Tipo de Cálculo",
      value: "TIPOCALCULO",
      containerStyle: { textAlign: 'center' }
    },
    {
      label: "Remuneração Liquida",
      value: "REMUNERACAOLIQUIDA",
      type: "currency",
      containerStyle: { textAlign: 'center' }
    },
  ] as HeaderProps[];

  if(servidor){
    return (
      <Container>
      <Header />
      <SubHeader />
        <Body>
          <Path
            lastPath={lastPath}
          />
          <Content>
            <ContainerBlue>
              <ContainerDetalhe>
                <tbody>
                  <Line>
                    <td><b>Nome: </b>{servidor.NOME}</td>
                    <td><b>Matricula: </b>{servidor.MATRICULA}</td>
                  </Line>
                  <Line>
                    <td><b>Data admissão: </b>{format(new Date(servidor.ADMISSAO), 'dd/MM/yyyy')}</td>
                    <td><b>Regime: </b>{servidor.REGIME}</td>
                  </Line>
                  <Line>
                    <td><b>Cargo: </b>{servidor.CARGO}</td>
                    <td><b>Lotação: </b>{servidor.LOTACAO}</td>
                  </Line>
                  <Line>
                    <td><b>Escala/Horário: </b>{servidor.ESCALA}</td>
                    <td><b>Carga Horária: </b>{servidor.CARGAHORARIA}</td>
                  </Line>
                </tbody>
              </ContainerDetalhe>
            </ContainerBlue>
            {salaries && (
              <NewTable
                data={salaries}
                header={headers}
                pagination
                maxItemsPerPage={20}
                isDetails
                ModalDetails={ModalDetailPessoal}
              />
            )}
          </Content>

        </Body>
        <Footer />
      </Container>
    );}
      return (
        <LoaderPage loading />
        )




};

export default ServidorDetalhe;
