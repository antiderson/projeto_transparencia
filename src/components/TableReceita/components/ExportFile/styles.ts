import styled from "styled-components";

export const Container = styled.div`
  grid-area: exportFile;
  display: flex;
  justify-content: end;
  margin: 0.5rem 0 0.5rem auto;

  @media (max-width: 1100px) {
    margin: 0.5rem 0;
    justify-content: center;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  border-radius: 0.5rem;
  border: 0.05rem solid var(--color-second-text);
`;
export const TypeContainer = styled.div`
  display: flex;
  color: var(--color-second-text);
  padding: 0.5rem;
  border-right: 0.05rem solid var(--color-second-text);

  &:nth-last-child(1) {
    border-right: none;
  }

  svg {
    margin-right: 0.5rem;
    color: var(--color-second-text);
  }

  @media (max-width: 1100px) {
    justify-content: center;

    svg {
      margin-right: 0rem;
    }
    p {
      display: none;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;
