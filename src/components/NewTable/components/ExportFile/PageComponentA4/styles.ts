import styled from "styled-components";

import logopmfi from "../../../../../assets/logo.png";

interface TableCellProps {
  textAlign?: string;
}

export const Container = styled.div`
  background: transparent;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 16px;
  padding: 16px;
`;

export const TitleTable = styled.caption`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0.25rem 0;

  @media (min-width: 1100px) {
    font-size: 1.5rem;
  }
`;
export const TableComponent = styled.table`
  border-collapse: collapse;
  margin: 0px;
  padding: 0px;
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
  padding: 0.5rem 1rem;
  text-align: ${props => (props.textAlign ? props.textAlign : "start")};

  > div {
    text-decoration: underline;

    &:hover {
      cursor: pointer;
    }
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

export const HeaderContainer = styled.header`
  background: transparent;
  display: flex;
  height: 7rem;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const ContainerHeader = styled.div`
  padding: 1rem;
  display: flex;
  max-width: 1100px;
  flex-direction: row;
  justify-content: center;
`;

export const Logo = styled.svg`
  flex: 1;
  background: url(${logopmfi}) no-repeat center;
  max-height: 5.2rem;
  width: 4.8rem;
  background-size: contain;
  padding: 0;
`;

export const Title = styled.div`
  margin: auto 0;
  color: var(--color-second-text);
  padding: 0;
  margin-left: 0.5rem;

  h1 {
    font-size: 2rem;
    margin: 0;
    font-weight: 600;
  }
  h2 {
    margin-top: 0.5rem;
    font-size: 1.75rem;
  }
`;
