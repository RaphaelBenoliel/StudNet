/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import '../module/UserInfo.js';

const User = mongoose.model('UserInfo');

export const createAuth = async (requestObject) => {
  console.log(`-> GOT CREATE AUTH REQUEST\n\t${requestObject.email}`);
  try {
    const check = await User.create(requestObject);
    if (check) {
      console.log('User already exists');
      const resStatus = 201;
      const resJson = {
        message: 'This email is already registered!',
      };
      return { status: resStatus, json: resJson };
    }
    console.log('User created');
    const resStatus = 200;
    const resJson = {
      message: 'You are now registered!',
    };
    return { status: resStatus, json: resJson };
  } catch (error) {
    console.error('Error saving user:', error);
  }
};
export const checkAuth = async (requestObject) => {
  try {
    console.log(`-> GOT AUTH REQUEST\n\t${requestObject.email}`);
    const user = await User.findOne({ email: requestObject.email, password: requestObject.password });
    const usere = await User.findOne({ email: requestObject.email });
    if (user) {
      console.log('User found');
      const resStatus = 200;
      const resJson = {
        message: 'You are now logged in!',
      };
      return { status: resStatus, json: resJson };
    }
    if (usere) {
      const resStatus = 202;
      const resJson = {
        message: 'Wrong password!',
      };
      return { status: resStatus, json: resJson };
    }
    console.log('User not found');
    const resStatus = 201;
    const resJson = {
      message: 'User not found, You must register first!',
    };
    return { status: resStatus, json: resJson };
  } catch (error) {
    console.error('Error finding user:', error);
    const resStatus = 500;
    const resJson = {
      message: 'Internal server error',
    };
    return { status: resStatus, json: resJson };
  }
};
