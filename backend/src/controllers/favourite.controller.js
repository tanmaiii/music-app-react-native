import { promiseDb, db } from "../config/connect.js";
import Favourite from "../model/favourite.model.js";
import jwtService from "../services/jwtService.js";

const getAllFavoritesByUser = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Favourite.findAll(userInfo.id, req.query, (err, data) => {
      if (!data) {
        return res.status(401).json({ conflictError: "Not found" });
      } else {
        console.log("GET ALL FAVOURITE", data.data);
        return res.json(data);
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getSongsFavoritesByUser = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Favourite.findSongs(userInfo.id, req.query, (err, data) => {
      if (!data) {
        return res.status(401).json({ conflictError: "Not found" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getPlaylistsFavoritesByUser = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Favourite.findPlaylists(userInfo.id, req.query, (err, data) => {
      if (!data) {
        return res.status(401).json({ conflictError: "Not found" });
      } else {
        return res.json(data);
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getArtistsFavoritesByUser = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);

    Favourite.findArtists(userInfo.id, req.query, (err, data) => {
      if (!data) {
        return res.status(401).json({ conflictError: "Not found" });
      } else {
        console.log("GET ARTIST FAVOURITE", data.data);
        return res.json(data);
      }
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default {
  getAllFavoritesByUser,
  getSongsFavoritesByUser,
  getPlaylistsFavoritesByUser,
  getArtistsFavoritesByUser,
};
