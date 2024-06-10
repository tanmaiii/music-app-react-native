import { db, promiseDb } from "../config/connect.js";
const Search = () => {};

Search.findAll = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page || 1;
  const limit = query?.limit || 100;
  const sort = query?.sortBy;

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    ` SELECT * FROM ( ` +
      `   SELECT 'playlist' AS type, p.id , p.title, u.name as author, NULL AS name ,p.image_path , p.public, fpc.count, p.created_at as created_at` +
      `   FROM playlists AS p ` +
      `   LEFT JOIN users as u on u.id = p.user_id ` +
      `   LEFT JOIN favourite_playlists_count as fpc on fpc.playlist_id = p.id ` +
      `   WHERE ((p.public = 1 ) OR (p.user_id = '${userId}')) AND p.is_deleted = 0 ` +
      `   ${q ? ` AND p.title LIKE "%${q}%" ` : ""} ` +
      ` UNION ` +
      `   SELECT 'song' AS type, s.id, s.title as title, u.name as author, null as name, s.image_path, s.public as public, fsc.count ,s.created_at as created_at ` +
      `   FROM songs AS s ` +
      `   LEFT JOIN users as u on u.id = s.user_id ` +
      `   LEFT JOIN favourite_songs_count as fsc on fsc.song_id = s.id ` +
      `   WHERE ((s.public = 1 ) OR (s.user_id = '${userId}')) AND s.is_deleted = 0 ` +
      `   ${q ? ` AND s.title LIKE "%${q}%" ` : ""} ` +
      ` UNION ` +
      `   SELECT 'artist' AS type, u.id, NUll as title, NUll as author, u.name, u.image_path, NULL as public, fl.count ,Null as created_at ` +
      `   FROM users AS u ` +
      `   LEFT JOIN followers_count as fl on fl.user_id = u.id ` +
      `   WHERE u.email_verified_at IS NOT NULL ` +
      `   ${q ? ` AND U.name LIKE "%${q}%"` : ""} ` +
      `  ${sort === "new" ? " ORDER BY created_at DESC " : ""}` +
      `  ${sort === "old" ? " ORDER BY created_at ASC " : ""}` +
      `  ${sort === "count" ? " ORDER BY count DESC " : ""}` +
      `  ${
        sort === "alpha"
          ? " ORDER BY SUBSTRING(LOWER(title), 1, 1), SUBSTRING(LOWER(name), 1, 1) "
          : ""
      }` +
      ` LIMIT ${+limit} OFFSET ${+offset}` +
      `  ) AS combined_result `
  );

  const [totalCount] = await promiseDb.query(
    `SELECT COUNT(*) AS totalCount FROM (
      SELECT 'playlist' AS type, p.id
      FROM playlists AS p
      LEFT JOIN users as u on u.id = p.user_id
      WHERE ((p.public = 1 ) OR (p.user_id = '${userId}')) AND p.is_deleted = 0
      ${q ? ` AND p.title LIKE "%${q}%" ` : ""}
      UNION
      SELECT 'song' AS type, s.id
      FROM songs AS s
      LEFT JOIN users as u on u.id = s.user_id
      WHERE ((s.public = 1 ) OR (s.user_id = '${userId}')) AND s.is_deleted = 0
      ${q ? ` AND s.title LIKE "%${q}%" ` : ""}
      UNION
      SELECT 'artist' AS type, u.id
      FROM users AS u
      WHERE u.email_verified_at IS NOT NULL
      ${q ? ` AND u.name LIKE "%${q}%"` : ""}
    ) AS combined_result`
  );

  if (data && totalCount) {
    const totalPages = Math.ceil(totalCount[0]?.totalCount / limit);

    result(null, {
      data,
      pagination: {
        page: +page,
        limit: +limit,
        totalCount: totalCount[0]?.totalCount || 0,
        totalPages,
        sort,
        q,
      },
    });

    return;
  }

  result(null, null);
};

Search.findPlaylists = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page || 1;
  const limit = query?.limit || 100;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `  SELECT 'playlist' AS type, p.id , p.title, u.name as author, NULL AS name ,p.image_path , p.public, fpc.count ,p.created_at as created_at  ` +
      ` FROM playlists AS p` +
      ` LEFT JOIN users as u on u.id = p.user_id ` +
      ` LEFT JOIN favourite_playlists_count as fpc on fpc.playlist_id = p.id ` +
      ` WHERE ((p.public = 1 ) OR (p.user_id = '${userId}' AND p.user_id = p.user_id)) AND p.is_deleted = 0 ` +
      ` ${q ? ` AND p.title LIKE "%${q}%" ` : ""} ` +
      `  ${sort === "new" ? " ORDER BY created_at DESC " : ""}` +
      `  ${sort === "old" ? " ORDER BY created_at ASC " : ""}` +
      `  ${sort === "count" ? " ORDER BY count DESC " : ""}` +
      ` LIMIT ${+limit} OFFSET ${+offset}`
  );

  console.log(
    `  SELECT  COUNT(*) AS totalCount ` +
      ` FROM playlists AS p` +
      ` LEFT JOIN users as u on u.id = p.user_id ` +
      ` WHERE ((p.public = 1 ) OR (p.user_id = '${userId}' AND p.user_id = p.user_id)) AND p.is_deleted = 0 ` +
      ` ${q ? ` AND p.title LIKE "%${q}%" ` : ""} `
  );

  const [totalCount] = await promiseDb.query(
    `  SELECT  COUNT(*) AS totalCount ` +
      ` FROM playlists AS p` +
      ` LEFT JOIN users as u on u.id = p.user_id ` +
      ` WHERE ((p.public = 1 ) OR (p.user_id = '${userId}' AND p.user_id = p.user_id)) AND p.is_deleted = 0 ` +
      ` ${q ? ` AND p.title LIKE "%${q}%" ` : ""} `
  );

  if (data && totalCount) {
    const totalPages = Math.ceil(totalCount[0]?.totalCount / limit);

    result(null, {
      data,
      pagination: {
        page: +page,
        limit: +limit,
        totalCount: totalCount[0]?.totalCount || 0,
        totalPages,
        sort,
        q,
      },
    });

    return;
  }
  result(null, null);
};

