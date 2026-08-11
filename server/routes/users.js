const express = require('express')
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')

router.get('/me', auth, async (req,res)=>{
  const u = await User.findById(req.user.id).select('-passwordHash')
  res.json(u)
})

router.get('/', auth, async (req,res)=>{
  const users = await User.find().select('-passwordHash')
  res.json(users)
})

module.exports = router
