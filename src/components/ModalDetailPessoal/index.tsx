import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import SyncLoader from "react-spinners/SyncLoader";
import {
  Container,
  Title,
  HeaderContainer,
  SectionContainer,
  ContainerDetalhe,
  Line,
  Close,
  ContainerLoader,
} from "./styles";

import Modal from "../Modal";
import api from "../../services/api";
import formatValue from "../../utils/formatValue";

interface IModalProps {
  title: string;
  message?: string;
  modalDetail: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

interface SalaryProps {
  ABONOPERMANENCIA: number;
  ADICIONAIS: number;
  ADMISSAO: string;
  ANO: number;
  BENEFICIOS: number;
  CARGOCOMISSAO: number;
  CPF: number;
  DATAULTIMAATUALIZACAO: string;
  DECIMO13ADIANTAMENTO: number;
  DESCONTOS: number;
  DESCONTOSFACULTATIVOS: number;
  DESCONTOSOBRIGATORIOS: number;
  EMPRESA: string;
  FERIAS: number;
  GRATIFICACOES: number;
  IMPOSTORENDA: number;
  MATRICULA: number;
  MES: number;
  NOME: string;
  NUMEMP: number;
  OUTRASINDENIZACOES: number;
  PREVIDENCIA: number;
  REMUNERACAOBRUTA: number;
  REMUNERACAOLIQUIDA: number;
  VANTAGENSPESSOAIS: number;
  VANTAGENSTRANSITORIAS: number;
  VENCIMENTOS: number;
  VERBASVARIAVEIS: number;
}

const ModalDetail: React.FC<IModalProps> = ({
  modalDetail,
  isOpen,
  setIsOpen,
}) => {
  const [details, setDetails] = useState<SalaryProps>();

  useEffect(() => {
    async function loadServidor() {
      if (modalDetail) {
        const response = await api.post(`portal/executarapi`, {
          idapi: 2,
          parametros: [
            { key: "@id_calculo", value: modalDetail.ID_CALCULO },
            { key: "@num_cad", value: modalDetail.MATRICULA },
          ],
        });

        setDetails(response.data.data[0]);
      }
    }
    loadServidor();
  }, [modalDetail]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {modalDetail && (
        <Container>
          <HeaderContainer>
            <Title>
              {`${modalDetail.NOME} - ${
                modalDetail.TIPOCALCULO
              } (${`00${modalDetail.MES}`.slice(-2)}/${modalDetail.ANO})`}
            </Title>
            <Close onClick={setIsOpen}>
              <FiX />
            </Close>
          </HeaderContainer>
          <SectionContainer>
            {details ? (
              <ContainerDetalhe>
                <Line>
                  <td>Vencimentos:</td>
                  <td>{formatValue(details.VENCIMENTOS)}</td>
                </Line>
                <Line>
                  <td>Vantagens Pessoais:</td>
                  <td>{formatValue(details.VANTAGENSPESSOAIS)}</td>
                </Line>
                <Line>
                  <td>Cargo em Comiss??o:</td>
                  <td>{formatValue(details.CARGOCOMISSAO)}</td>
                </Line>
                <Line>
                  <td>Benef??cios:</td>
                  <td>{formatValue(details.BENEFICIOS)}</td>
                </Line>
                <Line>
                  <td>Adicionais:</td>
                  <td>{formatValue(details.ADICIONAIS)}</td>
                </Line>
                <Line>
                  <td>Gratifica????es:</td>
                  <td>{formatValue(details.GRATIFICACOES)}</td>
                </Line>
                <Line>
                  <td>Verbas Variaveis:</td>
                  <td>{formatValue(details.VERBASVARIAVEIS)}</td>
                </Line>
                <Line>
                  <td>Vantagens Transit??rias:</td>
                  <td>{formatValue(details.VANTAGENSTRANSITORIAS)}</td>
                </Line>
                <Line>
                  <td>F??rias:</td>
                  <td>{formatValue(details.FERIAS)}</td>
                </Line>
                <Line>
                  <td>Abono de Perman??ncia:</td>
                  <td>{formatValue(details.ABONOPERMANENCIA)}</td>
                </Line>
                <Line>
                  <td>13?? Sal??rio:</td>
                  <td>{formatValue(details.DECIMO13ADIANTAMENTO)}</td>
                </Line>
                <Line>
                  <td>Rescis??rias e Outras Indeniza????es:</td>
                  <td>{formatValue(details.OUTRASINDENIZACOES)}</td>
                </Line>
                <Line>
                  <td>
                    <b>Total Bruto:</b>
                  </td>
                  <td>
                    <b>{formatValue(details.REMUNERACAOBRUTA)}</b>
                  </td>
                </Line>
                <Line>
                  <td>
                    <b>Descontos:</b>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <b>{formatValue(details.DESCONTOS * -1)}</b>
                  </td>
                </Line>
                <Line>
                  <td>
                    <b>Total Liquido:</b>
                  </td>
                  <td>
                    <b>{formatValue(details.REMUNERACAOLIQUIDA)}</b>
                  </td>
                </Line>
              </ContainerDetalhe>
            ) : (
              <ContainerLoader>
                <SyncLoader color="#0F4780" loading />
                <p>Carregando...</p>
              </ContainerLoader>
            )}
          </SectionContainer>
        </Container>
      )}
    </Modal>
  );
};

export default ModalDetail;
