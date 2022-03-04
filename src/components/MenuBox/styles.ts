import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  background: var(--color-second-bg);
  border-radius: 0.75rem;
  padding: 1rem;
  width: 100%;
  height: 11rem;
  margin-bottom: 1rem;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    background: var(--color-second-bg-shade);
  }

  @media (min-width: 1100px) {
    width: 25rem;
    height: 12rem;
    margin-bottom: 0;
  }
`;

export const HeaderBox = styled.header`
  display: flex;
  flex-direction: row;
  height: 2rem;
  align-items: center;
  justify-content: start;
  margin-bottom: 0.5rem;

  img {
    max-height: 1.5rem;
    max-width: 2rem;
  }

  h3 {
    margin-left: 0.5rem;
  }
`;
export const SectionBox = styled.section`
  display: flex;
  flex: 1;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;

    p {
      margin-left: 0.5rem;
    }
  }
`;
export const FooterBox = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  max-height: 2rem;

  p {
    margin-right: 0.25rem;
  }
`;
