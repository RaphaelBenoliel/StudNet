/* eslint-disable no-console */
import express from 'express';
import { createPost, getPosts } from '../TableActions/PostActions';
import { respond } from './utils';

const postRouter = express.Router();
postRouter.use(express.json());
// eslint-disable-next-line consistent-return
postRouter.post('/cpost', async (req, res) => {
  const { auth, content } = req.body;
  const { _id: userID } = JSON.parse(auth);
  console.log('req:', req.body);
  const result = await createPost({ userID, content });
  console.log(result);
  respond(result, res);
  // res.status(result.status).json(result.json);
});

postRouter.post('/posts', async (req, res) => {
//   const { auth } = req.body;
//   const { _id: userID } = JSON.parse(auth);
//   console.log('userID:', userID);
  const result = await getPosts();
  respond(result, res);
});

export default postRouter;
