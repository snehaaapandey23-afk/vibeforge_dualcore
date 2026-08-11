const express = require('express')
const router = express.Router()
const Team = require('../models/Team')
const auth = require('../middleware/auth')

router.get('/teams', auth, async (req,res)=>{
  const teams = await Team.find({ owner: req.user.id }).populate('members')
  res.json(teams)
})

module.exports = router
