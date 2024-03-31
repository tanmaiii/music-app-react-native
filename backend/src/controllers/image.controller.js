import fs from 'fs';

export const uploadImage = (req, res) => {
  if (!req.file) {
    const conflictError = "Please provide an image";
    res.status(401).json({ conflictError });
  }

  const fileName = req.file.filename;
  return res.json({ image: fileName });
};

export const deleteImage = (req, res) => {
  const fileName = req.body.fileName;
  console.log(fileName);
  const filePath = `src/data/images/${fileName}`;

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
