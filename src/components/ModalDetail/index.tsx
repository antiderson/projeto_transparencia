import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { FiX } from "react-icons/fi";
import {
  Container,
  Title,
  HeaderContainer,
  Close,
  SectionContainer,
  ButtonSuccess,
} from "./styles";

import Modal from "../Modal";

interface IModalProps {
  title: string;
  message?: string;
  modalDetail: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalDetailPessoal: React.FC<IModalProps> = ({
  message,
  modalDetail,
  isOpen,
  setIsOpen,
}) => {
  const history = useHistory();

  const handleToHome = useCallback(() => {
    setIsOpen();
  }, [history]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <HeaderContainer>
          <Title>{modalDetail.descricao}</Title>
          <Close onClick={setIsOpen}>
            <FiX />
          </Close>
        </HeaderContainer>
        <SectionContainer>{message && <p>{message}</p>}</SectionContainer>
        <ButtonSuccess onClick={handleToHome}>Ok!</ButtonSuccess>
      </Container>
    </Modal>
  );
};

export default ModalDetailPessoal;
