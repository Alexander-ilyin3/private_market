export const calculateCartTotal = cart => cart.reduce(
  (prev, current) => {
    const { count, product } = current
    const { individual_price } = product
    if (typeof individual_price === 'number') {
      return prev + Number(count) * individual_price
    }
    if (typeof individual_price === 'string') {
      return prev + Number(count) * Number(individual_price.replace(',', ''))
    }
    return prev
  },
  0,
)
