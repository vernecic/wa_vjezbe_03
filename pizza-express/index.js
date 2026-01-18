import express from "express";
import cors from "cors";
import pizzeRouter from "./routes/pizze.js";

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors(corsOptions));
app.use("/pizze", pizzeRouter);

app.get("/", (req, res) => {
  res.send("Dobrodošli u Pizza Express poslužitelj");
});

app.listen(PORT, () => {
  console.log("Pizza poslužitelj live na portu ", PORT);
});
