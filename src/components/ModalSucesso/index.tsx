import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Title,
  HeaderContainer,
  SectionContainer,
  ButtonSuccess,
} from "./styles";

import Modal from "../Modal";

interface IModalProps {
  title: string;
  message?: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalSucesso: React.FC<IModalProps> = ({
  title,
  message,
  isOpen,
  setIsOpen,
}) => {
  const history = useHistory();

  const handleToHome = useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <HeaderContainer>
          <Title>{title}</Title>
        </HeaderContainer>
        <SectionContainer>{message && <p>{message}</p>}</SectionContainer>
        <ButtonSuccess onClick={handleToHome}>Ok!</ButtonSuccess>
      </Container>
    </Modal>
  );
};

export default ModalSucesso;
