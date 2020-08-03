import { apiSetTokenPath } from 'config/apiPath'


import instance from './axiosProvider'

export const setToken = async ({ userId, token }) => {
  const res = await instance.post(apiSetTokenPath, { userId, token })
  return res
}
