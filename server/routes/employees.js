const express = require('express')
const router = express.Router()
const Employee = require('../models/Employee')
const auth = require('../middleware/auth')

router.get('/', auth, async (req,res)=>{
  const list = await Employee.find().populate('user')
  res.json(list)
})

module.exports = router
