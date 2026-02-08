import jwt from "jsonwebtoken";

const verifyJWT = (token) => {
  try {
    let jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
      throw new Error("Tajni ključ za potpisivanje JWT tokena nije dostupan");
    }
    let decoded = jwt.verify(token, jwt_secret);
    return decoded;
  } catch (error) {
    console.error("Došlo je do greške u izradi JWT tokena!", error);
    return error;
  }
};

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Niste prijavljeni!");
    }
    let decoded = await verifyJWT(token);
    if (!decoded) {
      return res.status(401).send("Nevaljan JWT token!");
    }

    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(401).json({
      message: ("Greška: ", error),
    });
  }
};
