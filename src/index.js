/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import authRouter from './routes/AuthRoute.js';
import postRouter from './routes/PostRoute.js';
import mailRouter from './routes/MailRoute.js';

const app = express();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where the uploaded files will be stored
  },
  filename(req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  },
});

const upload = multer({ storage });
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
  app.post('/api/upload', upload.single('image'), (req, res) => {
    console.log('file:', req.file);
    if (req.file) {
      // File upload successful
      console.log('File uploaded:', req.file);
      // Perform additional actions or send a response to the client
      const pictureUrl = `https://studnet.onrender.com/uploads/${req.file.filename}`;
      res.status(200).json({ message: 'File uploaded successfully', url: pictureUrl });
    } else {
      // No file uploaded or file upload failed
      console.log('File upload failed');
      res.status(400).json({ error: 'File upload failed' });
    }
  });
  app.use('/', authRouter);
  app.use('/', postRouter);
  app.use('/', mailRouter);
  // app.use('/log', authRouter);
};

app.get('*', (req, res) => {
  console.log('New request from Backend.');
  res.send('<h1>Hi from srever<h1/>');
});

connectToDB();
const startServer = async () => {
  configureApp();
  addRouters();
  const port = process.env.PORT || 5002;
  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
};
await startServer();
