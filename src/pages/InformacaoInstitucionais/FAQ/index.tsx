import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Content,
  OrientationContainer,
  FAQContainer,
  FAQItem,
  Question,
  Answer,
} from "./styles";

import perguntas from "./config/perguntasfrenquentes";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";

interface SearchFormData {
  search: string;
}

interface FaqProps {
  id: number;
  pergunta: string;
  resposta: string;
}

const FAQ: React.FC = () => {
  const [faq, setFaq] = useState<FaqProps[]>([]);

  useEffect(() => {
    async function loadFAQ() {
      const res = await axios.get(
        `https://sistemas.pmfi.pr.gov.br/RP/PORTALTRANSPARENCIAAPI/portal/ListarFAQs`,
        {},
      );
      setFaq(res.data.FAQList);
    }

    loadFAQ();
  }, []);

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerBlue>
            <OrientationContainer>
              <p>
                Nessa seção encontra as Perguntas mais Frenquencia (FAQ), caso
                não encontre o que está procurando, acesse o
                <Link to="/acesso-info/fale-conosco">Fale Conosco</Link>
              </p>
            </OrientationContainer>
            <FAQContainer>
              {faq.map((item, index) => (
                <FAQItem key={item.id}>
                  <Question>{`${index + 1} - ${item.pergunta}`}</Question>
                  <Answer>{item.resposta}</Answer>
                </FAQItem>
              ))}
            </FAQContainer>
          </ContainerBlue>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default FAQ;
