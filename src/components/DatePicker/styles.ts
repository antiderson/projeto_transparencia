import styled from "styled-components";

export const Container = styled.div`
  background: var(--color-background);
  border-radius: 0.5rem;
  height: 2.75rem;
  border: 0.1rem solid var(--color-second-text);
  padding: 0.25rem 0.5rem;
  width: 100%;
  color: var(--color-text);
  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.5rem;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--color-text);

    &::placeholder {
      color: var(--color-placeholder);
    }
  }
`;
