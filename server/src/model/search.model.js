import { db, promiseDb } from "../config/connect.js";

const Search = () => {};

Search.findAll = async (userId, query, result) => {
  const q = query?.q;
  const page = query?.page || 1;
  const limit = query?.limit || 100;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    ` SELECT * FROM ( ` +
      `   SELECT 'playlist' AS type, p.id , p.title, u.name as author, NULL AS name ,p.image_path , p.public, p.created_at as created_at ` +
      `   FROM playlists AS p ` +
      `   LEFT JOIN users as u on u.id = p.user_id ` +
      `   WHERE ((p.public = 1 ) OR (p.user_id = '${userId}' AND p.user_id = p.user_id)) AND p.is_deleted = 0 ` +
      `   ${q ? ` AND p.title LIKE "%${q}%" ` : ""} ` +
      ` UNION ` +
      `   SELECT 'song' AS type, s.id, s.title as title, u.name as author, null as name, s.image_path, s.public as public, s.created_at as created_at ` +
      `   FROM songs AS s ` +
      `   LEFT JOIN users as u on u.id = s.user_id ` +
      `   WHERE ((s.public = 1 ) OR (s.user_id = '${userId}' AND s.user_id = s.user_id)) AND s.is_deleted = 0 ` +
      `   ${q ? ` AND s.title LIKE "%${q}%" ` : ""} ` +
      ` UNION ` +
      `   SELECT 'artist' AS type, u.id, NUll as title, NUll as author, u.name, u.image_path, NULL as public, Null as created_at ` +
      `   FROM users AS u ` +
      `   WHERE u.email_verified_at IS NOT NULL ` +
      `   ${q ? ` AND U.name LIKE "%${q}%"` : ""} ` +
      `  ${sort === "new" ? " ORDER BY created_at DESC " : ""}` +
      `  ${sort === "old" ? " ORDER BY created_at ASC " : ""}` +
      `  ${
        sort === "alpha"
          ? " ORDER BY SUBSTRING(LOWER(title), 1, 1), SUBSTRING(LOWER(name), 1, 1) "
          : ""
      }` +
      ` LIMIT ${+limit} OFFSET ${+offset}` +
      `  ) AS combined_result `
  );

  const [totalCount] = await promiseDb.query(
    ` SELECT COUNT(*) AS totalCount FROM ( ` +
      `   SELECT 'playlist' AS type, p.id , p.title, u.name as author, NULL AS name ,p.image_path , p.public, p.created_at as created_at ` +
      `   FROM playlists AS p ` +
      `   LEFT JOIN users as u on u.id = p.user_id ` +
      `   WHERE ((p.public = 1 ) OR (p.user_id = '${userId}' AND p.user_id = p.user_id)) AND p.is_deleted = 0 ` +
      `   ${q ? ` AND p.title LIKE "%${q}%" ` : ""} ` +
      ` UNION ` +
      `   SELECT 'song' AS type, s.id, s.title as title, u.name as author, null as name, s.image_path, s.public as public, s.created_at as created_at ` +
      `   FROM songs AS s ` +
      `   LEFT JOIN users as u on u.id = s.user_id ` +
      `   WHERE ((s.public = 1 ) OR (s.user_id = '${userId}' AND s.user_id = s.user_id)) AND s.is_deleted = 0 ` +
      `   ${q ? ` AND s.title LIKE "%${q}%" ` : ""} ` +
      ` UNION ` +
      `   SELECT 'artist' AS type, u.id, NUll as title, NUll as author, u.name, u.image_path, NULL as public, Null as created_at ` +
      `   FROM users AS u ` +
      `   WHERE u.email_verified_at IS NOT NULL ` +
      `  ) AS combined_result `
  );

  console.log(data);
  console.log(`SELECT * FROM songs LIMIT ${+limit} OFFSET ${+offset}`);

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

Search.findByGenre = async (userId, genreId, query, result) => {};

export default Search;
