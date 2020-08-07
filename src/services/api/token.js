import { apiSetTokenPath } from 'config/apiPath'


import instance from './axiosProvider'

export const setToken = async ({ userId, token }) => {
  const res = await instance.post(apiSetTokenPath.replace(':id', userId), { token_1c: token })
  return res
}
