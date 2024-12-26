export const getTotal = (items) => {
  if (!items) return 0;
  let total = 0;

  items.forEach((item) => {
    total += item.quantity * item.price + item.boxQuantity * item.boxPrice;
  });

  return total;
};
