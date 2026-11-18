import cors from "cors";
import "dotenv/config";
import express from "express";
import todoRouter from "./routers/todoRouter";
import dbConnect from "./startup/dbConnect";
import seed from "./startup/seed";

dbConnect();
seed();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello World v2");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
