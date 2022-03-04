import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

import { Container } from "./styles";

interface LoaderPageProps {
  loading: boolean;
}

const LoaderPage: React.FC<LoaderPageProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <Container>
          <SyncLoader color="#0F4780" loading />
          <p>Carregando...</p>
        </Container>
      )}
    </>
  );
};

export default LoaderPage;
