/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import { FiChevronRight, FiSearch } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Form } from "@unform/web";
import {
  Container,
  ItemContainer,
  Title,
  Item,
  SearchContainer,
} from "./styles";
import Body from "../../components/Body";
import menuOptions from "../../config/menuOptions";
import Home from "../Home";
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationError";
import LoaderPage from "../../components/LoaderPage";
import Footer from "../../components/Footer";
import SubHeader from "../../components/SubHeader";
import Header from "../../components/Header";

interface MenuFilteredProps {
  title: string;
  path: string;
  type: "link" | "component";
  component: React.FC | undefined;
  titlePai?: string;
}

interface SearchFormData {
  search: string;
}

const Search: React.FC = () => {
  const location = useLocation();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [query, term] = location.search.split("=");

  const [results, setResults] = useState<MenuFilteredProps[]>([]);
  const [loading, setLoading] = useState(false);

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
  useEffect(() => {
    setLoading(true);

    const menuFiltered: MenuFilteredProps[] = [];

    menuOptions.options.forEach(menu => {
      menuFiltered.push({
        title: menu.title,
        path: menu.path,
        type: "component",
        component: menu.component,
      });
      menu.subMenu.forEach(subMenu => {
        menuFiltered.push({
          title: subMenu.title,
          path: subMenu.path,
          type: subMenu.type || "component",
          component: subMenu.type === "component" ? subMenu.component : Home,
          titlePai: menu.title,
        });
      });
    });

    const fuse = new Fuse(menuFiltered, {
      includeScore: true,
      threshold: 1,
      keys: [
        {
          name: "title",
          weight: 1,
        },
        {
          name: "tags",
          weight: 0.3,
        },
      ],
    });
    const res = fuse.search(term).map(result => {
      return result.item;
    });

    setResults(res);
    setLoading(false);
  }, [location.search, term]);

  return (
    <Container>
      <LoaderPage loading={loading} />
      <Header />
      <SubHeader />
      <Body>
        <SearchContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="search"
              icon={FiSearch}
              placeholder="Não encontrou? Pesquise novamente"
            />
            <Button type="submit">Pesquisar</Button>
          </Form>
        </SearchContainer>
        <ItemContainer>
          <Title>
            Resultados da pesquisa:
            <i>{`"${decodeURIComponent(term)}"`}</i>
          </Title>
          {results.map(item => (
            <Link key={item.path} to={item.path}>
              <Item>
                {item.titlePai ? (
                  <div>
                    <p>{item.titlePai}</p>
                    <FiChevronRight />
                    <p>
                      <u>{item.title}</u>
                    </p>
                  </div>
                ) : (
                  <p>{item.title}</p>
                )}
                <FiChevronRight />
              </Item>
            </Link>
          ))}
        </ItemContainer>
      </Body>
      <Footer />
    </Container>
  );
};

export default Search;
