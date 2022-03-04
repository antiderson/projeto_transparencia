/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from "react";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import {
  Container,
  HeaderSteps,
  Content,
  FooterButtons,
  NumberContainer,
  BarStep,
} from "./styles";

interface StepFormProps {
  steps: number;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const StepForm: React.FC<StepFormProps> = ({
  children,
  steps,
  currentStep,
  setCurrentStep,
}) => {
  const [numberOfSteps, setNumberOfSteps] = useState<number[]>(
    Array.from(Array(steps).keys()),
  );

  const handleBack = useCallback(() => {
    if (currentStep >= 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, setCurrentStep]);

  const handleForward = useCallback(() => {
    if (currentStep <= numberOfSteps.length - 2) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, numberOfSteps.length, setCurrentStep]);
  return (
    <Container>
      <HeaderSteps>
        {numberOfSteps.map((step, index) => (
          <>
            <NumberContainer
              key={index}
              onClick={() => setCurrentStep(index)}
              index={index}
              currentStep={currentStep}
            >
              {1 + step}
            </NumberContainer>
            {steps - 1 !== index && (
              <BarStep
                index={index}
                totalStep={steps}
                currentStep={currentStep}
              />
            )}
          </>
        ))}
      </HeaderSteps>
      <Content>{children}</Content>
      <FooterButtons>
        <button disabled={currentStep === 0} onClick={handleBack} type="button">
          <FiChevronLeft />
          Passo Anterior
        </button>
        <button
          disabled={currentStep === numberOfSteps.length - 1}
          onClick={handleForward}
          type="button"
        >
          Próximo Passo
          <FiChevronRight />
        </button>
      </FooterButtons>
    </Container>
  );
};

export default StepForm;
