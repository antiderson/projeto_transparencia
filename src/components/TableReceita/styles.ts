import styled, { css } from "styled-components";

interface TableCellProps {
  data?: string;
  textAlign?: string;
  nivel?: number;
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
`;

export const Title = styled.caption`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0.25rem 0;

  @media (min-width: 1100px) {
    font-size: 1.5rem;
  }
`;

export const PreTableContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "lastUpdate exportFile";
  align-items: center;
  margin: 0.25rem 0;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "lastUpdate" "exportFile";
    row-gap: 1rem;
  }
`;
export const LastUpdate = styled.div`
  grid-area: lastUpdate;
  display: flex;
  align-items: center;
  color: var(--color-placeholder);
  margin-bottom: 0.5rem;

  > svg {
    margin-right: 0.5rem;
  }
`;

export const TableComponent = styled.table`
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const TableHeader = styled.thead`
  tr {
    border-bottom: 0.15rem solid var(--color-second-text);
    @media (max-width: 1100px) {
      display: block;
    }
  }
  @media (max-width: 1100px) {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;

export const THeader = styled.th`
  padding: 0.5rem 1rem;
  text-align: center;
  color: var(--color-second-text);
  text-transform: uppercase;

  svg {
    margin-left: 0.25rem;
  }
`;

export const TableBody = styled.tbody`
  color: var(--color-second-text);
  tr {
    padding: 0.35rem;

    border-bottom: 0.05rem solid var(--color-second-text);

    & + tr:nth-child(2n) {
      background: #e3f2fd;
    }

    @media (max-width: 1100px) {
      margin-bottom: 0.25em;
      display: block;
    }
  }
`;

export const TableCell = styled.td<TableCellProps>`
  padding: 0.5rem 0;
  text-align: ${props => (props.textAlign ? props.textAlign : "start")};
  align-items: center;

  svg {
    margin-left: ${props =>
      props.data === "receita" && props.nivel ? props.nivel * 0.25 : 0}rem;
  }

  ${props =>
    props.data === "receita" &&
    css`
      display: flex;
      justify-content: start;
    `}

  > div {
    text-decoration: underline;

    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1100px) {
    padding: 0.5rem 0.25rem;
    display: block;
    font-size: 1.25rem;
    text-align: right;

    &::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
      margin-right: 0.5rem;
    }
  }
`;

export const SelectWithLabel = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 1rem;
  align-items: center;

  form {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 1100px) {
    display: none;
  }
`;
