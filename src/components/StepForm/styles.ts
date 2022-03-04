import { shade } from "polished";
import styled from "styled-components";

interface NumberContainerProps {
  currentStep: number;
  index: number;
}
interface BarStepProps {
  currentStep: number;
  totalStep: number;
  index: number;
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HeaderSteps = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const Content = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FooterButtons = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;

  button {
    display: flex;
    background: var(--color-second-text);
    height: 3.2rem;
    border-radius: 0.7rem;
    border: 0;
    padding: 0 0.7rem;
    color: #f7f9fb;
    width: 100%;
    font-weight: 500;
    margin-top: 1rem;
    transition: background-color 0.2s;
    align-items: center;
    justify-content: center;
    svg {
      margin: auto 0.5rem;
    }

    &:disabled,
    &:disabled:hover {
      opacity: 50%;
      background: var(--color-placeholder);
      cursor: auto;
    }

    &:hover {
      background: ${shade(0.2, "#0F4780")};
    }
  }
`;
export const NumberContainer = styled.div<NumberContainerProps>`
  min-width: 3rem;
  min-height: 3rem;
  max-width: 3rem;
  max-height: 3rem;
  border-radius: 50%;
  border: 0.2rem solid var(--color-second-text);
  background: ${props =>
    props.index <= props.currentStep
      ? `var(--color-second-text)`
      : `var(--color-background)`};
  color: ${props =>
    props.index <= props.currentStep
      ? `var(--color-background)`
      : `var(--color-second-text)`};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;

  &:hover {
    cursor: pointer;
  }
`;
export const BarStep = styled.div<BarStepProps>`
  height: 0.3rem;
  border-radius: 0.05rem;
  width: 100%;
  margin: auto 1rem;
  background: ${props =>
    props.index + 1 <= props.currentStep
      ? `var(--color-second-text)`
      : `var(--color-background)`};
`;
