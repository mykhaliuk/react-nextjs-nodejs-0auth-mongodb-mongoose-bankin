import userAPI from './user'

export default function api(server) {
  server.use('/api/v1/user', userAPI)
}