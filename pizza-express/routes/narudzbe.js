import express from "express";
import connectToDatabase from "../db.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

let db = await connectToDatabase();

router.post("/", authMiddleware, async (req, res) => {
  let narudzbe_collection = db.collection("narudzbe");
  let pizza_collection = db.collection("pizze");
  let novaNarudzba = req.body;
  let ukupnaCijenaNarudzbe = 0;

  let kljucevi = ["prezime", "adresa", "telefon", "narucene_pizze"];
  let narudzbaKljucevi = Object.keys(novaNarudzba);
  let kljuceviPizze = ["naziv", "kolicina", "velicina"];

  let kljuceviSePodudaraju = kljucevi.every((k) =>
    narudzbaKljucevi.includes(k),
  );
  if (!kljuceviSePodudaraju || kljucevi.length !== narudzbaKljucevi.length) {
    return res.status(400).json({
      message: "Ključevi se ne podudaraju",
    });
  }
  if (isNaN(novaNarudzba.telefon)) {
    return res.status(400).json({
      message: "Broj telefon mora biti broj.",
    });
  }

  for (let stavka of novaNarudzba.narucene_pizze) {
    let pizza_kljucevi = Object.keys(stavka);
    let kljuceviPizzeSePodudaraju = kljuceviPizze.every((k) =>
      pizza_kljucevi.includes(k),
    );
    if (
      !kljuceviPizzeSePodudaraju ||
      pizza_kljucevi.length !== kljuceviPizze.length
    ) {
      return res.status(400).json({
        message: "Ključevi naručenih pizza se ne podudaraju.",
      });
    }

    let pizza = await pizza_collection.findOne({
      naziv: stavka.naziv,
    });
    if (!pizza) {
      return res.status(400).json({
        message: "Pizza ne postoji,.",
      });
    }
    let cijena = pizza.cijena[stavka.velicina];
    let ukupnaCijenaPizze = cijena * stavka.kolicina;
    ukupnaCijenaNarudzbe += ukupnaCijenaPizze;
  }

  novaNarudzba.username = req.username;
  console.log("USERNAME U NARUDŽBI:", req.username);
  novaNarudzba.ukupna_cijena = ukupnaCijenaNarudzbe;

  try {
    let result = await narudzbe_collection.insertOne(novaNarudzba);
    res.status(200).json({
      message: "Narudžba poslana",
      inseretedId: result.insertedId,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    let narudzbe_collection = db.collection("narudzbe");
    let narudzbe = await narudzbe_collection
      .find({
        username: req.username,
      })
      .toArray();

    res.json(narudzbe);
  } catch (error) {
    res.status(400).json({
      message: "Greška pri dohvaćanju narudžbi.",
    });
  }
});

export default router;
