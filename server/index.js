require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', false)

async function connectDatabase() {
  let mongoUri = process.env.MONGODB_URI || ''
  if (!mongoUri) {
    console.log('No MONGODB_URI found. Starting in-memory MongoDB for development...')
    const memServer = await MongoMemoryServer.create()
    mongoUri = memServer.getUri()
  }

  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(`MongoDB connected ${process.env.MONGODB_URI ? '' : '(in-memory fallback)'}`)
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    if (!process.env.MONGODB_URI) {
      console.log('Falling back to in-memory MongoDB...')
      const memServer = await MongoMemoryServer.create()
      await mongoose.connect(memServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
      console.log('MongoDB connected (in-memory fallback)')
    } else {
      throw err
    }
  }
}

async function start() {
  await connectDatabase()

  app.use('/api/auth', require('./routes/auth'))
  app.use('/api/users', require('./routes/users'))
  app.use('/api/candidates', require('./routes/candidates'))
  app.use('/api/employees', require('./routes/employees'))
  app.use('/api/manager', require('./routes/manager'))
  app.use('/api/executive', require('./routes/executive'))
  app.use('/api/ai', require('./routes/ai'))

  app.get('/api/health', (req, res) => res.json({ ok: true }))

  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => console.log(`Server running on ${PORT}`))
}

start().catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
