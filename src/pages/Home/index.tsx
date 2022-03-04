import React, { useCallback, useRef } from "react";

import { FiSearch } from "react-icons/fi";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Container, SearchContainer, Content } from "./styles";
import getValidationErrors from "../../utils/getValidationError";

import menuOptions from "../../config/menuOptions";

import MenuBox from "../../components/MenuBox";
import Header from "../../components/Header";
import SubHeader from "../../components/SubHeader";
import Footer from "../../components/Footer";
import Body from "../../components/Body";
import Input from "../../components/Input";
import Button from "../../components/Button";

interface SearchFormData {
  search: string;
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SearchFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          search: Yup.string().required("Digite algo no campo"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        history.push(`/search?search_query=${data.search}`);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [history],
  );

  return (
    <Container>
      <Header />
      <SubHeader />
      <Body>
        <SearchContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="search" icon={FiSearch} placeholder="Pesquisar" />
            <Button type="submit">Pesquisar</Button>
          </Form>
        </SearchContainer>
        <Content>
          {menuOptions.options.map(options => (
            <MenuBox
              title={options.title}
              path={options.path}
              iconName={options.iconName}
              subMenu={options.subMenu}
              key={options.title}
            />
          ))}
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default Home;
