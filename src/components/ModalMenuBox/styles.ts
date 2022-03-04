import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  justify-content: center;
  color: var(--color-text);

  header {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  section {
    margin: 1rem 0 0.5rem 0;
  }

  a {
    text-decoration: none;
    color: var(--color-text);
  }

  @media (min-width: 1100px) {
    width: 768px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.75rem;

  img {
    margin-right: 0.5rem;

    width: 1.5rem;
    max-height: 1.5rem;
  }
`;
export const Close = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const Item = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 0.75rem 0;

  svg {
    min-width: 1.75rem;
    margin-right: 0.5rem;
  }
`;
