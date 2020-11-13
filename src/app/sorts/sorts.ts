type Comparator = (a: any, b: any) => number;
type SortingAlgorithm = <T>(unsortedArray: T[], comparator?: Comparator) => T[];

const defaultComparator: Comparator = (a: any, b: any): number => {
  return a - b;
};

const quickSort: SortingAlgorithm = <T>(
  unsortedArray: T[],
  comparator: Comparator = defaultComparator
): T[] => {
  const sortedArray: T[] = [ ...unsortedArray ];
  const recursiveSort = (start: number, end: number) => {
    if (end - start < 1) {
      return;
    }

    const pivotValue: T = sortedArray[end];
    let splitIndex: number = start;
    for (let i: number = start; i < end; i++) {
      const sort: number = comparator(sortedArray[i], pivotValue);
      if (sort < 0) {
        if (splitIndex !== i) {
          const temp: T = sortedArray[splitIndex];
          sortedArray[splitIndex] = sortedArray[i];
          sortedArray[i] = temp;
        }
        splitIndex++;
      }
    }

    sortedArray[end] = sortedArray[splitIndex];
    sortedArray[splitIndex] = pivotValue;
    recursiveSort(start, splitIndex - 1);
    recursiveSort(splitIndex + 1, end);
  };

  recursiveSort(0, sortedArray.length - 1);
  return sortedArray;
};

export  { quickSort };
