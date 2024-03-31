import { db, promiseDb } from "../config/connect.js";
import moment from "moment";

const Song = (song) => {
  this.title = song.title;
  this.image_path = song.image_path;
  this.song_path = song.song_path;
  this.public = song.public;
};

Song.create = (userId, newSong, result) => {
  db.query(`insert into songs set ? ,user_id = ${userId}`, newSong, (err, res) => {
    if (err) {
      console.log("ERROR", err);
      result(err, null);
      return;
    }
    console.log("CREATE SONG : ", { res });
    result(null, { id: res.insertId, ...newSong });
  });
};

Song.update = (songId, newSong, result) => {
  db.query(
    `update songs set ? ,update_at = '${moment(Date.now()).format(
      "YYYY-MM-DD HH:mm:ss"
    )}' where id = ${songId}`,
    newSong,
    (err, res) => {
      if (err) {
        console.log("ERROR", err);
        result(err, null);
        return;
      }
      console.log("UPDATE : ", { res });
      result(null, { id: songId, ...newSong });
    }
  );
};

Song.delete = (songId, result) => {
  db.query(
    `UPDATE songs SET is_deleted = 1 ,update_at = '${moment(Date.now()).format(
      "YYYY-MM-DD HH:mm:ss"
    )}' where id = ${songId}`,
    (err, res) => {
      if (err) {
        console.log("ERROR", err);
        result(err, null);
        return;
      }
      result(null, { id: songId });
    }
  );
};

Song.destroy = (songId, userId, result) => {
  db.query("SELECT * FROM songs WHERE id = ? ", songId, (err, song) => {
    if (err) {
      console.log("ERROR", err);
      result(err, null);
      return;
    }

    if (song.length === 0) {
      result("Không tìm thấy !", null);
      return;
    }

    if (song[0].is_deleted === 0) {
      result("Bài hát không có trong danh sách được xóa !", null);
      return;
    }

    if (song[0].user_id !== userId) {
      result("Bài hát không thuộc sở hữu của người dùng !", null);
      return;
    }

    db.query("DELETE FROM songs WHERE id = ?", songId, (deleteErr, deleteRes) => {
      if (deleteErr) {
        console.log("ERROR", deleteErr);
        result(deleteErr, null);
        return;
      }
      result(null, { song_id: songId });
    });
  });
};

Song.restore = (songId, userId, result) => {
  db.query("SELECT * FROM songs WHERE id = ? AND is_deleted = 1", [songId, userId], (err, song) => {
    if (err) {
      console.log("ERROR", err);
      result(err, null);
      return;
    }

    if (song.length === 0) {
      result("Không tìm thấy !", null);
      return;
    }

    if (song[0].user_id !== userId) {
      result("Bài hát không thuộc sở hữu của người dùng !", null);
      return;
    }

    db.query(
      `update songs set is_deleted = 0 ,update_at = '${moment(Date.now()).format(
        "YYYY-MM-DD HH:mm:ss"
      )}' where id = ${songId}`,
      (err, res) => {
        if (err) {
          console.log("ERROR", err);
          result(err, null);
          return;
        }
        result(null, { id: songId });
      }
    );
  });
};

Song.findById = (songId, userId, result) => {
  db.query(
    `SELECT s.*, u.name as author ` +
      ` FROM songs as s` +
      ` LEFT JOIN users AS u ON s.user_id = u.id` +
      ` WHERE s.id = ? AND s.is_deleted = 0`,
    [songId],
    (err, song) => {
      if (err) {
        // Xử lý lỗi
        console.error("Error while querying database:", err);
        result(err, null);
        return;
      }

      if (!song || !song.length) {
        result("Không tìm thấy !", null);
        return;
      }

      // Kiểm tra quyền truy cập
      if (song[0].public === 0 && song[0].user_id !== userId) {
        result("Bài hát đang ẩn !", null);
        return;
      }

      // Trả về kết quả
      result(null, song[0]);
    }
  );
};

