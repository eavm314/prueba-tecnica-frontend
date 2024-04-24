export const toNumberParam = (key: string | undefined, defValue : number) => {
  if (key) {
    const value = parseInt(key);
    return isNaN(value) ? defValue : value;
  }
  return defValue;
}