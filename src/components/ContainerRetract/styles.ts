import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  border-radius: 1rem;
  background: var(--color-second-bg);
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
  align-items: baseline;
`;
const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10rem);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;
export const RetractButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin-right: 0.25rem;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 1100px) {
    font-size: 1.25rem;
  }

  svg {
    margin-left: 0.5rem;

    font-size: 1.75rem;
    @media (min-width: 1100px) {
      font-size: 1.5rem;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  margin-top: 0.25rem;
  flex-direction: column;
`;
