import mongoose from 'mongoose'

mongoose.Promise = Promise

mongoose.connect('mongodb://localhost/testing')

export default mongoose