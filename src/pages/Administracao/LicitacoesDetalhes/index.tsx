/* eslint-disable import/no-duplicates */
/* eslint-disable prefer-template */
/* eslint-disable radix */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from "react";

import { useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios, { AxiosRequestConfig } from "axios";
import { Container, Content, ContainerDetalhe, Line } from "./styles";

import menuOptions from "../../../config/menuOptions";

import Header from "../../../components/Header";
import SubHeader from "../../../components/SubHeader";
import Footer from "../../../components/Footer";
import Body from "../../../components/Body";
import Path from "../../../components/Path";
import ContainerBlue from "../../../components/ContainerBlue";
import NewTable, { HeaderProps } from "../../../components/NewTable";
import ModalDetailPessoal from "../../../components/ModalDetailPessoal";

import LoaderPage from "../../../components/LoaderPage";
import api from "../../../services/api";
import formatValue from "../../../utils/formatValue";
import ContainerRetract from "../../../components/ContainerRetract";

interface LicitacoesProps {
  dsModalidade: string;
  nrLicitacao: number;
  nrAno: number;
  dtEdital: Date;
  dsObjeto: string;
  dtAbertura: Date;
  dsHoraAbertura: string;
  dtJulgamento: Date;
  dsHoraJulgamento: string;
  vlMinimo: number;
  vlMaximo: number;
  idLicitacao: number;
  Natureza: string;
  ProcessoAdm: string;
  Situacao: string;
  ValorHomologado: string;
  RecursosImpugnacoes: string;
  nrLicitacaoAno: string;
  IdEmpresa: number;
  IdModalidade: number;
}

interface PathProps {
  title: string;
  path: string;
}

interface Pareceres {
  dtParecer: Date;
  flParecerFavoravel: string;
  dsParecer: string;
  EmitorPor: string;
}

interface EmpenhosProps {
  nrempenho: number;
  nrano: number;
  dtEmpenho: Date;
  vlempenho: number;
  link: string;
}

interface ContratosProps {
  VALORTOTAL: number;
  VALORADITIVO: number;
  IDCONTRATO: number;
  NMRAZAOSOCIAL: string;
  NRCONTRATO: number;
  NRANO: number;
  DTCONTRATO: Date;
  CDORGAO: number;
  NMORGAO: string;
  NRCONTRATOANOCONTRATO: string;
  NLICITACAOANOLICITADO: number;
  TIPOCONTRATO: string;
  CONTRATADO: string;
  VLCONTRATO: number;
  ANOLICITACAO: number;
  DSMODALIDADE: number;
  NUMEROLICITACAO: number;
  DSOBJETO: string;
  NRCONTRATONRANO: string;
  SITUACAO: string;
}

interface PublicacoesProps {
  dsVeiculoPublicacao: number;
  dtPublicacao: number;
}

interface Movimentacoes {
  dtMovimento: Date;
  dsSituacao: string;
  dsMotivacao: string;
}

interface Itens {
  nrLote: number;
  idItem: number;
  dsItem: string;
  nmUnidadeMedida: string;
  nrQuantidade: number;
  vlUnitarioMaximo: number;
}

interface GeralProps {
  nmAnexo: string;
  bnObjeto: string;
  dsExtencao: string;
}

interface EvolucaoContratual {
  nmAnexo: string;
  bnObjeto: string;
  dsExtencao: string;
  dsObjeto: string;
  TipoAnexo: string;
}

const LicitacoesDetalhes: React.FC = () => {
  const [lastPath, setLastPath] = useState<PathProps[]>([]);
  const [pareceres, setPareceres] = useState<Pareceres[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacoes[]>([]);
  const [itens, setItens] = useState<Itens[]>([]);
  const [licitacoes, setLicitacoes] = useState<LicitacoesProps>();
  const [empenhos, setEmpenhos] = useState<EmpenhosProps[]>([]);
  const [contratos, setContratos] = useState<ContratosProps[]>([]);
  const [publicacoes, setPublicacoes] = useState<PublicacoesProps[]>([]);
  const [adjudicacoes, setAdjudicacoes] = useState<GeralProps[]>([]);
  const [editaisOutros, setEditaisOutros] = useState<GeralProps[]>([]);
  const [arquivosCotacao, setArquivosCotacao] = useState<GeralProps[]>([]);
  const [ataSessaoRegistroPreco, setAtaSessaoRegistroPreco] = useState<
    GeralProps[]
  >([]);
  const [evolucaoContratual, setEvolucaoContratual] = useState<
    EvolucaoContratual[]
  >([]);

  const location = useLocation();
  const params = useParams();

  function formataData(value: Date) {
    return format(new Date(value), "dd/MM/yyyy", {
      locale: ptBR,
    });
  }

  useEffect(() => {
    async function load() {
      const { pathname, state } = location;
      const title = state.data.nrLicitacaoAno as string;
      api
        .post(`portal/executarapi`, {
          idapi: 27,
          parametros: [
            {
              key: "@idlicitacao",
              value: state.data.idLicitacao,
            },
          ],
        })
        .then(response => {
          setPareceres(response.data.data);
        });

      api
        .post(`portal/executarapi`, {
          idapi: 28,
          parametros: [
            {
              key: "@idlicitacao",
              value: state.data.idLicitacao,
            },
          ],
        })
        .then(response => {
          setMovimentacoes(response.data.data);
        });

      api
        .post(`portal/executarapi`, {
          idapi: 29,
          parametros: [
            {
              key: "@idlicitacao",
              value: state.data.idLicitacao,
            },
          ],
        })
        .then(response => {
          setItens(response.data.data);
        });

      api
        .post(`portal/executarapi`, {
          idapi: 31,
          parametros: [
            {
              key: "@FILTROEMPRESA",
              value: state.data.IdEmpresa,
            },
            {
              key: "@FILTROIDMODALIDADE",
              value: state.data.IdModalidade,
            },
            {
              key: "@FILTROANO",
              value: state.data.nrAno,
            },
            {
              key: "@FILTRONUMEROLICITACAO",
              value: state.data.nrLicitacao,
            },
          ],
        })
        .then(response => {
          setEmpenhos(response.data.data);
        });

      api
        .post(`portal/executarapi`, {
          idapi: 36,
          parametros: [
            {
              key: "@idlicitacao",
              value: state.data.idLicitacao,
            },
          ],
        })
        .then(response => {
          // console.log(response);
          setContratos(response.data.data);
        });
      /*
      api
        .post(`portal/executarapi`, {
          idapi: 22,
          parametros: [
            {
              key: "@tipoanexo",
              value: 2,
            },
            {
              key: "@idlicitacao",
              value: state.data.idLicitacao,
            },
          ],
        })
        .then(response => {
          // console.log(response);
          setEvolucaoContratual(response.data.data);
        });
*/
      api
        .post(`portal/executarapi`, {
          idapi: 37,
          parametros: [
            {
              key: "@idlicitacao",
              value: state.data.idLicitacao,
            },
          ],
        })
        .then(response => {
          // console.log(response);
          setPublicacoes(response.data.data);
        });

      api
        .post(`portal/executarapi`, {
          idapi: 41,
          parametros: [
            {
              key: "@objeto",
              value: "Adjudicacoes",
            },
            {
              key: "@idlicitacao",
              value: state.data.idLicitacao,
            },
          ],
        })
        .then(response => {
          // console.log(response);
          setAdjudicacoes(response.data.data);
        });

      api
        .post(`portal/executarapi`, {
          idapi: 41,
          parametros: [
            {
              key: "@objeto",
              value: "Outros",
            },
            {
              key: "@idlicitacao",
              value: state.data.idLicitacao,
            },
          ],
        })
        .then(response => {
          // console.log(response);
          setEditaisOutros(response.data.data);
        });

      api
        .post(`portal/executarapi`, {
          idapi: 41,
          parametros: [
            {
              key: "@objeto",
              value: "Editas",
            },
            {
              key: "@idlicitacao",
              value: state.data.idLicitacao,
            },
          ],
        })
        .then(response => {
          // console.log(response);
          setEditaisOutros(response.data.data);
        });

      api
        .post(`portal/executarapi`, {
          idapi: 41,
          parametros: [
            {
              key: "@objeto",
              value: "ArquivoCotacao",
            },
            {
              key: "@idlicitacao",
              value: state.data.idLicitacao,
            },
          ],
        })
        .then(response => {
          // console.log(response);
          setArquivosCotacao(response.data.data);
        });

      api
        .post(`portal/executarapi`, {
          idapi: 41,
          parametros: [
            {
              key: "@objeto",
              value: "Ata",
            },
            {
              key: "@idlicitacao",
              value: state.data.idLicitacao,
            },
          ],
        })
        .then(response => {
          // console.log(response);
          setAtaSessaoRegistroPreco(response.data.data);
        });

      const path = [] as PathProps[];

      path.push({
        title,
        path: pathname,
      });
      setLicitacoes(state.data);
      setLastPath(path);
    }
    load();
  }, [params, location]);

  const headersPareceres = [
    {
      label: "Data",
      value: "dtParecer",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Parecer favoravel",
      value: "flParecerFavoravel",
    },
    {
      label: "Parecer",
      value: "dsParecer",
    },
    {
      label: "Emitido por",
      value: "EmitorPor",
    },
  ] as HeaderProps[];

  const headersPublicacoes = [
    {
      label: "Data",
      value: "dtPublicacao",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Ve??culo",
      value: "dsVeiculoPublicacao",
    },
  ] as HeaderProps[];

  const headersGerais = [
    {
      label: "Anexo",
      value: "nmAnexo",
    },
  ] as HeaderProps[];

  const headersEvolucaoContratual = [
    {
      label: "Anexo",
      value: "nmAnexo",
    },
    {
      label: "Tipo de anexo",
      value: "TipoAnexo",
    },
  ] as HeaderProps[];

  const headersMovimentacoes = [
    {
      label: "Data da movimenta????o",
      value: "dtMovimento",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Situa????o",
      value: "dsSituacao",
    },
    {
      label: "Motiva????o",
      value: "dsMotivacao",
    },
  ] as HeaderProps[];

  const headersItens = [
    {
      label: "N?? lote",
      value: "nrLote",
    },
    {
      label: "Descri????o",
      value: "dsItem",
    },
    {
      label: "Unidade de m??dida",
      value: "nmUnidadeMedida",
    },
    {
      label: "Quantidade",
      value: "nrQuantidade",
    },
    {
      label: "Valor unit??rio",
      value: "vlUnitarioMaximo",
      sortable: true,
      type: "currency",
    },
  ] as HeaderProps[];

  const headersContratos = [
    {
      label: "Tipo de contrato",
      value: "TIPOCONTRATO",
    },
    {
      label: "N?? do contrato",
      value: "NRCONTRATONRANO",
    },
    {
      label: "Contratado",
      value: "CONTRATADO",
    },
    {
      label: "Situa????o",
      value: "SITUACAO",
    },
  ] as HeaderProps[];

  const headersEmpenhos = [
    {
      label: "N?? empenho",
      value: "nrempenho",
    },
    {
      label: "Ano",
      value: "nrano",
    },
    {
      label: "Data do empenho",
      value: "dtEmpenho",
      sortable: true,
      type: "date",
      formatDate: "dd/MM/yyyy",
    },
    {
      label: "Valor do empenho",
      value: "vlempenho",
      sortable: true,
      type: "currency",
    },
  ] as HeaderProps[];

  if (licitacoes) {
    return (
      <Container>
        <Header />
        <SubHeader />
        <Body>
          <Path lastPath={lastPath} />
          <Content>
            <ContainerBlue>
              <ContainerDetalhe>
                <tbody>
                  <Line>
                    <td>
                      <b>Modalidade: </b>
                      {licitacoes.dsModalidade}
                    </td>
                    <td>
                      <b>Ano: </b>
                      {licitacoes.nrAno}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Data edital: </b>
                      {formataData(licitacoes.dtEdital)}
                    </td>
                    <td>
                      <b>Data de abertura: </b>
                      {formataData(licitacoes.dtAbertura)}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Hora de abertura: </b>
                      {licitacoes.dsHoraAbertura}
                    </td>
                    <td>
                      <b>Data do julgamento: </b>
                      {formataData(licitacoes.dtJulgamento)}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Hora do julgamento: </b>
                      {licitacoes.dsHoraJulgamento}
                    </td>
                    <td>
                      <b>Natureza: </b>
                      {licitacoes.Natureza}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Valor m??nimo: </b>
                      {formatValue(licitacoes.vlMinimo)}
                    </td>
                    <td>
                      <b>Valor m??ximo: </b>
                      {formatValue(licitacoes.vlMaximo)}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Processo administrativo: </b>
                      {licitacoes.ProcessoAdm}
                    </td>
                    <td>
                      <b>Situa????o: </b>
                      {licitacoes.Situacao}
                    </td>
                  </Line>
                  <Line>
                    <td>
                      <b>Valor Homologado: </b>
                      {licitacoes.ValorHomologado}
                    </td>
                    <td>
                      <b>N??mero/Ano Licita????o: </b>
                      {licitacoes.nrLicitacaoAno}
                    </td>
                  </Line>
                  <Line>
                    <td colSpan={2}>
                      <b>Recursos impugna????es: </b>
                      {licitacoes.RecursosImpugnacoes}
                    </td>
                  </Line>
                  <Line>
                    <td colSpan={2}>
                      <b>Objeto: </b>
                      {licitacoes.dsObjeto}
                    </td>
                  </Line>
                </tbody>
              </ContainerDetalhe>
            </ContainerBlue>

            {/* aditivos.length > 0 && (
              <NewTable
                data={aditivos}
                header={headers}
                pagination
                maxItemsPerPage={20}
              />
            )}
            {aditivos.length === 0 && <p>N??o h?? aditivos</p>}
            <br />
            <h1>FISCALIZA????O DO CONTRATO:</h1>

            {fiscalizacao.length > 0 && (
              <NewTable
                data={fiscalizacao}
                header={headersTres}
                pagination
                maxItemsPerPage={20}
              />
            )}
            {fiscalizacao.length === 0 && (
              <p>N??o h?? fiscaliza????es no contrato</p>
            )}

            <br />
            <h1>ANEXOS:</h1>

            {anexos.length > 0 && (
              <NewTable
                data={anexos}
                header={headersDois}
                pagination
                maxItemsPerPage={20}
                isDownload
                formatFile="dsExtencao"
                nameFile="nmAnexo"
                typeDownload="base64"
                stringDownload="bnObjeto"
              />
            )}
            {anexos.length === 0 && <p>N??o h?? anexos</p> */}

            <ContainerRetract title="Parecer">
              {pareceres.length > 0 && (
                <NewTable
                  data={pareceres}
                  header={headersPareceres}
                  pagination
                  maxItemsPerPage={20}
                />
              )}
              {pareceres.length === 0 && <p>N??o h?? Parecer</p>}
            </ContainerRetract>
            <ContainerRetract title="Adjudica????es">
              {
                /* anexos.length  > 0 */ false && (
                  <NewTable
                    data={[] /* anexos */}
                    header={[] /* headersDois */}
                    pagination
                    maxItemsPerPage={20}
                    isDownload
                    formatFile="EXTENCAO"
                    nameFile="NOMEARQUIVO"
                    typeDownload="base64"
                    stringDownload="STRING"
                  />
                )
              }

              {/* anexos.length  === 0 */ true && <p>N??o h?? Adjudica????es</p>}
            </ContainerRetract>
            <ContainerRetract title="Documentos de Adjudica????es">
              {adjudicacoes.length > 0 && (
                <NewTable
                  data={adjudicacoes}
                  header={headersGerais}
                  pagination
                  maxItemsPerPage={20}
                  isDownload
                  formatFile="dsExtencao"
                  nameFile="nmAnexo"
                  typeDownload="base64"
                  stringDownload="bnObjeto"
                />
              )}

              {adjudicacoes.length === 0 && (
                <p>N??o h?? Documentos de Adjudica????es</p>
              )}
            </ContainerRetract>
            <ContainerRetract title="Editais e Outros Documentos">
              {editaisOutros.length > 0 && (
                <NewTable
                  data={editaisOutros}
                  header={headersGerais}
                  pagination
                  maxItemsPerPage={20}
                  isDownload
                  formatFile="dsExtencao"
                  nameFile="nmAnexo"
                  typeDownload="base64"
                  stringDownload="bnObjeto"
                />
              )}

              {editaisOutros.length === 0 && (
                <p>N??o h?? Editais e Outros Documentos</p>
              )}
            </ContainerRetract>
            <ContainerRetract title="Documentos Edital">
              {
                /* anexos.length  > 0 */ false && (
                  <NewTable
                    data={[] /* anexos */}
                    header={[] /* headersDois */}
                    pagination
                    maxItemsPerPage={20}
                    isDownload
                    formatFile="EXTENCAO"
                    nameFile="NOMEARQUIVO"
                    typeDownload="base64"
                    stringDownload="STRING"
                  />
                )
              }

              {/* anexos.length  === 0 */ true && <p>Documentos Edital</p>}
            </ContainerRetract>
            <ContainerRetract title="Homologa????es e Ratifica????es">
              {movimentacoes.length > 0 && (
                <NewTable
                  data={movimentacoes}
                  header={headersMovimentacoes}
                  pagination
                  maxItemsPerPage={20}
                />
              )}

              {movimentacoes.length === 0 && (
                <p>N??o h?? Homologa????es e Ratifica????es</p>
              )}
            </ContainerRetract>
            <ContainerRetract title="Contratos">
              {contratos.length > 0 && (
                <NewTable
                  data={contratos}
                  header={headersContratos}
                  pagination
                  maxItemsPerPage={20}
                  isSelected
                  path="contrato/:IDCONTRATO"
                />
              )}
              {contratos.length === 0 && <p>N??o h?? Contratos</p>}
            </ContainerRetract>
            <ContainerRetract title="Atas de Sess??o e de Registros de Pre??os">
              {ataSessaoRegistroPreco.length > 0 && (
                <NewTable
                  data={ataSessaoRegistroPreco}
                  header={headersGerais}
                  pagination
                  maxItemsPerPage={20}
                  isDownload
                  formatFile="dsExtencao"
                  nameFile="nmAnexo"
                  typeDownload="base64"
                  stringDownload="bnObjeto"
                />
              )}
              {ataSessaoRegistroPreco.length === 0 && (
                <p>N??o h?? Atas de Sess??o e de Registros de Pre??os</p>
              )}
            </ContainerRetract>
            <ContainerRetract title="Documento Atas de Sess??o e de Registros de Pre??os">
              {
                /* anexos.length  > 0 */ false && (
                  <NewTable
                    data={[] /* anexos */}
                    header={[] /* headersDois */}
                    pagination
                    maxItemsPerPage={20}
                    isDownload
                    formatFile="EXTENCAO"
                    nameFile="NOMEARQUIVO"
                    typeDownload="base64"
                    stringDownload="STRING"
                  />
                )
              }

              {
                /* anexos.length  === 0 */ true && (
                  <p>
                    N??o h?? Documento Atas de Sess??o e de Registros de Pre??os
                  </p>
                )
              }
            </ContainerRetract>
            <ContainerRetract title="Empenhos">
              {empenhos.length > 0 && (
                <NewTable
                  data={empenhos}
                  header={headersEmpenhos}
                  pagination
                  maxItemsPerPage={20}
                />
              )}

              {empenhos.length === 0 && <p>N??o h?? Empenhos</p>}
            </ContainerRetract>
            <ContainerRetract title="Certid??es da Licita????o">
              {
                /* anexos.length  > 0 */ false && (
                  <NewTable
                    data={[] /* anexos */}
                    header={[] /* headersDois */}
                    pagination
                    maxItemsPerPage={20}
                    isDownload
                    formatFile="EXTENCAO"
                    nameFile="NOMEARQUIVO"
                    typeDownload="base64"
                    stringDownload="STRING"
                  />
                )
              }

              {
                /* anexos.length  === 0 */ true && (
                  <p>N??o h?? Certid??es da Licita????o</p>
                )
              }
            </ContainerRetract>
            <ContainerRetract title="Arquivo de Cota????o">
              {arquivosCotacao.length > 0 && (
                <NewTable
                  data={arquivosCotacao}
                  header={headersGerais}
                  pagination
                  maxItemsPerPage={20}
                  isDownload
                  formatFile="dsExtencao"
                  nameFile="nmAnexo"
                  typeDownload="base64"
                  stringDownload="bnObjeto"
                />
              )}

              {arquivosCotacao.length === 0 && <p>N??o h?? Arquivo de Cota????o</p>}
            </ContainerRetract>
            <ContainerRetract title="Relat??rio da Comiss??o">
              {
                /* anexos.length  > 0 */ false && (
                  <NewTable
                    data={[] /* anexos */}
                    header={[] /* headersDois */}
                    pagination
                    maxItemsPerPage={20}
                    isDownload
                    formatFile="EXTENCAO"
                    nameFile="NOMEARQUIVO"
                    typeDownload="base64"
                    stringDownload="STRING"
                  />
                )
              }

              {
                /* anexos.length  === 0 */ true && (
                  <p>N??o h?? Relat??rio da Comiss??o</p>
                )
              }
            </ContainerRetract>
            <ContainerRetract title="Publica????es">
              {headersPublicacoes.length > 0 && (
                <NewTable
                  data={publicacoes}
                  header={headersPublicacoes}
                  pagination
                  maxItemsPerPage={20}
                />
              )}

              {publicacoes.length === 0 && <p>N??o h?? Publica????es</p>}
            </ContainerRetract>
            <ContainerRetract title="Vencedores do Processo Licitat??rio">
              {
                /* anexos.length  > 0 */ false && (
                  <NewTable
                    data={[] /* anexos */}
                    header={[] /* headersDois */}
                    pagination
                    maxItemsPerPage={20}
                    isDownload
                    formatFile="EXTENCAO"
                    nameFile="NOMEARQUIVO"
                    typeDownload="base64"
                    stringDownload="STRING"
                  />
                )
              }

              {
                /* anexos.length  === 0 */ true && (
                  <p>N??o h?? Vencedores do Processo Licitat??rio</p>
                )
              }
            </ContainerRetract>
            <ContainerRetract title="Itens da Licita????o">
              {itens.length > 0 && (
                <NewTable
                  data={itens}
                  header={headersItens}
                  pagination
                  maxItemsPerPage={20}
                />
              )}

              {itens.length === 0 && <p>N??o h?? Itens da Licita????o</p>}
            </ContainerRetract>
          </Content>
        </Body>

        <Footer />
      </Container>
    );
  }
  return <LoaderPage loading />;
};

export default LicitacoesDetalhes;
