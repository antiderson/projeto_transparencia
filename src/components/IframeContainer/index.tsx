/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { Container } from "./styles";

interface IframesProps {
  url: string;
  className?: string;
}

const IframeContainer: React.FC<IframesProps> = ({ url }) => {
  return (
    <Container>
      <iframe src={url} width="100%" height="750" allowFullScreen />
    </Container>
  );
};

export default IframeContainer;
