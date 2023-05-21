/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import cors from 'cors';
import path from 'path';
import authRouter from './routes/AuthRoute.js';
import postRouter from './routes/PostRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const uri = 'mongodb+srv://raphabr:admin@studnetcluster.zu0mdlt.mongodb.net/?retryWrites=true&w=majority';
async function connectToDB() {
  try {
    mongoose.connect(uri);
    console.log('Connected to DB');
  } catch (error) {
    console.log('Error connecting to DB');
  }
}

const configureApp = () => {
  app.use(cors());
};

const addRouters = () => {
  app.use('/', authRouter);
  app.use('/', postRouter);
  // app.use('/log', authRouter);
};

// app.get('*', (req, res) => {
//   console.log('New request from Backend.');
//   res.send('<h1>Hi from srever<h1/>');
// });

connectToDB();
const startServer = async () => {
  configureApp();
  addRouters();
  app.use(express.static(path.join(__dirname, 'public/index.html')));

  // API routes
  app.use('/api/auth', authRouter);
  app.use('/api/posts', postRouter);

  // Serve the React app for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  const port = process.env.PORT || 5002;
  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
};
await startServer();
