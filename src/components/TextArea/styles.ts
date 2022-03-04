import styled, { css } from "styled-components";

import Tooltip from "../Tooltip";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--color-background);
  border-radius: 0.75rem;

  border: 0.15rem solid var(--color-second-text);
  padding: 0.75rem;
  width: 100%;
  min-height: 15rem;
  color: var(--color-text);
  display: flex;
  align-items: flex-start;
  & + div {
    margin-top: 0.5rem;
  }
  ${props =>
    props.isFocused &&
    css`
      border: 0.17rem solid var(--color-second-text);
    `}

  ${props =>
    props.isFilled &&
    css`
      border: 0.17rem solid var(--color-second-text);
    `}

    ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--color-text);
    min-height: 15rem;

    &::placeholder {
      color: var(--color-placeholder);
    }
  }
  svg {
    margin-right: 1rem;
  }
`;

export const AlertError = styled(Tooltip)`
  height: 1.5rem;
  margin-left: 1rem;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
