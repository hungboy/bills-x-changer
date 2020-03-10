export const stableSort = <T>(
  array: T[],
  comparitor: (a: T, b: T) => number
): T[] => {
  const stabilizedArray: [T, number][] = array.map((el, index) => [el, index]);

  stabilizedArray.sort((a, b) => {
    const order = comparitor(a[0], b[0]);

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedArray.map(([el]) => el);
};
