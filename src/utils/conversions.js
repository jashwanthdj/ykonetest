export function convertToMillions(number) {
    const millions = number / 1000000;
    return millions.toFixed(1);
}
export function convertTimeStampToDate (timestamp) {
  const date = new Date(timestamp * 1000)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear();
  return `${day}/${month}/${year}`
}

export function convertIntoPercentage (val) {
  const percentage = val * 100;
  return percentage.toFixed(2) + '%'
}

export function convertIntoCurrency (val) {
  const millions = val / 1000000;
  return millions.toFixed(1) + '€'
}
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  } else {
    return num.toString()
  }
}
