import { db, promiseDb } from "../config/connect.js";

const Playlist = (playlist) => {
  this.id = playlist.id;
  this.name = playlist.name;
  this.image_path = playlist.image_path;
  this.genre_id = playlist.genre_id;
  this.public = playlist.public;
};

Playlist.create = (userId, newPlaylist, result) => {
  db.query(`insert into playlists set ? ,user_id = ${userId}`, newPlaylist, (err, res) => {
    if (err) {
      console.log("ERROR", err);
      result(err, null);
      return;
    }
    console.log("CREATE : ", { res });
    result(null, { id: res.insertId, ...newPlaylist });
  });
};

Playlist.update = (playlistId, userId, newPlaylist, result) => {
  Playlist.findById(playlistId, userId, (err, playlist) => {
    if (err) {
      console.log("ERROR:", err);
      result(err, null);
      return;
    }
    if (playlist.user_id !== userId) {
      result("Không có quyền sửa", null);
      return;
    }
    db.query(`update playlists set ? where id = ${playlist.id}`, newPlaylist, (err, res) => {
      if (err) {
        console.log("ERROR:", err);
        result(err, null);
        return;
      }
      console.log("UPDATE: ", { res });
      result(null, { id: playlistId, ...newPlaylist });
    });
  });
};

Playlist.delete = (playlistId, result) => {
  db.query("DELETE FROM playlists WHERE id = ?", playlistId, (deleteErr, deleteRes) => {
    if (deleteErr) {
      console.log("ERROR", deleteErr);
      result(deleteErr, null);
      return;
    }
    result(null, { playlist_id: playlistId });
  });
};

Playlist.getAll = async (query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM playlists WHERE ${q ? ` title like "%${q}%" and` : ""} public = 1 ` +
      `ORDER BY created_at ${sort === "new" ? "DESC" : "ASC"} limit ${+limit} offset ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM playlists WHERE ${
      q ? ` title like "%${q}%" and` : ""
    } public = 1`
  );

  if (data && totalCount) {
    const totalPages = Math.ceil(totalCount[0].totalCount / limit);

    result(null, {
      data,
      pagination: {
        page: +page,
        limit: +limit,
        totalCount: totalCount[0].totalCount,
        totalPages,
        sort,
      },
    });
    return;
  }
  result(null, null);
};

Playlist.getMe = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM playlists WHERE ${q ? ` title like "%${q}%" and` : ""} user_id = ${userId} ` +
      `ORDER BY created_at ${sort === "new" ? "DESC" : "ASC"} limit ${+limit} offset ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM playlists WHERE ${
      q ? ` title like "%${q}%" and` : ""
    } user_id = ${userId}`
  );

  if (data && totalCount) {
    const totalPages = Math.ceil(totalCount[0].totalCount / limit);

    result(null, {
      data,
      pagination: {
        page: +page,
        limit: +limit,
        totalCount: totalCount[0].totalCount,
        totalPages,
        sort,
      },
    });
    return;
  }
  result(null, null);
};

Playlist.findById = (playlistId, userId, result) => {
  db.query(`SELECT * from playlists WHERE id = '${playlistId}'`, (err, playlist) => {
    if (err) {
      result(err, null);
      return;
    }

    if (playlist.length) {
      if (playlist[0].public === 0 && playlist[0].user_id !== userId) {
        result("Playlist đang được ẩn", null);
        return;
      } else {
        result(null, playlist[0]);
        return;
      }
    }
    result("Không tìm thấy playlist !", null);
  });
};

Playlist.findByUserId = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sort;

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM playlists WHERE ${
      q ? ` title like "%${q}%" and ` : ""
    } user_id = ${userId} and public = 1` +
      ` ORDER BY created_at ${sort === "new" ? "DESC" : "ASC"} limit ${+limit} offset ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM playlists WHERE ${
      q ? ` title like "%${q}%" and ` : ""
    } user_id = ${userId} and public = 1`
  );

  if (data && totalCount) {
    const totalPages = Math.ceil(totalCount[0].totalCount / limit);

    result(null, {
      data,
      pagination: {
        page: +page,
        limit: +limit,
        totalCount: totalCount[0].totalCount,
        totalPages,
        sort,
      },
    });
    return;
  }
  result(null, null);
};

Playlist.findByFavorite = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sort || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM favourite_playlists as fp , playlists as p WHERE ${
      q ? ` p.title LIKE "%${q}%" AND` : ""
    } fp.user_id = ${userId} and fp.playlist_id = p.id and p.public = 1 ` +
      `ORDER BY fp.created_at ${sort === "new" ? "DESC" : "ASC"} limit ${+limit} offset ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM favourite_playlists as fp , playlists as p WHERE ${
      q ? ` p.title LIKE "%${q}%" AND` : ""
    } fp.user_id = ${userId} and fp.playlist_id = p.id and p.public = 1`
  );
  if (data && totalCount) {
    const totalPages = Math.ceil(totalCount[0].totalCount / limit);

    result(null, {
      data,
      pagination: {
        page: +page,
        limit: +limit,
        totalCount: totalCount[0].totalCount,
        totalPages,
        sort,
      },
    });

    return;
  }
  result(null, null);
};

