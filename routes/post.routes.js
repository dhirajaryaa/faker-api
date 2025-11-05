import express from "express";
import { POSTS } from "../utils/data.js";
import { sleepFn } from "../utils/sleep.js";

const router = express.Router();

const DEFAULT_LIMIT = 50;

const parseQuery = (req) => {
  const limit = Number(req.query.limit ?? DEFAULT_LIMIT);
  const skip = Number(req.query.skip ?? 0);
  const sleep = Number(req.query.sleep ?? 0);
  return { limit, skip, sleep };
};

// list
router.get("/", async (req, res) => {
  const { limit, skip, sleep } = parseQuery(req);
  const slice = await POSTS.slice(skip, skip + limit);
  await sleepFn(sleep);
  res.json({ meta: { total: POSTS.length, limit, skip }, data: slice });
});

// single
router.get("/:id", async (req, res) => {
  const { sleep } = parseQuery(req);
  const item = await POSTS.find(
    (p) => p.id == req.params.id || p.uuid == req.params.id
  );
  await sleepFn(sleep);
  if (!item) return res.status(404).json({ error: "not found" });
  res.json(item);
});

export default router;
