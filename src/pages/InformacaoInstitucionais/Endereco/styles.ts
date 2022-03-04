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
  padding: 0 1rem;
  justify-content: space-between;
  align-items: flex-start;
`;
export const Title = styled.div`
  color: var(--color-text);
  font-size: 1.75rem;
  border-bottom: 0.01rem solid var(--color-text);
  @media (min-width: 1100px) {
    font-size: 1.5rem;
  }
`;

export const OrgaoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;

  & + div {
    margin-top: 1rem;
  }
`;
