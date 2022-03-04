const formatValue = (value: number): string =>
  Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    signDisplay: "auto",
  }).format(value);

export default formatValue;
