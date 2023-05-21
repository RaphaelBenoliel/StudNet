/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import PostInfo from '../module/PostInfo.js';

const Post = mongoose.model('PostInfo');
const UserInfo = mongoose.model('UserInfo');

export const createPost = async (req) => {
  try {
    const { content, userID } = req;

    // Create the new post
    const post = new Post({ content, userID });
    const savedPost = await post.save();

    // Update the user document
    const user = await UserInfo.findById(userID);
    user.posts.push(savedPost._id);
    await user.save();
    return savedPost;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create post');
  }
};

export const getPosts = async (req) => {
  const posts = await Post.find(req).populate('userID', 'firstName lastName picture');
  return posts;
};

export const deletePost = async (postId, userId) => {
  try {
    console.log('36666>>>>>>>>>>>', postId);
    // Delete the post
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return { status: 404, json: { message: 'Post not found' } };
    }
    console.log('>>>>>>>>>>>', userId);
    // Update the user document
    const user = await UserInfo.findById(userId);
    if (!user) {
      return { status: 404, json: { message: 'User not found' } };
    }

    user.posts = user.posts.filter((posti) => posti.toString() !== postId);
    await user.save();

    return { status: 200, json: { message: 'Post deleted successfully' } };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete post');
  }
};

export const updatePost = async (postId, updatedData, userId) => {
  try {
    // Update the post
    const result = await Post.findByIdAndUpdate(postId, { content: updatedData }, { new: true });
    if (!result) {
      return { status: 404, json: { message: 'Post not found' } };
    }

    // Check if the post belongs to the user
    if (result.userID.toString() !== userId) {
      return { status: 403, json: { message: 'Unauthorized' } };
    }

    // Update the user document
    const user = await UserInfo.findById(userId);
    const postIndex = user.posts.findIndex((post) => post.toString() === postId);
    if (postIndex !== -1) {
      user.posts[postIndex] = result._id;
    }
    await user.save();

    return { status: 200, json: { message: 'Post updated successfully', data: result } };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update post');
  }
};

export { PostInfo };
