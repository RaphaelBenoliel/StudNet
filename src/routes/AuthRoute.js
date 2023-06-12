/* eslint-disable no-underscore-dangle */
/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';

import {
  createAuth, checkAuth, allUsers, updateAuth, getUsersById,
} from '../controllers/Auth_controller.js';
import { respond } from './utils.js';
import { follow, getUserFollowingList, removeUser, unfollow } from '../TableActions/UserActions.js';

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
});

authRouter.post('/log', async (req, res) => {
  respond(await checkAuth(req.body), res);
});

authRouter.post('/allusers', async (req, res) => {
  respond(await allUsers(), res);
});

authRouter.post('/userbyid', async (req, res) => {
  respond(await getUsersById({ _id: req.body.users }), res);
});

authRouter.put('/update', async (req, res) => {
  respond(await updateAuth(req.body), res);
});

authRouter.put('/delete', async (req, res) => {
  respond(await removeUser(req.body._id), res);
});

authRouter.post('/follow', async (req, res) => {
  console.log('follow------req:', req.body);
  const result = await follow(req.body);
  console.log(result);
  respond(result, res);
});

authRouter.post('/unfollow', async (req, res) => {
  console.log('unfollow------req:', req.body);
  const result = await unfollow(req.body);
  console.log(result);
  respond(result, res);
});

authRouter.post('/getFollowing', async (req, res) => {
  console.log('getFollowing------req:', req.body);
  const result = await getUserFollowingList(req.body);
  console.log(result);
  respond(result, res);
});

authRouter.post('/getFollowers', async (req, res) => {
  console.log('getFollowing------req:', req.body);
  const result = await getUserFollowersList(req.body);
  console.log(result);
  respond(result, res);
});

export default authRouter;
