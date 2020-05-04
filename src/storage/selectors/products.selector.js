export const searchAutocomleteList = state => state.productSearchAutocomplete || []

export const productsData = state => state.productsData || {}

export const products = state => productsData(state).products || []

export const config = state => productsData(state).config || {}

export const vendors = state => productsData(state).vendors || {}
