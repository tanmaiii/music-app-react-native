import nodemailer from "nodemailer";
import template from "./template.js";

const { MAIL_NAME, MAIL_PASSWORD, FRONTEND_URL, APP_NAME } = process.env;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: { user: MAIL_NAME, pass: MAIL_PASSWORD }
});

export async function sendEmail(to, subject, html) {
  const msg = { from: MAIL_NAME, to, subject, html };
  await transport.sendMail(msg);
}

export async function sendResetPasswordEmail(to, token) {
  const subject = "Reset password";
  const resetPasswordUrl = `${FRONTEND_URL}/reset-password?token=${token}`;
  const html = template.resetPassword(resetPasswordUrl, "music");
  await sendEmail(to, subject, html);
}

export async function sendVerificationAccount(email, code) {
  const subject = "Email Verification";
  const html = template.verifyAccount(code, APP_NAME);
  await sendEmail(email, subject, html);
}

export async function sendVerificationEmail(email, code) {
  const subject = "Email Verification";
  const html = template.verifyEmail(code, APP_NAME);
  await sendEmail(email, subject, html);
}


export default { sendEmail, sendVerificationAccount, sendVerificationEmail, sendResetPasswordEmail };
