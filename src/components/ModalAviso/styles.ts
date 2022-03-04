import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  justify-content: center;
  color: var(--color-text);
  margin: 0 auto;

  @media (min-width: 1100px) {
    width: 480px;
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const SectionContainer = styled.section`
  margin: 1rem auto;
  white-space: pre-wrap;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.75rem;
`;
export const ButtonSuccess = styled.div`
  width: 50%;
  margin: 0 auto;
  height: 4rem;
  background: var(--color-danger);
  color: var(--color-background);
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: 0.2s;

  &:hover {
    background: var(--color-danger-shade);
  }
`;
