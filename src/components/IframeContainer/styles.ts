import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: stretch;
  flex-direction: column;

  > div {
    width: 100%;
    overflow: auto;
  }

  td {
    padding: 10px !important;
  }

  table {
    width: 100% !important;
  }
`;
