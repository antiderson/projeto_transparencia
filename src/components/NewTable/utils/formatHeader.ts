import { RowInput } from "jspdf-autotable";

interface HeaderProps {
  label: string;
  value: string;
  sortable?: boolean;
  type?: "currency" | "string" | "date";
  formatDate?: string;
  containerStyle?: Object;
}

function formatHeader(header: HeaderProps[]): RowInput[] {
  const headerFormatted = [] as any[];

  header.forEach(column => {
    headerFormatted.push(column.label);
  });

  return [headerFormatted];
}

export default formatHeader;
