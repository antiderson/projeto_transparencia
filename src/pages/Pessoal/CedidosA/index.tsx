import React, { useCallback, useEffect, useRef, useState } from "react";

import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { formatISO } from "date-fns";
import { Container, Content, ContainerForm } from "./styles";

import comumOptions from "../../../config/comumOptions";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerRetract from "../../../components/ContainerRetract";
import getValidationErrors from "../../../utils/getValidationError";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import NewTable, { HeaderProps } from "../../../components/NewTable";
import api from "../../../services/api";
import Footer from "../../../components/Footer";
import SubHeader from "../../../components/SubHeader";
import Header from "../../../components/Header";

interface SearchFormData {
  name: string;
}

interface CedidosAProps {
  MATRICULA: number;
  NOME: string;
  CARGO: string;
  LOTACAO: string;
  DSONUS: string;
  DSATO: string;
}

const CedidosA: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [typeOfSearch, setTypeOfSearch] = useState(comumOptions.search[0]);
  const [results, setResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState<CedidosAProps[]>([]);
  const [empresa, setEmpresa] = useState(comumOptions.entidades[0]);
  const [lastUpdate, setLastUpdate] = useState(formatISO(new Date()));

  useEffect(() => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 7,
        parametros: [],
      })
      .then(response => {
        setTotalResults(response.data.data);
        setResults(response.data.data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = useCallback(async (data: SearchFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Este campo ?? obrigat??rio"),
        email: Yup.string()
          .required("Este campo ?? obrigat??rio")
          .email("Digite um e-mail v??lido"),
        message: Yup.string().required("Este campo ?? obrigat??rio"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // API SEND MESSAGE
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  const headers = [
    {
      label: "Matr??cula",
      value: "MATRICULA",
    },
    {
      label: "Nome",
      value: "NOME",
    },
    {
      label: "Cargo",
      value: "CARGO",
      sortable: true,
    },
    {
      label: "Local",
      value: "LOTACAO",
    },
    {
      label: "??nus",
      value: "DSONUS",
    },
    {
      label: "Ato",
      value: "DSATO",
    },
  ] as HeaderProps[];

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerRetract title="Buscar Servidores Cedidos a Outros ??rg??os">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <ContainerForm>
                <Select
                  placeholder="Entidade Governamental"
                  name="entidade"
                  options={comumOptions.entidades}
                  defaultValue={comumOptions.entidades[0]}
                />
              </ContainerForm>
              <ContainerForm>
                <Select
                  placeholder="M??s Inicial"
                  name="initial"
                  options={comumOptions.month}
                />
                <Select
                  placeholder="M??s Final"
                  name="final"
                  options={comumOptions.month}
                />
                <Select
                  placeholder="Ano"
                  name="year"
                  options={comumOptions.year}
                />
              </ContainerForm>
              <Input name="name" placeholder="Nome" />
              <Button type="submit">Consultar</Button>
            </Form>
          </ContainerRetract>
          <NewTable
            data={results}
            header={headers}
            exportFile="all"
            pagination
            lastUpdate={lastUpdate}
          />
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default CedidosA;
