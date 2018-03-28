export default function getRootUrl() {
  const port = process.env.PORT || 8000
  const dev = process.env.NODE_ENV !== 'production'
  const SERVER_URL = process.env.SERVER_URL || ''
  const ROOT_URL = dev ? 'http://mbp.local:8000' : `${SERVER_URL}`

  return ROOT_URL
}
