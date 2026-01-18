import express from "express";
import connectToDatabase from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

let db = await connectToDatabase();

router.get("/", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let pizze = await pizze_collection.find().toArray();

  res.status(200).send(pizze);
});

router.get("/:naziv", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let nazivParam = req.params.naziv;

  try {
    let result = await pizze_collection.findOne({ naziv: nazivParam });
    res.status(200).json(result);
  } catch (e) {
    console.error(e.errorResponse);
    res.status(400).json({
      error: e.errorResponse,
    });
  }
});

export default router;
