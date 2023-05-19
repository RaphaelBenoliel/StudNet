import express from 'express';

import { createPost } from '../TableActions/PostActions.js';
import { respond } from './utils.js';

const postRouter = express.Router();
postRouter.use(express.json());
// eslint-disable-next-line consistent-return
postRouter.post('/cpost', async (req, res) => {
  const {
    userID, content,
  } = req.body;
  const result = await createPost({
    userID, content,
  });
  respond(result, res);
  // res.status(result.status).json(result.json);
});

export default postRouter;
