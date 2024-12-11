import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "todoapp");
    console.log("From middleware",decoded._id);
    req.user = decoded._id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
