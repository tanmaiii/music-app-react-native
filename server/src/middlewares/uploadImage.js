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
    var ext = path.extname(file.originalname);
    if (![".png", ".jpg", ".jpeg"].includes(ext.toLowerCase())) {
      return cb(new Error("File hình ảnh không được hỗ trợ"));
    }
    cb(null, true);
  },
}).single("image");

const uploadImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (!req.file) {
      return res.status(404).json({ conflictError: "Không có file được tải lên" });
    }

    if (err instanceof multer.MulterError) {
      conflictError = "Error multer constimage";
      return res.status(404).json({ conflictError });
    } else if (err) {
      // console.log({err});
      return res.status(404).json({ conflictError: err.message });
    }
    return next();
  });
};

export default uploadImage;
