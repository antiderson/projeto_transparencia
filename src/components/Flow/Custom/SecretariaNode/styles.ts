import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  row-gap: 0.25rem;

  .title {
    color: #0f4780;
    font-weight: 600;
  }

  .name {
    color: #3e6b99;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  svg {
    margin-right: 0.5rem;
  }
`;
