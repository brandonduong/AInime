export function padZero(number: number) {
  if (number.toString().length === 1) {
    return `0${number}`;
  }
  return number;
}
