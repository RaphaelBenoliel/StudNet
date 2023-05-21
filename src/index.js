/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/AuthRoute.js';
import postRouter from './routes/PostRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const uri = 'mongodb+srv://raphabr:admin@studnetcluster.zu0mdlt.mongodb.net/?retryWrites=true&w=majority';
async function connectToDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB');
  } catch (error) {
    console.log('Error connecting to DB');
  }
}

const configureApp = () => {
  app.use(cors());
};

const addRouters = () => {
  app.use('/api/auth', authRouter);
  app.use('/api/posts', postRouter);
};

connectToDB();
const startServer = async () => {
  configureApp();
  addRouters();

  // Serve the React app
  app.use(express.static(path.join(__dirname, '../client/build')));

  // API routes

  // Catch-all route for serving the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  const port = process.env.PORT || 5002;
  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
};

await startServer();
