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

// PostInfo.pre('save', function (next) {
//   if (this.likes.length > 1) {
//     const uniqueLikes = [...new Set(this.likes.map(like => like.toString()))];
//     this.likes = uniqueLikes.map(like => mongoose.Types.ObjectId(like));
//   }
//   next();
// });

const PostInfoModel = mongoose.model('PostInfo', PostInfo);
export default PostInfoModel;
