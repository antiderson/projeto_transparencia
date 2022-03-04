/* eslint-disable import/no-duplicates */
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import formatValue from "../../../utils/formatValue";

function formatCell(
  value: any,
  type: string,
  formatDate: string | undefined,
): string {
  if (type === "currency") {
    return formatValue(value);
  }
  if (type === "date") {
    return format(new Date(value), formatDate || "dd/MM/yyyy", {
      locale: ptBR,
    });
  }
  return value;
}

export default formatCell;
