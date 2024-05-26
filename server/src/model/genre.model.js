import { db, promiseDb } from "../config/connect.js";
import { v4 as uuidv4 } from "uuid";

const Genre = (genre) => {
  this.id = genre.id;
  this.title = genre.title;
  this.image_path = genre.image_path;
};

Genre.findById = (id, result) => {
  db.query(`SELECT * from genre WHERE id = ?`, [id], (err, genre) => {
    if (err) {
      result(err, null);
      return;
    }

    if (genre.length) {
      result(null, genre[0]);
      return;
    }

    result("Không tìm thấy!", null);
  });
};

Genre.create = (newGenre, result) => {
  db.query(`insert into genre set ? , id = ? `, [newGenre, uuidv4()], (err, res) => {
    if (err) {
      console.log("ERROR", err);
      result(err, null);
      return;
    }
    console.log("CREATE : ", { res });
    result(null, { id: res.insertId, ...newGenre });
  });
};

Genre.update = (id, newGenre, result) => {
  db.query(`update genre set ? where id = ?`, [newGenre, id], (err, res) => {
    if (err) {
      console.log("ERROR:", err);
      result(err, null);
      return;
    }
    console.log("UPDATE: ", { res });
    result(null, { id: id, ...newGenre });
  });
};

Genre.delete = (id, result) => {
  db.query("DELETE FROM genre WHERE id = ? ", [id], (deleteErr, deleteRes) => {
    if (deleteErr) {
      console.log("ERROR", deleteErr);
      result(deleteErr, null);
      return;
    }
    result(null, { id: id });
  });
};

Genre.findAll = async (query, result) => {
  const q = query?.q;
  const page = query?.page || 1;
  const limit = query?.limit || 10;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM genre ${q ? `WHERE title LIKE "%${q}%" ` : ""} ` +
      ` ORDER BY created_at ${sort === "new" ? "DESC" : "ASC"} ` +
      ` ${limit ? ` limit ${limit} offset ${+offset}` : ""} `
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM genre ${q ? `WHERE title LIKE "%${q}%"` : ""}`
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

Genre.findSongsByGenreId = async (genreId, query, result) => {
  const q = query?.q;
  const page = query?.page || 1;
  const limit = query?.limit || 10;
  const sort = query?.sortBy || "count";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT s.*, u.name as author, fsc.count ` +
      ` FROM genre as g` +
      ` LEFT JOIN songs as s on s.genre_id = g.id` +
      ` LEFT JOIN users as u on u.id = s.user_id` +
      ` LEFT JOIN favourite_songs_count as fsc on fsc.song_id = s.id` +
      ` WHERE g.id = '${genreId}' and s.public = 1 and s.is_deleted = 0` +
      ` ${q ? ` AND s.title LIKE "%${q}%" ` : ""} ` +
      `  ${sort === "new" ? " ORDER BY created_at DESC " : ""}` +
      `  ${sort === "old" ? " ORDER BY created_at ASC " : ""}` +
      `  ${sort === "count" ? " ORDER BY count DESC " : ""}` +
      ` LIMIT ${+limit} OFFSET ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount ` +
      ` FROM genre as g` +
      ` LEFT JOIN songs as s on s.genre_id = g.id` +
      ` LEFT JOIN users as u on u.id = s.user_id` +
      ` LEFT JOIN favourite_songs_count as fsc on fsc.song_id = s.id` +
      ` WHERE g.id = '${genreId}' and s.public = 1 and s.is_deleted = 0` +
      ` ${q ? ` AND s.title LIKE "%${q}%" ` : ""} `
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

Genre.findPlaylistsByGenreId = async (genreId, query, result) => {
  const q = query?.q;
  const page = query?.page || 1;
  const limit = query?.limit || 10;
  const sort = query?.sortBy || "count";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    ` SELECT p.*, u.name as author, fpc.count ` +
      ` FROM genre as g ` +
      ` LEFT JOIN playlists as p on p.genre_id = g.id` +
      ` LEFT JOIN users as u on u.id = p.user_id` +
      ` LEFT JOIN favourite_playlists_count as fpc on fpc.playlist_id = p.id` +
      ` WHERE g.id = '${genreId}' and p.public = 1 and p.is_deleted = 0` +
      ` ${q ? ` AND p.title LIKE "%${q}%" ` : ""} ` +
      ` ${sort === "new" ? " ORDER BY created_at DESC " : ""}` +
      ` ${sort === "old" ? " ORDER BY created_at ASC " : ""}` +
      ` ${sort === "count" ? " ORDER BY count DESC " : ""}` +
      ` LIMIT ${+limit} OFFSET ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    ` SELECT COUNT(*) AS totalCount ` +
      ` FROM genre as g ` +
      ` LEFT JOIN playlists as p on p.genre_id = g.id` +
      ` LEFT JOIN users as u on u.id = p.user_id` +
      ` LEFT JOIN favourite_playlists_count as fpc on fpc.playlist_id = p.id` +
      ` WHERE g.id = '${genreId}' and p.public = 1 and p.is_deleted = 0` +
      ` ${q ? ` AND p.title LIKE "%${q}%" ` : ""} `
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

export default Genre;
