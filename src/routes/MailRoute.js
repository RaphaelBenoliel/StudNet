/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import nodemailer from 'nodemailer';
import { getUsers } from '../TableActions/UserActions.js';
import { respond } from './utils.js';
import EmailTemplate from '../TableActions/Emailtemplate.js';

export const requestFailure = (data) => ({ success: false, data });
const mailRouter = express.Router();
mailRouter.use(express.json());
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: '465',
  secure: true,
  auth: {
    user: 'studnet831@gmail.com',
    pass: 'ysvvvmpopzjrizfq',
  },
});

mailRouter.post('/email', async (req, res) => {
  const userResponse = await getUsers({ email: req.body.email });
  if (!userResponse.success && userResponse.message === 'user not found') return respond(requestFailure({ message: 'Invalid email.' }), res);
  console.log(userResponse.data[0].password);
  const mailOptions = {
    from: 'studnet831@gmail.com',
    to: req.body.email,
    subject: 'Your Studnet account: Request a password recovery',
    html: EmailTemplate(
      userResponse.data[0].password,
      userResponse.data[0].firstName,
      userResponse.data[0].lastName,
    ),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  return respond({ success: true }, res);
});

export default mailRouter;
