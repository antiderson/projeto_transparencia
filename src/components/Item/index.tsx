import React from "react";

import { IconBaseProps } from "react-icons";
import { Container } from "./styles";

interface ItemProps {
  text: string;
  subItem?: number;
  icon: React.ComponentType<IconBaseProps>;
}

const Item: React.FC<ItemProps> = ({ text, subItem, icon: Icon }) => {
  return (
    <Container subItem={subItem}>
      <Icon />
      <p>{text}</p>
    </Container>
  );
};

export default Item;
