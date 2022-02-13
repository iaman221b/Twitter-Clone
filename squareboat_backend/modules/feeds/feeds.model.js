
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
    default: Date.now
  }
})

export const Feeds = mongoose.model('Feed' , FeedSchema);
