import styled from "styled-components";

import logopmfi from "../../assets/logo.png";

export const HeaderContainer = styled.header`
  background: var(--color-second-text);
  display: flex;
  height: 7rem;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const Container = styled.div`
  background: var(--color-second-text);
  padding: 1rem;
  display: flex;
  max-width: 1100px;
  flex-direction: row;
  justify-content: center;
`;

export const Logo = styled.svg`
  flex: 1;
  background: url(${logopmfi}) no-repeat center;
  max-height: 5.2rem;
  width: 4.8rem;
  background-size: contain;
  padding: 0;
`;

export const Title = styled.div`
  margin: auto 0;
  color: var(--color-background);
  padding: 0;
  margin-left: 0.5rem;

  h1 {
    font-size: 2rem;
    margin: 0;
    font-weight: 600;
  }
  h2 {
    margin-top: 0.5rem;
    font-size: 1.75rem;
  }
  @media (max-width: 1100px) {
    h1 {
      font-size: 1.5rem;
      margin: 0;
      font-weight: 600;
    }
    h2 {
      margin-top: 0.5rem;
      font-size: 1.25rem;
    }
  }
`;
