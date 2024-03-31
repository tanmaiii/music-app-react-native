import Playlist from "../model/playlist.model.js";
import jwtService from "../services/jwtService.js";

export const getPlaylist = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const user = await jwtService.verifyToken(token);

    Playlist.findById(req.params.playlistId, user.id, (err, playlist) => {
      if (!playlist) {
        return res.status(401).json({ conflictError: err });
      } else {
        return res.json(playlist);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);

    Playlist.create(userInfo.id, req.body, (err, data) => {
      if (err) {
        const conflictError = "Tạo playlist không thành công !";
        return res.status(401).json({ conflictError });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);

    Playlist.update(req.params.playlistId, userInfo.id, req.body, (err, data) => {
      if (err) {
        return res.status(401).json({ conflictError: err });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);

    Playlist.findById(req.params.playlistId, userInfo.id, (err, playlist) => {
      if (err) {
        return res.status(400).json({ conflictError: err });
      }

      if (!playlist) {
        return res.status(404).json({ conflictError: "Không tìm thấy bài playlist !" });
      }

      if (playlist.user_id !== userInfo.id) {
        return res.status(401).json({ conflictError: "Không có quyền xóa playlist !" });
      }

      Playlist.delete(playlist.id, (err, data) => {
        if (err) {
          return res.status(400).json({ conflictError: err });
        } else {
          return res.json(data);
        }
      });
    });
  } catch (error) {}
};

export const getAllPlaylist = (req, res) => {
  try {
    Playlist.getAll(req.query, (err, playlist) => {
      if (!playlist) {
        return res.status(401).json("Không tìm thấy");
      } else {
        return res.json(playlist);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllPlaylistByMe = async (req, res) => {
  const token = req.cookies.accessToken;
  const userInfo = await jwtService.verifyToken(token);

  Playlist.getMe(userInfo.id, req.query, (err, data) => {
    if (err) {
      const conflictError = err;
      return res.status(401).json({ conflictError });
    } else {
      return res.json(data);
    }
  });
};

export const getAllPlaylistByUser = (req, res) => {
  try {
    Playlist.findByUserId(req.params.userId, req.query, (err, playlist) => {
      if (!playlist) {
        return res.status(401).json("Không tìm thấy");
      } else {
        return res.json(playlist);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllFavoritesByUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);

    Playlist.findByFavorite(userInfo.id, req.query, (err, data) => {
      if (!data) {
        return res.status(401).json("Không tìm thấy");
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const likePlaylist = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);
    Playlist.like(req.params.playlistId, userInfo.id, (err, data) => {
      if (err) {
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

export const unLikePlaylist = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);

    Playlist.unlike(req.params.playlistId, userInfo.id, (err, data) => {
      if (err) {
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

export const addSongPlaylist = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);

    Playlist.addSong(req.body.playlist_id, req.body.song_id, userInfo.id, (err, data) => {
      if (err) {
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

export const unAddSongPlaylist = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = await jwtService.verifyToken(token);

    Playlist.unAddSong(req.body.playlist_id, req.body.song_id, userInfo.id, (err, data) => {
      if (err) {
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

export default {
  getPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getAllPlaylist,
  getAllPlaylistByMe,
  getAllPlaylistByUser,
  getAllFavoritesByUser,
  likePlaylist,
  unLikePlaylist,
  addSongPlaylist,
  unAddSongPlaylist,
};
