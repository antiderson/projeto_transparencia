export default function sortArray(dataArray: any[], value: string): any[] {
  const sortData = dataArray.sort((a, b) => {
    if (a[value] > b[value]) {
      return 1;
    }
    if (a[value] < b[value]) {
      return -1;
    }
    return 0;
  });
  return sortData;
}
