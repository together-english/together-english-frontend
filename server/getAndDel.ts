import {getServerUrl} from './getServerUrl'

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
