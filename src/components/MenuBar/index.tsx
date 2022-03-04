import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiX } from "react-icons/fi";
import ReactModal from "react-modal";
import { Container, Tab, SubTab, Header } from "./styles";

interface MenuOptionsProps {
  title: string;
  path: string;
  type?: "link" | "component";
  component?: React.FC;
}

interface MenuProps {
  title: string;
  path: string;
  iconName: string;
  subMenu: MenuOptionsProps[];
}

interface MenuOptions {
  options: MenuProps[];
  isOpen: boolean;
  setIsOpen: () => void;
}

const MenuBar: React.FC<MenuOptions> = ({ options, isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: 0,
          left: 0,
          right: "auto",
          bottom: "auto",
          border: "none",
          padding: "0",
        },
        overlay: {
          backgroundColor: "#121214e6",
        },
      }}
    >
      <Container>
        <Header>
          Menu
          <FiX />
        </Header>
        {options.map(option => (
          <Tab>
            <Link to={option.path}>
              <img src={option.iconName} alt={option.iconName} />
              {option.title}
            </Link>
            {option.subMenu.map(subOptions => (
              <SubTab>
                {subOptions.type === "component" ? (
                  <Link to={subOptions.path}>
                    <FiChevronRight />
                    {subOptions.title}
                  </Link>
                ) : (
                  <a href={subOptions.path} target="_blank" rel="noreferrer">
                    <FiChevronRight />
                    {subOptions.title}
                  </a>
                )}
              </SubTab>
            ))}
          </Tab>
        ))}
      </Container>
    </ReactModal>
  );
};

export default MenuBar;
