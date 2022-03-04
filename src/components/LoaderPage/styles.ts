import styled from "styled-components";

export const Container = styled.div`
  background-color: rgba(227, 242, 253, 0.5);
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  > p {
    margin-top: 0.5rem;
    font-size: 1.25rem;
  }
`;
