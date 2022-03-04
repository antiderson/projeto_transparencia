import React, { useCallback, useEffect, useRef, useState } from "react";
import api from "../../../../../services/api";

import formatCell from "../../../utils/formatCell";

import {
  Container,
  TitleTable,
  TableComponent,
  TableHeader,
  THeader,
  TableBody,
  TableCell,
  ContainerHeader,
  Logo,
  Title,
  HeaderContainer,
} from "./styles";

export interface HeaderProps {
  label: string;
  value: string;
  sortable?: boolean;
  type?: "currency" | "string" | "date";
  formatDate?: string;
  containerStyle?: Object;
}
interface TableProps {
  title: string;
  header: HeaderProps[];
  data: any[];
  isSelected?: boolean;
  path?: string;
  isDetails?: boolean;
  exportFile?: string[] | "all";
  ModalDetails?: React.FC<any>;
  modalDetailsProps?: any;
  pagination?: boolean;
  maxItemsPerPage?: number;
  lastUpdate?: string;
}

const PageComponentA4: React.FC<TableProps> = ({ title, header, data }) => {
  return (
    <Container>
      <HeaderContainer>
        <ContainerHeader>
          <Logo />
          <Title>
            <h1>PREFEITURA DE FOZ DO IGUAÇU</h1>
            <h2>Portal da Transparência</h2>
          </Title>
        </ContainerHeader>
      </HeaderContainer>
      <TableComponent>
        <TableHeader>
          <tr>
            {header.map(col => (
              <THeader key={col.value} scope="col">
                {col.label}
              </THeader>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((row: any) => (
            <tr>
              {header.map(item => (
                <TableCell
                  style={item?.containerStyle}
                  key={item.value}
                  data-label={item.label}
                >
                  {item.type
                    ? formatCell(
                        row[item.value],
                        item.type,
                        item.formatDate || undefined,
                      )
                    : row[item.value]}
                </TableCell>
              ))}
            </tr>
          ))}
        </TableBody>
      </TableComponent>
    </Container>
  );
};

export default PageComponentA4;
