export default function getRootUrl() {

  const port = process.env.PORT || 80
  const dev = process.env.NODE_ENV !== 'production'
  const SERVER_URL = process.env.SERVER_URL
  const ROOT_URL = dev ? 'http://localhost:8000' : `${SERVER_URL}`

  console.log('ROOT_URL: ', ROOT_URL)

  return ROOT_URL
}
