const getStorageItem = key => localStorage.getItem(key)

const setStorageItem = (key, value) => localStorage.setItem(key, value)

const removeStorageItem = key => localStorage.removeItem(key)

export { getStorageItem, setStorageItem, removeStorageItem }
