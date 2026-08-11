const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  skills: [{ name: String, level: Number }],
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  wellbeing: [{ date: Date, score: Number }]
})

module.exports = mongoose.model('Employee', EmployeeSchema)
