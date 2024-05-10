import { db, promiseDb } from "../config/connect.js";
import moment from "moment";

const SongPlay = (song) => {
  this.user_id = song.user_id;
  this.song_id = song.song_id;
  this.created_at = song.created_at;
};

SongPlay.create = (userId, songId, result) => {
  db.query(
    `INSERT INTO song_plays (song_id, user_id) VALUES (?, ?)`,
    [songId, userId],
    (err, res) => {
      if (err) {
        console.log("ERROR", err);
        result(err, null);
        return;
      }
      console.log("CREATE : ", { res });
      result(null, { song_id: songId, user_id: userId });
    }
  );
};

SongPlay.update = (userId, songId, result) => {
  db.query(
    `update song_plays set created_at = '${moment(Date.now()).format(
      "YYYY-MM-DD HH:mm:ss"
    )}' where song_id = ${songId} and user_id = ${userId}`,
    (err, res) => {
      if (err) {
        console.log("ERROR", err);
        result(err, null);
        return;
      }
      console.log("UPDATE : ", { res });
      result(null, { song_id: songId, user_id: userId });
    }
  );
};

SongPlay.countSongPlays = (songId, result) => {
  db.query(
    `SELECT COUNT(*) AS totalCount FROM song_plays WHERE song_id = ${songId}`,
    (err, song) => {
      if (err) {
        result(err, null);
        return;
      }

      if (song.length) {
        result(null, song[0].totalCount);
        return;
      }
      result("Không tìm thấy playlist !", null);
    }
  );
};

SongPlay.find = (userId, songId, result) => {
  db.query(
    `SELECT * from song_plays WHERE user_id = '${userId}' and song_id= '${songId}'`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      result(null, null);
    }
  );
};

SongPlay.findAllByUserId = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sort || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM song_plays as sp , songs as s WHERE ${
      q ? ` s.title LIKE "%${q}%" AND` : ""
    }  pvs.user_id = ${userId} and sp.song_id = s.id and s.public = 1 AND is_deleted = 0 ` +
      `ORDER BY sp.created_at ${sort === "new" ? "DESC" : "ASC"} limit ${+limit} offset ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM playlist_songs as sp , songs as s WHERE ${
      q ? ` s.title LIKE "%${q}%" AND` : ""
    } sp.user_id = ${userId} and sp.song_id = s.id and s.public = 1 AND is_deleted = 0 `
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

export default SongPlay;
