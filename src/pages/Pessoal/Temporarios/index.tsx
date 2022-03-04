import React, { useCallback, useEffect, useRef, useState } from "react";

import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { format } from "date-fns";
import { number } from "yup";
import { Container, Content, ContainerForm } from "./styles";

import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerRetract from "../../../components/ContainerRetract";
import getValidationErrors from "../../../utils/getValidationError";
import Select from "../../../components/Select";
import comumOptions from "../../../config/comumOptions";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import api from "../../../services/api";
import arrayNoDuplicateAndSelect from "../../../utils/arrayNoDuplicateAndSelect";
import NewTable, { HeaderProps } from "../../../components/NewTable";
import LoaderPage from "../../../components/LoaderPage";
import Footer from "../../../components/Footer";
import SubHeader from "../../../components/SubHeader";
import Header from "../../../components/Header";

interface SearchFormData {
  name: string;
}

interface SelectOptionProps {
  label: string;
  value: string;
}

interface FuncionarioTemporario {
  ADMISSAO: string;
  CARGAHORARIA: number;
  CARGO: string;
  CODCARGO: string;
  CODLOTACAO: string;
  EMPRESA: string;
  ESCALA: string;
  LOTACAO: string;
  MATRICULA: number;
  NOME: string;
  PRAZOCONTRATO: string;
  REGIME: string;
}
const Temporarios: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState<FuncionarioTemporario[]>([]);
  const [cargo, setCargo] = useState<SelectOptionProps[]>([]);
  const [lotacao, setLotacao] = useState<SelectOptionProps[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .post(`portal/executarapi`, {
        idapi: 5,
        parametros: [],
      })
      .then(response => {
        /**  setLastUpdate(
          format(
            new Date(response.data.data[0].DATAULTIMAATUALIZACAO),
            "dd/MM/yyyy HH:mm",
          ),
        ); */
        setTotalResults(response.data.data);

        setCargo(
          arrayNoDuplicateAndSelect(response.data.data, "CARGO", "label"),
        );

        setLotacao(
          arrayNoDuplicateAndSelect(response.data.data, "LOTACAO", "label"),
        );
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
      label: "Empresa",
      value: "EMPRESA",
      sortable: true,
    },
    {
      label: "Nome",
      value: "NOME",
      sortable: true,
    },
    {
      label: "Matricula",
      value: "MATRICULA",
    },
    {
      label: "Admissão",
      value: "ADMISSAO",
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Cargo",
      value: "CARGO",
      sortable: true,
    },
    {
      label: "Lotação",
      value: "LOTACAO",
      sortable: true,
    },
    {
      label: "Regime",
      value: "REGIME",
      sortable: true,
    },
    {
      label: "Prazo Contrato",
      value: "PRAZOCONTRATO",
      sortable: true,
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
          <ContainerRetract title="Buscar Servidores Temporários">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="name" placeholder="Nome" />
              <ContainerForm>
                <Select
                  placeholder="Cargo"
                  name="cargo"
                  options={comumOptions.month}
                />
                <Select
                  placeholder="Lotação"
                  name="lotacao"
                  options={comumOptions.year}
                />
              </ContainerForm>
              <Button type="submit">Consultar</Button>
            </Form>
          </ContainerRetract>
          <NewTable
            data={results}
            header={headers}
            exportFile="all"
            pagination
            maxItemsPerPage={20}
            lastUpdate={lastUpdate}
          />
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default Temporarios;
