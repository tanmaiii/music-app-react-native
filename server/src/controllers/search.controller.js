import Search from "../model/search.model.js";
import jwtService from "../services/jwtService.js";

export const getAll = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userInfo = await jwtService.verifyToken(token);
    Search.findAll(userInfo.id, req.query, (err, data) => {
      console.log(data);
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

export default {
  getAll,
};
