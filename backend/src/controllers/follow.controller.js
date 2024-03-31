import jwtService from "../services/jwtService.js";
import Follow from "../model/follow.model.js";
import User from "../model/user.model.js";

export const addFollow = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);

    User.findById(req.params.userId, (err, user) => {
      if (err || !user) {
        res.status(401).json({ conflictError: "Người dùng không tồn tại !" });
      } else {
        Follow.findFollowRelationship(userInfo.id, req.params.userId, (err, follow) => {
          if (follow || err) {
            return res.status(401).json({ conflictError: "Người đùng đã được theo dõi !" });
          }

          Follow.create(userInfo.id, req.params.userId, (err, data) => {
            if (err) {
              return res.status(401).json({ conflictError: err });
            } else {
              return res.json("Thành công !");
            }
          });
        });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const removeFollow = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);

    Follow.findFollowRelationship(userInfo.id, req.params.userId, (err, follow) => {
      if (err) {
        return res.status(401).json({ conflictError: err });
      }

      if (!follow) {
        return res.status(401).json({ conflictError: "Người dùng chưa được theo dõi !" });
      }

      if (follow) {
        Follow.delete(userInfo.id, req.params.userId, (err, data) => {
          if (err) {
            const conflictError = err;
            return res.status(401).json({ conflictError });
          } else {
            return res.json("Thành công !");
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllFollowing = (req, res) => {
  try {
    Follow.findAllByFollowerId(req.params.userId, req.query, (err, data) => {
      if (!data) {
        const conflictError = "Không tìm thấy";
        return res.status(401).json({ conflictError });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllFollowers = (req, res) => {
  try {
    Follow.findAllByFollowedId(req.params.userId, req.query, (err, data) => {
      if (!data) {
        const conflictError = "Không tìm thấy";
        return res.status(401).json({ conflictError });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCountFollowers = (req, res) => {
  try {
    Follow.countFollowed(req.params.userId, (err, data) => {
      if (!data) {
        const conflictError = "Không tìm thấy";
        return res.status(401).json({ conflictError });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCountFollowing = (req, res) => {
  try {
    Follow.countFollower(req.params.userId, (err, data) => {
      if (!data) {
        const conflictError = "Không tìm thấy";
        return res.status(401).json({ conflictError });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default {
  addFollow,
  removeFollow,
  getAllFollowing,
  getAllFollowers,
  getCountFollowers,
  getCountFollowing,
};
