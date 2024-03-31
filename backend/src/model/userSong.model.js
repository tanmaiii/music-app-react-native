import { db, promiseDb } from "../config/connect.js";
import moment from "moment";
import User from "./user.model.js";

const UserSong = (song) => {
  this.user_id = song.user_id;
  this.song_id = song.song_id;
  this.confirm = song.created_at;
};

UserSong.create = (userId, songId, result) => {
  db.query(
    `INSERT INTO user_songs (song_id, user_id) VALUES (?, ?)`,
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

UserSong.confirm = (userId, songId, result) => {
  db.query(
    `update user_songs set confirm = 1 where song_id = ${songId} and user_id = ${userId}`,
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

UserSong.delete = (userId, songId, result) => {
  db.query(
    `DELETE FROM user_songs WHERE user_id = ${userId} and song_id = ${songId} `,
    (err, res) => {
      if (err) {
        console.log("ERROR", err);
        result(err, null);
        return;
      }
      result(null, { song_id: songId });
    }
  );
};

UserSong.find = (userId, songId, result) => {
  db.query(
    `SELECT * from user_songs WHERE user_id = ${userId} and song_id = ${songId} `,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (!res.length) {
        result("Không tìm thấy !", null);
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

UserSong.findAllUserConfirm = (songId, result) => {
  db.query(
    `SELECT u.id, u.name, u.image_path ,u.verified, us.confirm from user_songs as us, users as u WHERE song_id = ${songId} and us.user_id = u.id and us.confirm = 1`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      result(null, null);
    }
  );
};

UserSong.findAllUser = (songId, result) => {
  db.query(
    `SELECT u.id, u.name, u.image_path , u.verified, us.confirm from user_songs as us, users as u WHERE song_id = ${songId} and us.user_id = u.id `,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (!res.length) {
        result("Không tìm thấy !", null);
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

UserSong.findAllSong = (userId, result) => {
  db.query(
    `SELECT s.* from user_songs as us, song as s WHERE user_id = ${userId} and us.song_id = s.id`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (!res.length) {
        result("Không tìm thấy !", null);
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

export default UserSong;
