import express from "express";
import { narudzbe, pizze } from "../data/data.js";
const router = express.Router();

router.post("/", (req, res) => {
  const { narucene_pizze, podaci_dostava } = req.body;
  if (narucene_pizze.length === 0 || !narucene_pizze) {
    return res.status(400).json({
      message: "Pizze nisu odabrane.",
    });
  }
  let ukupna_cijena = 0;
  for (const narucena of narucene_pizze) {
    const pizza = pizze.find(
      (p) => p.naziv.toLowerCase() === narucena.naziv.toLowerCase()
    );
    if (!pizza) {
      return res.status(404).json({
        messsage: "Pizza ne postoji",
      });
    }
    const velicina = narucena.velicina.toLowerCase();
    const cijena = pizza.cijene[velicina];
    if (!cijena) {
      return res.status(400).json({
        message: `Veličina ${narucena.velicina} nije dostupna za pizzu ${narucena.naziv}.`,
      });
    }
    ukupna_cijena = ukupna_cijena + cijena * narucena.kolicina;
  }
  ukupna_cijena = Number(ukupna_cijena.toFixed(2));

  const nova_narudzba = {
    id: narudzbe.length + 1,
    narucene_pizze,
    ukupna_cijena,
    podaci_dostava,
  };
  narudzbe.push(nova_narudzba);
  res.status(201).json({
    message: "Narudzba uspjesno kreirana.",
    narudzba: nova_narudzba,
  });
});

export default router;
