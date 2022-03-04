import styled from "styled-components";

export const Container = styled.button`
  background: var(--color-second-text);
  height: 2.75rem;
  border-radius: 0.5rem;
  border: 0;
  padding: 0.25rem 0.5rem;
  color: #f7f9fb;
  width: 100%;
  font-weight: 500;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background: var(--color-second-text-shade);
  }
`;
