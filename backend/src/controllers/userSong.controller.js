import User from "../model/user.model.js";
import UserSong from "../model/userSong.model.js";
import jwtService from "../services/jwtService.js";

export const getAllUserConfirm = (req, res) => {
  try {
    UserSong.findAllUserConfirm(req.params.songId, (err, data) => {
      if (err) {
        return res.status(401).json({ conflictError: err });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json({ conflictError: error });
  }
};

export default { getAllUserConfirm };
