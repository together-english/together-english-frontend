import {getServerUrl} from './getServerUrl'

const postAndPut =
  (methodName: string) =>
  (path: string, data: object, jwt?: string | null | undefined) => {
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
    return fetch(getServerUrl(path), init)
  }
export const post = postAndPut('POST')
export const put = postAndPut('PUT')
