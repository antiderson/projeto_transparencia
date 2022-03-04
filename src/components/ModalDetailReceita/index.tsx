/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { Container, Title, HeaderContainer, Close, GraficoTab } from "./styles";

import Modal from "../Modal";
import Tabs from "../Tabs";
import NewTable, { HeaderProps } from "../NewTable";
import Grafico from "../Grafico";

import getDataGraficoFromTableData from "../../utils/getDataGraficoFromTableData";

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

interface IModalProps {
  modalDetail: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

interface ReceitaMonth {
  mes: string;
  nmes: number;
  valor: number;
}

const ModalDetailReceita: React.FC<IModalProps> = ({
  modalDetail,
  isOpen,
  setIsOpen,
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [receitaGrafico, setReceitaGrafico] = useState<any[]>([]);
  const [table, setTable] = useState(false);
  const [receitaPorMes, setReceitaPorMes] = useState<ReceitaMonth[]>([
    {
      mes: "JANEIRO",
      nmes: 1,
      valor: 0,
    },
    {
      mes: "FEVEREIRO",
      nmes: 2,
      valor: 0,
    },
    {
      mes: "MARÇO",
      nmes: 3,
      valor: 0,
    },
    {
      mes: "ABRIL",
      nmes: 4,
      valor: 0,
    },
    {
      mes: "MAIO",
      nmes: 5,
      valor: 0,
    },
    {
      mes: "JUNHO",
      nmes: 6,
      valor: 0,
    },
    {
      mes: "JULHO",
      nmes: 7,
      valor: 0,
    },
    {
      mes: "AGOSTO",
      nmes: 8,
      valor: 0,
    },
    {
      mes: "SETEMBRO",
      nmes: 9,
      valor: 0,
    },
    {
      mes: "OUTUBRO",
      nmes: 10,
      valor: 0,
    },
    {
      mes: "NOVEMBRO",
      nmes: 11,
      valor: 0,
    },
    {
      mes: "DEZEMBRO",
      nmes: 12,
      valor: 0,
    },
  ]);

  const header: HeaderProps[] = [
    {
      label: "Mês",
      value: "mes",
      type: "string",
      containerStyle: { textAlign: "center" },
    },
    {
      label: "Valor Arrecadado",
      value: "valor",
      type: "currency",
      containerStyle: { textAlign: "center" },
    },
  ];

  useEffect(() => {
    if (modalDetail) {
      const newReceitaPorMes: ReceitaMonth[] = receitaPorMes;
      newReceitaPorMes.forEach(item => {
        if (item.mes) {
          const a = modalDetail[item.mes];
          if (typeof a === "number") {
            item.valor = a;
          }
        }
      });
      setReceitaGrafico(getDataGraficoFromTableData(receitaPorMes, header));
      setReceitaPorMes(newReceitaPorMes);
      setTable(true);
    }
  }, [modalDetail, receitaPorMes]);

  // Tabs: Table mes a mes / Grafico
  // table: mes e valor
  // grafico: barras por mes, pizza por filho total, barras por filho por mes

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        {modalDetail ? (
          <>
            <HeaderContainer>
              <Title>{modalDetail.descricao}</Title>
              <Close onClick={setIsOpen}>
                <FiX />
              </Close>
            </HeaderContainer>
            <Tabs
              currentTab={currentTab}
              header={[
                { title: "Detalhado", id: 0 },
                { title: "Gráficos", id: 1 },
              ]}
              setCurrentTab={setCurrentTab}
            >
              {currentTab === 0 && table && (
                <NewTable
                  header={header}
                  data={receitaPorMes}
                  exportFile="all"
                  pagination
                  maxItemsPerPage={12}
                />
              )}
              {currentTab === 1 && table && (
                <GraficoTab>
                  <Grafico title="" chartType="Bar" data={receitaGrafico} />
                </GraficoTab>
              )}
            </Tabs>
          </>
        ) : (
          <HeaderContainer>
            <Title>Algo deu errado!</Title>
            <Close onClick={setIsOpen}>
              <FiX />
            </Close>
          </HeaderContainer>
        )}
      </Container>
    </Modal>
  );
};

export default ModalDetailReceita;
