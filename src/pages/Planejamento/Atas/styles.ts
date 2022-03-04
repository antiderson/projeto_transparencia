import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex: 1;
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
  row-gap: 2rem;
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

export const Title = styled.div`
  color: var(--color-text);
  font-size: 1.75rem;
  display: flex;
  flex: 1;
  max-height: 3.2rem;
  white-space: nowrap;
  justify-content: start;
  align-items: center;
  @media (min-width: 1100px) {
    font-size: 1.5rem;
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
