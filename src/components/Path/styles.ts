import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-width: 100%;
  padding: 0.5rem 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 6rem;
  color: var(--color-second-tex);

  svg {
    margin: 0.1rem 0.5rem auto 0;
    min-width: 1.5rem;
  }

  a {
    color: var(--color-second-tex);
  }
`;

export const PathItem = styled.div`
  margin: 0 0.5rem;
  display: flex;
  flex-direction: row;
  color: var(--color-second-tex);
  a {
    color: var(--color-second-tex);
  }

  p {
    margin-right: 0.35rem;
    color: var(--color-second-tex);
  }
`;
