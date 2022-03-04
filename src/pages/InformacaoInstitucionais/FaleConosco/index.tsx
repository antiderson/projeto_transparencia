/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";
import {
  FiUser,
  FiChevronRight,
  FiMail,
  FiMessageSquare,
} from "react-icons/fi";
import { Container, Content, Title } from "./styles";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import ContainerBlue from "../../../components/ContainerBlue";
import getValidationErrors from "../../../utils/getValidationError";
import ModalSucesso from "../../../components/ModalSucesso";
import email from "../../../services/email";
import ModalAviso from "../../../components/ModalAviso";

interface FaleConoscoFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const FaleConosco: React.FC = () => {
  const [aviso, setAviso] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<FormHandles>(null);

  function toggleModalSuccess(): void {
    setSuccess(!success);
  }
  function toggleModalAviso(): void {
    setAviso(!aviso);
  }

  const handleSubmit = useCallback(
    async (data: FaleConoscoFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Este campo é obrigatório"),
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("Este campo é obrigatório"),
          topic: Yup.string().required("Este campo é obrigatório"),
          message: Yup.string().required("Este campo é obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const message = `Nome: ${data.name ? data.name : "Anônimo"} | Email: ${
          data.email ? data.email : "Anônimo"
        } | Assunto: ${data.topic} | Mensagem: ${data.message}`;

        email
          .get(
            `EnviarEmailSitePMFI?email=pmfi@pmfi.pr.gov.br&assunto=${data.topic}&msg=${message}`,
          )
          .then(response => {
            if (response.data.msg) {
              toggleModalSuccess();
            } else {
              toggleModalAviso();
            }
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [toggleModalSuccess],
  );

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerBlue>
            <Title>Fale Conosco</Title>
            <p>
              Preencha o formulário ou entre em contato através do telefone (45)
              3521-1000
            </p>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input icon={FiUser} name="name" placeholder="Nome completo" />

              <Input icon={FiMail} name="email" placeholder="E-mail" />

              <Input icon={FiChevronRight} name="topic" placeholder="Assunto" />
              <TextArea
                icon={FiMessageSquare}
                name="message"
                placeholder="Mensagem"
              />
              <Button>Enviar</Button>
            </Form>
          </ContainerBlue>
        </Content>
      </Body>
      <ModalSucesso
        title="Sua solicitação foi enviada com sucesso!"
        isOpen={success}
        setIsOpen={toggleModalSuccess}
      />
      <ModalAviso
        isOpen={aviso}
        setIsOpen={toggleModalAviso}
        title="Erro ao enviar mensagem!"
        message="Algo de errado deu errado. Tente novamente mais tarde."
      />
      <Footer />
    </Container>
  );
};

export default FaleConosco;
