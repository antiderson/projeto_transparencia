import React from "react";

import { Container } from "./styles";

interface ContainerBlueProps {
  fullScreen?: boolean;
}

const ContainerBlue: React.FC<ContainerBlueProps> = ({
  fullScreen,
  children,
}) => {
  return <Container fullScreen={!!fullScreen}>{children}</Container>;
};
export default ContainerBlue;
