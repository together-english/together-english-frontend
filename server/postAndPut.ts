import {getServerUrl} from './getServerUrl'

const postAndPut =
  (methodName: string) =>
  async (path: string, data: object, jwt?: string | null | undefined) => {
    let headers = {'Content-Type': 'application/json'}
    let init: RequestInit = {
      method: methodName,
      body: JSON.stringify(data),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin'
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
