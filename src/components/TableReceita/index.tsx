/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useState } from "react";
import { FiChevronDown, FiChevronRight, FiClock } from "react-icons/fi";

import ExportFile from "./components/ExportFile";
import LoaderPage from "../LoaderPage";
import ModalDetailReceita from "../ModalDetailReceita";

import formatValue from "../../utils/formatValue";

import {
  Container,
  Title,
  TableComponent,
  TableHeader,
  THeader,
  TableBody,
  TableCell,
  PreTableContainer,
  LastUpdate,
} from "./styles";
import { HeaderProps } from "../NewTable";

interface ReceitaProps {
  [key: string]: string | number;
  receita: string;
  descricao: string;
  nivel: number;
  inicio: number;
  tamanho: number;
  valorOrcado: number;
  valorAtualizado: number;
  valorArrecadado: number;
  JANEIRO: number;
  FEVEREIRO: number;
  MARÇO: number;
  ABRIL: number;
  MAIO: number;
  JUNHO: number;
  JULHO: number;
  AGOSTO: number;
  SETEMBRO: number;
  OUTUBRO: number;
  NOVEMBRO: number;
  DEZEMBRO: number;
  TIPO: string;
}

interface TableProps {
  title?: string;
  data: ReceitaProps[];
  exportFile?: string[] | "all";
  lastUpdate?: string;
}

const TableReceita: React.FC<TableProps> = ({
  title,
  data,
  exportFile,
  lastUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalReceita, setModalReceita] = useState<ReceitaProps>();
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState<string[]>([]);
  const [treeOpened, setTreeOpened] = useState<string[]>([]);
  const [receitasData, setReceitasData] = useState<ReceitaProps[]>([]);

  useEffect(() => {
    setReceitasData(data);
    const formattedTree = data
      .filter(item => item.nivel === 1)
      .map(item => {
        return item.receita;
      });
    setTree(formattedTree);
  }, [data]);

  function toggleModal(): void {
    setIsOpen(!isOpen);
  }
  function toggleModalReceita(detail: any): void {
    toggleModal();
    setModalReceita(detail);
  }

  const handleOpenReceita = useCallback(
    (receita: ReceitaProps) => {
      const receitaLength = receita.receita.length;
      const nextReceita = data
        .filter(
          receitas =>
            receitas.receita.substring(0, receitaLength) === receita.receita &&
            receitas.nivel === receita.nivel + 1,
        )
        .map(item => {
          return item.receita;
        });
      if (tree.some(item => nextReceita.includes(item))) {
        // fechar
        const filteredTreeOpened = treeOpened.filter(
          item => item !== receita.receita,
        );
        const allNextReceita = tree
          .filter(
            receitas =>
              receitas.substring(0, receitaLength) === receita.receita &&
              receitas.length > receitaLength,
          )
          .map(item => {
            return item;
          });
        setTreeOpened(
          filteredTreeOpened.filter(item => !allNextReceita.includes(item)),
        );
        setTree(tree.filter(item => !allNextReceita.includes(item)));
      } else {
        // abrir
        setTreeOpened([...treeOpened, receita.receita]);
        setTree([...tree, ...nextReceita]);
      }
    },
    [data, tree, treeOpened],
  );

  const headerTable: HeaderProps[] = [
    { label: "Receita", value: "receita" },
    { label: "Descrição", value: "descricao" },
    { label: "Arrecado", value: "valorArrecadado", type: "currency" },
    { label: "Orçado", value: "valorOrcado", type: "currency" },
  ];

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
            data={receitasData}
            header={headerTable}
            exportFile={exportFile}
          />
        )}
      </PreTableContainer>
      <TableComponent>
        {title && <Title>{title}</Title>}

        <TableHeader>
          <tr>
            <THeader key="receita" scope="col">
              Receita
            </THeader>
            <THeader key="descricao" scope="col">
              Descrição
            </THeader>
            <THeader key="arrecadado" scope="col">
              Arrecadado
            </THeader>
            <THeader key="orcado" scope="col">
              Orçado
            </THeader>
            <THeader key="detalhes" scope="col">
              Detalhes
            </THeader>
          </tr>
        </TableHeader>
        <TableBody>
          {receitasData.map(
            (row: ReceitaProps) =>
              tree.includes(row.receita) && (
                <tr key={row.receita}>
                  <TableCell
                    onClick={() => handleOpenReceita(row)}
                    data="receita"
                    nivel={row.nivel}
                    key="receita"
                    data-label="Receita"
                  >
                    {treeOpened.includes(row.receita) ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                    {row.receita}
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenReceita(row)}
                    key="descricao"
                    data-label="Descrição"
                  >
                    {row.descricao}
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenReceita(row)}
                    textAlign="center"
                    data="valorArrecadado"
                    key="arrecadado"
                    data-label="Arrecadado"
                  >
                    {formatValue(row.valorArrecadado)}
                  </TableCell>
                  <TableCell
                    onClick={() => handleOpenReceita(row)}
                    textAlign="center"
                    data="valorOrcado"
                    key="orcado"
                    data-label="Orçado"
                  >
                    {formatValue(row.valorOrcado)}
                  </TableCell>
                  <TableCell
                    textAlign="center"
                    data-label="Detalhes"
                    onClick={() => toggleModalReceita(row)}
                  >
                    <div>Detalhes</div>
                  </TableCell>
                </tr>
              ),
          )}
        </TableBody>
      </TableComponent>
      <ModalDetailReceita
        isOpen={isOpen}
        setIsOpen={toggleModal}
        modalDetail={modalReceita}
      />
    </Container>
  );
};

export default TableReceita;
