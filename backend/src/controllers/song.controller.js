//400:  dữ liệu ko đúng hoặc thiếu thông tin
//401 : người dùng chưa được cấp quyền truy cập
//403:  người dùng không có quyền truy cập vào tài nguyên
//404:  Tài nguyên được yêu cầu không tồn tại trên server.
import Song from "../model/song.model.js";
import jwtService from "../services/jwtService.js";

export const getSong = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    const { token } = req.body;
    console.log("token",token);
    const userInfo = await jwtService.verifyToken(token);

    Song.findById(req.params.songId, userInfo.id, (err, song) => {
      if (err) {
        return res.status(401).json({ conflictError: err });
      }
      if (!song) {
        return res.status(404).json({ conflictError: "Không tìm thấy !" });
      }
      console.log('Get song', song);
      return res.json(song);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createSong = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    const { token } = req.body;
    const userInfo = await jwtService.verifyToken(token);

    Song.create(userInfo.id, req.body, (err, data) => {
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

export const updateSong = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    const { token } = req.body;
    const userInfo = await jwtService.verifyToken(token);
    Song.findById(req.params.songId, userInfo.id, (err, song) => {
      if (err) {
        return res.status(401).json({ conflictError: err });
      }
      if (song.user_id !== userInfo.id) {
        return res.status(401).json({ conflictError: "Không có quyền sửa" });
      }
      Song.update(req.params.songId, req.body, (err, data) => {
        if (err) {
          const conflictError = err;
          return res.status(401).json({ conflictError });
        } else {
          return res.json(data);
        }
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteSong = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    const { token } = req.body;
    const userInfo = await jwtService.verifyToken(token);

    Song.findById(req.params.songId, userInfo.id, (err, song) => {
      if (err) {
        return res.status(400).json({ conflictError: err });
      }

      if (!song) {
        return res.status(404).json({ conflictError: "Không tìm thấy bài hát !" });
      }

      if (song.user_id !== userInfo.id) {
        return res.status(401).json({ conflictError: "Không có quyền xóa bài hát !" });
      }

      Song.delete(req.params.songId, (err, data) => {
        if (err) {
          return res.status(401).json({ conflictError: err });
        } else {
          return res.json(data);
        }
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const destroySong = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    const { token } = req.body;
    const userInfo = await jwtService.verifyToken(token);

    Song.destroy(req.params.songId, userInfo.id, (err, data) => {
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

export const restoreSong = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    const { token } = req.body;
    const userInfo = await jwtService.verifyToken(token);

    Song.restore(req.params.songId, userInfo.id, (err, data) => {
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

export const getAllSong = (req, res) => {
  try {
    Song.findAll(req.query, (err, data) => {
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

export const getAllSongByMe = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    const { token } = req.body;
    const userInfo = await jwtService.verifyToken(token);

    Song.findMe(userInfo.id, req.query, (err, data) => {
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

export const getAllSongByPlaylist = (req, res) => {
  try {
    Song.findByPlaylistId(req.params.playlistId, req.query, (err, data) => {
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

export const getAllSongByUser = (req, res) => {
  try {
    Song.findByUserId(req.params.userId, req.query, (err, data) => {
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

export const getAllFavoritesByUser = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    const { token } = req.body;
    const userInfo = await jwtService.verifyToken(token);

    Song.findByFavorite(userInfo.id, req.query, (err, data) => {
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

export const likeSong = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    const { token } = req.body;
    const userInfo = await jwtService.verifyToken(token);

    Song.like(req.params.songId, userInfo.id, (err, data) => {
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

export const unLikeSong = async (req, res) => {
  try {
    // const token = req.cookies.accessToken;
    const { token } = req.body;
    const userInfo = await jwtService.verifyToken(token);

    Song.unlike(req.params.songId, userInfo.id, (err, data) => {
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

const checkSongLiked = async (req, res) => {
  // const token = req.cookies.accessToken;
  const { token } = req.body;
  const userInfo = await jwtService.verifyToken(token);

  try {
    // Tìm bài hát trong database dựa trên songId
    Song.findById(req.params.songId, userInfo.id, (err, song) => {
      if (err || !song) {
        return res.status(404).json({ conflictError: "Bài hát không tồn tại" });
      } else {
        // Kiểm tra xem userId có tồn tại trong danh sách người thích của bài hát hay không
        Song.findUserLike(req.params.songId, (err, data) => {
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
    return res
      .status(500)
      .json({ conflictError: "Đã xảy ra lỗi khi kiểm tra bài hát đã được thích hay chưa" });
  }
};

export default {
  getSong,
  createSong,
  updateSong,
  deleteSong,
  restoreSong,
  destroySong,
  getAllSong,
  getAllSongByMe,
  getAllSongByPlaylist,
  getAllSongByUser,
  getAllFavoritesByUser,
  likeSong,
  unLikeSong,
  checkSongLiked,
};
