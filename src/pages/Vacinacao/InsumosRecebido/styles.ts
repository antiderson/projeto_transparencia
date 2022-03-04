import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  flex-direction: column;

  > div {
    max-width: 100%;
    overflow: auto;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  align-items: flex-start;
`;

export const Title = styled.div`
  color: var(--color-text);
  font-size: 1.75rem;
  margin-bottom: 0.7rem;
  @media (min-width: 1100px) {
    font-size: 1.5rem;
  }
`;
