import React from "react";
import { FiLink } from "react-icons/fi";

import { Container } from "./styles";

interface ItemLinkProps {
  text: string;
  link: string;
  subItem?: number;
  target?: string;
}

const ItemLink: React.FC<ItemLinkProps> = ({ text, link, subItem, target }) => {
  return (
    <Container subItem={subItem}>
      <FiLink />
      <a target={target || "_blank"} href={link} rel="noreferrer">
        {text}
      </a>
    </Container>
  );
};

export default ItemLink;
