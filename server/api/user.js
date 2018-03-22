import express from 'express'

import Category from '../models/Category'

const router = express.Router()

router.use((req, res, next) => {
  if (!req.user) {
    res.status(401).json({error: 'Unauthorized'})
    return
  }

  next()
})

router.get('/all-categories', async (req, res) => {
  try {
    const categories = await Category.list()

    res.json(categories)
  } catch (err) {
    res.json({error: err.message || err.toString()})
  }
})

export default router