import React from "react";
import { Switch, Route } from "react-router-dom";

import menuOptions from "../config/menuOptions";

import Home from "../pages/Home";
import Search from "../pages/Search";
import PageMenu from "../pages/PageMenu";
import Example from "../pages/Example";
import ServidorDetalhe from "../pages/Pessoal/ServidorDetalhe";
import ContratoDetalhe from "../pages/Administracao/ContratoDetalhe";
import DiariasDetalhe from "../pages/Diarias/DiariasDetalhe";
import DespesasDetalhe from "../pages/Despesas/DespesasDetalhe";
import PassagemDetalhe from "../pages/Diarias/PassagemDetalhe";
import DespesasDetalheCovid from "../pages/COVID-19/Despesas";
import LicitacoesDetalhes from "../pages/Administracao/LicitacoesDetalhes";
import PatrimonioDetalhe from "../pages/Administracao/PatrimonioDetalhe";

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/example" component={Example} />
    <Route exact path="/:id" component={PageMenu} />
    {menuOptions.options.map(option =>
      option.subMenu.map(subMenu => (
        <Route exact path={subMenu.path} component={subMenu.component} />
      )),
    )}
    <Route
      exact
      path="/pessoal/quadro-funcional-remuneracao/detalhe/:id"
      component={ServidorDetalhe}
    />
    <Route
      exact
      path="/diarias/diarias/detalhe/:id"
      component={DiariasDetalhe}
    />
    <Route
      exact
      path="/despesas/despesas/detalhe/:id"
      component={DespesasDetalhe}
    />
    <Route
      exact
      path="/covid-19/despesas/detalhe/:id"
      component={DespesasDetalheCovid}
    />
    <Route
      exact
      path="/adm-licitacoes/contratos-aditivos/detalhe/:id"
      component={ContratoDetalhe}
    />
    <Route
      exact
      path="/adm-licitacoes/licitacoes/detalhe/:id"
      component={LicitacoesDetalhes}
    />
    <Route
      exact
      path="/adm-licitacoes/patrimonio/detalhe/:id"
      component={PatrimonioDetalhe}
    />
    <Route
      exact
      path="/adm-licitacoes/licitacoes/detalhe/:id/contrato/:idcontrato"
      component={ContratoDetalhe}
    />
    <Route
      exact
      path="/diarias/passagem/detalhe/:id"
      component={PassagemDetalhe}
    />
  </Switch>
);

export default Routes;
