require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')
const Employee = require('./models/Employee')
const Team = require('./models/Team')
const Report = require('./models/Report')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/coworks'

async function run(){
  await mongoose.connect(MONGO_URI)
  console.log('Connected')
  await User.deleteMany({})
  await Employee.deleteMany({})
  await Team.deleteMany({})
  await Report.deleteMany({})

  const users = await User.create([
    { email: 'alice@example.com', name: 'Alice', role: 'manager' },
    { email: 'bob@example.com', name: 'Bob', role: 'employee' },
    { email: 'carol@example.com', name: 'Carol', role: 'executive' }
  ])

  await Employee.create({ user: users[1]._id, title: 'Engineer', skills: [{ name: 'React', level: 80 }] })
  await Team.create({ name: 'Platform', members: [users[1]._id], owner: users[0]._id })
  await Report.create({ title: 'Org Health', data: { score: 78 } })

  console.log('Seeded')
  process.exit(0)
}

run().catch(err=>{ console.error(err); process.exit(1) })
