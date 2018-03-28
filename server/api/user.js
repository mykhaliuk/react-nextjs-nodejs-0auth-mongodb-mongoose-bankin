import express from 'express'

import BankAccount from '../models/BankAccount'
import Transaction from '../models/Transaction'

const router = express.Router()

router.use((req, res, next) => {
  if (!req.user) {
    res.status(401).json({error: 'Unauthorized'})
    return
  }

  next()
})

router.get('/bank-account/:id', async (req, res) => {
  try {
    const accounts = await BankAccount.accountDataById(req.params.id)
    res.json(accounts)
  } catch (err) {
    res.json({error: err.message || err.toString()})
  }
})

router.post('/bank-account/create', async (req, res) => {
  const {
          name, currency, description, CreationDate, type
        }       = req.body,
        user_id = req.user.id

  try {
    await BankAccount.add({user_id, name, currency, description, CreationDate, type})
    res.json({saved: 1})
  } catch (err) {
    res.json({error: err.message || err.toString()})
  }
})

router.get('/transactions/all', async (req, res) => {
  try {
    const transactions = await Transaction.allTransactionsByUserId(req.user.id)
    res.json(transactions)
  } catch (err) {
    res.json({error: err.message || err.toString()})
  }
})

router.post('/transactions/all', async (req, res) => {
  const {
          name, note, account, amount, currency, subCategory, category, creationDate, isHidden
        }     = req.body,
        owner = req.user.id

  try {
    const newTransaction = await Transaction.add({name, note, owner, account, amount, currency, category, subCategory, creationDate, isHidden})
    res.json(newTransaction)
  } catch (err) {
    res.json({error: err.message || err.toString()})
  }
})

export default router