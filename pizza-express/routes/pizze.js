import express from "express";
import connectToDatabase from "../db.js";

const router = express.Router();

let db = await connectToDatabase();
let pizze;
router.get("/", async (req, res) => {
  let minPrice = Number(req.query.minPrice);
  let maxPrice = Number(req.query.maxPrice);
  let naziv = req.query.naziv;
  let sortBy = req.query.sortBy;

  try {
    let pizze_collection = db.collection("pizze");

    let pipeline = [];
    if (naziv) {
      pipeline.push({
        $match: {
          naziv: { $regex: naziv, $options: "i" },
        },
      });
    }

    if (minPrice || maxPrice) {
      let cijenaFilter = {};

      if (minPrice && !maxPrice) {
        cijenaFilter["cijena.mala"] = { $gte: minPrice };
      } else if (maxPrice && !minPrice) {
        cijenaFilter["cijena.mala"] = { $lte: maxPrice };
      } else if (maxPrice && minPrice) {
        cijenaFilter["cijena.mala"] = { $gte: minPrice, $lte: maxPrice };
      } else cijenaFilter = {};
      pipeline.push({
        $match: cijenaFilter,
      });
    }
    if (sortBy === "PRICE_ASC") {
      pipeline.push({
        $sort: { "cijena.mala": 1 },
      });
    } else if (sortBy === "PRICE_DESC") {
      pipeline.push({
        $sort: { "cijena.mala": -1 },
      });
    }

    pizze = await pizze_collection.aggregate(pipeline).toArray();
    res.status(200).json(pizze);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.errorResponse });
  }
});

router.get("/:naziv", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let nazivParam = req.params.naziv;

  try {
    let result = await pizze_collection.findOne({ naziv: nazivParam });
    if (!result) {
      res.status(404).json({
        message: "Pizza ne postoji.",
      });
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e.errorResponse);
    res.status(400).json({
      error: e.errorResponse,
    });
  }
});

router.post("/", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let novaPizza = req.body;

  const kljucevi = ["naziv", "cijena", "sastojci", "slika_url"];
  if (
    !novaPizza.naziv ||
    !novaPizza.cijena ||
    !novaPizza.sastojci ||
    !novaPizza.slika_url
  ) {
    return res.status(400).json({ message: "Potrebni su svi ključevi." });
  }
  if (
    typeof novaPizza.cijena.mala !== "number" ||
    typeof novaPizza.cijena.srednja !== "number" ||
    typeof novaPizza.cijena.jumbo !== "number"
  ) {
    return res.status(400).json({ message: "Cijena mora biti broj." });
  }
  for (let sastojak of novaPizza.sastojci) {
    if (typeof sastojak !== "string") {
      return res.status(400).json({ message: "Sastojak mora biti string." });
    }
  }

  try {
    let result = await pizze_collection.insertOne(novaPizza);
    return res.status(200).json({ inseretedId: result.inseretedId });
  } catch (e) {
    console.log(e);
  }
});

export default router;
