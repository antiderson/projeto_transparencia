import styled from "styled-components";

interface ContainerLastPage {
  currentPage: number;
}

interface ContainerPage {
  currentPage: number;
  totalPages: number;
  page: number;
}

interface ContainerNextPage {
  currentPage: number;
  totalPages: number;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 7rem;
  background: var(--color-second-bg);
  border-radius: 0.75rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-top: 1rem;

  @media (max-width: 1100px) {
    flex-direction: column;
    justify-content: center;
    height: 9rem;
    row-gap: 1rem;
  }
`;

export const SelectItems = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  column-gap: 0.5rem;
  max-height: 5rem;
  @media (max-width: 1100px) {
    justify-content: center;
  }
  form {
    width: 11rem;
  }
`;
export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  column-gap: 0.25rem;
  @media (max-width: 1100px) {
    justify-content: center;
  }
`;
export const LastPage = styled.div<ContainerLastPage>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  width: 2.5rem;
  height: 2.5rem;
  background: ${props =>
    props.currentPage === 1
      ? `var(--color-placeholder)`
      : `var(--color-second-text)`};
  color: var(--color-background);

  &:hover {
    cursor: pointer;
  }
`;
export const Page = styled.div<ContainerPage>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  width: 2.5rem;
  height: 2.5rem;
  border: 0.05rem solid var(--color-second-text);

  background: ${props =>
    props.currentPage === props.page
      ? `var(--color-second-text)`
      : `transparent`};
  color: ${props =>
    props.currentPage === props.page
      ? `var(--color-background)`
      : `var(--color-second-text)`};

  &:hover {
    cursor: pointer;
  }
`;
export const NextPage = styled.div<ContainerNextPage>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  width: 2.5rem;
  height: 2.5rem;
  background: ${props =>
    props.currentPage === props.totalPages
      ? `var(--color-placeholder)`
      : `var(--color-second-text)`};
  color: var(--color-background);

  &:hover {
    cursor: pointer;
  }
`;
