import React from "react";
import { Container } from "./styles";

interface HtmlProps {
  txtHtml: string;
}

const HtmlContainer: React.FC<HtmlProps> = ({ txtHtml }) => {
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: txtHtml }} />
    </Container>
  );
};

export default HtmlContainer;
