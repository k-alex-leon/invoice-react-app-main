export const getTotal = (items) => {
  let total = 0;

  items.forEach((item) => {
    total = total + item.quantity * item.price;
  });

  return total;
};
