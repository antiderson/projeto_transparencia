import { HeaderProps } from "../components/NewTable";

export default function getDataGraficoFromTableData(
  data: any[],
  header: HeaderProps[],
): any[] {
  const headerArray: string[] = header.map(item => item.label);
  const dataArray: any[] = [];
  data.forEach(item => {
    const itemArray: any[] = [];
    header.forEach(itemHeader => {
      itemArray.push(item[itemHeader.value]);
    });
    dataArray.push(itemArray);
  });
  return [headerArray, ...dataArray];
}
