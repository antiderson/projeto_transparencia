import styled from "styled-components";

export const Container = styled.div`
  border: 0.1rem solid var(--color-second-text);
  border-radius: 0.5rem;
  height: 2.75rem;
  padding: 0.25rem 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--color-second-text);
  font-size: 1.25rem;

  @media (max-width: 1100px) {
    p {
      display: none;
    }
  }

  > svg {
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  img {
    margin: 0 0.5rem;

    &:hover {
      cursor: pointer;
    }
  }
`;
