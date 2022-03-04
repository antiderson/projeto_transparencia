import styled, { keyframes } from "styled-components";

export const SubHeaderContainer = styled.header`
  background: none;
  display: flex;
  width: 100%;
  height: 4rem;
  flex-direction: row;
  justify-content: center;
`;

export const Container = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  width: 100%;
  max-width: 1100px;
  flex-direction: row;
  justify-content: space-between;
`;

const appearFade = keyframes`
  from {
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: var(--color-second-text);
  align-items: center;
  font-size: 1.5rem;
  svg {
    margin-right: 0.5rem;
    animation: ${appearFade} 1s;
  }

  &:hover {
    cursor: pointer;
  }
`;
