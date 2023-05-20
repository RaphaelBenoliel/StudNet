import mongoose from 'mongoose';
import '../module/PostInfo.js';

const Post = mongoose.model('PostInfo');

export const createPost = async (req) => {
  console.log('req:', req);
  const post = await Post.create(req);
  return post;
};

export const getPosts = async (req) => {
  const posts = await Post.find(req).populate('userID', 'firstName lastName picture');
  return posts;
};
