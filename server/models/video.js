import mongoose from 'mongoose'

var VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  filename: String,
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { 
  timestamps: true 
})

var Video = mongoose.model('Video', VideoSchema)

export default Video