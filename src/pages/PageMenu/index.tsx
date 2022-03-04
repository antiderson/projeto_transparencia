import React from "react";

import { FiChevronRight } from "react-icons/fi";
import { useParams, Redirect, Link } from "react-router-dom";
import { Container, ItemContainer, Item, Title } from "./styles";

import menuOptions from "../../config/menuOptions";

import Body from "../../components/Body";
import Path from "../../components/Path";
import Footer from "../../components/Footer";
import SubHeader from "../../components/SubHeader";
import Header from "../../components/Header";

const PageMenu: React.FC = () => {
  const { id } = useParams();

  const menuOption = menuOptions.options.find(({ path }) => path === `/${id}`);

  if (menuOption) {
    return (
      <Container>
        <Header />
        <SubHeader />
        <Body>
          <Path />
          <ItemContainer>
            <Title>{menuOption?.title}</Title>
            {menuOption?.subMenu.map(subMenu => (
              <Link key={subMenu.path} to={subMenu.path}>
                <Item>
                  <p>{subMenu.title}</p>
                  <FiChevronRight />
                </Item>
              </Link>
            ))}
          </ItemContainer>
        </Body>
        <Footer />
      </Container>
    );
  }
  return <Redirect to="/" />;
};

export default PageMenu;