Song.findByPlaylistId = async (playlistId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sort || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM playlist_songs as pvs , songs as s WHERE ${
      q ? ` s.title LIKE "%${q}%" AND` : ""
    }  pvs.playlist_id = ${playlistId} and pvs.song_id = s.id and s.public = 1 AND is_deleted = 0 ` +
      `ORDER BY pvs.created_at ${sort === "new" ? "DESC" : "ASC"} limit ${+limit} offset ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM playlist_songs as pvs , songs as s WHERE ${
      q ? ` s.title LIKE "%${q}%" AND` : ""
    } pvs.playlist_id = ${playlistId} and pvs.song_id = s.id and s.public = 1 AND is_deleted = 0`
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

Song.findByFavorite = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sort || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT s.*, u.name as author ` +
      ` FROM favourite_songs AS fs` +
      ` INNER JOIN songs AS s ON fs.song_id = s.id` +
      ` LEFT JOIN users AS u ON s.user_id = u.id` +
      ` WHERE ${q ? ` s.title LIKE "%${q}%" AND` : ""} fs.user_id = ${userId} AND s.public = 1` +
      ` ORDER BY fs.created_at ${sort === "new" ? "DESC" : "ASC"}` +
      ` LIMIT ${+limit} OFFSET ${+offset};`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount ` +
      ` FROM favourite_songs AS fs` +
      ` INNER JOIN songs AS s ON fs.song_id = s.id` +
      ` LEFT JOIN users AS u ON s.user_id = u.id` +
      ` WHERE ${q ? ` s.title LIKE "%${q}%" AND` : ""} fs.user_id = ${userId} AND s.public = 1` +
      ` ORDER BY fs.created_at ${sort === "new" ? "DESC" : "ASC"}` +
      ` LIMIT ${+limit} OFFSET ${+offset};`
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

Song.findByUserId = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sort || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM songs WHERE ${
      q ? ` title LIKE "%${q}%" AND` : ""
    } user_id = ${userId} AND public = 1 AND is_deleted = 0 ` +
      `ORDER BY created_at ${sort === "new" ? "DESC" : "ASC"} limit ${+limit} offset ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM songs WHERE ${
      q ? ` title LIKE "%${q}%" AND` : ""
    } user_id = ${userId} AND public = 1 AND is_deleted = 0 `
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

Song.findUserLike = async (songId, result) => {
  db.query(
    `SELECT user_id FROM music.favourite_songs as fs WHERE fs.song_id = ${songId}`,
    (err, data) => {
      if (err) {
        result(err, null);
        return;
      }

      if (data.length) {
        result(
          null,
          data.map((user) => user.user_id)
        );
        return;
      }

      result(null, null);
    }
  );
};

Song.findAll = async (query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM songs WHERE ${
      q ? ` title LIKE "%${q}%" AND` : ""
    } is_deleted = 0 and public = 1 ` +
      `ORDER BY created_at ${sort === "new" ? "DESC" : "ASC"} limit ${+limit} offset ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM songs WHERE ${
      q ? ` title LIKE "%${q}%" AND` : ""
    } is_deleted = 0 and public = 1 `
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
      },
    });
    return;
  }
  result(null, null);
};

Song.findMe = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sort || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM songs WHERE ${q ? ` title LIKE "%${q}%" AND` : ""} user_id = ${userId}  ` +
      `ORDER BY created_at ${sort === "new" ? "DESC" : "ASC"} limit ${+limit} offset ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM songs WHERE ${
      q ? ` title LIKE "%${q}%" AND` : ""
    } user_id = ${userId} `
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

Song.like = (songId, userId, result) => {
  // Tìm kiếm bài hát theo id
  Song.findById(songId, userId, (err, song) => {
    if (err) {
      console.log("ERROR", err);
      result(err, null);
      return;
    }

    if (!song) {
      console.log("Song not found");
      result("Bài hát không tồn tại", null);
      return;
    }

    // Kiểm tra xem người dùng đã thích bài hát này chưa
    db.query(
      "SELECT * FROM favourite_songs WHERE user_id = ? AND song_id = ?",
      [userId, songId],
      (queryErr, rows) => {
        if (queryErr) {
          console.log("ERROR", queryErr);
          result(queryErr, null);
          return;
        }

        // Nếu người dùng đã thích bài hát này trước đó, không thực hiện thêm
        if (rows.length > 0) {
          console.log("Bài hát đã được thích bởi người dùng");
          result("Bài hát đã được thích bởi người dùng", null);
          return;
        }

        // Thêm bài hát vào danh sách bài hát yêu thích của người dùng
        db.query(
          "INSERT INTO favourite_songs SET `user_id` = ?, `song_id`= ?",
          [userId, songId],
          (insertErr, insertRes) => {
            if (insertErr) {
              console.log("ERROR", insertErr);
              result(insertErr, null);
              return;
            }
            // Trả về thông tin bài hát đã được thêm vào danh sách yêu thích
            result(null, { song_id: songId, user_id: userId });
          }
        );
      }
    );
  });
};

Song.unlike = (songId, userId, result) => {
  // Kiểm tra xem bài hát đã được yêu thích bởi người dùng chưa
  db.query(
    "SELECT * FROM favourite_songs WHERE user_id = ? AND song_id = ?",
    [userId, songId],
    (queryErr, rows) => {
      if (queryErr) {
        console.log("ERROR", queryErr);
        result(queryErr, null);
        return;
      }

      // Nếu không tìm thấy bài hát trong danh sách yêu thích của người dùng, trả về lỗi
      if (rows.length === 0) {
        result("Bài hát không được thích bởi người dùng", null);
        return;
      }

      // Xóa bài hát khỏi danh sách yêu thích của người dùng
      db.query(
        "DELETE FROM favourite_songs WHERE user_id = ? AND song_id = ?",
        [userId, songId],
        (deleteErr, deleteRes) => {
          if (deleteErr) {
            console.log("ERROR", deleteErr);
            result(deleteErr, null);
            return;
          }
          // Trả về thông tin bài hát đã bị xóa khỏi danh sách yêu thích
          result(null, { song_id: songId, user_id: userId });
        }
      );
    }
  );
};

export default Song;
