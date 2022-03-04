import React from "react";

import { FiChevronRight, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Container, Title, Close, Item } from "./styles";

import Modal from "../Modal";

interface MenuOptionsProps {
  title: string;
  path: string;
  type?: "link" | "component";
  component?: React.FC;
}

interface IModalProps {
  title: string;
  path: string;
  iconName: string;
  subMenu: MenuOptionsProps[];
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalMenuBox: React.FC<IModalProps> = ({
  title,
  path,
  iconName,
  subMenu,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <header>
          <Title>
            <img src={iconName} alt={title} />
            {title}
          </Title>
          <Close onClick={setIsOpen}>
            <FiX />
          </Close>
        </header>
        <section>
          <h4>Selecione uma das opções:</h4>
          {subMenu.map(item =>
            item.type === "component" ? (
              <Link key={item.path} to={item.path}>
                <Item>
                  <FiChevronRight />
                  <p>{item.title}</p>
                </Item>
              </Link>
            ) : (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noreferrer"
              >
                <Item>
                  <FiChevronRight />
                  <p>{item.title}</p>
                </Item>
              </a>
            ),
          )}
        </section>
      </Container>
    </Modal>
  );
};

export default ModalMenuBox;
