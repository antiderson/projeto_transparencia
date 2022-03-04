import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  justify-content: center;
  color: var(--color-text);
  margin: 0 auto;
  min-height: 500px;

  @media (min-width: 1100px) {
    width: 768px;
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const SectionContainer = styled.section`
  margin: 1rem auto;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.75rem;
`;

export const Close = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const ContainerDetalhe = styled.table`
  width: 95%;
  margin: 1rem auto;
  border-collapse: collapse;
  b {
    font-weight: 600;
  }
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 2.5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #787878;
  }
  ::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: inset 7px 10px 12px #f0f0f0;
  }
`;

export const Line = styled.tr`
  td {
    border: 0.05rem solid var(--color-placeholder);
    padding: 0.75rem 0.75rem;
    text-align: left;
  }
`;

export const ContainerLoader = styled.div`
  background: transparent;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 400px;

  > p {
    margin-top: 0.5rem;
    font-size: 1.25rem;
  }
`;
