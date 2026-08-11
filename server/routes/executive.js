const express = require('express')
const router = express.Router()
const Report = require('../models/Report')
const auth = require('../middleware/auth')

router.get('/reports', auth, async (req,res)=>{
  const r = await Report.find().limit(50)
  res.json(r)
})

module.exports = router
