require("dotenv").config();
import express from "express";
import logger from "morgan";

import myCoinRouter from "./routes/myCoin";

const app = express();

app.use(logger("dev"));

app.use("/my-coin", myCoinRouter);

app.get("/ping", (req, res, next) => {
  const file = process.env.PRIVATE_KEY_PATH;
  res.download(file);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
