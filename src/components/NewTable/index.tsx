/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/style-prop-object */
/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/scope */
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiChevronUp,
  FiClock,
  FiDownload,
} from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { CSSObject } from "styled-components";
import Select from "../Select";

import ExportFile from "./components/ExportFile";
import Pagination from "./components/Pagination";
import LoaderPage from "../LoaderPage";

import formatCell from "./utils/formatCell";

import {
  Container,
  Title,
  TableComponent,
  TableHeader,
  THeader,
  TableBody,
  TableCell,
  PreTableContainer,
  TableContainer,
  LastUpdate,
  SelectWithLabel,
} from "./styles";

export interface HeaderProps {
  label: string;
  value: string;
  sortable?: boolean;
  type?: "currency" | "string" | "date";
  formatDate?: string;
  containerStyle?: Object;
}

interface OptionsSelectProps {
  label: string;
  value: string | number | boolean;
}

interface TableProps {
  title?: string;
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
  isDownload?: boolean;
  formatFile?: string;
  nameFile?: string;
  typeDownload?: "link" | "base64" | "function";
  stringDownload?: string;
  downloadOnClick?: () => void;
}

function setHref(
  typeDownload: "link" | "base64",
  stringDownload: string,
  formatFile: string,
): string {
  if (typeDownload === "base64") {
    return `data:application/${formatFile};base64,${stringDownload}`;
  }
  return stringDownload;
}

