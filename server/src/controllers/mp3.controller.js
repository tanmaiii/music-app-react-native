import fs from "fs";
import User from "../model/user.model.js";
import jwtService from "../services/jwtService.js";

export const uploadMp3 = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    User.findById(userInfo.id, (err, user) => {
      if (!user || err) {
        const conflictError = "Không tìm thấy!";
        return res.status(401).json({ conflictError });
      } else {
        if (!req.file) {
          const conflictError = "Please provide an mp3";
          console.log("ERROR UPLOAD MP3: ", conflictError);
          return res.status(401).json({ conflictError });
        }

        const fileName = req.file.filename;
        console.log("UPLOAD MP3: ", { image: fileName });
        return res.json({ mp3: fileName });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteMp3 = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);
    User.findById(userInfo.id, (err, user) => {
      if (!user || err) {
        const conflictError = "Error user not found!";
        return res.status(401).json({ conflictError });
      } else {
        const fileName = req.body.fileName;
        const filePath = `src/data/mp3/${fileName}`;

        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            const conflictError = "File not found";
            return res.status(404).json({ conflictError });
          }

          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              const conflictError = "Error deleting file";
              return res.status(500).json({ conflictError });
            }

            return res.json({ message: "File deleted successfully" });
          });
        });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default {
  uploadMp3,
  deleteMp3,
};
