import nodemailer from "nodemailer";
import template from "./template.js";

const { MAIL_NAME, MAIL_PASSWORD, FRONTEND_URL, APP_NAME } = process.env;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: { user: MAIL_NAME, pass: MAIL_PASSWORD },
});

export async function sendEmail(to, subject, html) {
  const msg = { from: MAIL_NAME, to, subject, html };
  try {
    await transport.sendMail(msg);
    return { success: true }; // Trả về một đối tượng cho biết email đã được gửi thành công
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email." }; // Trả về thông tin lỗi nếu gặp lỗi
  }
}

export async function sendResetPasswordEmail(to, token) {
  const subject = "Reset password";
  const resetPasswordUrl = `${FRONTEND_URL}/reset-password?token=${token}`;
  const html = template.resetPassword(resetPasswordUrl, "music");
  return await sendEmail(to, subject, html);
}

export async function sendVerificationAccount(email, code) {
  const subject = "Email Verification";
  const html = template.verifyAccount(code, APP_NAME);
  return await sendEmail(email, subject, html);
}

export async function sendVerificationEmail(email, code) {
  const subject = "Email Verification";
  const html = template.verifyEmail(code, APP_NAME);
  return await sendEmail(email, subject, html);
}

export default {
  sendEmail,
  sendVerificationAccount,
  sendVerificationEmail,
  sendResetPasswordEmail,
};
