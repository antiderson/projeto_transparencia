/* eslint-disable no-unused-expressions */
import { RowInput } from "jspdf-autotable";
import formatCell from "./formatCell";

interface HeaderProps {
  label: string;
  value: string;
  sortable?: boolean;
  type?: "currency" | "string" | "date";
  formatDate?: string;
  containerStyle?: Object;
}

function formatBody(data: any[], header: HeaderProps[]): RowInput[] {
  const bodyFormatted = [] as any[];

  data.forEach(row => {
    const newRow = [] as any[];
    header.forEach(item => {
      item.type
        ? newRow.push(
            formatCell(
              row[item.value],

              item.type,
              item.formatDate || undefined,
            ),
          )
        : newRow.push(row[item.value]);
    });
    bodyFormatted.push(newRow);
  });

  return bodyFormatted;
}

export default formatBody;
