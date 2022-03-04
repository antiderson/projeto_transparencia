/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/no-empty-function */
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Select from "../../../Select";

import {
  Container,
  SelectItems,
  PageContainer,
  LastPage,
  Page,
  NextPage,
} from "./styles";

interface OptionProps {
  value: string | number;
  label: string;
}

interface PaginationProps {
  maxItemsPerPage?: number;
  dataLength: number;
  setPage: (currentPage: number, totalItens: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  maxItemsPerPage,
  dataLength,
  setPage,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [defaultNItens, setDefaultNIntens] = useState<OptionProps>(
    maxItemsPerPage
      ? {
          value: maxItemsPerPage,
          label: `${maxItemsPerPage} itens`,
        }
      : {
          value: 20,
          label: "20 itens",
        },
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [maxItems, setMaxItems] = useState(maxItemsPerPage || 20);
  const [arrayNumber, setArrayNumber] = useState<number[]>([]);

  useEffect(() => {
    const total = Math.ceil(dataLength / maxItems);
    setArrayNumber(Array.from({ length: total }, (_, i) => i + 1));
    setTotalPages(total);
    setPage(currentPage, maxItems);
  }, [currentPage, dataLength, maxItems, setPage]);

  const handleMaxItem = useCallback(value => {
    setMaxItems(value.value);
    setCurrentPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    if (currentPage !== totalPages) {
      setPage(currentPage + 1, maxItems);
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, maxItems, setPage, totalPages]);

  const handlePage = useCallback(
    (numberPage: number) => {
      setCurrentPage(numberPage);
      setPage(numberPage, maxItems);
    },
    [maxItems, setPage],
  );

  const handleLastPage = useCallback(() => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setPage(currentPage - 1, maxItems);
    }
  }, [currentPage, maxItems, setPage]);

  return (
    <Container>
      <SelectItems>
        <Form ref={formRef} onSubmit={() => {}}>
          <Select
            name="itens"
            options={[
              { value: 5, label: "5 itens" },
              { value: 10, label: "10 itens" },
              { value: 15, label: "15 itens" },
              { value: 20, label: "20 itens" },
              { value: 25, label: "25 itens" },
              { value: 30, label: "30 itens" },
              { value: 40, label: "40 itens" },
              { value: 50, label: "50 itens" },
            ]}
            defaultValue={defaultNItens}
            onChange={handleMaxItem}
          />
        </Form>
      </SelectItems>
      {totalPages > 1 && (
        <PageContainer>
          <LastPage onClick={handleLastPage} currentPage={currentPage}>
            <FiChevronLeft />
          </LastPage>
          {totalPages <= 7 ? (
            arrayNumber.map(index => (
              <Page
                key={index + 1}
                onClick={() => handlePage(index)}
                totalPages={totalPages}
                page={index}
                currentPage={currentPage}
              >
                {index}
              </Page>
            ))
          ) : (
            <>
              <Page
                onClick={() => handlePage(1)}
                totalPages={totalPages}
                page={1}
                currentPage={currentPage}
              >
                {1}
              </Page>
              {currentPage > 4 ? (
                <Page
                  onClick={() => handlePage(Math.ceil((currentPage + 1) / 2))}
                  totalPages={totalPages}
                  page={0}
                  currentPage={currentPage}
                >
                  ...
                </Page>
              ) : (
                <Page
                  onClick={() => handlePage(2)}
                  totalPages={totalPages}
                  page={2}
                  currentPage={currentPage}
                >
                  {2}
                </Page>
              )}
              {currentPage <= 4
                ? arrayNumber.slice(2, 5).map(index => (
                    <Page
                      key={index + 1}
                      onClick={() => handlePage(index)}
                      totalPages={totalPages}
                      page={index}
                      currentPage={currentPage}
                    >
                      {index}
                    </Page>
                  ))
                : currentPage <= totalPages - 3
                ? arrayNumber
                    .slice(currentPage - 2, currentPage + 1)
                    .map(index => (
                      <Page
                        key={index + 1}
                        onClick={() => handlePage(index)}
                        totalPages={totalPages}
                        page={index}
                        currentPage={currentPage}
                      >
                        {index}
                      </Page>
                    ))
                : arrayNumber
                    .slice(totalPages - 5, totalPages - 2)
                    .map(index => (
                      <Page
                        key={index + 1}
                        onClick={() => handlePage(index)}
                        totalPages={totalPages}
                        page={index}
                        currentPage={currentPage}
                      >
                        {index}
                      </Page>
                    ))}

              {currentPage < totalPages - 3 ? (
                <Page
                  onClick={() =>
                    handlePage(Math.ceil((currentPage + totalPages) / 2))
                  }
                  totalPages={totalPages}
                  page={0}
                  currentPage={currentPage}
                >
                  ...
                </Page>
              ) : (
                <Page
                  onClick={() => handlePage(totalPages - 1)}
                  totalPages={totalPages}
                  page={totalPages - 1}
                  currentPage={currentPage}
                >
                  {totalPages - 1}
                </Page>
              )}
              <Page
                onClick={() => handlePage(totalPages)}
                totalPages={totalPages}
                page={totalPages}
                currentPage={currentPage}
              >
                {totalPages}
              </Page>
            </>
          )}
          <NextPage
            onClick={handleNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
          >
            <FiChevronRight />
          </NextPage>
        </PageContainer>
      )}
    </Container>
  );
};

export default Pagination;
