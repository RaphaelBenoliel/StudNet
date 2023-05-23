/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';

import { createAuth, checkAuth, allUsers } from '../controllers/Auth_controller.js';
import { respond } from './utils.js';

const authRouter = express.Router();
authRouter.use(express.json());
// eslint-disable-next-line consistent-return
authRouter.post('/auth', async (req, res) => {
  const {
    email, password, userName, firstName, lastName,
  } = req.body;
  const result = await createAuth({
    email, password, userName, firstName, lastName,
  });
  respond(result, res);
  // res.status(result.status).json(result.json);
});

authRouter.post('/log', async (req, res) => {
  // const { email, password } = req.body;
  // const result = await checkAuth({ email, password });
  // res.status(result.status).json(result.json);
  respond(await checkAuth(req.body), res);
});

authRouter.post('/allusers', async (req, res) => {
  respond(await allUsers(), res);
});

export default authRouter;
