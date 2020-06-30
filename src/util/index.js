export const numberToUsd = (num) =>
  num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export const msToMinutesSeconds = (millis) => {
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  if (seconds === 60) {
    return Math.floor(millis / 60000) + 1 + ':00';
  }
  return (
    Math.floor(millis / 60000) +
    ':' +
    (seconds < 10 ? '0' : '') +
    seconds
  );
};
