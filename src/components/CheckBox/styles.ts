import styled from "styled-components";

export const Container = styled.div`
  height: 3.2rem;
  padding: 0.75rem;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: start;
  column-gap: 1rem;

  & + div {
    margin-top: 0.5rem;
  }

  label {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--color-text);
    margin-right: 0.5rem;
  }
`;
