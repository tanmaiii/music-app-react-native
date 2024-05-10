import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "src/data/mp3";

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 6 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    var ext = path.extname(file.originalname);
    if (ext !== ".mp3") {
      return cb("File mp3 unsupported");
    }
    cb(null, true);
  },
}).single("mp3");

const uploadMp3 = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      const conflictError = "Error multer Mp3";
      return res.status(404).json({ conflictError });
    } else if (err) {
      return next(err);
    }
    return next();
  });
};

export default uploadMp3;
