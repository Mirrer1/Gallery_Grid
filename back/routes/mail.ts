import express from 'express';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import User from '../models/user';
import { isNotLoggedIn } from './middleware';
import Auth from '../models/auth';

dotenv.config();

const router = express.Router();

router.post('/auth', isNotLoggedIn, async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: '서비스에 가입된 회원이 아닙니다.' });
    }

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

    const auth = await Auth.findOne({ where: { email } });

    if (auth) {
      await auth.update({ code });
    } else {
      await Auth.create({ email, code });
    }

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
      to: email,
      subject: `[Gallery-Grid] 이메일 인증 안내`,
      html: `
        <div style="font-family: arial, sans-serif; padding: 1em 0 0 2em;">
          <h1 style="font-size: 1.5rem; font-weight: 400; margin-bottom: 1.5em;"><span style="color: #4aa8d8; font-weight:700;">이메일 주소 인증</span></h1>  
          <p>
            <div style="font-size: 0.9rem; margin-bottom: 1em;">안녕하세요.<br /></div>
            <div style="font-size: 0.9rem; margin-bottom: 1em;">Gallery-Grid를 이용해 주셔서 진심으로 감사드립니다.<br /></div>
            <div style="font-size: 0.9rem; margin-bottom: 1em;">아래 적힌 <span style="color: #4aa8d8; font-weight:700;">'6자리코드'</span>를 복사하여 이메일 인증을 완료해주세요.<br /></div>
            <div style="font-size: 0.9rem; margin-bottom: 2em;">감사합니다.<br /></div>
          </p>  
          <div style="border: 1px solid #4aa8d8; border-radius: 5px; background-color: #4aa8d8; color: white; width: 150px; text-align: center; padding: 1em 0; margin-bottom: 3em; font-size: 1rem;">${code}</div>  
          <h2 style="font-size: 0.7rem; font-weight:400; opacity: 0.5; margin-bottom: 0.5em;">From. Gallery-Grid</h2>
        </div>              
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/check-code', isNotLoggedIn, async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const authRecord = await Auth.findOne({ where: { email, code } });

    if (!authRecord) {
      return res.status(401).json({ message: '인증 코드가 일치하지 않습니다.' });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/change-password', isNotLoggedIn, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: '서비스에 가입된 회원이 아닙니다.' });
    }

    if (!user.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await user.update({ password: hashedPassword });

      return res.status(200).json({ success: true });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: '기존 비밀번호와 동일합니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

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
