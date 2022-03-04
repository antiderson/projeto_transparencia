import React from "react";
import { FiChevronRight } from "react-icons/fi";

import { Container } from "./styles";

interface ItemProps {
  text: string;
  subItem?: number;
}

const ItemText: React.FC<ItemProps> = ({ text, subItem }) => {
  return (
    <Container subItem={subItem}>
      <FiChevronRight />
      <p>{text}</p>
    </Container>
  );
};

export default ItemText;
