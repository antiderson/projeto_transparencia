import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: flex-start;
  row-gap: 2rem;
`;

export const ContainerDetalhe = styled.table`
  width: 95%;
  margin: 1rem auto;
  border-collapse: collapse;
  b {
    font-weight: 600;
  }
`;

export const Line = styled.tr`
  @media (max-width: 1100px) {
    display: block;

    &:last-child {
      > td:last-child {
        border-bottom: 0.05rem solid var(--color-placeholder);
      }
    }
  }
  td {
    border: 0.05rem solid var(--color-placeholder);
    padding: 0.75rem 0.75rem;
    text-align: left;
    @media (max-width: 1100px) {
      display: block;
      border-bottom: 0;
    }
  }
`;
