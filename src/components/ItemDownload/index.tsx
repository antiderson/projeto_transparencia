import React from "react";
import { FiDownload } from "react-icons/fi";

import { Container } from "./styles";

interface ItemDownloadProps {
  text: string;
  link: string;
  subItem?: number;
  target?: string;
}

const ItemDownload: React.FC<ItemDownloadProps> = ({
  text,
  link,
  subItem,
  target,
}) => {
  return (
    <Container subItem={subItem}>
      <FiDownload />
      <a target={target || "_blank"} download href={link}>
        {text}
      </a>
    </Container>
  );
};

export default ItemDownload;
