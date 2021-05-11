require("dotenv").config();
import express from "express";
import logger from "morgan";
import cors from "cors";
import myCoinRouter from "./routes/myCoin";
import http from 'http';
import P2PServer from "./p2p/P2pServer";

const app = express();
const socketServer = http.createServer(app);

app.use(cors());
app.use(logger("dev"));
app.use(express.json())

app.use("/my-coin", myCoinRouter);

app.get("/ping", (req, res, next) => {
  const file = process.env.PRIVATE_KEY_PATH;
  res.download(file);
});

const HTTP_PORT = process.env.HTTP_PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 5001;

app.listen(HTTP_PORT, () => {
  console.log(`HTTP Server is listening on port ${HTTP_PORT}`);
});

// Config p2pServer
const _p2pServer = new P2PServer(socketServer);
_p2pServer.listen()

socketServer.listen(SOCKET_PORT, () => {
  console.log(`Socket Server is listening on port ${SOCKET_PORT}`)
});

export const p2pServer = _p2pServer;
