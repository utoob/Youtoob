import mongoose from 'mongoose'

var CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, `can't be blank.`],
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, `can't be blank.`]
  },
  videoId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Video',
    required: [true, `can't be blank.`]
  }
}, {
  timestamps: true
})

var Comment = mongoose.model('Comment', CommentSchema)

export default Comment