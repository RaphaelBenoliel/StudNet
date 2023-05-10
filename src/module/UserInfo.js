/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

const UserInfo = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    collection: 'UserInfo',
  },
);

mongoose.model('UserInfo', UserInfo);
