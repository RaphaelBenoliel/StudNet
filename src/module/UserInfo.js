/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

const UserInfo = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      index: { unique: false, dropDups: true },
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: 'https://www.linkpicture.com/q/user_5.png',
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostInfo',
    }],
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserInfo',
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserInfo',
    }],
    savedPosts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostInfo',
    }],
    likedPosts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostInfo',
    }],
    country: {
      type: String,
    },
    studySubject: {
      type: String,
    },
    schoolYear: {
      type: String,
    },
    aboutMySelf: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
  },
  {
    collection: 'UserInfo',
    timestamps: true,
  },
);

const UserInfoModel = mongoose.model('UserInfo', UserInfo);

export default UserInfoModel;
