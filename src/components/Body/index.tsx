import React from "react";
import { Container, BodyContainer } from "./styles";

const Body: React.FC = ({ children }) => {
  return (
    <Container>
      <BodyContainer>{children}</BodyContainer>
    </Container>
  );
};

export default Body;
