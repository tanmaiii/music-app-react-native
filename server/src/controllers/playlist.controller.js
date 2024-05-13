import Playlist from "../model/playlist.model.js";
import jwtService from "../services/jwtService.js";

export const getPlaylist = async (req, res) => {
  try {
    const token = req.headers["authorization"];
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
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);
    const { ...newPlaylist } = req.body;

    Playlist.create(userInfo.id, newPlaylist, (err, data) => {
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
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    const { ...newPlaylist } = req.body;

    Playlist.update(req.params.playlistId, userInfo.id, newPlaylist, (err, data) => {
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
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Playlist.findById(req.params.playlistId, userInfo.id, (err, playlist) => {
      if (err) {
        return res.status(400).json({ conflictError: err });
      }

      if (!playlist) {
        return res.status(404).json({ conflictError: "Không tìm thấy playlist !" });
      }

      if (playlist.user_id !== userInfo.id) {
        return res.status(401).json({ conflictError: "Không có quyền xóa playlist !" });
      }

      Playlist.delete(playlist.id, (err, data) => {
        if (err) {
          return res.status(400).json({ conflictError: err });
        } else {
          console.log("DELETE PLAYLIST:" + playlist.id);
          return res.json(data);
        }
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const destroyPlaylist = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Playlist.destroy(req.params.playlistId, userInfo.id, (err, data) => {
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

export const restorePlaylist = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Playlist.restore(req.params.playlistId, userInfo.id, (err, data) => {
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
  const token = req.headers["authorization"];
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
    Playlist.findByUserId(req.params.userId, req.query, (error, playlists) => {
      if (error) {
        return res.status(401).json({ conflictError: error });
      } else {
        return res.json(playlists);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllFavoritesByUser = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Playlist.findByFavorite(userInfo.id, req.query, (err, data) => {
      if (!data) {
        return res.status(401).json({ conflictError: "Not found" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const checkPlaylistLike = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    // Tìm bài hát trong database dựa trên songId
    Playlist.findById(req.params.playlistId, userInfo.id, (err, song) => {
      if (err || !song) {
        return res.status(404).json({ conflictError: "Playlist not found" });
      } else {
        // Kiểm tra xem userId có tồn tại trong danh sách người thích của bài hát hay không
        Playlist.findUserLike(req.params.playlistId, (err, data) => {
          if (data) {
            const isLiked = data.includes(userInfo.id);
            return res.status(200).json({ isLiked });
          } else {
            return res.status(200).json({ isLiked: false });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const likePlaylist = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    console.log("body ne", req.body);
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
    const token = req.headers["authorization"];
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

export const checkSongInPlaylist = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    const songId = req.body.song_id;
    const playlistId = req.body.playlist_id;

    console.log(songId, playlistId);

    // Tìm bài hát trong database dựa trên songId
    Playlist.findById(playlistId, userInfo.id, (err, song) => {
      if (err || !song) {
        return res.status(404).json({ conflictError: "Playlist not found" });
      } else {
        // Kiểm tra xem userId có tồn tại trong danh sách người thích của bài hát hay không
        Playlist.findSongInPlaylist(playlistId, (err, data) => {
          console.log("CHECK SONG", data);
          if (data) {
            const isAdd = data.includes(songId);
            return res.status(200).json({ isAdd });
          } else {
            return res.status(200).json({ isAdd: false });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const addSongPlaylist = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Playlist.addSong(req.body.playlist_id, req.body.song_id, userInfo.id, (err, data) => {
      if (err) {
        const conflictError = err;
        return res.status(401).json({ conflictError });
      } else {
        console.log("ADD SONG", data);
        return res.json(data);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const unAddSongPlaylist = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Playlist.unAddSong(req.body.playlist_id, req.body.song_id, userInfo.id, (err, data) => {
      if (err) {
        const conflictError = err;
        return res.status(401).json({ conflictError });
      } else {
        console.log("UN ADD SONG", data);
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
  destroyPlaylist,
  restorePlaylist,

  getAllPlaylist,
  getAllPlaylistByMe,
  getAllPlaylistByUser,
  getAllFavoritesByUser,

  checkPlaylistLike,
  likePlaylist,
  unLikePlaylist,

  checkSongInPlaylist,
  addSongPlaylist,
  unAddSongPlaylist,
};
