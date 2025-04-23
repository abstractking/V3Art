import express from "express";
import { registerRoutes } from "./routes.ts";

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.stack || err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

console.log("Starting minimal server initialization...");

console.log("Starting server initialization...");

(async () => {
  console.log("Creating Express app...");
  const app = express();

  try {
    console.log("Registering routes...");
    await registerRoutes(app);
    console.log("Routes registered successfully.");

    const port = 5000;
    console.log(`Starting server on port ${port}...`);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error during server initialization:", error);
  }
})();
