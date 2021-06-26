const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer = null

module.exports.connectDb = ({ uri }) => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports.createUri = async () => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()
  return mongoUri
}

module.exports.closeDb = async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
}

module.exports.cleanDb = async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany()
  }
}
