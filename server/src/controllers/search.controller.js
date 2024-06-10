import Search from "../model/search.model.js";
import jwtService from "../services/jwtService.js";

export const getAll = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);
    Search.findAll(userInfo.id, req.query, (err, data) => {
      if (err || !data) {
        return res.status(401).json({ conflictError: "Not found" });
      } else {
        console.log("GET ALL", data.data);
        return res.json(data);
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllPlaylists = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Search.findPlaylists(userInfo.id, req.query, (err, data) => {
      if (err || !data) {
        return res.json({ conflictError: "Not found" });
      } else {
        console.log("GET ALL PLAYLISTS", data.data);
        return res.json(data);
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Search.findSongs(userInfo.id, req.query, (err, data) => {
      if (err || !data) {
        return res.status(401).json({ conflictError: "Not found" });
      } else {
        console.log("GET ALL SONGS", data.data);
        return res.json(data);
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllArtists = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Search.findArtists(userInfo.id, req.query, (err, data) => {
      if (err || !data) {
        return res.status(401).json({ conflictError: "Not found" });
      } else {
        console.log("GET ALL ARTISTS", data.data);
        return res.json(data);
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getSongPopular = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Search.findSongPopular(userInfo.id, req.query, (err, data) => {
      if (err || !data) {
        return res.status(401).json({ conflictError: "Not found" });
      } else {
        console.log("GET POPULAR", data.data);
        return res.json(data);
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default {
  getAll,
  getAllPlaylists,
  getAllSongs,
  getAllArtists,
  getSongPopular,
};
