/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import {
  createPost, getPosts, updatePost, deletePost,
} from '../TableActions/PostActions.js';
import { respond } from './utils.js';

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
postRouter.delete('/posts/:id', async (req, res) => {
  console.log('req30:', JSON.stringify(req.params));
  // const { postId, auth } = req.params;
  // const { _id: userID } = JSON.parse(auth);
  const result = await deletePost(req.params.id);
  respond(result, res);
});

postRouter.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const result = await updatePost(id, content);
  respond(result, res);
});

export default postRouter;
