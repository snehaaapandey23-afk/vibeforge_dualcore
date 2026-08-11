const mongoose = require('mongoose')

const CandidateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resumeUrl: String,
  skills: [{ name: String, confidence: Number }],
  status: { type: String, default: 'applied' },
  appliedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Candidate', CandidateSchema)
