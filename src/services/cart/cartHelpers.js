export const calculateCartTotal = cart => cart.reduce(
  (prev, current) => prev + Number(current.count) * Number(current.product.price.replace(',', '')),
  0,
).toLocaleString()
