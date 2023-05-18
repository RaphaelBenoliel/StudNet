/* eslint-disable max-len */
/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import '../module/UserInfo.js';

const User = mongoose.model('UserInfo');
export const getUsers = async (req) => {
  try {
    const users = await User.find(req);
    // console.log('getUsers result:', users);
    if (users.length > 0) return { success: true, data: users };
    const user = await User.findOne({ email: req.email });
    if (user) return { success: false };
    return { success: false, message: 'You Must to register before log in.' };
  } catch (error) {
    console.error('Error getting users:', error);
    return { success: false, message: error.message };
  }
};

export const createUser = async (req) => {
  const user = await User.create(req);
  return user;
};
