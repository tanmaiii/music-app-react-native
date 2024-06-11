import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
});

export const promiseDb = db.promise();
