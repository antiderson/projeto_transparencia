import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  flex-direction: column;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 1rem;
  justify-content: center;
  align-items: flex-start;
  row-gap: 1rem;
`;

export const ContainerForm = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  column-gap: 0.75rem;
  margin: 0.5rem 0;
  align-items: center;
  justify-content: start;

  p {
    white-space: nowrap;
  }

  > div + div {
    margin-top: 0.5rem;
  }

  @media (min-width: 1100px) {
    flex-direction: row;
    justify-content: space-between;
    > div {
      margin-top: 0.5rem;
    }
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  column-gap: 0.5rem;
  align-items: center;
  justify-content: stretch;

  > div + div {
    margin-top: 0;
  }
`;
