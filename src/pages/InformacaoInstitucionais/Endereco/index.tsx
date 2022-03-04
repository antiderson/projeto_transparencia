import React, { useEffect, useState } from "react";

import { FiClock, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { Container, Content, Title, OrgaoContainer } from "./styles";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import Item from "../../../components/Item";
import LoaderPage from "../../../components/LoaderPage";
import api from "../../../services/api";

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
const Endereco: React.FC = () => {
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
            (item: OrgonogramaProps) => item.NIVEL <= 1,
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
          <ContainerBlue>
            {elements.map(info => (
              <OrgaoContainer key={info.IDSETOR}>
                <Title>{info.NMSETOR}</Title>
                <Item text={info.RESPONSAVEL} icon={FiUser} />
                <Item text={info.DSENDERECO} icon={FiMapPin} />
                <Item text={info.HORARIOFUNCIONAMENTO} icon={FiClock} />
                <Item text={info.NRTELEFONE} icon={FiPhone} />
              </OrgaoContainer>
            ))}
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default Endereco;
