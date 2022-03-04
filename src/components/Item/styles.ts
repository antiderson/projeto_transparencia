import styled from "styled-components";

interface ContainerProps {
  subItem?: number;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  color: var(--color-text);
  margin: 0.5rem 0;

  margin-left: ${props => (props.subItem ? `${props.subItem * 0.5}rem` : 0)};

  svg {
    min-width: 1.5rem;
    margin-right: 0.25rem;
    @media (min-width: 1100px) {
      margin-top: 0.15rem;
    }
  }
`;
