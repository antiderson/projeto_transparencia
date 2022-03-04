import styled from "styled-components";

export const FlowContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  min-height: 60vh;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px) {
    height: 55vh;
  }
`;

export const Level1 = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  border: 1px solid blue;
`;

export const Level2 = styled.div`
  border: 1px solid green;
`;

export const Level3 = styled.div`
  border: 1px solid red;
`;

export const FullScreen = styled.div`
  display: flex;
  position: absolute;
  top: 0rem;
  right: 0rem;
  align-items: center;
  z-index: 999;

  &:hover {
    cursor: pointer;
  }

  svg {
    margin-left: 0.5rem;
  }
`;
