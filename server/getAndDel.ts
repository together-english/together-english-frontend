import {TSignInResponse} from '@/types/auth'
import {getServerUrl} from './getServerUrl'
import * as U from '@/utils'

const getAndDel =
  (methodName: string, jwt?: string | null | undefined) =>
  async (path: string, jwt?: string | null | undefined) => {
    let headers = {'Content-Type': 'application/json'}
    let init: RequestInit = {
      method: methodName
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

export const get = getAndDel('GET')
export const del = getAndDel('DELETE')

const getJwtFromLocalStorage = async (): Promise<string | null | undefined> => {
  try {
    const signInResponse = await U.readObjectP<TSignInResponse>('signInResponse')
    return signInResponse?.jwtToken.accessToken
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getWithJwt = async (path: string) => {
  const jwt = await getJwtFromLocalStorage()
  return get(path, jwt)
}

export const delWithJwt = async (path: string) => {
  const jwt = await getJwtFromLocalStorage()
  return del(path, jwt)
}
