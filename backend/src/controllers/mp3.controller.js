import fs from "fs";

export const uploadMp3 = (req, res) => {
  if (!req.file) {
    const conflictError = "Please provide an mp3";
    res.status(401).json({ conflictError });
  }

  const fileName = req.file.filename;
  return res.json({ mp3: fileName });
};

export const deleteMp3 = (req, res) => {
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
};

export default {
  uploadMp3,
  deleteMp3,
};
