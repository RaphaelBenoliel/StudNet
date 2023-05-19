import { mongo } from 'mongoose';

const Post = mongo.model('PostInfo');
export const createPost = async (req) => {
  const post = await Post.create(req);
  return post;
};

export const getPosts = async (req) => {
  const posts = await Post.find(req);
  return posts;
};
