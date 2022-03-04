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


interface PathProps {
  title: string;
  path: string;
}




const DiariasDetalhe: React.FC = () => {

  const [ lastPath, setLastPath ] = useState<PathProps[]>([]);
  const [ diaria, setDiaria ] = useState<DiariasProps>();

  const location = useLocation();
  const params = useParams();


  useEffect(() => {
    async function loadDiaria(){
      const { pathname, state} = location;
      const title = format(new Date(state.data.data_inicial), 'dd/MM/yyyy')+" - "+state.data.dsDestino+" - "+state.data.pessoa as string;

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
                    <td><b>Razão social: </b>{diaria.razaosocial}</td>
                    <td><b>Pessoa: </b>{diaria.pessoa}</td>
                  </Line>
                  <Line>
                    <td><b>CPF: </b>{diaria.cnpjcpf}</td>
                    <td><b>Matricula: </b>{diaria.matricula}</td>
                  </Line>
                  <Line>
                    <td><b>Data inicial: </b>{format(new Date(diaria.data_inicial), "dd/MM/yyyy")}</td>
                    <td><b>Data final: </b>{format(new Date(diaria.data_final), "dd/MM/yyyy")}</td>
                  </Line>
                  <Line>
                    <td><b>Nº diárias: </b>{diaria.nrDiarias}</td>
                    <td><b>Destino: </b>{diaria.dsDestino}</td>
                  </Line>
                  <Line>
                    <td><b>Tipo de locomoção: </b>{diaria.tipo_locomocao}</td>
                    <td><b>Cargo: </b>{diaria.cargo}</td>
                  </Line>
                  <Line>
                    <td><b>Valor total: </b>{formatValue(diaria.vlTotal)}</td>
                    <td><b>Valor unitário: </b>{formatValue(diaria.vlUnitario)}</td>
                  </Line>
                  <Line>
                    <td colSpan={2} ><b>Objetivo: </b>{diaria.dsObjetivo}</td>
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

export default DiariasDetalhe;
