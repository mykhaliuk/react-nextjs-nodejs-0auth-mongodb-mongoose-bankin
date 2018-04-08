import sendRequest from './sendRequest'

const BASE_PATH = '/api/v1/user'

export default class {
  static getBankAccountData = id =>
    sendRequest(`${BASE_PATH}/bank-account/${id}`, {
      method: 'GET'
    })

  static createBankAccount = data =>
    sendRequest(`${BASE_PATH}/bank-account/create`, {
      body: JSON.stringify(data)
    })

  static getAllUserTransactions = id =>
    sendRequest(`${BASE_PATH}/transactions/all`, {
      method: 'GET'
    })

  static createTransaction = data =>
    sendRequest(`${BASE_PATH}/transactions`, {
      body: JSON.stringify(data)
    })
}
