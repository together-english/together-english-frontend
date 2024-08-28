export const getServerUrl = (path: string) => {
  const host = 'http://localhost:8080'
  return [host, path].join('')
}
