import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  flex-direction: column;
`;

export const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: flex-start;

  a {
    display: flex;
    background: var(--color-second-bg);
    border-radius: 0.75rem;
    width: 100%;
    min-height: 4rem;
    flex-direction: row;
    padding: 1rem;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: var(--color-second-text);
    & + a {
      margin-top: 0.75rem;
    }
  }
`;

export const Title = styled.h3`
  margin: 1rem 0rem 1rem 0.5rem;
`;

export const Item = styled.div`
  display: flex;
  flex: 1;
  background: var(--color-second-bg);
  border-radius: 0.75rem;
  width: 100%;
  min-height: 4rem;
  flex-direction: row;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: start;
    > svg {
      margin: 0 0.5rem;
    }
  }

  p {
    color: var(--color-second-text);
  }

  svg {
    margin: 0 1rem;
    min-width: 1.75rem;
  }
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
