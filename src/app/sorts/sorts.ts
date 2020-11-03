type Comparator = (a: any, b: any) => number;
type SortingAlgorithm = <T>(unsortedArray: T[], comparator?: Comparator) => T[];

const defaultComparator: Comparator = (a: any, b: any): number => {
  return a - b;
};

const quickSort: SortingAlgorithm = <T>(
  unsortedArray: T[],
  comparator: Comparator = defaultComparator
): T[] => {

  // Create a sortable array to return.
  const sortedArray: T[] = [ ...unsortedArray ];

  // Recursively sort sub-arrays.
  const recursiveSort = (start: number, end: number) => {

    // If this sub-array is empty, it's sorted.
    if (end - start < 1) {
      return;
    }

    const pivotValue: T = sortedArray[end];
    let splitIndex: number = start;

    
    for (let i: number = start; i < end; i++) {
      const sort: number = comparator(sortedArray[i], pivotValue);

      // This value is less than the pivot value.
      if (sort < 0) {

        // If the element just to the right of the split index,
        //   isn't this element, swap them.
        if (splitIndex !== i) {
          const temp: T = sortedArray[splitIndex];
          sortedArray[splitIndex] = sortedArray[i];
          sortedArray[i] = temp;
        }

        // Move the split index to the right by one,
        //   denoting an increase in the less-than sub-array size.
        splitIndex++;
      }

      // Leave values that are greater than or equal to
      //   the pivot value where they are.
    }

    // Move the pivot value to between the split.
    sortedArray[end] = sortedArray[splitIndex];
    sortedArray[splitIndex] = pivotValue;

    // Recursively sort the less-than and greater-than arrays.
    recursiveSort(start, splitIndex - 1);
    recursiveSort(splitIndex + 1, end);
  };

  // Sort the entire array.
  recursiveSort(0, sortedArray.length - 1);
  return sortedArray;
};

export  { quickSort };
