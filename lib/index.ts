export const removeDuplicate = (
  array1: any[] = [],
  array2: any[] = [],
  keyMatch?: any
) => {
  let res: any[] = [];
  let lgArray=[],smArray=
  lgArray = array1.length > array2.length ? array1 : array2;
  smArray = array1.length < array2.length ? array1  :array2;
  for (let i = 0; i < lgArray.length; i++) {
    const isDuplicate =
      keyMatch && typeof array1[i] === "object"
        ? smArray.some((a) => a[keyMatch] === array1[i][keyMatch])
        : smArray.includes(array1[i]);
    if (!isDuplicate) res.push(array1[i]);
  }
  return res;
};
