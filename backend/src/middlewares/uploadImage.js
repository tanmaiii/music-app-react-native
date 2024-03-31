import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "src/data/images";

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
    console.log(file.originalname);
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb("File image unsupported");
    }
    cb(null, true);
  },
}).single("image");

const uploadImage = (req, res, next) => {
  // if(!req.file)  return res.status(404).json({ conflictError: "emty file" });

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      const conflictError = "Error multer image";
      return res.status(404).json({ conflictError });
    } else if (err) {
      return next(err);
    }
    return next();
  });
};

export default uploadImage;
