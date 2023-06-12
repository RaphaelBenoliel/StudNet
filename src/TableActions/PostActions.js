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
    console.log('postId:', postId);
    console.log('userId:', userId);
    // find the user by ID to delete the post from their posts array ref
    const user = await UserInfo.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    // Remove the post from the user's posts array ref
    user.posts.pull(postId);
    await user.save();
    // Delete the post
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    console.log('Post deleted successfully:', post);
  } catch (error) {
    console.error('Error Delete post:', error);
    // Handle the error case, show an error message, etc.
    throw error;
  }
};

export const updatePost = async (postId, updatedData) => {
  try {
    console.log('updatedData:', updatedData);
    console.log('postId:', postId);
    // Find the post by ID and update the changes
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { content: updatedData },
      { new: true }, // Return the updated post after the update
    );
    // Handle the case when the post is not found
    if (!updatedPost) {
      throw new Error('Post not found');
    }
    console.log('Post updated successfully:', updatedPost);
    // Perform additional actions or return the updated post as needed
    return updatedPost;
  } catch (error) {
    console.error('Error updating post:', error);
    // Handle the error case, show an error message, etc.
    throw error;
  }
};

export const likePost = async (req) => {
  try {
    console.log('USER', req.userId);
    console.log('POST:', req.postId);
    // Retrieve the user object using await or exec()
    const user = await UserInfo.findOne({ _id: req.userId });
    // console.log('user:', user);
    const isLiked = Array.isArray(user.likedPosts) && user.likedPosts.includes(req.postId);
    if (isLiked) {
      // Remove the like from the user's likedPosts array ref
      user.likedPosts.pull(req.postId);
      await user.save();
      // Remove the like from the post's likes array ref
      const post = await Post.findById(req.postId);
      post.likes.pull(req.userId);
      await post.save();
      console.log('Post unliked successfully:', post);
      return { user, post };
    }
    // Add the like to the user's likedPosts array ref
    user.likedPosts.push(req.postId);
    await user.save();
    // Add the like to the post's likes array ref
    const post = await Post.findById(req.postId);
    post.likes.push(req.userId);
    await post.save();
    console.log('Post liked successfully:', post);
    return { user, post };
  } catch (error) {
    console.log(error);
  }
  return null;
};

export { PostInfo };
