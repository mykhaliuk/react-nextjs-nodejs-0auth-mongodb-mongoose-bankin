import sendRequest from './sendRequest'

const BASE_PATH = '/api/v1/user'

export const getAllCategories = () =>
  sendRequest(`${BASE_PATH}/all-categories`, {
    method: 'GET'
  })

