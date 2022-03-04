import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  flex-direction: column;
`;

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  max-height: 3.5rem;
  justify-content: center;
  padding: 0 1rem;

  @media (min-width: 1100px) {
    padding: 0 15%;
  }

  form {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    button {
      width: 30%;
      min-width: 10rem;
      margin: 0 0 0 0.5rem;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 1.5rem 1rem;

  @media (min-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
`;
