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

export const GraficoTab = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`;
