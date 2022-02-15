
import mongoose from 'mongoose'

const FeedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  feed: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now, 
    index:true  // field level
  }
})

FeedSchema.index({ created: -1 }); // schema level


export const Feeds = mongoose.model('Feed' , FeedSchema);