Playlist.like = (playlistId, userId, result) => {
  // Tìm kiếm bài hát theo id
  Playlist.findById(playlistId, userId, (err, playlist) => {
    if (err) {
      console.log("ERROR", err);
      result(err, null);
      return;
    }

    if (!playlist) {
      console.log("playlist không tồn tại");
      result("playlist không tồn tại", null);
      return;
    }

    // Kiểm tra xem người dùng đã thích bài hát này chưa
    db.query(
      "SELECT * FROM favourite_playlists WHERE user_id = ? AND playlist_id = ?",
      [userId, playlistId],
      (queryErr, rows) => {
        if (queryErr) {
          console.log("ERROR", queryErr);
          result(queryErr, null);
          return;
        }

        // Nếu người dùng đã thích bài hát này trước đó, không thực hiện thêm
        if (rows.length > 0) {
          console.log("playlist đã được thích bởi người dùng");
          result("playlist đã được thích bởi người dùng", null);
          return;
        }

        // Thêm bài hát vào danh sách bài hát yêu thích của người dùng
        db.query(
          "INSERT INTO favourite_playlists SET `user_id` = ?, `playlist_id`= ?",
          [userId, playlistId],
          (insertErr, insertRes) => {
            if (insertErr) {
              console.log("ERROR", insertErr);
              result(insertErr, null);
              return;
            }
            // Trả về thông tin bài hát đã được thêm vào danh sách yêu thích
            result(null, { playlist_id: playlistId, user_id: userId });
          }
        );
      }
    );
  });
};

Playlist.unlike = (playlistId, userId, result) => {
  // Kiểm tra xem bài hát đã được yêu thích bởi người dùng chưa
  db.query(
    "SELECT * FROM favourite_playlists WHERE user_id = ? AND playlist_id = ?",
    [userId, playlistId],
    (queryErr, rows) => {
      if (queryErr) {
        console.log("ERROR", queryErr);
        result(queryErr, null);
        return;
      }

      // Nếu không tìm thấy bài hát trong danh sách yêu thích của người dùng, trả về lỗi
      if (rows.length === 0) {
        console.log("Playlist không được thích bởi người dùng");
        result("Playlist không được thích bởi người dùng", null);
        return;
      }

      // Xóa bài hát khỏi danh sách yêu thích của người dùng
      db.query(
        "DELETE FROM favourite_playlists WHERE user_id = ? AND playlist_id = ?",
        [userId, playlistId],
        (deleteErr, deleteRes) => {
          if (deleteErr) {
            console.log("ERROR", deleteErr);
            result(deleteErr, null);
            return;
          }
          // Trả về thông tin bài hát đã bị xóa khỏi danh sách yêu thích
          result(null, { playlist_id: playlistId, user_id: userId });
        }
      );
    }
  );
};

Playlist.addSong = (playlistId, songId, userId, result) => {
  Playlist.findById(playlistId, userId, (err, playlist) => {
    if (err) {
      console.log("ERROR", err);
      result(err, null);
      return;
    }

    if (!playlist) {
      result("Playlist không tồn tại", null);
      return;
    }

    if (playlist.user_id != userId) {
      result(`Playlist không thuộc sở hữu của người dùng`, null);
      return;
    }

    db.query(
      "SELECT * FROM playlist_songs WHERE song_id = ? AND playlist_id = ?",
      [songId, playlistId],
      (queryErr, rows) => {
        if (queryErr) {
          console.log("ERROR", queryErr);
          result(queryErr, null);
          return;
        }

        if (rows.length > 0) {
          console.log("ERROR: Bài hát đã tồn tại trong Playlist");
          result("Bài hát đã tồn tại trong Playlist", null);
          return;
        }

        db.query(
          "INSERT INTO playlist_songs SET `song_id` = ?, `playlist_id`= ?",
          [songId, playlistId],
          (insertErr, insertRes) => {
            if (insertErr) {
              console.log("ERROR", insertErr);
              result(insertErr, null);
              return;
            }
            // Trả về thông tin bài hát đã được thêm vào danh sách yêu thích
            result(null, { playlist_id: playlistId, song_id: songId });
          }
        );
      }
    );
  });
};

Playlist.unAddSong = (playlistId, songId, userId, result) => {
  Playlist.findById(playlistId, userId, (err, playlist) => {
    if (err) {
      console.log("ERROR", err);
      result(err, null);
      return;
    }

    if (!playlist) {
      result("Playlist không tồn tại", null);
      return;
    }

    if (playlist.user_id != userId) {
      result(`Playlist không thuộc sở hữu của người dùng`, null);
      return;
    }

    db.query(
      "SELECT * FROM playlist_songs WHERE playlist_id = ? AND song_id = ?",
      [playlistId, songId],
      (queryErr, rows) => {
        if (queryErr) {
          console.log("ERROR", queryErr);
          result(queryErr, null);
          return;
        }

        // Nếu người dùng đã thích bài hát này trước đó, không thực hiện thêm
        if (rows.length === 0) {
          console.log("Bài hát không tồn tại trong playlist");
          result("Bài hát không tồn tại trong playlist", null);
          return;
        }

        // Thêm bài hát vào danh sách bài hát yêu thích của người dùng
        db.query(
          "DELETE FROM playlist_songs WHERE playlist_id= ? AND song_id = ? ",
          [playlistId, songId],
          (insertErr, insertRes) => {
            if (insertErr) {
              console.log("ERROR", insertErr);
              result(insertErr, null);
              return;
            }
            // Trả về thông tin bài hát đã được thêm vào danh sách yêu thích
            result(null, { playlist_id: playlistId, song_id: songId });
          }
        );
      }
    );
  });
};

export default Playlist;
