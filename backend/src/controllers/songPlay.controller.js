import SongPlay from "../model/songPlay.model.js";
import jwtService from "../services/jwtService.js";

export const createSongPlay = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);
    SongPlay.find(userInfo.id, req.params.songId, (err, song) => {
      if (err) {
        return res.status(401).json({ conflictError: err });
      }
      if (song) {
        SongPlay.update(userInfo.id, req.params.songId, (err, data) => {
          if (err) {
            return res.status(401).json({ conflictError: err });
          } else {
            return res.json(data);
          }
        });
      }
      if (!song) {
        SongPlay.create(userInfo.id, req.params.songId, (err, data) => {
          if (err) {
            return res.status(401).json({ conflictError: err });
          } else {
            return res.json(data);
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getCountSongPlay = (req, res) => {
  try {
    SongPlay.countSongPlays(req.params.songId, (err, data) => {
      if (err) {
        return res.status(401).json({ conflictError: err });
      }
      return res.json(data);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default {
  createSongPlay,
  getCountSongPlay,
};
