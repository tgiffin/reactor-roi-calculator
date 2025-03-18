
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatCurrency = (value: number, maximumFractionDigits = 2): string => {
  // For larger numbers (over $1000), we'll show without cents to save space
  const fractionDigits = value > 1000 ? 0 : maximumFractionDigits;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);
};
