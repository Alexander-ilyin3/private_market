import { apiSetTokenPath, apiSetCodePath } from 'config/apiPath'


import instance from './axiosProvider'

export const setToken = async ({ userId, token }) => {
  const res = await instance.post(apiSetTokenPath.replace(':id', userId), { token_1c: token })
  return res
}
export const setCode = async ({ userId, code }) => {
  const res = await instance.post(apiSetCodePath.replace(':id', userId), { code_1c: code })
  return res
}


export const setAllTokens = async ({ userId, token, code }) => {
  const [codeRes, tokenRes] = await Promise
    .all([setCode({ userId, code }), setToken({ userId, token })])
  return { codeRes, tokenRes }
}