const NewTable: React.FC<TableProps> = ({
  title,
  header,
  data,
  isSelected,
  path,
  isDetails,
  ModalDetails,
  exportFile,
  modalDetailsProps,
  pagination,
  maxItemsPerPage,
  lastUpdate,
  isDownload,
  formatFile,
  nameFile,
  typeDownload,
  stringDownload,
  downloadOnClick,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalDetail, setModalDetails] = useState();
  const [dataTable, setDataTable] = useState(data);
  const [sortDirection, setSortDirection] = useState<number>(-1);
  const [sortItem, setSortItem] = useState("");
  const [page, setPage] = useState<any[]>([]);
  const [sortSelect, setSortSelect] = useState<OptionsSelectProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function loaderPage() {
      if (maxItemsPerPage) {
        setPage(data.slice(0, maxItemsPerPage));
      } else {
        data.slice(0, 20);
      }
      setDataTable(data);
    }
    loaderPage();
  }, [data, maxItemsPerPage]);
  useEffect(() => {
    const sel = [] as OptionsSelectProps[];
    header.forEach(head => {
      if (head.sortable === true) {
        sel.push({ label: head.label, value: head.value });
      }
    });
    setSortSelect(sel);
    //  DoubleScroll(document.getElementById("tableContainer"));
  }, [header]);

  function toggleModal(): void {
    setIsOpen(!isOpen);
  }
  function toggleModalDetail(detail: any): void {
    toggleModal();
    setModalDetails(detail);
  }
  const history = useHistory();

  const handleClick = useCallback(
    (row: any, finalPath: string | undefined) => {
      if (isSelected && finalPath) {
        const [getPath, code] = finalPath.split(":");
        history.push({
          pathname: `${history.location.pathname}/${getPath}${row[code]}`,
          state: { data: row },
        });
      }
    },
    [history, isSelected],
  );

  const handlePage = useCallback(
    (currentPage: number, totalItens: number) => {
      setPage(
        dataTable.slice(
          (currentPage - 1) * totalItens,
          currentPage * totalItens,
        ),
      );
    },
    [dataTable],
  );

  const toggleSort = useCallback(
    (item: string) => {
      setLoading(true);
      if (sortDirection === 1) {
        const direction = -1;
        setSortDirection(-1);
        setSortItem(item);
        const newData = handleSort(item, direction, data);
        setDataTable(newData);
        setPage(
          maxItemsPerPage
            ? newData.slice(0, maxItemsPerPage)
            : newData.slice(0, 20),
        );
        setLoading(false);
      }
      if (sortDirection === -1) {
        const direction = 1;
        setSortDirection(1);
        setSortItem(item);
        const newData = handleSort(item, direction, data);
        setDataTable(newData);
        setPage(
          maxItemsPerPage
            ? newData.slice(0, maxItemsPerPage)
            : newData.slice(0, 20),
        );
        setLoading(false);
      }
    },
    [data, maxItemsPerPage, sortDirection],
  );

  function handleSort(item: string, direction: number, dataArray: any[]) {
    const sortData = dataArray.sort((a, b) => {
      if (a[item] > b[item]) {
        return direction;
      }
      if (a[item] < b[item]) {
        return -1 * direction;
      }
      return 0;
    });
    return sortData;
  }

  function DoubleScroll(element: HTMLElement | null) {
    if (element) {
      const scrollbar = document.getElementById("scrollbar");
      if (scrollbar) {
        scrollbar.onscroll = function () {
          element.scrollLeft = scrollbar.scrollLeft;
        };
        element.onscroll = function () {
          scrollbar.scrollLeft = element.scrollLeft;
        };
        element?.parentNode?.insertBefore(scrollbar, element);
      }
    }
  }

  return (
    <Container>
      <LoaderPage loading={loading} />
      <PreTableContainer>
        {lastUpdate && (
          <LastUpdate>
            <FiClock />
            {`Última atualização: ${lastUpdate}`}
          </LastUpdate>
        )}
        {exportFile && (
          <ExportFile
            exportFile={exportFile}
            data={dataTable}
            header={header}
          />
        )}
      </PreTableContainer>
      <TableContainer id="tableContainer">
        <TableComponent>
          {title && <Title>{title}</Title>}
          {header.findIndex(head => head.sortable === true) >= 0 && (
            <SelectWithLabel>
              <span>Ordenar:</span>
              <Form onSubmit={() => {}} ref={formRef}>
                <Select
                  placeholder="Tipo"
                  name="sortSelect"
                  options={sortSelect}
                  onChange={value => toggleSort(value?.value)}
                />
              </Form>
            </SelectWithLabel>
          )}

          <TableHeader>
            <tr>
              {header.map(col => (
                <THeader
                  key={col.value}
                  onClick={
                    col.sortable ? () => toggleSort(col.value) : () => {}
                  }
                  scope="col"
                  sortable={col.sortable}
                >
                  {col.label}
                  {col.sortable &&
                    sortItem === col.value &&
                    (!(sortDirection + 1) ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    ))}
                </THeader>
              ))}
              {isDetails && <THeader scope="col">Detalhes</THeader>}
              {isSelected && <THeader scope="col">Sel.</THeader>}
              {isDownload && <THeader scope="col">Download</THeader>}
            </tr>
          </TableHeader>
          <TableBody isSelected={isSelected}>
            {page.map((row: any) => (
              <tr onClick={() => (path ? handleClick(row, path) : {})}>
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
                {isDetails && (
                  <TableCell
                    textAlign="center"
                    data-label="Detalhes"
                    onClick={() => toggleModalDetail(row)}
                  >
                    <div>Detalhes</div>
                  </TableCell>
                )}
                {isSelected && (
                  <TableCell data-label="Sel.">
                    <FiChevronRight />
                  </TableCell>
                )}
                {isDownload && typeDownload && (
                  <TableCell textAlign="center" data-label="Download">
                    {typeDownload === "function"
                      ? downloadOnClick && (
                          <div onClick={() => console.log("")}>
                            <FiDownload />
                            Baixar
                          </div>
                        )
                      : stringDownload &&
                        formatFile && (
                          <a
                            href={setHref(
                              typeDownload,
                              row[stringDownload],
                              row[formatFile],
                            )}
                            download={
                              nameFile
                                ? `${row[nameFile]}.${row[formatFile]}`
                                : `PortalTransparenciaFozDoIguacu.${row[formatFile]}`
                            }
                          >
                            <FiDownload />
                            Baixar
                          </a>
                        )}
                  </TableCell>
                )}
              </tr>
            ))}
          </TableBody>
        </TableComponent>
      </TableContainer>
      {pagination && data && (
        <Pagination
          dataLength={data.length}
          maxItemsPerPage={maxItemsPerPage}
          setPage={handlePage}
        />
      )}
      {ModalDetails && (
        <ModalDetails
          isOpen={isOpen}
          setIsOpen={toggleModal}
          modalDetail={modalDetail}
          {...modalDetailsProps}
        />
      )}
    </Container>
  );
};

export default NewTable;
