import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface TabProps {
  currentTab: number;
  headerId: number;
}

interface ContentProps extends HTMLAttributes<HTMLElement> {
  currentTab: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 1rem 0.5rem 0.25rem;
  margin-bottom: 0.5rem;
  border-bottom: 0.1rem solid var(--color-second-text);

  overflow-x: auto;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 2.5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #787878;
  }
  ::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: inset 7px 10px 12px #f0f0f0;
  }
`;

export const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  ${props =>
    css`
      > ${props.currentTab.toString()} {
        border: 1px solid black;
      }
    `}
`;

export const Tab = styled.div<TabProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0.25rem 1rem 0;
  white-space: nowrap;
  text-transform: uppercase;

  text-decoration: ${props =>
    props.currentTab === props.headerId ? "underline" : "none"};
  color: ${props =>
    props.currentTab === props.headerId
      ? "var(--color-text)"
      : "var(--color-placeholder)"};

  &:hover {
    cursor: pointer;
  }
`;
