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
import formatValue from "../../../utils/formatValue";



interface DiariasProps {

  cnpj: string;
  razao_social: string;
  pessoa: string;
  data_inicial: Date;
  data_final: Date;
  nrDiarias: number;
  dsDestino: string;
  objetivo: string;
  valor_unitario: string;
  valor_total: string;
  tipo_locomocao: string;
  despesas: string;
  cdnatdespesa: string;
  id_entidade: number;
  IdDiaria: number;




}


interface PathProps {
  title: string;
  path: string;
}




const PassagemDetalhe: React.FC = () => {

  const [ lastPath, setLastPath ] = useState<PathProps[]>([]);
  const [ diaria, setDiaria ] = useState<DiariasProps>();

  const location = useLocation();
  const params = useParams();


  useEffect(() => {
    async function loadDiaria(){
      const { pathname, state} = location;
      const title = state.data.data_inicial+"-"+state.data.dsDestino+"-"+state.data.pessoa as string;

      const path = [] as PathProps[];

      path.push({
        title,
        path: pathname
      })

      setDiaria(state.data)
      setLastPath(path)
    }
    loadDiaria()

  }, [params, location]);



  const formatar = (minhadata: string) => {
    const data = new Date(minhadata);
    const ano = data.getFullYear();
    const mes = `00${data.getMonth() + 1}`.slice(-2);
    const dia = `00${data.getDate()}`.slice(-2);

    return `${dia}/${mes}/${ano}`;
  };



  if(diaria){
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
                    <td colSpan={2}><b>Razão social: </b>{diaria.razao_social}</td>
                  </Line>
                  <Line>
                    <td><b>Pessoa: </b>{diaria.pessoa}</td>
                    <td><b>Tipo de locomoção: </b>{diaria.tipo_locomocao}</td>
                  </Line>
                  <Line>
                    <td><b>Data inicial: </b>{formatar(diaria.data_inicial.toString())}</td>
                    <td><b>Data final: </b>{formatar(diaria.data_final.toString())}</td>
                  </Line>
                  <Line>
                    <td><b>Nº diárias: </b>{diaria.nrDiarias}</td>
                    <td><b>Destino: </b>{diaria.dsDestino}</td>
                  </Line>
                  <Line>
                    <td><b>Valor unitário: </b>{formatValue(parseFloat((diaria.valor_unitario === null ? '0' : diaria.valor_unitario))) }</td>
                    <td><b>Valor total: </b>{formatValue(parseFloat(diaria.valor_total)) }</td>
                  </Line>
                  <Line>
                    <td colSpan={2} ><b>Objetivo: </b>{diaria.objetivo}</td>
                  </Line>
                </tbody>
              </ContainerDetalhe>
            </ContainerBlue>






          </Content>
        </Body>
        <Footer />
      </Container>
    );}
      return (
        <LoaderPage loading />
        )





};

export default PassagemDetalhe;
