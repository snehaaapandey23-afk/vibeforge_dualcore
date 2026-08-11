const express = require('express')
const router = express.Router()
const Candidate = require('../models/Candidate')
const auth = require('../middleware/auth')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('resume'), async (req,res)=>{
  // mock: create candidate with resume path and placeholder extracted text
  const { email } = req.body
  const resumeText = `Imported candidate resume: ${req.file?.originalname || 'resume'}`
  const c = await Candidate.create({ resumeUrl: req.file?.path, skills: [], status: 'uploaded' })
  res.json({
    ...c.toObject(),
    resumeText,
    message: 'Candidate uploaded successfully'
  })
})

router.get('/', auth, async (req,res)=>{
  const all = await Candidate.find().populate('user')
  res.json(all)
})

module.exports = router
