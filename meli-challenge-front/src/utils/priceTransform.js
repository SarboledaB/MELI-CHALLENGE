export const formatCurrency = (value, currency) => {
  return `$ ${new Intl.NumberFormat('es-CO', {
    currency: currency,
    minimumFractionDigits: 0,
  }).format(value)}`;
};
