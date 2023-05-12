/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';

import { checkAuth } from '../controllers/Auth_controller.js';

const authRouter = express.Router();
authRouter.use(express.json());
// eslint-disable-next-line consistent-return
authRouter.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  const result = await checkAuth({ email, password });
  res.status(result.status).json(result.json);
});
export default authRouter;
