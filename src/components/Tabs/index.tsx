/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { useState } from "react";

import { Container, Header, Content, Tab } from "./styles";

interface HeaderProps {
  title: string;
  id: number;
}

interface TabsProps {
  header: HeaderProps[];
  currentTab: number;
  setCurrentTab: (number: number) => void;
}

const Tabs: React.FC<TabsProps> = ({
  header,
  children,
  currentTab,
  setCurrentTab,
}) => {
  return (
    <Container>
      <Header>
        {header.map(tab => (
          <Tab
            onClick={() => setCurrentTab(tab.id)}
            currentTab={currentTab}
            headerId={tab.id}
            key={tab.id}
          >
            {tab.title}
          </Tab>
        ))}
      </Header>
      <Content currentTab={currentTab}>{children}</Content>
    </Container>
  );
};

export default Tabs;
