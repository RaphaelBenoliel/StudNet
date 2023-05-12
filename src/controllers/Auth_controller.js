/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import '../module/UserInfo.js';

const User = mongoose.model('UserInfo');

export const checkAuth = async (requestObject) => {
  console.log(`-> GOT AUTH REQUEST\n\t${requestObject}`);

  try {
    await User.create(requestObject);
    console.log('User created');
    const resStatus = 200;
    const resJson = {
      message: 'You are now logged in !',
    };
    return { status: resStatus, json: resJson };
  } catch (error) {
    console.error('Error saving user:', error);
    const resStatus = 500;
    const resJson = {
      message: 'Internal server error',
    };
    return { status: resStatus, json: resJson };
  }
};
