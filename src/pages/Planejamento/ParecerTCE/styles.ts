import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: stretch;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Title = styled.div`
  color: var(--color-text);
  font-size: 1.75rem;
  @media (min-width: 1100px) {
    font-size: 1.5rem;
  }
`;
