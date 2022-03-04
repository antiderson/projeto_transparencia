/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useRef, useState } from "react";
import { FiUser } from "react-icons/fi";
import * as Yup from "yup";
import Body from "../../../components/Body";
import Button from "../../../components/Button";
import ContainerRetract from "../../../components/ContainerRetract";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import NewTable from "../../../components/NewTable";
import Path from "../../../components/Path";
import SubHeader from "../../../components/SubHeader";
import getValidationErrors from "../../../utils/getValidationError";
import { ConsultaError, Container, Content } from "./styles";

interface ConsultaSICFormData {
  cpf: string;
}

const dataFake = [
  {
    cpf: "08109149995",
    description:
      "Olá! A informação que preciso é de como proceder para conseguir um estágio remunerado quando se iniciarem as aulas novamente. Estou cursando o 4° semestre em pedagogia. Aguardo ansiosamente por um retorno. Obrigada pela atenção!!",
    number: "00001/2021",
    numberFormatted: "00001-2021",
  },
  {
    cpf: "08109149995",
    description:
      "Olá! A informação que preciso é de como proceder para conseguir um estágio remunerado quando se iniciarem as aulas novamente. Estou cursando o 4° semestre em pedagogia. Aguardo ansiosamente por um retorno. Obrigada pela atenção!!",
    number: "00002/2021",
    numberFormatted: "00002-2021",
  },
  {
    numberFormatted: "00003-2021",
    cpf: "08109149995",
    description:
      "Olá! A informação que preciso é de como proceder para conseguir um estágio remunerado quando se iniciarem as aulas novamente. Estou cursando o 4° semestre em pedagogia. Aguardo ansiosamente por um retorno. Obrigada pela atenção!!",
    number: "00003/2021",
  },
  {
    cpf: "08109149995",
    description:
      "Olá! A informação que preciso é de como proceder para conseguir um estágio remunerado quando se iniciarem as aulas novamente. Estou cursando o 4° semestre em pedagogia. Aguardo ansiosamente por um retorno. Obrigada pela atenção!!",
    number: "00004/2021",
    numberFormatted: "00004-2021",
  },

  {
    cpf: "08109149995",
    description:
      "Olá! A informação que preciso é de como proceder para conseguir um estágio remunerado quando se iniciarem as aulas novamente. Estou cursando o 4° semestre em pedagogia. Aguardo ansiosamente por um retorno. Obrigada pela atenção!!",
    number: "00005/2021",
    numberFormatted: "00005-2021",
  },
];

const ConsultaSIC: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [consulta, setConsulta] = useState<any[]>([]);
  const [consultaErro, setConsultaErro] = useState(false);

  const handleSubmit = useCallback(async (data: ConsultaSICFormData) => {
    try {
      formRef.current?.setErrors({});

      const cpfRegExp =
        /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;
      const schema = Yup.object().shape({
        cpf: Yup.string()
          .matches(cpfRegExp, "CPF ou CNPJ não válido")
          .required("Este campo é obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setConsulta(dataFake);

      if (dataFake.length === 0) {
        setConsultaErro(true);
      } else {
        setConsultaErro(false);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  const headers = [
    {
      label: "CPF",
      value: "cpf",
    },
    {
      label: "Descrição Pedido",
      value: "description",
    },
    {
      label: "Solicitação",
      value: "number",
      sortable: true,
    },
  ];

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <Path />
        <Content>
          <ContainerRetract title="Consultar SIC">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="cpf"
                icon={FiUser}
                placeholder="CPF (Somente números)"
              />
              <Button type="submit">Pesquisar</Button>
            </Form>
          </ContainerRetract>
          {consultaErro && (
            <ConsultaError>Nenhum registro encontrado</ConsultaError>
          )}
          {!consultaErro && !!consulta.length && (
            <NewTable
              isSelected
              path=":numberFormatted"
              exportFile="all"
              pagination
              header={headers}
              data={consulta}
            />
          )}
        </Content>
      </Body>

      <Footer />
    </Container>
  );
};

export default ConsultaSIC;
