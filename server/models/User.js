const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  role: { type: String, enum: ['candidate','employee','manager','executive','admin'], default: 'candidate' },
  passwordHash: String,
  profile: Object,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)
