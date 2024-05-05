import { promiseDb, db } from "../config/connect.js";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwtService from "../services/jwtService.js";
import emailService from "../services/emailService/index.js";
import randomstring from "randomstring";
import VerifyCodes from "../model/verifyCodes.js";
import nodemailer from "nodemailer";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
      if (err) return res.status(401).json({ conflictError: err });
      if (!user) {
        return res.status(401).json({ conflictError: "User not found !" });
      }
      if (user.email_verified_at === null) {
        return res.status(401).json({ conflictError: "User is not authenticated!" });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (result == true) {
          // const token = jwt.sign({ id: user.id }, process.env.MY_SECRET, { expiresIn: "7d" });
          const token = jwtService.generateToken(
            { id: user.id, is_admin: user.is_admin },
            { expiresIn: "7d" }
          );

          const { password, ...others } = user;

          const data = {
            data: others,
            token: token,
          };

          console.log("LOGIN", user);

          res
            .cookie("accessToken", token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
              expires: new Date(Date.now() + 900000),
              maxAge: 24 * 60 * 60 * 1000,
            })
            .status(200)
            .json(data);
        } else {
          const conflictError = "Wrong password !";
          res.status(401).json({ conflictError });
        }
      });
    });
  } catch (error) {
    const conflictError = "User credentials are not valid.";
    res.status(401).json({ conflictError });
  }
};

export const signup = async (req, res) => {
  try {
    User.findByEmail(req.body.email, (err, user) => {
      if (err || user) {
        const conflictError = "User credentials are exist.";
        res.status(401).json({ conflictError });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
          email: req.body.email,
          password: hashedPassword,
          name: req.body.name,
          gender: req.body.gender,
          brithday: req.body.brithday,
          email_verified_at: new Date(), // Xác thực
        });

        User.create(user, (err, result) => {
          if (err) {
            return res.json(err);
          }
          return res.json(result);
        });
      }
    });
  } catch (error) {
    const conflictError = "User credentials are not valid.";
    res.status(401).json({ conflictError });
  }
};

export const signout = (req, res) => {
  res.clearCookie("accessToken");
  res.end();
};

