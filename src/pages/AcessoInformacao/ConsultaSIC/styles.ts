import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  min-height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  align-items: flex-start;
  row-gap: 2rem;

  form {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;

    button {
      width: 30%;
      min-width: 10rem;
      margin: 0 0 0 0.5rem;
    }
  }
`;
export const ConsultaError = styled.div`
  color: var(--color-danger);
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
`;

export const Title = styled.div`
  color: var(--color-text);
  font-size: 1.75rem;
  @media (min-width: 1100px) {
    font-size: 1.5rem;
  }
`;
