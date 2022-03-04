import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"

import { Container, Header, RetractButton, Content } from "./styles";

interface ContainerRetractProps {
  title: string;
}

const ContainerRetract: React.FC<ContainerRetractProps> = ({
  title,
  children,
}) => {
  const [retract, setRetract] = useState(false);
  return (
    <Container>
      <Header>
        <h3>{title}</h3>

        <RetractButton onClick={() => setRetract(!retract)}>
          {retract ? (
            <>
              <p>Estender</p>
              <FiChevronDown />
            </>
          ) : (
            <>
              <p>Encolher</p>
              <FiChevronUp />
            </>
          )}
        </RetractButton>
      </Header>
      {!retract && <Content>{children}</Content>}
    </Container>
  );
};

export default ContainerRetract;
