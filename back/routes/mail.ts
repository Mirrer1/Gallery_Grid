import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import { isNotLoggedIn } from './middleware';

dotenv.config();

const router = express.Router();

router.post('/contact', isNotLoggedIn, async (req, res, next) => {
  try {
    const { sender, content } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.resend.com',
      port: 465,
      secure: true,
      auth: {
        user: 'resend',
        pass: process.env.EMAIL_API_KEY
      }
    });

    const mailOptions = {
      from: '"Gallery-Grid" <info@gallerygrd.com>',
      to: process.env.MY_EMAIL,
      subject: `[Gallery-Grid] Contact Form ${sender}`,
      text: `sender: ${sender}\ncontent: ${content}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
