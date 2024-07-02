import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  // const token = req.cookies.access_token;
  const authHeader = req.headers.authorization; //.split(" ")[1];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, msg: "Unauthorized user!" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, msg: "Unauthorized user!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ success: false, msg: "Invalid token" });
    }

    req.userData = decodedToken;
    next();
  });
};
