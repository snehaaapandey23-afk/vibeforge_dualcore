const mongoose = require('mongoose')

const MentorshipSchema = new mongoose.Schema({ mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, startedAt: Date })

module.exports = mongoose.model('Mentorship', MentorshipSchema)
