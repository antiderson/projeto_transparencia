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

  p {
    color: var(--color-second-text);
  }

  svg {
    margin: 0 1rem;
    min-width: 1.75rem;
  }
`;
