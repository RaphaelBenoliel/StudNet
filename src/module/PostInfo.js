import mongoose from 'mongoose';

const PostInfo = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserInfo',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserInfo',
      unique: true,
    }],
    comments: {
      type: Array,
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'PostInfo',
  },
);

const PostInfoModel = mongoose.model('PostInfo', PostInfo);
export default PostInfoModel;
