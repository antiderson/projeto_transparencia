import React from "react";
import { Link } from "react-router-dom";
import { Container, Logo, Title, HeaderContainer } from "./styles";

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Container>
        <Link to="/">
          <Logo />
        </Link>
        <Title>
          <h1>PREFEITURA DE FOZ DO IGUAÇU</h1>
          <h2>Portal da Transparência</h2>
        </Title>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
