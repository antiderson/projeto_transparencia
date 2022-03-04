import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  min-height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: flex-start;
`;

export const OrientationContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: start;
  align-items: flex-start;

  p {
    text-align: justify;
  }

  a {
    margin-left: 0.25rem;
  }
`;

export const FAQContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
  margin: 1.5rem 0;
`;
export const FAQItem = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;
export const Question = styled.div`
  font-weight: bold;
  margin: 0.5rem 0;
  text-align: justify;
`;
export const Answer = styled.div`
  margin: 0.5rem 0;
  text-align: justify;
`;
