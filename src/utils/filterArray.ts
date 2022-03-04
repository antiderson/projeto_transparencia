export default function filterArray(
  dataArray: any[],
  value: string,
  filter: string,
): any[] {
  const resultFiltered: any[] = dataArray.filter(
    (result: any) => result[value] === filter,
  );

  return resultFiltered;
}
