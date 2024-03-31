import nodemailer from "nodemailer";
import template from "./template.js";

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.MAIL_NAME}`,
    pass: `${process.env.MAIL_PASSWORD}`,
  },
});

export const sendEmail = async (to, subject, html) => {
  const msg = { from: process.env.MAIL_NAME, to, subject, html };
  await transport.sendMail(msg);
};

export const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset password";
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const html = template.resetPassword(resetPasswordUrl, "music");
  await sendEmail(to, subject, html);
};

export const sendVerificationEmail = async (email, token) => {
  const subject = "Email Verification";
  const verificationEmailUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}&email=${email}`;
  const html = template.verifyEmail(verificationEmailUrl, process.env.APP_NAME);
  await sendEmail(email, subject, html);
};

export default { sendEmail, sendVerificationEmail, sendResetPasswordEmail };
