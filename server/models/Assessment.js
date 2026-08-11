const mongoose = require('mongoose')

const AssessmentSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  skills: [{ name: String, score: Number }],
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Assessment', AssessmentSchema)
