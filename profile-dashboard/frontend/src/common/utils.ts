export const encodeQueryData = (data): string => {
  const ret = [];
  for (const d in data) {
    if (data[d]) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
  }
  return ret.join('&');
};

export const numberFormat = (
  inputNumber: number
): string | null | undefined => {
  if (inputNumber === null) return null;
  if (inputNumber === undefined) return undefined;

  const parts = inputNumber.toString().split('.');
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
};
