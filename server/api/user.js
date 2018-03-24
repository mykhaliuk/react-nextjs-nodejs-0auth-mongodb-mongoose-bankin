import express from 'express'

import BankAccount from '../models/BankAccount'

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
  const {name, currency, description, CreationDate, type} = req.body,
        user_id                                           = req.user.id

  try {
    await BankAccount.add({user_id, name, currency, description, CreationDate, type})
    res.json({saved: 1})
  } catch (err) {
    res.json({error: err.message || err.toString()})
  }
})

export default router