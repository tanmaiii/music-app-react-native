import fs from "fs";
import jwtService from "../services/jwtService.js";
import User from "../model/user.model.js";

export const uploadImage = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    User.findById(userInfo.id, (err, user) => {
      if (!user || err) {
        const conflictError = "Không tìm thấy!";
        return res.status(401).json({ conflictError });
      } else {
        if (!req.file) {
          const conflictError = "Please provide an image";
          console.log("ERROR UPLOAD IMGAE: ", conflictError);
          return res.status(401).json({ conflictError });
        }

        const fileName = req.file.filename;
        console.log("UPLOAD IMGAE: ", { image: fileName });
        return res.json({ image: fileName });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteImage = (req, res) => {
  const fileName = req.body.fileName;
  const filePath = `src/data/images/${fileName}`;
  
  console.log(fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      const notFoundError = "File not found";
      return res.status(404).json({ notFoundError });
    }

    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        const conflictError = "Error deleting file";
        return res.status(500).json({ conflictError });
      }

      return res.json({ message: "File deleted successfully" });
    });
  });
};

export default {
  uploadImage,
  deleteImage,
};
