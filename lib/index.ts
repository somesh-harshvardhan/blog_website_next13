export const removeDuplicate = (
  array1: any[] = [],
  array2: any[] = [],
  keyMatch?: any
) => {
  let res: any[] = [];
  for (let i = 0; i < array1.length; i++) {
    const isDuplicate =
      keyMatch && typeof array1[i] === "object"
        ? array2.some((a) => a[keyMatch] === array1[i][keyMatch])
        : array2.includes(array1[i]);
    if (!isDuplicate) res.push(array1[i]);
  }
  return res;
};
