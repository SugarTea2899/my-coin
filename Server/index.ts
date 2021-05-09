require("dotenv").config();
import express from "express";
import logger from "morgan";
import cors from "cors";
import myCoinRouter from "./routes/myCoin";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json())

app.use("/my-coin", myCoinRouter);

app.get("/ping", (req, res, next) => {
  const file = process.env.PRIVATE_KEY_PATH;
  res.download(file);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
