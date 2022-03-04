import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  & + div {
    margin-top: 0.5rem;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  color: var(--color-text);
  font-weight: 500;
  margin: 0.5rem auto;
`;
