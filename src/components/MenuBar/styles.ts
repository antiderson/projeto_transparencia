import styled, { keyframes } from "styled-components";

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10rem);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: var(--color-background-second);
  overflow: auto;
  padding-bottom: 15rem;

  animation: ${appearFromLeft} 1s;

  @media (min-width: 1100px) {
    animation: ${appearFromLeft} 0.5s;
    width: 25rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem;
  font-size: 1.5rem;
  color: var(--color-second-text);

  svg {
    color: var(--color-second-text);
  }
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 1100px) {
    font-size: 2.5rem;
  }
`;

export const Tab = styled.div`
  padding: 0.5rem 1rem;
  transition: 0.1s;
  width: 100%;
  a {
    text-decoration: none;
    font-family: "Roboto";
    font-size: 1.75rem;
    color: var(--color-second-text);
    display: flex;
    justify-items: center;
    align-items: center;
    font-weight: 500;
    img {
      margin-right: 0.5rem;
      width: 1.5rem;
      max-height: 1.25rem;
    }
  }
  @media (min-width: 1100px) {
    a {
      font-size: 1.5rem;
    }
  }
`;

export const SubTab = styled.div`
  padding-top: 0.75rem;
  padding-left: 0.75rem;
  padding-right: 0;
  transition: 0.1s;
  width: 100%;
  & + div {
    margin-top: 0;
  }
  a {
    text-decoration: none;
    font-family: "Roboto";
    font-size: 1.25rem;
    color: var(--color-second-text);
  }
  @media (min-width: 1100px) {
    a {
      font-size: 1rem;
    }
  }

  &:hover {
    a {
      font-weight: 600;
    }
  }
`;
