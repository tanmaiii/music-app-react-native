import { promiseDb, db } from "../config/connect.js";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwtService from "../services/jwtService.js";
import emailService from "../services/emailService/index.js";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
      if (err) return res.status(401).json({ conflictError: err });
      if (!user) {
        return res.status(401).json({ conflictError: "Người dùng không tồn tại !" });
      }
      if (user.email_verified_at === null) {
        return res.status(401).json({ conflictError: "Người dùng chưa được xác thực !" });
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
          const conflictError = "Wrong password";
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
export const sendVerificationEmail = (req, res) => {
  try {
    const email = req.body.email;
    User.findByEmail(email, async (err, user) => {
      if (err || !user) {
        return res.status(401).json({ conflictError: "Không tìm thấy email !" });
      }
      if (user.email_verified_at !== null) {
        return res.status(401).json({ conflictError: "Tài khoản này đã được xác thực !" });
      }

      const token = jwtService.generateToken({ email }, { expiresIn: "1h" });
      await emailService.sendVerificationEmail(email, token);

      console.log("✉️ Send verification email : " + email);

      return res.json({
        success: true,
        data: "Gửi xác thực tài khoản thành công !",
        token: token,
      });
    });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi gửi email" });
  }
};

// Xác thực tài khoản
export const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    const emailInfo = await jwtService.verifyToken(token);
    User.findByEmail(emailInfo.email, (err, user) => {
      if (user.email_verified_at !== null) {
        console.log("Đã xác thực từ trước đó ");
        return res.json("Đã được xác thực !");
      } else {
        User.verify(emailInfo.email, (err, result) => {
          if (!err) {
            return res.json("Xác thực thành công !");
          } else {
            return res.status(401).json(err);
          }
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ conflictError: "Lỗi trong quá trình xử lý yêu cầu" });
  }
};

//Quên mật khẩu
export const forgotPassword = (req, res) => {
  try {
    const email = req.body.email;
    User.findByEmail(email, async (err, user) => {
      if (err || !user) {
        return res.status(401).json({ conflictError: "Không tìm thấy email" });
      }

      const resetPasswordToken = jwtService.generateToken({ id: user.id }, { expiresIn: "1h" });
      await emailService.sendResetPasswordEmail(email, resetPasswordToken);
      return res.json({
        success: true,
        data: "Gửi email quên mật khẩu thành công !",
        token: resetPasswordToken,
      });
    });
  } catch (error) {
    return res.status(500).json({ conflictError: "Lỗi trong quá trình xử lý yêu cầu" });
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
      return res.json("Cập nhật thành công !");
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
          return res.status(401).json({ conflictError: "Sai mật khẩu !" });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        User.update(user.id, { password: hashedPassword }, (err, result) => {
          if (err) return res.status(401).json({ conflictError: err });
          return res.json("Thay đổi mật khẩu thành công !");
        });
      });
    });
  } catch (error) {
    res.status(401).json({ conflictError: error });
  }
};

export default {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  changePassword,
};
