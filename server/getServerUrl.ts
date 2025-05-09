export const getServerUrl = (path: string) => {
  const host = 'https://api.english-together.shop'
  //const host = 'http://localhost'
  return [host, path].join('')
}
