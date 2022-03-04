import React from "react";
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

const ModalAviso: React.FC<IModalProps> = ({
  title,
  message,
  isOpen,
  setIsOpen,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <HeaderContainer>
          <Title>{title}</Title>
        </HeaderContainer>
        <SectionContainer>{message && <p>{message}</p>}</SectionContainer>
        <SectionContainer>{children}</SectionContainer>
        <ButtonSuccess onClick={setIsOpen}>Ok!</ButtonSuccess>
      </Container>
    </Modal>
  );
};

export default ModalAviso;
