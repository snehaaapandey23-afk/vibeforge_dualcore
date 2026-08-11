const mongoose = require('mongoose')

const WellbeingSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, date: Date, score: Number })

module.exports = mongoose.model('Wellbeing', WellbeingSchema)
