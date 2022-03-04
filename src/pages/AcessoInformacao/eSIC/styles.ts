import styled from "styled-components";

interface StepFormProps {
  stepForm: number;
  currentStep: number;
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  min-height: 100vh;
  align-items: stretch;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  align-items: flex-start;

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

export const PerfilSection = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  row-gap: 0.5rem;
  margin-bottom: 0.5rem;

  @media (min-width: 1100px) {
    flex-direction: row;
    column-gap: 1rem;
  }
`;
export const CitySection = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  margin-bottom: 0.5rem;

  @media (min-width: 1100px) {
    flex-direction: row;
    column-gap: 1rem;

    div {
      & + div {
        margin-top: 0;
      }
    }
  }
`;
export const AddressSection = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  margin-bottom: 0.5rem;

  @media (min-width: 1100px) {
    flex-direction: row;
    column-gap: 1rem;

    div {
      & + div {
        margin-top: 0;
      }
    }
  }
`;
export const ContactSection = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  margin-bottom: 0.5rem;

  @media (min-width: 1100px) {
    flex-direction: row;
    column-gap: 1rem;

    div {
      & + div {
        margin-top: 0;
      }
    }
  }
`;

export const StepFormNum = styled.div<StepFormProps>`
  display: ${props =>
    props.currentStep + 1 === props.stepForm ? "flex" : "none"};
  flex: 1;
  width: 100%;
  flex-direction: column;
  margin: 1.5rem 0;
`;
