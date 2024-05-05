import { db, promiseDb } from "../config/connect.js";
import moment from "moment";
import User from "./user.model.js";

const VerifyCodes = () => {};

VerifyCodes.create = (userId, code, result) => {
  db.query(`SELECT * from verification_codes WHERE user_id = ?`, [userId], (err, res) => {
    if (err) {
      console.log("ERROR", err);
      result(err, null);
      return;
    }
    if (res.length) {
      db.query(
        `UPDATE verification_codes SET code = ? WHERE user_id = ?`,
        [code, userId],
        (err, res) => {
          if (err) {
            console.log("ERROR", err);
            result(err, null);
            return;
          }
          console.log("UPDATE CODE : ", { userId, code });
          result(null, { userId, code });
        }
      );
      return;
    }
    db.query(
      `INSERT INTO verification_codes (user_id, code) VALUES (?, ?)`,
      [userId, code],
      (err, res) => {
        if (err) {
          console.log("ERROR", err);
          result(err, null);
          return;
        }
        console.log("CREATE CODE : ", { userId, code });
        result(null, { userId, code });
      }
    );
  });
};

VerifyCodes.delete = (userId, result) => {
  db.query(`DELETE FROM verification_codes WHERE user_id = ?`,[userId], (err, res) => {
    if (err) {
      console.log("ERROR", err);
      result(err, null);
      return;
    }
    result(null, { userId });
  });
};

VerifyCodes.find = (userId, result) => {
  db.query(`SELECT * from verification_codes WHERE user_id = ?`,[userId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (!res.length) {
      result("Not found !", null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result(null, null);
  });
};

export default VerifyCodes;
