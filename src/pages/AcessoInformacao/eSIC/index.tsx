/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";
import {
  FiUser,
  FiMail,
  FiMessageSquare,
  FiCreditCard,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import {
  Container,
  Content,
  Title,
  PerfilSection,
  CitySection,
  AddressSection,
  ContactSection,
  StepFormNum,
} from "./styles";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import ContainerBlue from "../../../components/ContainerBlue";
import ModalSucesso from "../../../components/ModalSucesso";
import ModalAviso from "../../../components/ModalAviso";
import Select from "../../../components/Select";
import StepForm from "../../../components/StepForm";
import getValidationErrors from "../../../utils/getValidationError";
import Footer from "../../../components/Footer";
import SubHeader from "../../../components/SubHeader";
import Header from "../../../components/Header";

interface eSICFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const eSIC: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [aviso, setAviso] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const formRef = useRef<FormHandles>(null);

  function toggleModalSuccess(): void {
    setSuccess(!success);
  }
  function toggleModalAviso(): void {
    setAviso(!aviso);
  }

  const fields = [
    {
      field: "name",
      name: "Nome",
    },
    {
      field: "perfil",
      name: "Perfil",
    },
    {
      field: "cpf",
      name: "CPF/CNPJ",
    },
    {
      field: "email",
      name: "E-mail",
    },
    {
      field: "phone",
      name: "Telefone",
    },
    {
      field: "address",
      name: "Logradouro",
    },
    {
      field: "number",
      name: "Número",
    },
    {
      field: "bairro",
      name: "Bairro",
    },
    {
      field: "city",
      name: "Cidade",
    },
    {
      field: "state",
      name: "Estado",
    },
    {
      field: "message",
      name: "Mensagem",
    },
  ];

  const handleSubmit = useCallback(
    async (data: eSICFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Este campo é obrigatório"),
          email: Yup.string()
            .required("Este campo é obrigatório")
            .email("Digite um e-mail válido"),
          message: Yup.string().required("Este campo é obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // API SEND MESSAGE

        toggleModalSuccess();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          const messageErrors = [] as string[];

          fields.forEach(field => {
            if (errors[field.field]) {
              messageErrors.push(`${field.name}: ${errors[field.field]}`);
            }
          });

          setMessageError(messageErrors.join("\n"));

          toggleModalAviso();

          formRef.current?.setErrors(errors);
        }
      }
    },
    [toggleModalSuccess],
  );

  const options = [
    { value: "cpf", label: "CPF" },
    { value: "cnpj", label: "CNPJ" },
  ];

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerBlue>
            <Title>Solicitar Informações</Title>
            <StepForm
              currentStep={currentPage}
              setCurrentStep={setCurrentPage}
              steps={3}
            >
              <Form ref={formRef} onSubmit={handleSubmit}>
                <StepFormNum currentStep={currentPage} stepForm={1}>
                  <PerfilSection>
                    <Select
                      name="perfil"
                      placeholder="Perfil"
                      options={options}
                    />
                    <Input
                      icon={FiCreditCard}
                      name="cpf"
                      placeholder="CPF/CNPJ"
                    />
                  </PerfilSection>

                  <Input
                    icon={FiUser}
                    name="name"
                    placeholder="Nome completo"
                  />

                  <ContactSection>
                    <Input icon={FiMail} name="email" placeholder="E-mail" />

                    <Input icon={FiPhone} name="phone" placeholder="Telefone" />
                  </ContactSection>
                </StepFormNum>

                <StepFormNum currentStep={currentPage} stepForm={2}>
                  <Input
                    icon={FiMapPin}
                    name="address"
                    placeholder="Logradouro"
                  />

                  <AddressSection>
                    <Input icon={FiMapPin} name="number" placeholder="Número" />

                    <Input icon={FiMapPin} name="bairro" placeholder="Bairro" />
                  </AddressSection>

                  <CitySection>
                    <Input icon={FiMapPin} name="city" placeholder="Cidade" />
                    <Input icon={FiMapPin} name="state" placeholder="Estado" />
                  </CitySection>
                </StepFormNum>
                <StepFormNum currentStep={currentPage} stepForm={3}>
                  <TextArea
                    icon={FiMessageSquare}
                    name="message"
                    placeholder="Mensagem"
                  />
                  <Button>Enviar</Button>
                </StepFormNum>
              </Form>
            </StepForm>
          </ContainerBlue>
        </Content>
      </Body>
      <ModalSucesso
        title="Sua solicitação foi enviada com sucesso!"
        isOpen={success}
        setIsOpen={toggleModalSuccess}
      />
      <ModalAviso
        title="Alguns campos são obrigatório"
        setIsOpen={toggleModalAviso}
        isOpen={aviso}
        message={messageError}
      />

      <Footer />
    </Container>
  );
};

export default eSIC;
