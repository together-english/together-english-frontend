export const getServerUrl = (path: string) => {
  const host = 'https://api.together-english.com'
  //const host = 'http://localhost'
  return [host, path].join('')
}
