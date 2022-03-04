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
import email from "../../../services/email";
import { Container, Content, Title } from "./styles";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import ContainerBlue from "../../../components/ContainerBlue";
import getValidationErrors from "../../../utils/getValidationError";
import ModalSucesso from "../../../components/ModalSucesso";
import ModalAviso from "../../../components/ModalAviso";
import ItemLink from "../../../components/ItemLink";
import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";

interface OuvidoriaFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const Denuncias: React.FC = () => {
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
    async (data: OuvidoriaFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email("Digite um e-mail válido"),
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
            `EnviarEmailSitePMFI?email=gabriel.gbo@pmfi.pr.gov.br&assunto=${data.topic}&msg=${message}`,
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
    [toggleModalAviso, toggleModalSuccess],
  );
  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerBlue>
            <Title>
              DENÚNCIAS OUVIDORIA GERAL Telefone ouvidoria: (45) 2105-1290
            </Title>
            <br />
            <br />
            <ItemLink
              text="CLIQUE AQUI PARA ENVIAR UM DENÚNCIA PARA OUVIDORIA GERAL DO SUS"
              link="https://antigo.saude.gov.br/saude-de-a-z/ouvidoria-do-sus"
            />
            <br />
            <br />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                icon={FiUser}
                name="name"
                placeholder="Nome completo (Não obrigatório)"
              />

              <Input
                icon={FiMail}
                name="email"
                placeholder="E-mail (Não obrigatório)"
              />

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

export default Denuncias;
