import Acesso from "../assets/icons/acessoinformacao.svg";
import Receita from "../assets/icons/graph.svg";
import Lei from "../assets/icons/la_balance-scale.svg";
import Educacao from "../assets/icons/la_book.svg";
import Saude from "../assets/icons/la_briefcase-medical.svg";
import Planejamento from "../assets/icons/la_clipboard-list.svg";
import Convenios from "../assets/icons/la_handshake.svg";
import Info from "../assets/icons/la_info-circle.svg";
import Diarias from "../assets/icons/la_plane-departure.svg";
import Adm from "../assets/icons/la_university.svg";
import Pessoal from "../assets/icons/la_user-solid.svg";
import Despesas from "../assets/icons/loss.svg";
import Vacina from "../assets/icons/vacina.svg";
import Corona from "../assets/icons/coronavirus.svg";
import Conselho from "../assets/icons/conselho.png";

import PageMenu from "../pages/PageMenu";
import Search from "../pages/Search";

// Vacinação
import PlanoDeAcao from "../pages/Vacinacao/PlanoDeAcao";
import ComprasInsumos from "../pages/Vacinacao/ComprasInsumos";
import ComprasVacina from "../pages/Vacinacao/ComprasVacina";
import Denuncias from "../pages/Vacinacao/Denuncias";
import DosesRecebidas from "../pages/Vacinacao/DosesRecebidas";
import InformacoesVacinas from "../pages/Vacinacao/InformacoesVacinas";
import InsumosRecebido from "../pages/Vacinacao/InsumosRecebido";
import LocaisVacinacao from "../pages/Vacinacao/LocaisVacinacao";
import RegistroSobras from "../pages/Vacinacao/RegistroSobras";
import Vacinometro from "../pages/Vacinacao/Vacinometro";

// COVID-19
import Decretos from "../pages/COVID-19/Decretos";

// Acesso à Informação
import eSIC from "../pages/AcessoInformacao/eSIC";
import SIC from "../pages/AcessoInformacao/SIC";
import Ouvidoria from "../pages/AcessoInformacao/Ouvidoria";
import Estatisticas from "../pages/AcessoInformacao/Estatisticas";
import ConsultaSIC from "../pages/AcessoInformacao/ConsultaSIC";
import LeiAcesso from "../pages/AcessoInformacao/LeiAcesso";
// Informação Institucionais
import Endereco from "../pages/InformacaoInstitucionais/Endereco";
import Estrutura from "../pages/InformacaoInstitucionais/Estrutura";
import Registro from "../pages/InformacaoInstitucionais/Registro";
import FAQ from "../pages/InformacaoInstitucionais/FAQ";
import FaleConosco from "../pages/InformacaoInstitucionais/FaleConosco";
// Receitas
import Receitas from "../pages/Receitas/Receitas";
import Repasses from "../pages/Receitas/Repasses";
// Planejamento
import PPA from "../pages/Planejamento/PPA";
import LDO from "../pages/Planejamento/LDO";
import LOA from "../pages/Planejamento/LOA";
import Atas from "../pages/Planejamento/Atas";
import InfoContabeis from "../pages/Planejamento/InfoContabeis";
import ParecerTCE from "../pages/Planejamento/ParecerTCE";
// Convenios
import Parceria from "../pages/Convenios/Parceria";
import ConvDoMunicipio from "../pages/Convenios/ConvDoMunicipio";
import ConvSegPublica from "../pages/Convenios/ConvSegPublica";
// Diarias
import DiariasPage from "../pages/Diarias/Diarias";
import Adiantamento from "../pages/Diarias/Adiantamento";
import Passagem from "../pages/Diarias/Passagem";
import TabelaDiaria from "../pages/Diarias/TabelaDiaria";
import TabelaPassagem from "../pages/Diarias/TabelaPassagem";
// Lei Complementar
import RGF from "../pages/LeiComplementar/RGF";
import RREO from "../pages/LeiComplementar/RREO";
// Pessoal
import CedidosA from "../pages/Pessoal/CedidosA";
import CedidosDe from "../pages/Pessoal/CedidosDe";
import QuadroFuncional from "../pages/Pessoal/QuadroFuncional";
import TabelaRemuneracao from "../pages/Pessoal/TabelaRemuneracao";
import Temporarios from "../pages/Pessoal/Temporarios";
// Administração
import Contratos from "../pages/Administracao/Contratos";
import Fornecedor from "../pages/Administracao/Fornecedor";
import Licitacoes from "../pages/Administracao/Licitacoes";
import Patrimonio from "../pages/Administracao/Patrimonio";
import Programas from "../pages/Administracao/Programas";
// Despesas
import DespesasPage from "../pages/Despesas/Despesas";
import Example from "../pages/Example";
// saude
import PlanoMunicipalSaude from "../pages/Saude/PlanoMunicipalSaude";
import EscalasMedicasUPAJoaoSamek from "../pages/Saude/EscalasMedicasUPAJoaoSamek";
import EscalasMedicasUPAWalterCavalcantiBarbosa from "../pages/Saude/EscalasMedicasUPAWalterCavalcantiBarbosa";
import EscalasmedicasUBS from "../pages/Saude/EscalasMedicasUBS";
// educação
import PlanoMunicipalEducacao from "../pages/Educacao/PlanoMunicipalEducacao";

