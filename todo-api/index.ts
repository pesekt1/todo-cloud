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
  res.send("Hello World!!!!");
});

const server = app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// ✅ Graceful shutdown for Render / Heroku / Docker
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Exiting...");
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});
