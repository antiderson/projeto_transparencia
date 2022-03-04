import React, { useCallback, useRef } from "react";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";
import { Container, Content, ContainerForm } from "./styles";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerRetract from "../../../components/ContainerRetract";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DatePicker from "../../../components/DatePicker";
import getValidationErrors from "../../../utils/getValidationError";

interface SearchFormData {
  name: string;
}

const Parceria: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SearchFormData) => {
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
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        const messageErrors = [] as string[];

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerRetract title="Parceria/Convênio">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <ContainerForm>
                <Select placeholder="Entidade Governamental" name="entidade" />
                <Select placeholder="Tipo Execução" name="tipo" />
              </ContainerForm>
              <ContainerForm>
                <Input name="number" placeholder="Número" />
                <Select placeholder="Ano" name="year" />
                <DatePicker name="initial" placeholderText="Data Inicial" />
                <DatePicker name="final" placeholderText="Data Final" />
              </ContainerForm>
              <Input name="benificiario" placeholder="Beneficiário" />
              <Button type="submit">Consultar</Button>
            </Form>
          </ContainerRetract>
        </Content>
      </Body>

      <Footer />
    </Container>
  );
};

export default Parceria;
