import React from "react";
import Chart from "react-google-charts";
import {
  GoogleChartWrapperChartType,
  ReactGoogleChartProps,
} from "react-google-charts/dist/types";
import SyncLoader from "react-spinners/SyncLoader";

import { Container, Title } from "./styles";

interface GraficoProps extends ReactGoogleChartProps {
  title: string;
  chartType: GoogleChartWrapperChartType;
}

const Grafico: React.FC<GraficoProps> = ({ title, chartType, ...rest }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Chart
        chartType={chartType}
        width="100%"
        height="100%"
        loader={<SyncLoader />}
        {...rest}
      />
    </Container>
  );
};

export default Grafico;
