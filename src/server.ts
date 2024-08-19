import "dotenv/config";
import "reflect-metadata";

import express from "express";
import { AppDataSource } from "./config";
import router from "./routes";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    const app = express();
    const PORT = process.env.PORT || 5000;
    router.use(express.json());

    app.get("/", (req, res) => {
      res.send("Auth Service is up and running!");
    });

    app.use("/", router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
