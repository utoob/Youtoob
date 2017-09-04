import mongoose from 'mongoose'

var VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  filename: String,
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  viewCount: { type: Number, default: 0 }
}, { 
  timestamps: true 
})

/* -- Indexes --
 * Specifying indices for VideoSchema allows you to perform text search like this:
 *   Video.find({ $text: { $search: "Hello World!" } })
 * 
 * Mongo will look for records containing "Hello World" in Video's title, description or both,
 * sorting the results depending on how much weight the index has on the attribute.
 * 
 * For example, having these 2 records in the db,
 * { _id: 1, title: "...", description: "Hello World!" }
 * { _id: 2, title: "Hello World!", description: "..." }
 * 
 * Performing a search will return both of the records:
 * { _id: 2, ...} <--- at the top of the search result since "Hello World" 
 * { _id: 1, ...}      is in the title which has a higher weight than the description
 *                     (See line 31).
 */
VideoSchema.index(
  { title: "text", description: "text" }, 
  { name: "title_description_text_index", 
    weights: { title: 3, description: 1 } 
  }
)

/* Static Methods */
VideoSchema.statics.search = function(searchString) {
  return this.find()
}

var Video = mongoose.model('Video', VideoSchema)

export default Video