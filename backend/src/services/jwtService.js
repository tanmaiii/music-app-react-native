import jwt from "jsonwebtoken";

const jwtService = {
  // Hàm tạo token
  generateToken: (payload, options) => {
    // options : { expiresIn: "7d" }
    return jwt.sign(payload, process.env.MY_SECRET, options);
  },

  // Hàm kiểm tra token
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      if (!token) {
        reject({ conflictError: "Can not find token !" });
      }
      jwt.verify(token, process.env.MY_SECRET, (err, decoded) => {
        if (err) {
          reject({ conflictError: "Invalid token!" });
        } else {
          resolve(decoded);
        }
      });
    });
  },
};

export default jwtService;
