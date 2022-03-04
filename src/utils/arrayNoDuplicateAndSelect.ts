import sortArray from "./sortArray";

export default function arrayNoDuplicateAndSelect(
  dataArray: any[],
  noDuplicate: string,
  sortBy: string,
): any[] {
  const sortData = Array.from(new Set(dataArray.map(a => a[noDuplicate]))).map(
    id => {
      return {
        value: dataArray.find(a => a[noDuplicate] === id)[noDuplicate],
        label: dataArray.find(a => a[noDuplicate] === id)[noDuplicate],
      };
    },
  );

  return sortArray(sortData, sortBy);
}