// Gửi xác thực tài khoản
export const sendVerifyAccount = (req, res) => {
  try {
    const email = req.body.email;
    User.findByEmail(email, async (err, user) => {
      if (err || !user) {
        return res.status(401).json({ conflictError: "Email not found!" });
      }

      if (user.email_verified_at !== null) {
        return res.status(401).json({ conflictError: "Account has been verified!" });
      }

      // const token = jwtService.generateToken({ email }, { expiresIn: "1h" });
      const code = randomstring.generate({
        length: 4,
        charset: "numeric",
      });

      await emailService.sendVerificationAccount(email, code);

      VerifyCodes.create(user.id, code, async (err, result) => {
        if (err) {
          return res.status(401).json({ conflictError: err });
        }
        console.log("✉️ Send verification email : " + email + " - code : " + code);

        return res.json({
          success: true,
          data: "Email verification sent successfully !",
          // code: code,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ conflictError: "Error send email" });
  }
};

// Xác thực tài khoản
export const verifyAccount = async (req, res) => {
  try {
    const { code, email } = req.body;

    User.findByEmail(email, (err, user) => {
      if (err || !user) return res.status(500).json({ conflictError: "User not found" });
      if (user.email_verified_at !== null) {
        console.log(" Account has been verified! ");
        return res.json({
          success: true,
          data: "Account has been verified! ",
        });
      } else {
        VerifyCodes.find(user.id, (err, verify) => {
          if (err || !verify) {
            return res.status(500).json({ conflictError: "Error during request processing" });
          }

          const codeSql = verify.code;

          if (parseInt(codeSql) === parseInt(code)) {
            // return res.json({ codeSql, code });
            User.verify(email, (err, result) => {
              if (err || !result) {
                return res.status(401).json(err);
              } else {
                VerifyCodes.delete(user.id, (err, result) => {});
                return res.json({
                  success: true,
                  data: "Email authentication successful!",
                });
              }
            });
          } else {
            return res.status(500).json({ conflictError: "Code does not match" });
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ conflictError: "Error during request processing" });
  }
};

//Quên mật khẩu
export const forgotPassword = (req, res) => {
  try {
    const email = req.body.email;
    User.findByEmail(email, async (err, user) => {
      if (err || !user) {
        return res.status(401).json({ conflictError: "Email not found!" });
      }

      const resetPasswordToken = jwtService.generateToken({ id: user.id }, { expiresIn: "1h" });
      await emailService.sendResetPasswordEmail(email, resetPasswordToken);
      return res.json({
        success: true,
        data: "Sending email forgot password successfully!",
        token: resetPasswordToken,
      });
    });
  } catch (error) {
    return res.status(500).json({ conflictError: "Error during request processing" });
  }
};

//Tạo mới mật khẩu
export const resetPassword = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const token = req.query.token;

    const userInfo = await jwtService.verifyToken(token);

    User.update(userInfo.id, { password: hashedPassword }, (err, result) => {
      if (err) {
        return res.status(401).json(err);
      }
      return res.json("Update successfully !");
    });
  } catch (error) {
    res.status(401).json({ conflictError: error });
  }
};

//Thay đổi mật khẩu
export const changePassword = async (req, res) => {
  try {
    const { password, passwordOld } = req.body;
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);

    User.findById(userInfo.id, (err, user) => {
      if (err) return res.status(401).json({ conflictError: err });
      if (!user) {
        const conflictError = "User does not exist";
        return res.status(401).json({ conflictError });
      }

      bcrypt.compare(passwordOld, user.password, (err, result) => {
        if (err) return res.status(401).json({ conflictError: err });
        if (result == false) {
          return res.status(401).json({ conflictError: "Error password !" });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        User.update(user.id, { password: hashedPassword }, (err, result) => {
          if (err) return res.status(401).json({ conflictError: err });
          return res.json("Update password successfully!");
        });
      });
    });
  } catch (error) {
    res.status(401).json({ conflictError: error });
  }
};

export const sendVerifyEmail = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);
    const email = req.body.email;

    User.findById(userInfo.id, async (err, result) => {
      if (!result || err) {
        return res.status(404).json({ conflictError: "User not found !" });
      } else {
        const code = randomstring.generate({
          length: 4,
          charset: "numeric",
        });

        await emailService.sendVerificationEmail(email, code);

        // var transporter = nodemailer.createTransport({
        //   service: "gmail",
        //   auth: {
        //     user: `${process.env.MAIL_NAME}`,
        //     pass: `${process.env.MAIL_PASSWORD}`,
        //   },
        // });

        VerifyCodes.create(userInfo.id, code, (err, result) => {
          if (err) {
            return res.status(401).json({ conflictError: err });
          }
          console.log("✉️ Send verification email : " + email + " - code : " + code);

          return res.json({
            success: true,
            data: "Email verification sent successfully !",
            // code: code,
          });
        });
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);
    const { code } = req.body;

    User.findById(userInfo.id, async (err, user) => {
      if (!user || err) {
        return res.status(404).json({ conflictError: "User not found !" });
      } else {
        VerifyCodes.find(user.id, (err, verify) => {
          if (err || !verify) {
            return res.status(500).json({ conflictError: "Error during request processing" });
          }

          const codeSql = verify.code;

          console.log(codeSql, parseInt(code));

          if (parseInt(codeSql) === parseInt(code)) {
            // return res.json({ codeSql, code });
            return res.json({ success: true, data: "Verify email successful!" });
          } else {
            return res.status(500).json({ conflictError: "Code does not match" });
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ conflictError: "Error during request processing" });
  }
};

export default {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
  sendVerifyAccount,
  verifyAccount,
  changePassword,
  sendVerifyEmail,
  verifyEmail,
};
