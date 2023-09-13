import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());

/**
 * It handles CORS
 */
app.use((_req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const prisma = new PrismaClient();

app.get("/", (_req, res) => {
  res.json("listening");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () =>
  console.log("🗄 DB is being served on http://localhost:3000")
);
