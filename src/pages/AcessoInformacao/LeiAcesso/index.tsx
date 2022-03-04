import React from "react";

import { Container, Content, Title } from "./styles";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import ItemText from "../../../components/ItemText";

const LeiAcesso: React.FC = () => {
  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerBlue>
            <Title>Legislação do Portal da Transparência</Title>
            <p>
              Criado conforme a Lei Federal nº 12.527, Lei de Acesso à
              Informação de 18 de novembro de 2011. Lei que efetiva o direito
              previsto no artigo 5º, inciso XXXIII da Constituição Federal, de
              que todos têm a prerrogativa de receber dos órgãos públicos além
              de informações do seu interesse pessoal, também aquelas de
              interesse coletivo.
            </p>
            <p>
              A Lei Complementar nº 131 de 27 de maio de 2009 (
              <a href="http://www.planalto.gov.br/ccivil_03/LEIS/LCP/Lcp131.htm">
                Lei Capiberibe
              </a>
              ). Acrescenta dispositivos à Lei Complementar n.º 101, de 4 de
              maio de 2000, que estabelece normas de finanças públicas voltadas
              para a responsabilidade na gestão fiscal e dá outras providências,
              a fim de determinar a disponibilização, em tempo real, de
              informações pormenorizadas sobre a execução orçamentária e
              financeira da União, dos Estados, do Distrito Federal e dos
              Municípios.
            </p>
            <p>
              Lei Complementar nº 101, de 4 de maio de 2000 - Lei de
              Responsabilidade Fiscal (LRF). Estabelece normas de finanças
              públicas voltadas para a responsabilidade na gestão fiscal e dá
              outras providências.
            </p>
            <p>
              A Lei Municipal Nº 3528, de 14 de maio de 2009. Dispões sobre a
              implementação do Portal da Transparência no âmbito dos Poderes
              Executivo e Legislativo de Foz do Iguaçu e dá outras providências,
              com alterações através das Leis Municipais Nº 3.945/2012 e
              4.329/2015.
            </p>
            <Title>Decretos</Title>
            <p>
              Decreto nº 7.724, de 16 de maio de 2012 que regulamenta a Lei no
              12.527, de 18 de novembro de 2011, que dispõe sobre o acesso a
              informações previsto no inciso XXXIII do caput do art. 5o, no
              inciso II do § 3o do art. 37 e no § 2o do art. 216 da
              Constituição.
            </p>
            <p>
              Decreto nº 7.592, de 28 de outubro de 2011. Determina a avaliação
              da regularidade da execução dos convênios, contratos de repasse e
              termos de parceria celebrados com entidades privadas sem fins
              lucrativos até a publicação do Decreto nº 7.568, de 16 de setembro
              de 2011, e dá outras providências.
            </p>
            <p>
              Decreto nº 7.185, de 27 de maio de 2010. Dispõe sobre o padrão
              mínimo de qualidade do sistema integrado de administração
              financeira e controle, no âmbito de cada ente da Federação, nos
              termos do art. 48, parágrafo único, inciso III, da Lei
              Complementar nº 101, de 4 de maio de 2000, e dá outras
              providências.
            </p>
            <p>
              Decreto nº 6.170, de 25 de julho de 2007. Dispõe as normas
              relativas às transferências de recursos da União mediante
              convênios e contratos de repasse, e dá outras providências.
            </p>
            <p>
              Decreto Municipal Nº 23.445, de 31 de outubro de 2014. Dispões
              sobre os procedimentos relativos ao Acesso à Informação Pública
              estabelecidos pela Lei Federal Nº 12.527, de 18 de novembro de
              2011, no âmbito do Poder Executivo Municipal.
            </p>
          </ContainerBlue>
        </Content>
      </Body>

      <Footer />
    </Container>
  );
};

export default LeiAcesso;
