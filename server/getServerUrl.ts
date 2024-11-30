export const getServerUrl = (path: string) => {
  const host = 'https://api.together-english.com'
  //const host = 'http://localhost:8080'
  return [host, path].join('')
}
