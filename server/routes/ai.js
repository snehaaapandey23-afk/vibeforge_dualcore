const express = require('express')
const router = express.Router()
const { parseResume, scoreSkills, teamCompatibility, predictRisk, recommendCareer, matchMentor, simulateWorkforce } = require('../services/ai')

router.post('/parse', async (req,res)=>{
  const { text } = req.body
  const parsed = await parseResume(text || '')
  res.json(parsed)
})

router.post('/score-skills', async (req,res)=>{
  const skills = req.body.skills || []
  res.json(scoreSkills(skills))
})

router.post('/team-compat', async (req,res)=>{
  const { team } = req.body
  res.json(teamCompatibility(team || []))
})

router.post('/risk', async (req,res)=>{
  res.json(predictRisk(req.body || {}))
})

router.post('/recommend', async (req,res)=>{
  res.json(recommendCareer(req.body || {}))
})

router.post('/mentor', async (req,res)=>{
  res.json(matchMentor(req.body || {}))
})

router.post('/simulate', async (req,res)=>{
  res.json(simulateWorkforce(req.body || {}))
})

module.exports = router
