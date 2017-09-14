import mongoose from 'mongoose'

import { isTesting } from './config'

mongoose.Promise = Promise

const connectionString = isTesting
  ? 'mongodb://localhost/testing_test'
  : 'mongodb://localhost/testing'

mongoose.connect(connectionString, { useMongoClient: true })

export default mongoose