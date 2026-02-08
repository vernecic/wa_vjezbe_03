import express from "express";
import bcrypt from "bcrypt";
import connectToDatabase from "../db.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

const router = express.Router();
config();

const hash_Password = async (password, saltRounds) => {
  try {
    let hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Greška u haširanju", error);
  }
};

const check_Password = async (password, hashedPassword) => {
  try {
    let lozinka_ispravna = await bcrypt.compare(password, hashedPassword);
    return lozinka_ispravna;
  } catch (error) {
    console.error("Greška pri hashiranuj");
  }
};

const generateJWT = (payload) => {
  try {
    let jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
      throw new Error("Tajni ključ za potpisivanje JWT tokena nije dostupan");
    } else {
      let jwt_token = jwt.sign(payload, jwt_secret, { expiresIn: "24h" });
      return jwt_token;
    }
  } catch (error) {
    console.error("Greška pri izradi JWT TOKENA");
  }
};

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Korisničko ime i lozinka su obavezni",
      });
    }

    const db = await connectToDatabase();
    const users_collection = db.collection("users");

    const user = await users_collection.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: "Korisničko ime je zauzeto",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await hash_Password(password, saltRounds);

    const newUser = {
      username: username,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const result = await users_collection.insertOne(newUser);

    res.status(200).json({ result, message: "Registracija uspješna" });
  } catch (error) {
    res.status(500).json({ message: "Grška pri registraciji" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Korisničko ime i lozinka su obavezni",
      });
    }
    const db = await connectToDatabase();
    const users_collection = db.collection("users");

    const user = await users_collection.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "Pogrešan username ili lozinka",
      });
    }

    let lozinka_ispravna = await check_Password(password, user.password);

    let payload = {
      username: username,
    };

    let token = generateJWT(payload);
    if (lozinka_ispravna) {
      return res.status(200).json({
        message: "Uspješno ste autentificirani",
        jwt_token: token,
      });
    } else {
      return res.status(401).json({
        message: "Pogrešan username ili lozinka",
      });
    }
  } catch (error) {
    console.error("Greška pri prijavi", error);
  }
});

export default router;
