import sendRequest from './sendRequest'

const BASE_PATH = '/api/v1/user'

export const getAllCategories = () =>
  sendRequest(`${BASE_PATH}/all-categories`, {
    method: 'GET'
  })

export const getBankAccountData = id =>
  sendRequest(`${BASE_PATH}/bank-account/${id}`, {
    method: 'GET'
  })
export const createBankAccount = data =>
  sendRequest(`${BASE_PATH}/bank-account/create`, {
    body: JSON.stringify(data)
  })

