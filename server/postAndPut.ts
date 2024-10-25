import {TSignInResponse} from '@/types/auth'
import {getServerUrl} from './getServerUrl'
import * as U from '@/utils'

const postAndPut =
  (methodName: string) =>
  async (path: string, data: object | FormData, jwt?: string | null | undefined) => {
    let headers: Record<string, string> = {}
    let init: RequestInit = {
      method: methodName,
      body: data instanceof FormData ? data : JSON.stringify(data),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin'
    }

    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    if (jwt) {
      init = {
        ...init,
        headers: {...headers, Authorization: `Bearer ${jwt}`}
      }
    } else init = {...init, headers}
    const response = await fetch(getServerUrl(path), init)

    if (response.status === 401) {
      window.location.href = '/login'
    }
    return response
  }
export const post = postAndPut('POST')
export const put = postAndPut('PUT')

const getJwtFromLocalStorage = async (): Promise<string | null | undefined> => {
  try {
    const signInResponse = await U.readObjectP<TSignInResponse>('signInResponse')
    return signInResponse?.jwtToken.accessToken
  } catch (e) {
    console.log(e)
    return null
  }
}

export const postWithJwt = async (path: string, data: object | FormData) => {
  const jwt = await getJwtFromLocalStorage()
  return post(path, data, jwt)
}

export const putWithJwt = async (path: string, data: object | FormData) => {
  const jwt = await getJwtFromLocalStorage()
  return put(path, data, jwt)
}
