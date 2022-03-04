import React, { useState } from "react";

import { FiChevronRight, FiArrowRight } from "react-icons/fi";
import { Container, HeaderBox, SectionBox, FooterBox } from "./styles";

import ModalMenuBox from "../ModalMenuBox";

import trimString from "../../utils/trimString";

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

const MenuBox: React.FC<MenuProps> = ({ title, path, iconName, subMenu }) => {
  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <Container onClick={toggleModal}>
        <HeaderBox>
          <img src={iconName} alt={iconName} />
          <h3>{title}</h3>
        </HeaderBox>
        <SectionBox>
          <ul>
            {subMenu[0] && (
              <li>
                <FiChevronRight />
                <p>{trimString(subMenu[0].title)}</p>
              </li>
            )}
            {subMenu[1] && (
              <li>
                <FiChevronRight />
                <p>{trimString(subMenu[1].title)}</p>
              </li>
            )}
            {subMenu[2] && (
              <li>
                <FiChevronRight />
                <p>{trimString(subMenu[2].title)}</p>
              </li>
            )}
            {subMenu[3] && (
              <li>
                <FiChevronRight />
                <p>e mais...</p>
              </li>
            )}
          </ul>
        </SectionBox>
        <FooterBox>
          <p>Abrir</p>
          <FiArrowRight />
        </FooterBox>
      </Container>
      <ModalMenuBox
        title={title}
        path={path}
        iconName={iconName}
        subMenu={subMenu}
        isOpen={modalOpen}
        setIsOpen={toggleModal}
      />
    </>
  );
};

export default MenuBox;
