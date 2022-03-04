/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import { Container, Content } from "./styles";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import Flow from "../../../components/Flow";
import LoaderPage from "../../../components/LoaderPage";
import api from "../../../services/api";
import Footer from "../../../components/Footer";
import SubHeader from "../../../components/SubHeader";
import Header from "../../../components/Header";

interface OrgonogramaProps {
  HIERARQUIA: string;
  IDSETOR: number;
  IDSETORPAI: number;
  NIVEL: number;
  NMSETOR: string;
  DSENDERECO: string;
  NRTELEFONE: string;
  IDTIPOSETOR: number;
  HORARIOFUNCIONAMENTO: string;
  RESPONSAVEL: string;
}

const Estrutura: React.FC = () => {
  const [elements, setElements] = useState<OrgonogramaProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 8,
        parametros: [],
      })
      .then(response => {
        setElements(
          response.data.data.filter(
            (item: OrgonogramaProps) => item.NIVEL <= 2,
          ),
        );
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <LoaderPage loading={loading} />
          <Flow elements={elements} />
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default Estrutura;
