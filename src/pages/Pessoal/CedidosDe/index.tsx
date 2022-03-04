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
import LoaderPage from "../../../components/LoaderPage";
import Footer from "../../../components/Footer";
import SubHeader from "../../../components/SubHeader";
import Header from "../../../components/Header";

interface SearchFormData {
  name: string;
}

interface CedidosDeProps {
  NOME: string;
  CARGO: string;
  ORGAOORIGEM: string;
  LOTACAOPMFI: string;
  DSONUS: string;
}

const CedidosDe: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [typeOfSearch, setTypeOfSearch] = useState(comumOptions.search[0]);
  const [results, setResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState<CedidosDeProps[]>([]);
  const [empresa, setEmpresa] = useState(comumOptions.entidades[0]);
  const [lastUpdate, setLastUpdate] = useState(formatISO(new Date()));

  useEffect(() => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 6,
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

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  const headers = [
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
      label: "Órgão de origem",
      value: "ORGAOORIGEM",
    },
    {
      label: "Lotação",
      value: "LOTACAOPMFI",
    },
    {
      label: "Ônus",
      value: "DSONUS",
    },
  ] as HeaderProps[];
  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <LoaderPage loading={loading} />
          <ContainerRetract title="Buscar Servidores Cedidos de Outros Órgãos">
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
                  placeholder="Mês Inicial"
                  name="initial"
                  options={comumOptions.month}
                />
                <Select
                  placeholder="Mês Final"
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

export default CedidosDe;
