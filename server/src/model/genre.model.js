import { db, promiseDb } from "../config/connect.js";

const Genre = (genre) => {
  this.id = genre.id;
  this.title = genre.title;
  this.image_path = genre.image_path;
};

Genre.findById = (id, result) => {
  db.query(`SELECT * from genre WHERE id = '${id}'`, (err, genre) => {
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
  db.query(`insert into genre set ? `, newGenre, (err, res) => {
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
  db.query(`update genre set ? where id = ${id}`, newGenre, (err, res) => {
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
  db.query("DELETE FROM genre WHERE id = ?", id, (deleteErr, deleteRes) => {
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
  const page = query?.page;
  const limit = query?.limit;
  const sort = query?.sortBy || "new";

  const offset = (page - 1) * limit;

  const [data] = await promiseDb.query(
    `SELECT * FROM genre ${q ? `WHERE title LIKE "%${q}%" ` : ""} ` +
      `ORDER BY created_at ${sort === "new" ? "DESC" : "ASC"} limit ${+limit} offset ${+offset}`
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

export default Genre;
