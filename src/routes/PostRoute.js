/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import {
  createPost, getPosts, updatePost, deletePost, likePost,
} from '../TableActions/PostActions.js';
import { respond } from './utils.js';

const postRouter = express.Router();
postRouter.use(express.json());
// eslint-disable-next-line consistent-return
postRouter.post('/cpost', async (req, res) => {
  const { auth, content } = req.body;
  const { _id: userID } = JSON.parse(auth);
  // console.log('req:', req.body);
  const result = await createPost({ userID, content });
  respond(result, res);
  // res.status(result.status).json(result.json);
});

postRouter.post('/posts', async (req, res) => {
  const result = await getPosts();
  respond(result, res);
});
postRouter.put('/posts/delete', async (req, res) => {
  const result = await deletePost(req.body._id, req.body.userID);
  respond(result, res);
});

postRouter.put('/posts/update', async (req, res) => {
  const result = await updatePost(req.body._id, req.body.updatedData);
  respond(result, res);
});

postRouter.post('/posts/liked', async (req, res) => {
  console.log('req.body:', req.body);
  const result = await likePost(req.body);
  respond(result, res);
});

export default postRouter;