Search.findSongs = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page || 1;
  const limit = query?.limit || 100;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `  SELECT 'song' AS type, s.id , s.title, u.name as author, NULL AS name , s.image_path , s.public, fsc.count ,s.created_at as created_at` +
      ` FROM songs AS s` +
      ` LEFT JOIN users as u on u.id = s.user_id ` +
      ` LEFT JOIN favourite_songs_count as fsc on fsc.song_id = s.id ` +
      ` WHERE ((s.public = 1 ) OR (s.user_id = '${userId}')) AND s.is_deleted = 0 ` +
      ` ${q ? ` AND s.title LIKE "%${q}%" ` : ""} ` +
      `  ${sort === "new" ? " ORDER BY created_at DESC " : ""}` +
      `  ${sort === "old" ? " ORDER BY created_at ASC " : ""}` +
      `  ${sort === "count" ? " ORDER BY count DESC " : ""}` +
      ` LIMIT ${+limit} OFFSET ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    ` SELECT COUNT(*) AS totalCount ` +
      ` FROM songs AS s` +
      ` LEFT JOIN users as u on u.id = s.user_id ` +
      ` WHERE ((s.public = 1 ) OR (s.user_id = '${userId}')) AND s.is_deleted = 0 ` +
      ` ${q ? ` AND s.title LIKE "%${q}%" ` : ""} `
  );

  if (data && totalCount) {
    const totalPages = Math.ceil(totalCount[0]?.totalCount / limit);

    result(null, {
      data,
      pagination: {
        page: +page,
        limit: +limit,
        totalCount: totalCount[0]?.totalCount || 0,
        totalPages,
        sort,
        q,
      },
    });

    return;
  }
  result(null, null);
};

Search.findArtists = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page || 1;
  const limit = query?.limit || 100;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    ` SELECT 'artist' AS type, u.id , null as title, null as author, u.name AS name , u.image_path ,null as public, fl.count, null as created_at ` +
      ` FROM users as u ` +
      ` LEFT JOIN followers_count as fl on fl.user_id = u.id ` +
      ` ${q ? ` WHERE u.name LIKE "%${q}%" ` : ""} ` +
      `  ${sort === "new" ? " ORDER BY created_at DESC " : ""}` +
      `  ${sort === "old" ? " ORDER BY created_at ASC " : ""}` +
      `  ${sort === "count" ? " ORDER BY count DESC " : ""}` +
      ` LIMIT ${+limit} OFFSET ${+offset}`
  );

  const [totalCount] = await promiseDb.query(
    ` SELECT COUNT(*) AS totalCount ` +
      ` FROM users as u ` +
      ` ${q ? ` WHERE u.name LIKE "%${q}%" ` : ""} `
  );

  if (data && totalCount) {
    const totalPages = Math.ceil(totalCount[0]?.totalCount / limit);

    result(null, {
      data,
      pagination: {
        page: +page,
        limit: +limit,
        totalCount: totalCount[0]?.totalCount || 0,
        totalPages,
        sort,
        q,
      },
    });

    return;
  }
  result(null, null);
};

Search.findSongPopular = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page || 1;
  const limit = query?.limit || 100;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    ` SELECT s.*, u.name as author, count(sp.song_id) as count ` +
      ` FROM  song_plays sp ` +
      ` LEFT JOIN  songs s ON sp.song_id = s.id ` +
      ` LEFT JOIN users as u on u.id = s.user_id  ` +
      ` WHERE  sp.created_at >= NOW() - INTERVAL 30 DAY ` +
      ` AND ((s.public = 1 ) OR (s.user_id = '${userId}')) AND s.is_deleted = 0 ` +
      ` ${q ? ` AND s.title LIKE "%${q}%" ` : ""} ` +
      ` GROUP BY  sp.song_id ` +
      `  ${sort === "new" ? " ORDER BY count DESC " : "ORDER BY count ASC"}` +
      ` LIMIT ${+limit} OFFSET ${+offset} `
  );

  const [totalCount] = await promiseDb.query(
    ` SELECT count(DISTINCT sp.song_id) as totalCount ` +
      ` FROM  song_plays sp ` +
      ` LEFT JOIN  songs s ON sp.song_id = s.id ` +
      ` LEFT JOIN users as u on u.id = s.user_id  ` +
      ` WHERE  sp.created_at >= NOW() - INTERVAL 30 DAY ` +
      ` AND ((s.public = 1 ) OR (s.user_id = '${userId}')) AND s.is_deleted = 0 ` +
      ` ${q ? ` AND s.title LIKE "%${q}%" ` : ""} `
  );

  if (data && totalCount) {
    const totalPages = Math.ceil(totalCount[0]?.totalCount / limit);

    result(null, {
      data,
      pagination: {
        page: +page,
        limit: +limit,
        totalCount: totalCount[0]?.totalCount || 0,
        totalPages,
        sort,
        q,
      },
    });

    return;
  }
  result(null, null);
};

export default Search;
