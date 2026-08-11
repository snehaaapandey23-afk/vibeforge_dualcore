const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

// register (simple)
router.post('/register', async (req,res)=>{
  const { email, name, password, role } = req.body
  const existing = await User.findOne({ email })
  if (existing) return res.status(400).json({ error: 'Exists' })
  const hash = await bcrypt.hash(password, 10)
  const u = await User.create({ email, name, passwordHash: hash, role })
  const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET || 'devsecret')
  res.json({ token, user: { id: u._id, email, name, role } })
})

// login
router.post('/login', async (req,res)=>{
  const { email, password } = req.body
  const u = await User.findOne({ email })
  if (!u) return res.status(400).json({ error: 'Invalid' })
  const ok = await bcrypt.compare(password, u.passwordHash || '')
  if (!ok) return res.status(400).json({ error: 'Invalid' })
  const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET || 'devsecret')
  res.json({ token, user: { id: u._id, email: u.email, name: u.name, role: u.role } })
})

// Google OAuth placeholder (structure only)
router.get('/google', (req,res)=>{
  res.json({ info: 'Google OAuth endpoint — configure CLIENT_ID/SECRET in env' })
})

module.exports = router
