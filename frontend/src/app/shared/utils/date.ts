export function getUTCDate(date?: string | Date | number) : Date | null {
  if (!date) {
    return null;
  }
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}
