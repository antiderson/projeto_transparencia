import styled from "styled-components";

export const BodyContainer = styled.div`
  max-width: 1100px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1100px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  margin-bottom: 5rem;
`;
