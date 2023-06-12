/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import mongoose from 'mongoose';
import UserInfo from '../module/UserInfo.js';
import { PostInfo } from './PostActions.js';
// import PostInfo from '../module/PostInfo.js';

const User = mongoose.model('UserInfo');

export const getUsers = async (req) => {
  try {
    const users = await User.find(req);
    if (users.length > 0) return { success: true, data: users };
    const user = await User.findOne({ email: req.email });
    if (user) return { success: false };
    return { success: false, message: 'user not found' };
  } catch (error) {
    console.error('Error getting users:', error);
    return { success: false, message: error.message };
  }
};

export const createUser = async (req) => {
  const user = await User.create(req);
  return user;
};

export const removeUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    // Find all PostInfo documents that reference the user being removed
    const postInfos = await mongoose.model('PostInfo').find({ userID: userId });

    // Delete each PostInfo document
    await Promise.all(
      postInfos.map(async (postInfo) => {
        // eslint-disable-next-line no-underscore-dangle
        await PostInfo.findByIdAndDelete(postInfo._id);
      }),
    );
    // Remove the user
    await User.findByIdAndDelete(userId);
    return { success: true, message: 'User removed successfully' };
  } catch (error) {
    console.error('Error removing user:', error);
    return { success: false, message: error.message };
  }
};

export const updateUser = async (req) => {
  try {
    const user = await User.findByIdAndUpdate(req, req, { new: true });
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, message: error.message };
  }
};

export const follow = async (req) => {
  try {
    const { user1_ID, user2_ID } = req;
    const user1 = await User.findById(user1_ID);
    user1.following.push(user2_ID);
    await user1.save();
    const user2 = await User.findById(user2_ID);
    user2.followers.push(user1_ID);
    await user2.save();
    return { success: true, data: user1.following };
  } catch (error) {
    console.error('Error follow user:', error);
    return { success: false, message: error.message };
  }
};

export const unfollow = async (req) => {
  try {
    const { user1_ID, user2_ID } = req;
    const user1 = await User.findById(user1_ID);
    user1.following.pull(user2_ID);
    await user1.save();
    const user2 = await User.findById(user2_ID);
    user2.followers.pull(user1_ID);
    await user2.save();
    return { success: true, data: user1.following };
  } catch (error) {
    console.error('Error unfollow user:', error);
    return { success: false, message: error.message };
  }
};

export const getUserFollowingList = async (req) => {
  try {
    const { user_ID } = req;
    const user = await User.findById(user_ID);

    return { success: true, data: user.following };
  } catch (error) {
    console.error('Error reading user following list:', error);
    return { success: false, message: error.message };
  }
};

export const getUserFollowersList = async (req) => {
  try {
    const { user_ID } = req;
    const user = await User.findById(user_ID);

    return { success: true, data: user.followers };
  } catch (error) {
    console.error('Error reading user following list:', error);
    return { success: false, message: error.message };
  }
};

export { UserInfo };
