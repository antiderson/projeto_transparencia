import React, { useCallback, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Container, SubHeaderContainer, MenuContainer } from "./styles";
import menuOptions from "../../config/menuOptions";

import Acessibilidade from "../Acessibilidade";
import MenuBar from "../MenuBar";

const SubHeader: React.FC = () => {
  const [menu, setMenu] = useState<boolean>(false);

  const handleMenuOpen = useCallback(() => {
    setMenu(!menu);
  }, [menu]);

  return (
    <>
      <SubHeaderContainer>
        <Container>
          <MenuContainer onClick={handleMenuOpen}>
            {menu ? <FiX /> : <FiMenu />}
            Menu
            <MenuBar
              options={menuOptions.options}
              isOpen={menu}
              setIsOpen={handleMenuOpen}
            />
          </MenuContainer>
          <Acessibilidade />
        </Container>
      </SubHeaderContainer>
    </>
  );
};

export default SubHeader;
