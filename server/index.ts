import * as express from "express";
import { parse } from "url";
import * as next from "next";
import Track from "./track";
import {
  usage,
  getUsage,
  setUsage,
  getUsageList,
  setBudget,
  getBudget
} from "./usage";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  // Record track calls to collect user behavior
  server.post("/api/track", (req, res) => {
    const track = req.body as Track;

    if (!track.userId) {
      res.status(400).send("userId required");
      return;
    }
    setUsage(track);
    console.log(usage);

    res.status(200).send("ok");
  });

  server.post("/api/budget/:budget", (req, res) => {
    setBudget(req.params.budget);
    res.status(200).send("ok");
  });

  // gets list
  server.get("/api/usages", (_, res) => {
    const list = getUsageList();
    res.status(200).json({
      usages: list,
      budget: getBudget()
    });
  });

  // Gets usage info for a particular user
  server.get("/api/usage/:userId", (req, res) => {
    const { userId } = req.params;

    res.status(200).json(getUsage(userId));
  });

  // Makes sure the service is still alive
  server.get("/health", (_, res) => {
    res.send("❤️");
  });

  // Nextjs frontend
  server.get("*", (req, res) => {
    const parsedUrl = parse(req.url, true);

    return handle(req, res, parsedUrl);
  });

  server.listen(port, () =>
    console.log(`Example server listening on port ${port}!`)
  );
});
