import { db, promiseDb } from "../config/connect.js";

const Favourite = () => {};

Favourite.findAll = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM (` +
      ` SELECT 'playlist' AS type, p.id , p.title, u.name as author, NULL AS name ,p.image_path , p.public, fp.created_at as created_at ` +
      ` FROM favourite_playlists AS fp` +
      ` LEFT JOIN playlists AS p ON fp.playlist_id = p.id` +
      ` LEFT JOIN users as u on u.id = p.user_id` +
      ` WHERE ((p.public = 1 AND fp.user_id = '${userId}' ) OR (fp.user_id = '${userId}' AND p.user_id = fp.user_id)) AND p.is_deleted = 0 ` +
      ` ${q ? `AND p.title LIKE "%${q}%" ` : ""} ` +
      ` UNION ` +
      ` SELECT 'artist' AS type, u.id, NUll as title,NUll as author, u.name, u.image_path, NULL as public, fl.created_at as created_at ` +
      ` FROM follows AS fl` +
      ` LEFT JOIN users AS u ON u.id = fl.followed_user_id` +
      ` WHERE fl.follower_user_id = '${userId}'` +
      ` ${q ? `AND u.name LIKE "%${q}%" ` : ""} ` +
      ` ORDER BY created_at ${sort === "new" ? "DESC" : "ASC"}` +
      ` LIMIT ${+limit} OFFSET ${+offset}` +
      `) AS combined_result `
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM (` +
      ` SELECT 'playlist' AS type, p.id , p.title, u.name as author, NULL AS name ,p.image_path , p.public, fp.created_at as created_at ` +
      ` FROM favourite_playlists AS fp` +
      ` LEFT JOIN playlists AS p ON fp.playlist_id = p.id` +
      ` LEFT JOIN users as u on u.id = p.user_id` +
      ` WHERE ((p.public = 1 AND fp.user_id = '${userId}' ) OR (fp.user_id = '${userId}' AND p.user_id = fp.user_id)) AND p.is_deleted = 0 ` +
      ` ${q ? `AND p.title LIKE "%${q}%" ` : ""} ` +
      ` UNION ` +
      ` SELECT 'artist' AS type, u.id, NUll as title,NUll as author, u.name, u.image_path, NULL as public, fl.created_at as created_at ` +
      ` FROM follows AS fl` +
      ` LEFT JOIN users AS u ON u.id = fl.followed_user_id` +
      ` WHERE fl.follower_user_id = '${userId}'` +
      ` ${q ? `AND u.name LIKE "%${q}%" ` : ""} ` +
      `) AS combined_result `
  );

  if (data && totalCount && totalCount[0] && totalCount[0].totalCount) {
    const totalPages = Math.ceil(totalCount[0]?.totalCount / limit);

    result(null, {
      data,
      pagination: {
        page: +page,
        limit: +limit,
        totalCount: totalCount[0].totalCount,
        totalPages,
        sort,
        q,
      },
    });

    return;
  }
  result(null, null);
};

Favourite.findSongs = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sort || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT s.id, s.title, s.image_path, u.name as author, s.public, fs.created_at ` +
      ` FROM favourite_songs AS fs ` +
      ` INNER JOIN songs AS s ON fs.song_id = s.id ` +
      ` LEFT JOIN users AS u ON s.user_id = u.id ` +
      ` WHERE ((s.public = 1 AND fs.user_id = '${userId}' ) OR (fs.user_id = '${userId}' AND s.user_id = fs.user_id))` +
      ` AND s.is_deleted = 0 ${q ? `AND s.title LIKE "%${q}%"` : ""} ` +
      ` ORDER BY fs.created_at ${sort === "new" ? "DESC" : "ASC"}` +
      ` LIMIT ${+limit} OFFSET ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount ` +
      ` FROM favourite_songs AS fs ` +
      ` INNER JOIN songs AS s ON fs.song_id = s.id ` +
      ` LEFT JOIN users AS u ON s.user_id = u.id ` +
      ` WHERE ((s.public = 1 AND fs.user_id = '${userId}' ) OR (fs.user_id = '${userId}' AND s.user_id = fs.user_id))` +
      ` AND s.is_deleted = 0 ${q ? `AND s.title LIKE "%${q}%"` : ""} `
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
        q,
      },
    });

    return;
  }
  result(null, null);
};

Favourite.findPlaylists = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT p.id, p.title, p.image_path, u.name as author, p.public, fp.created_at ` +
      ` FROM favourite_playlists AS fp` +
      ` INNER JOIN playlists AS p ON fp.playlist_id = p.id` +
      ` LEFT JOIN users AS u ON p.user_id = u.id` +
      ` WHERE ${q ? ` p.title LIKE "%${q}%" AND ` : ""} ` +
      ` ((p.public = 1 AND fp.user_id = '${userId}' ) OR (fp.user_id = '${userId}' AND p.user_id = fp.user_id)) AND p.is_deleted = 0` +
      ` ORDER BY fp.created_at ${sort === "new" ? "DESC" : "ASC"}` +
      ` LIMIT ${+limit} OFFSET ${+offset} `
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount ` +
      ` FROM favourite_playlists AS fp ` +
      ` INNER JOIN playlists AS p ON fp.playlist_id = p.id` +
      ` LEFT JOIN users AS u ON p.user_id = u.id` +
      ` WHERE ${q ? ` p.title LIKE "%${q}%" AND ` : ""} ` +
      ` ((p.public = 1 AND fp.user_id = '${userId}' ) OR (fp.user_id = '${userId}' AND p.user_id = fp.user_id)) AND p.is_deleted = 0`
  );

  if (data && totalCount && totalCount[0] && totalCount[0].totalCount) {
    const totalPages = Math.ceil(totalCount[0]?.totalCount / limit);

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

Favourite.findArtists = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    ` SELECT u.id, u.name, u.image_path, fl.created_at FROM follows as fl` +
      ` LEFT JOIN users as u on fl.followed_user_id = u.id` +
      ` WHERE fl.follower_user_id = '${userId}' and u.is_admin = 0` +
      ` ${q ? `AND u.name LIKE "%${q}%"` : ""}` +
      ` ORDER BY created_at ${sort === "new" ? "DESC" : "ASC"} ` +
      ` limit ${+limit} offset ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM follows as fl ` +
      ` LEFT JOIN users as u on fl.followed_user_id = u.id ` +
      ` WHERE fl.follower_user_id = '${userId}' and u.is_admin = 0` +
      ` ${q ? `AND u.name LIKE "%${q}%"` : ""}`
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

export default Favourite;
