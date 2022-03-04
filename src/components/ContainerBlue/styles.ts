import styled, { css } from "styled-components";

interface ContainerProps {
  fullScreen: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${props =>
    props.fullScreen
      ? css`
          position: absolute;
          display: flex;
          flex: 1;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 999;
          flex-direction: column;
          width: 100%;
          border-radius: 1rem;
          background: var(--color-second-bg);
          justify-content: flex-start;
          align-items: flex-start;
          padding: 1rem;
        `
      : css`
          display: flex;
          flex: 1;
          flex-direction: column;
          width: 100%;
          border-radius: 1rem;
          background: var(--color-second-bg);
          justify-content: flex-start;
          align-items: flex-start;
          padding: 1rem;
        `};
`;
