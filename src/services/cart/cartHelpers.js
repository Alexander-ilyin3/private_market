export const calculateCartTotal = cart => cart.reduce(
  (prev, current) => prev + Number(current.count) * (
    typeof current.product.individual_price === 'number'
      ? current.product.individual_price
      : Number(current.product.individual_price.replace(',', ''))
  ),
  0,
)
