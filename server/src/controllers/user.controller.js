import User from "../model/user.model.js";
import jwtService from "../services/jwtService.js";

export const updateUser = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    User.update(userInfo.id, req.body, (err, data) => {
      if (!data) {
        const conflictError = err;
        return res.status(401).json({ conflictError });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUser = (req, res) => {
  try {
    User.findById(req.params.userId, (err, user) => {
      if (!user) {
        const conflictError = "Không tìm thấy!";
        return res.status(401).json({ conflictError });
      } else {
        const { password, ...others } = user;
        return res.json(others);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getMe = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    User.findById(userInfo.id, (err, user) => {
      if (!user) {
        const conflictError = err;
        console.log("GET ME: ", conflictError);
        return res.status(401).json({ conflictError });
      } else {
        const { password, ...others } = user;
        console.log("GET ME: ", user);
        return res.json(others);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllUser = (req, res) => {
  try {
    User.getAll(req.query, (err, user) => {
      if (!user) {
        const conflictError = err;
        return res.status(401).json({ conflictError });
      } else {
        return res.json(user);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const findByEmail = (req, res) => {
  try {
    User.findByEmail(req.body.email, (err, user) => {
      console.log("FIND BY EMAIL: ", user);

      if (user) {
        return res.status(401).json({ conflictError: "Email is already used on another account" });
      } else {
        return res.status(200).json({ message: "Email chưa tồn tại" });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default {
  getUser,
  getMe,
  updateUser,
  getAllUser,
  findByEmail,
};
