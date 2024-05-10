import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import { db } from "./src/config/connect.js";
import routes from "./src/routes/index.js";
import nodemailer from "nodemailer";
import { error } from "console";

const app = express();

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/mp3", express.static(path.join(__dirname, "/src/data/mp3")));
app.use("/image", express.static(path.join(__dirname, "/src/data/images")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", true);
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
  })
);

app.use(cookieParser());

app.use(express.json());

//

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAIL_NAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

app.get("/mail/", async (req, res) => {
  try {
    await transporter.sendMail(
      {
        from: "Tan Mai", // sender address
        to: "1@g.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world ", // plain text body
        html: "<b>Hello world </b>", // html body
      },
      (error, info) => {
        if (error) {
          return res.status(500).json({ error: "Failed to send email." });
        }
        return res.status(200).json({ error: "Successfully to send email." });
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

app.use("/api/", routes);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/api/mysql", (req, res) => {
  db.connect(function (err) {
    if (err) {
      res.status(403).json("Error connecting SQL");
      console.log("Error connecting SQL " + err.stack);
    } else {
      db.query("SHOW DATABASES;", function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    }
  });
});

db.connect(function (err) {
  if (err) {
    console.log("❌ Error connecting SQL " + err.stack);
  } else {
    console.log("✅ Connect Mysql success");
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`✅ Backend run with port ${PORT}`);
});
