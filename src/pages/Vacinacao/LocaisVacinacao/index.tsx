import React, { useEffect, useState } from "react";

import axios from "axios";
import { Container, Content, Title } from "./styles";

import Body from "../../../components/Body";
import Path from "../../../components/Path";

import NewTable, { HeaderProps } from "../../../components/NewTable";
import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";

interface LocaisProps {
  id: number;
  nome: string;
  endereco: string;
  telefone: number;
  id_local: number;
  id_servico: number;
  link_mapa?: string;
  hora_inicial: string;
  hora_fim: string;
  hora_formatada: string;
}

const LocalVacinacao: React.FC = () => {
  const [local, setLocal] = useState<LocaisProps[]>([]);

  useEffect(() => {
    async function loadPas() {
      const res = await axios.get(
        `https://sistemas.pmfi.pr.gov.br/RP/SMTIAPI/ApiSite/Prefeitura/ListarLocaisVacina`,
      );

      const listaLocaisVacinaFormatada = res.data.listaLocaisVacina.map(
        (item: LocaisProps) => {
          return {
            ...item,
            hora_formatada: `${item.hora_inicial} - ${item.hora_fim}`,
          };
        },
      );

      setLocal(listaLocaisVacinaFormatada);
    }

    loadPas();
  }, []);

  const headers = [
    {
      label: "Nome",
      value: "nome",
      containerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      label: "Endereço",
      value: "endereco",
    },
    {
      label: "Telefone",
      value: "telefone",
      containerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      label: "Horário de Funcionamento",
      value: "hora_formatada",
    },
  ] as HeaderProps[];

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <NewTable
            title="LOCAIS DE VACINAÇÃO"
            data={local}
            header={headers}
            exportFile={["print", "pdf"]}
            pagination
            maxItemsPerPage={20}
          />
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default LocalVacinacao;
