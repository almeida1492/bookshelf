import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => console.log("App listening on port 3000"));
