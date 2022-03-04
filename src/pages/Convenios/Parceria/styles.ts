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
`;

export const ContainerForm = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  column-gap: 0.75rem;
  margin: 0.5rem 0;

  > div + div {
    margin-top: 0.5rem;
  }

  @media (min-width: 1100px) {
    flex-direction: row;
    > div {
      margin-top: 0.5rem;
    }
  }
`;
