import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { Server } from "http";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.db as string);
    server = app.listen(config.port, () => {
      console.log(`App running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
process.on("unhandledRejection", () => {
  console.log("Unhandled rejection detected, shutting down the server");
  if (server) {
    process.exit(1);
  }
});

process.on("uncaughtException", () => {
  console.log("Uncaught exception detected, shutting down the server");
  process.exit(1);
});
