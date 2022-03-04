/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import VLibras from "@djpfs/react-vlibras-typescript";
import GlobalStyle from "./styles/global";
import AppProvider from "./hooks";

import Routes from "./routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <VLibras />
        <Routes />
        <GlobalStyle />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
