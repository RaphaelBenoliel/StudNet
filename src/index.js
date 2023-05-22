/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import authRouter from './routes/AuthRoute.js';
import postRouter from './routes/PostRoute.js';

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
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = path.dirname(__filename);
  const buildPath = path.join(__dirname, '..', 'client', 'build');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
};

const addRouters = () => {
  app.use('/', authRouter);
  app.use('/', postRouter);
};

connectToDB();

const startServer = async () => {
  configureApp();
  addRouters();
  const port = process.env.PORT || 5002;
  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
};

startServer();

// const app = express();
// const uri = 'mongodb+srv://raphabr:admin@studnetcluster.zu0mdlt.mongodb.net/?retryWrites=true&w=majority';
// async function connectToDB() {
//   try {
//     mongoose.connect(uri);
//     console.log('Connected to DB');
//   } catch (error) {
//     console.log('Error connecting to DB');
//   }
// }

// const configureApp = () => {
//   app.use(cors());
// };

// const addRouters = () => {
//   app.use('/', authRouter);
//   app.use('/', postRouter);
//   // app.use('/log', authRouter);
// };

// app.get('*', (req, res) => {
//   console.log('New request from Backend.');
//   res.send('<h1>Hi from srever<h1/>');
// });

// connectToDB();
// const startServer = async () => {
//   configureApp();
//   addRouters();
//   const port = process.env.PORT || 5002;
//   app.listen(port, () => {
//     console.log(`Server is running at port: ${port}`);
//   });
// };
// await startServer();
