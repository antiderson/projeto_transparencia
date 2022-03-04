import React from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import {
  FooterContainer,
  Container,
  AddressContainer,
  Logo,
  Title,
  Info,
  SocialNet,
  InfoContainer,
  Social,
  IconContainer,
  Ouvidoria,
} from "./styles";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <AddressContainer>
          <Logo />
          <InfoContainer>
            <Title>Prefeitura Municipal de Foz do Iguaçu</Title>
            <Info>
              <FiMapPin />
              Praça Getúlio Vargas, 280 - Centro - CEP: 85851-340
            </Info>
            <Info>
              <FiPhone />
              (45) 2105-1000
            </Info>
            <Info>
              <FiMail />
              pmfi@pmfi.pr.gov.br
            </Info>
          </InfoContainer>
        </AddressContainer>
        <SocialNet>
          <Social>
            <Title>Redes Sociais:</Title>
            <IconContainer>
              <a href="https://pt-br.facebook.com/prefeituradefozoficial/">
                <FiFacebook />
              </a>
              <a href="https://www.instagram.com/fozdoiguacu_prefeitura/">
                <FiInstagram />
              </a>
              <a href="https://www.linkedin.com/company/prefeitura-municipal-de-foz-do-igua%C3%A7u/">
                <FiLinkedin />
              </a>
            </IconContainer>
          </Social>
          <Ouvidoria>
            <Title>Ouvidoria</Title>
            <Info>
              <FiMail />
              ouvidoriageral@pmfi.pr.gov.br
            </Info>
            <Info>
              <FiPhone />
              0800-045-0156
            </Info>
          </Ouvidoria>
        </SocialNet>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
