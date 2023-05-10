/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
import '../module/UserInfo.js';
import { checkAuth } from '../controllers/Auth_controller.js';

const User = mongoose.model('UserInfo');

const authRouter = express.Router();

authRouter.get('/auth', async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.create({ email, password });
    res.send({ status: 'ok' });
  } catch (error) {
    res.send({ status: 'error' });
  }
  const requestObjcet = req.params;
  const result = await checkAuth(requestObjcet);
  return res.status(result.status).json(result.json);
});

export default authRouter;
