import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  align-items: flex-start;

  p {
    margin: 1rem 0;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 0.5rem;
  }
`;

export const Title = styled.div`
  color: var(--color-text);
  font-size: 1.75rem;
  @media (min-width: 1100px) {
    font-size: 1.5rem;
  }
`;
