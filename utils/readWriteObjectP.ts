import * as L from './localStorageP'

export const readObjectP = <T extends object>(key: string) =>
  new Promise<T | null>((resolve, reject) => {
    L.readStringP(key)
      .then(value => resolve(value ? JSON.parse(value) : null))
      .catch(reject)
  })

export const writeObjectP = (key: string, value: object) =>
  L.writeStringP(key, JSON.stringify(value))

export const removeObjectP = (key: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    try {
      L.removeStringP(key)
        .then(() => resolve())
        .catch(reject)
    } catch (error) {
      reject(error)
    }
  })
}