interface MenuOptionsProps {
  title: string;
  path: string;
  type?: "link" | "component";
  component?: React.FC;
  tags: string[];
}

interface MenuProps {
  title: string;
  path: string;
  component: React.FC;
  iconName: string;
  subMenu: MenuOptionsProps[];
  tags: string[];
}

export default {
  options: [
    {
      title: "Vacinação",
      path: "/vacinacao",
      tags: ["Vacinação", "Vacina", "Vacinas"],
      component: PageMenu,
      iconName: Vacina,
      subMenu: [
        {
          title: "Plano de Ação",
          path: "/vacinacao/plano-de-acao",
          tags: [
            "Plano de ação",
            "Vacinação",
            "Vacina",
            "Vacinas",
            "gaules",
            "Plano",
          ],
          type: "component",
          component: PlanoDeAcao,
        },
        {
          title: "Informações sobre a vacina",
          path: "/vacinacao/info",
          tags: [
            "Informações sobre a vacina",
            "Vacinação",
            "Vacina",
            "Vacinas",
            "informação sobre vacinas",
          ],
          type: "component",
          component: InformacoesVacinas,
        },
        {
          title: "Vacinômetro",
          path: "/vacinacao/vacinometro",
          tags: ["Vacinômetro", "Vacinação", "Vacina", "Vacinas"],
          type: "component",
          component: Vacinometro,
        },
        {
          title: "Doses Recebidas",
          path: "/vacinacao/doses-recebidas",
          tags: [
            "Doses Recebidas",
            "Doses",
            "Vacinação",
            "Vacina",
            "Vacinas",
            "Recebimento de Vacinas",
          ],
          type: "component",
          component: DosesRecebidas,
        },
        {
          title: "Insumos Recebidos",
          path: "/vacinacao/insumos-recebidos",
          tags: [
            "Insumos Recebidos",
            "Insumos",
            "Vacinação",
            "Vacina",
            "Vacinas",
          ],
          type: "component",
          component: InsumosRecebido,
        },
        {
          title: "Locais de vacinação",
          path: "/vacinacao/locais-de-vacinacao",
          tags: [
            "Locais de vacinação",
            "Locais",
            "Vacina",
            "Local para vacinar",
          ],
          type: "component",
          component: LocaisVacinacao,
        },
        {
          title: "Compras de insumos",
          path: "/vacinacao/compras-de-insumos",
          tags: [
            "Compras de insumo",
            "Compras",
            "Insumo",
            "Insumos de vacina",
            "Vacinação",
          ],
          type: "component",
          component: ComprasInsumos,
        },
        {
          title: "Compras de vacina",
          path: "/vacinacao/compras-de-vacina",
          tags: [
            "Compras de vacinas",
            "Compra",
            "Vacina",
            "Vacinas",
            "Vacinação",
          ],
          type: "component",
          component: ComprasVacina,
        },
        {
          title: "Registro de Sobra Identificada",
          path: "/vacinacao/registro-de-sobra",
          tags: [
            "Registro de Sobra Identificada",
            "Registro",
            "Sobra Identificada",
            "Vacina",
            "Vacinas",
            "Vacinação",
            "Sobra",
          ],
          type: "component",
          component: RegistroSobras,
        },
        {
          title: "Denúncias",
          path: "/vacinacao/denuncias",
          tags: ["Denúncias", "Denunciar"],
          type: "component",
          component: Denuncias,
        },
      ],
    },
    {
      title: "Covid-19",
      path: "/covid-19",
      tags: ["Covid-19", "Covid", "19", "Corona Virus", "Virus"],
      component: PageMenu,
      iconName: Corona,
      subMenu: [
        {
          title: "Informações sobre a COVID-19",
          path: "/covid-19/info",
          tags: [
            "Informações sobre a COVID-19",
            "Informações COVID",
            "Informações",
            "Covid",
            "Informações sobre CORONA",
            "Covid-19",
          ],
          type: "component",
          component: Example,
        },
        {
          title: "Dados Epidemiológicos",
          path: "/covid-19/dados",
          tags: [
            "Dados Epidemiológicos",
            "Dados",
            "Epidemiológico",
            "Epidemiológico Covid",
            "Epidemiológico do Corona",
            "Covid-19",
          ],
          type: "component",
          component: Example,
        },
        {
          title: "Licitações",
          path: "/covid-19/licitacao",
          tags: [
            "Licitações",
            "Licitação Covid",
            "Covid-19",
            "Licitação",
            "Corona Virus",
          ],
          type: "component",
          component: Example,
        },
        {
          title: "Despesas",
          path: "/covid-19/despesas",
          tags: [
            "Despesas",
            "Despesas Covid",
            "Despesa Covid",
            "Covid-19",
            "Covid",
          ],
          type: "component",
          component: Example,
        },
        {
          title: "Receitas",
          path: "/covid-19/receitas",
          tags: ["Receitas", "Receitas Covid", "Covid-19", "Covid", "Receita"],
          type: "component",
          component: Example,
        },
        {
          title: "Decretos e Leis",
          path: "/covid-19/leis",
          tags: [
            "Decreto e Leis",
            "Decreto",
            "Leis Covid",
            "Decreto Covid",
            "Covid-19",
          ],
          type: "component",
          component: Decretos,
        },
        {
          title: "Relatório Covid-19: Receita x Despesa",
          path: "/covid-19/relatorio",
          tags: [
            "Relatório Covid-19: Receita x Despesas",
            "Relatório Covid",
            "Relatório",
            "Receitas",
            "Despesas",
            "Covid",
            "Covid-19",
          ],
          type: "component",
          component: Example,
        },
        {
          title: "Contatos e Atendimento",
          path: "/covid-19/atendimento",
          tags: [
            "Contatos e Atendimento",
            "Contatos",
            "Contato",
            "Contato Covid",
            "Atendimento",
            "Atendimento Covid",
            "Covid",
          ],
          type: "component",
          component: Example,
        },
        {
          title:
            "Divulgação de Ações, Programas, Gastos e Medidas Adotadas na Área da Educação",
          path: "/covid-19/acoes",
          tags: [
            "Divulgação de Ações, Programas, Gastos e Medidas Adotadas na Área da Educação",
            "Covid",
            "Divulgações",
            "Divulgações de ação",
            "Divulgações de Ações",
            "Área da Educação",
            "Açoes",
          ],
          type: "component",
          component: Example,
        },
        {
          title: "Ações de Contingenciamento/Replanejamento Orçamentário",
          path: "/covid-19/contigenciamento-orcamentario",
          tags: [
            "Ações de Contingenciamento/Replanejamento Orçamentário",
            "Ações de Contingenciamento",
            "Replanejamento Orçamentario",
            "Contingenciamento",
            " Replanejamento",
            "Orçamento",
            "Covid",
            "Covid-19",
          ],
          type: "component",
          component: Example,
        },
        {
          title: "Contratações",
          path: "/covid-19/contratacoes",
          tags: [
            "Contratações",
            "Contratação",
            "Contratações Covid",
            "Covid-19 Contratações",
            "Covid-19",
          ],
          type: "component",
          component: Example,
        },
        {
          title: "Despesas com Publicidades",
          path: "/covid-19/despesas-com-publicidades",
          tags: [
            "Despesas com Publicidade",
            "Despesas",
            "Publicidade",
            "Despesas Publicitarias",
            "Covid",
            "Covid-19",
          ],
          type: "component",
          component: Example,
        },
      ],
    },
    {
      title: "Acesso à Informação",
      path: "/acesso-info",
      tags: [
        "Acesso à Informação",
        "Informação",
        "Informações",
        "Info Covid",
        "Covid",
        "Covid-19",
      ],
      component: PageMenu,
      iconName: Acesso,
      subMenu: [
        {
          title: "e-SIC (Serviço de Informação ao Cidadão)",
          path: "/acesso-info/e-sic",
          tags: [
            "e-SIC (Serviço de Informação ao Cidadão)",
            "Serviço de Informação",
            "Informações",
            "Cidadão",
            "Informações ao Cidadão",
            "e-SIC",
            "SIC",
          ],
          type: "component",
          component: eSIC,
        },
        {
          title: "SIC-Físico (Serviço de Informação ao Cidadão)",
          path: "/acesso-info/sic",
          tags: [
            "SIC-Físico (Serviço de Informação ao Cidadão)",
            "Serviço de Informação",
            "Informações",
            "Cidadão",
            "Informações ao Cidadão",
            "SIC-Físico",
            "SIC",
          ],
          type: "component",
          component: SIC,
        },
        {
          title: "Ouvidoria",
          path: "/acesso-info/ouvidoria",
          tags: [
            "Ouvidoria",
            "Ouvidoria Informações",
            "Informação",
            "Informações",
          ],
          type: "component",
          component: Ouvidoria,
        },
        {
          title: "Estatísticas",
          path: "/acesso-info/estatisticas",
          tags: ["Estatísticas", "Informações", "Informação", "Estatistica"],
          type: "component",
          component: Estatisticas,
        },
        {
          title: "Consulta SIC",
          path: "/acesso-info/consulta-sic",
          tags: [
            "Consulta SIC",
            "Consulta",
            "Serviço de Informação",
            "Informações",
            "Cidadão",
            "Informações ao Cidadão",
            "SIC",
          ],
          type: "component",
          component: ConsultaSIC,
        },
        {
          title: "Regulamentação da Lei de Acesso a informação",
          path: "/acesso-info/lei-de-acesso-a-informacao",
          tags: [
            "Regulamentação da Lei de Acesso a informação",
            "Regulamento de Lei",
            "Regulamentos",
            "Lei",
            "Leis",
            "Acesso a informação",
            "Informações",
            "Informação",
          ],
          type: "component",
          component: LeiAcesso,
        },
      ],
    },
    {
      title: "Informações Institucionais",
      path: "/info-institucionais",
      tags: [
        "Informações Institucionais",
        "Informações",
        "Instituto",
        "Info institucionais",
        "Instituição",
      ],
      component: PageMenu,
      iconName: Info,
      subMenu: [
        {
          title: "Registro das Competências",
          path: "/info-institucionais/registro-das-competencias",
          tags: [
            "Registro das Competências",
            "Registro",
            "Competências",
            "Competência",
            "Registro de Competência",
          ],
          type: "component",
          component: Registro,
        },
        {
          title: "Estrutura Organizacional",
          path: "/info-institucionais/estrutura-organizacional",
          tags: [
            "Estrutura Organizacional",
            "Estruturas",
            "Estrutura",
            "Organização",
            "Estruturas Organizacionais",
          ],
          type: "component",
          component: Estrutura,
        },
        {
          title: "Endereços, Telefones, Horário de Atendimento e Responsáveis",
          path: "/info-institucionais/info-gerais",
          tags: [
            "Endereços, Telefones, Horário de Atendimento e Responsáveis",
            "Endereços",
            "Telefones",
            "Telefone",
            "Horários",
            "Horário",
            "Horas",
            "Hora de Funcionamento",
            "Horários de Atendimento",
            "Responsáveis",
            "Responsavel",
          ],
          type: "component",
          component: Endereco,
        },
        {
          title: "Carta de Serviços",
          path: "https://www5.pmfi.pr.gov.br/listaServicos",
          tags: ["Carta de Serviços", "Serviços", "Serviço"],
          type: "link",
        },
        {
          title: "FAQ",
          path: "/info-institucionais/faq",
          tags: [
            "FAQ",
            "Questões frequentes",
            "Perguntas Frequentes",
            "Perguntas",
            "Questãoes",
            "Pergunta",
            "Duvidas Frequentes",
            "Duvidas",
            "Frequente",
          ],
          type: "component",
          component: FAQ,
        },

        {
          title: "Fale conosco",
          path: "/info-institucionais/fale-conosco",
          tags: [
            "Fale Conosco",
            "Fale",
            "Telefone",
            "Atendimento",
            "Informações",
          ],
          type: "component",
          component: FaleConosco,
        },
      ],
    },
    {
      title: "Receitas",
      path: "/receitas",
      tags: ["Receitas", "Informações", "Receita"],
      component: PageMenu,
      iconName: Receita,
      subMenu: [
        {
          title: "Receitas",
          path: "/receitas/receitas",
          tags: ["Receitas", "Informações", "Receita"],
          type: "component",
          component: Receitas,
        },
        {
          title: "Repasses",
          path: "/receitas/repasses",
          tags: ["Repasses", "Receitas", "Informações", "Receita"],
          type: "component",
          component: Repasses,
        },
      ],
    },
    {
      title: "Despesas",
      path: "/despesas",
      tags: ["Despesas", "Despesa", "Gastos", "Gasto"],
      component: PageMenu,
      iconName: Despesas,
      subMenu: [
        {
          title: "Despesas",
          path: "/despesas/despesas",
          tags: ["Despesas", "Despesa", "Gastos", "Gasto"],
          type: "component",
          component: DespesasPage,
        },
        {
          title: "Despesas Extra Orçamentárias",
          path: "/despesas/despesas-extra-orcamentarias",
          tags: [
            "Despesas Extra Orçamentárias",
            "Despesa Extra",
            "Gastos Extra",
            "Gasto Extra",
            "Despesas Orçamentárias",
          ],
          type: "component",
          component: Search,
        },
        {
          title: "Despesas com Publicidade",
          path: "/despesas/despesas-com-publicidade",
          tags: [
            "Despesas com Publicidade",
            "Despesas",
            "Publicidade",
            "Despesas Publicitarias",
            "Despesa Publicitaria",
          ],
          type: "component",
          component: Search,
        },
        {
          title: "Transferências realizadas",
          path: "/despesas/transferencias-realizadas",
          tags: [
            "Tranferências Realizadas",
            "Tranferências",
            "Tranferência",
            "Despesas Tranferencias",
          ],
          type: "component",
          component: Search,
        },
      ],
    },
    {
      title: "Administração/Licitações",
      path: "/adm-licitacoes",
      tags: [
        "Administração/Licitações",
        "Administração e Licitações",
        "Adiministração",
        "Licitações",
        "Licitação",
      ],
      component: PageMenu,
      iconName: Adm,
      subMenu: [
        {
          title: "Contratos e Aditivos",
          path: "/adm-licitacoes/contratos-aditivos",
          tags: [
            "Contratos e Aditivos",
            "Contratos",
            "Aditivos",
            "Contratos Aditivos",
          ],
          type: "component",
          component: Contratos,
        },
        {
          title: "Patrimonio",
          path: "/adm-licitacoes/patrimonio",
          tags: ["Patrimonio", "Patrimonios"],
          type: "component",
          component: Patrimonio,
        },
        {
          title: "Licitações",
          path: "/adm-licitacoes/licitacoes",
          tags: ["Licitações", "Licitação"],
          type: "component",
          component: Licitacoes,
        },
        {
          title: "Ações e Programas",
          path: "/adm-licitacoes/acoes-programas",
          tags: [
            "Ações e Programas",
            "Ações",
            "Programas",
            "Ação e programas",
            "Ações e programa",
            "Programa",
          ],
          type: "component",
          component: Programas,
        },
        {
          title: "Extrato Fornecedor",
          path: "/adm-licitacoes/extrato-fornecedor",
          tags: ["Extrato Fornecedor", "Extratos", "Extrato", "Fornecedor"],
          type: "component",
          component: Fornecedor,
        },
      ],
    },
    {
      title: "Pessoal",
      path: "/pessoal",
      tags: ["Pessoal"],
      component: PageMenu,
      iconName: Pessoal,
      subMenu: [
        {
          title: "Servidores Cedidos de Outros Orgãos",
          path: "/pessoal/servidores-cedidos-de-outros-orgaos",
          tags: [
            "Servidores Cedidos de Outros Orgãos",
            "Servidores Cedidos",
            "Servidores",
            "Servidores de Outros Orgãos",
            "Orgãos",
            "Servidor",
          ],
          type: "component",
          component: CedidosDe,
        },
        {
          title: "Servidores Cedidos a Outros Orgãos",
          path: "/pessoal/servidores-cedidos-a-outros-orgaos",
          tags: [
            "Servidores Cedidos a Outros Orgãos",
            "Servidores",
            "Servidor",
            "Servidores Cedidos",
            "Orgãos",
          ],
          type: "component",
          component: CedidosA,
        },
        {
          title: "Quadro Funcional e Remuneração",
          path: "/pessoal/quadro-funcional-remuneracao",
          tags: [
            "Quadro Funcional e Remuneração",
            "Quadro Funcional",
            "Remuneração",
            "Quadro",
          ],
          type: "component",
          component: QuadroFuncional,
        },
        {
          title: "Servidores Temporários",
          path: "/pessoal/servidores-temporarios",
          tags: [
            "Servidores Temporários",
            "Servidores",
            "Servidor",
            "Servidor Temporario",
            "Temporario",
          ],
          type: "component",
          component: Temporarios,
        },
        {
          title: "Tabela de remuneração",
          path: "/pessoal/tabela-de-remuneracao",
          tags: [
            "Tabela de Remuneração",
            "Tabelas",
            "Remuneração",
            "Remunerações",
            "Tabelas Remunerarias",
          ],
          type: "component",
          component: TabelaRemuneracao,
        },
      ],
    },
    {
      title: "Diárias e Passagens",
      path: "/diarias",
      tags: [
        "Diárias e Passagens",
        "Diárias",
        "Passagens",
        "Diária",
        "Passagem",
      ],
      component: PageMenu,
      iconName: Diarias,
      subMenu: [
        {
          title: "Diárias",
          path: "/diarias/diarias",
          tags: ["Diária", "Diárias"],
          type: "component",
          component: DiariasPage,
        },
        {
          title: "Passagem",
          path: "/diarias/passagem",
          tags: ["Passagem", "Passagens"],
          type: "component",
          component: Passagem,
        },
        {
          title: "Adiantamento",
          path: "/diarias/adiantamento",
          tags: [
            "Adiantamento",
            "Adiantamentos",
            "Diarias",
            "Adiantamento de Diaria",
            "Adiantamento de Diarias",
            "Diaria",
          ],
          type: "component",
          component: Adiantamento,
        },
        {
          title: "Tabela de valores de diarias",
          path: "/diarias/tabela-diarias",
          tags: [
            "Tabela de valores de diarias",
            "Tabela de Valores",
            "Tabela de Valores",
            "Tabela de Valor",
            "Diarias",
            "Valor Diaria",
            "Diaria",
            "Valor",
            "Valores",
          ],
          type: "component",
          component: TabelaDiaria,
        },
        {
          title: "Tabela de valores de passagem",
          path: "/diarias/tabela-passagem",
          tags: [
            "Tabela de valores de passagem",
            "Tabela de Valores",
            "Valores de passagem",
            "Passagem",
            "Valor",
            "Valores",
            "Passagem Valores",
          ],
          type: "component",
          component: TabelaPassagem,
        },
      ],
    },
    {
      title: "Convênios",
      path: "/convenios",
      tags: ["Convênios", "Convênio"],
      component: PageMenu,
      iconName: Convenios,
      subMenu: [
        {
          title: "Parcerias/Convênios",
          path: "/convenios/parcerias-convenios",
          tags: [
            "Parcerias/Convênios",
            "Parcerias",
            "Convênio",
            "Parceria",
            "Convênios",
          ],
          type: "component",
          component: Parceria,
        },
        {
          title: "Convênios do Município",
          path: "/convenios/convenios-do-municipio",
          tags: [
            "Convênios do Município",
            "Convênio",
            "Município",
            "Convenios",
            "Convenios Municipais",
          ],
          type: "component",
          component: ConvDoMunicipio,
        },
        {
          title: "Convênios da Segurança Pública Municipal",
          path: "/convenios/convenios-seguranca-publica-municipal",
          tags: [
            "Convênios da Segurança Pública Municipal",
            "Convênios de Segurança Pública",
            "Segurança Publica",
            "Segurança",
            "Convenios Municipais",
          ],
          type: "component",
          component: ConvSegPublica,
        },
      ],
    },
    {
      title: "Lei Complementar 101/00 - LRF",
      path: "/lrf",
      tags: [
        "Lei Complementar 101/00 - LRF",
        "Lei",
        "Responsabilidade Fiscal",
        "LRF",
        "Lei Complementar",
      ],
      component: PageMenu,
      iconName: Lei,
      subMenu: [
        {
          title: "Demonstrativo RGF",
          path: "/lrf/rgf",
          tags: [
            "Demonstrativo RGF",
            "Demonstrativos Fiscais",
            "Demostrativo fiscal",
            "Demostrativos",
            "Demosntrativo",
            "RGF",
          ],
          type: "component",
          component: RGF,
        },
        {
          title: "Demonstrativo RREO",
          path: "/lrf/rreo",
          tags: [
            "Demonstrativo RREO",
            "Relatório Resumido da Execução Orçamentária",
            "Demonstrativo",
            "Demosntrativos",
            "RREO",
          ],
          type: "component",
          component: RREO,
        },
      ],
    },
    {
      title: "Planejamento",
      path: "/planejamento",
      tags: ["Planejamento", "Planejamentos"],
      component: PageMenu,
      iconName: Planejamento,
      subMenu: [
        {
          title: "PPA - Plano Plurianual",
          path: "/planejamento/ppa",
          tags: [
            "PPA - Plano Plurianual",
            "PPA",
            "Planejamento Plurianual",
            "Planejamento",
            "Plano Plurianual",
            "Plurianual",
          ],
          type: "component",
          component: PPA,
        },
        {
          title: "LDO - Lei de Diretriz Orçamentária",
          path: "/planejamento/ldo",
          tags: [
            "LDO - Lei de Diretriz Orçamentária",
            "Lei",
            "LDO",
            "Lei da Diretriz Orçamentaria",
            "Diretriz",
            "Orçamentario",
            "Diretriz Orçamentaria",
          ],
          type: "component",
          component: LDO,
        },
        {
          title: "LOA - Lei Orçamentária Anual",
          path: "/planejamento/loa",
          tags: [
            "LOA - Lei Orçamentária Anual",
            "LOA",
            "Lei Orçamentária Anual",
            "Orçamentação Anual",
            "Anual",
            "Orçamentaria",
          ],
          type: "component",
          component: LOA,
        },
        {
          title: "Ata das Audiências - Avaliação de metas Fiscais",
          path: "/planejamento/ata-audiencias-metas-fiscais",
          tags: [
            "Ata das Audiências - Avaliação de metas Fiscais",
            "Ata das Audiências",
            "Avaliação de metas Fiscais",
            "Metas Fiscais",
            "Ata",
            "Metas",
            "Fiscais",
          ],
          type: "component",
          component: Atas,
        },
        {
          title: "Informações Contábeis - Anexos da Lei 4.320/64",
          path: "/planejamento/info-contabeis",
          tags: [
            "Informações Contábeis - Anexos da Lei 4.320/64",
            "Informações",
            "Informação",
            "Informações Contabeis",
            "Informações de Contabilidade",
            "Lei 4.320/64",
            "4.320/64",
          ],
          type: "component",
          component: InfoContabeis,
        },
        {
          title: "Parecer TCE",
          path: "/planejamento/parecer-tce",
          tags: [
            "Parecer TCE",
            "TCE",
            "Parecer",
            "Tribunal de Contas do Estado",
            "Contas do Estado",
            "Estado",
          ],
          type: "component",
          component: ParecerTCE,
        },
      ],
    },
    {
      title: "Educação",
      component: PageMenu,
      type: "component",
      iconName: Educacao,
      subMenu: [
        {
          title: "Plano Municipal de Educação",
          path: "/planejamento/plano-municipal-educacao",
          tags: [
            "Plano Municipal de Educação",
            "Plano Municipal",
            "Educação",
            "Plano",
          ],
          type: "component",
          component: PlanoMunicipalEducacao,
        },
        {
          title: "Opcao 1",
          path: "/educacao/opcao1",
          tags: ["Opcao 1", "Opções", "1", "Educação"],
          type: "component",
          component: Search,
        },
        {
          title: "Opcao 2",
          path: "/educacao/opcao2",
          tags: ["Opcao 2", "Opções", "2", "Educação"],
          type: "component",
          component: Search,
        },
        {
          title: "Opcao 3",
          path: "/educacao/opcao3",
          tags: ["Opcao 3", "Opções", "3", "Educação"],
          type: "component",
          component: Search,
        },
      ],
    },
    {
      title: "Saúde",
      path: "/saude",
      tags: ["Saúde"],
      component: PageMenu,
      iconName: Saude,
      subMenu: [
        {
          title: "Conselho Municipal de Saúde",
          path: "https://www5.pmfi.pr.gov.br/orgao-74",
          tags: [
            "Conselho Municipal de Saúde",
            "Conselho Municipal",
            "Saúde",
            "Conselho",
          ],
          type: "link",
        },
        {
          title: "Plano Municipal de Saúde",
          path: "/saude/plano-municipal-saude",
          tags: [
            "Plano Municipal de Saúde",
            "Plano Municipal",
            "Saúde",
            "Plano",
          ],
          type: "component",
          component: PlanoMunicipalSaude,
        },
        {
          title: "Escalas Médicas UPA João Samek",
          path: "/saude/escalas-medicas-upa-joao-samek",
          tags: [
            "Escalas Médicas UPA João Samek",
            "Escalas Médicas",
            "UPA",
            "João Samek",
          ],
          type: "component",
          component: EscalasMedicasUPAJoaoSamek,
        },
        {
          title: "Escalas Médicas UPA Walter Cavalcanti Barbosa",
          path: "/saude/escalas-medicas-upa-walter-cavalcanti-barbosa",
          tags: [
            "Escalas Médicas UPA Walter Cavalcanti Barbosa",
            "Escalas Médicas ",
            "UPA",
            "Walter Cavalcanti Barbosa",
          ],
          type: "component",
          component: EscalasMedicasUPAWalterCavalcantiBarbosa,
        },
        {
          title: "Escalas Médicas UBS",
          path: "/saude/escalas-medicas-ubs",
          tags: ["Escalas Médicas UBS", "Escalas Médicas ", "UBS", "Escalas"],
          type: "component",
          component: EscalasmedicasUBS,
        },
        {
          title: "Opcao 2",
          path: "/saude/opcao2",
          tags: ["Opcao 2", "Opções", "2", "Saúde"],
          type: "component",
          component: Search,
        },
        {
          title: "Opcao 3",
          path: "/saude/opcao3",
          tags: ["Opcao 3", "Opções", "3", "Saúde"],
          type: "component",
          component: Search,
        },
      ],
    },
    {
      title: "Conselhos",
      path: "/conselhos",
      tags: ["Conselhos", "Conselho"],
      component: PageMenu,
      iconName: Conselho,
      subMenu: [
        {
          title: "Conselho Municipal de Saúde",
          path: "https://www5.pmfi.pr.gov.br/orgao-74",
          tags: ["Conselho Municipal de Saúde", "Saúde", "Conselho Municipal"],
          type: "link",
        },
        {
          title: "Conselho Municipal de Educação",
          path: "https://www5.pmfi.pr.gov.br/orgao-105",
          tags: [
            "Conselho Municipal de Educação",
            "Educação",
            "Conselho Municipal",
          ],
          type: "link",
        },
        {
          title: "Conselho Municipal de Assitência Social",
          path: "https://www5.pmfi.pr.gov.br/orgao-70",
          tags: [
            "Conselho Municipal de Assitência Social",
            "Assitência Social",
            "Conselho Municipal",
          ],
          type: "link",
        },
        {
          title: "Conselho Municipal do Idoso",
          path: "https://www5.pmfi.pr.gov.br/orgao-72",
          tags: ["Conselho Municipal do Idoso", "Idoso", "Conselho Municipal"],
          type: "link",
        },
      ],
    },
  ] as MenuProps[],
};
