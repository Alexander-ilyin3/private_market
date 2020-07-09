import { store } from 'storage'
import { updateCart } from 'storage/actions/cart.actions'
import { showSnack } from 'storage/actions/snack.actions'
import { getCart } from 'storage/selectors/cart.selector'

import { getStorageItem, setStorageItem } from '../storage'

const CART_STORAGE_ITEM_NAME = 'CART'

export const updateCartReduxState = (cart) => {
  updateCart(cart)
}

export const fullUpdateCart = (cart) => {
  updateCartReduxState(cart)
  setStorageItem(CART_STORAGE_ITEM_NAME, JSON.stringify(cart))
}

export const getCartFromStorage = () => {
  const cart = JSON.parse(getStorageItem(CART_STORAGE_ITEM_NAME))
  if (cart && cart.length > 0) {
    updateCartReduxState(cart)
    return cart
  }
  return null
}

export const addProduct = (event) => {
  if (!event) return showSnack({ variant: 'error', message: 'Нечего добавлять' })
  const { product, count } = event
  showSnack({
    variant: 'success',
    message: `Готово!
              Товар добавлен в корзину`,
  })
  const storeCart = getCart(store.getState())
  if (storeCart.find(stored => stored.product.id === product.id)) {
    const newCart = storeCart.map((stored) => {
      if (stored.product.id === product.id) {
        return { count: +stored.count + +count, product }
      }
      return stored
    })
    return fullUpdateCart(newCart)
  }
  return fullUpdateCart([...storeCart, event])
}

export const setCount = (event) => {
  const { product, count } = event
  const storeCart = getCart(store.getState())
  if (storeCart.find(stored => stored.product.id === product.id)) {
    const newCart = storeCart.map((stored) => {
      if (stored.product.id === product.id) {
        return { count, product }
      }
      return stored
    })
    return fullUpdateCart(newCart)
  }
}

export const removeFromCart = (id) => {
  const storeCart = getCart(store.getState())
  fullUpdateCart(storeCart.filter(item => item.product.id !== id))
}

export const clearCart = () => {
  fullUpdateCart([])
}
