import "reflect-metadata";
import { getEnvVariable } from "./utils/db/envVariableControl";
import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();

const dbHost = getEnvVariable("DB_HOST");
const dbPort = getEnvVariable("DB_PORT");
const dbName = getEnvVariable("DB_NAME");
const serverPort = getEnvVariable("SERVER_PORT");

mongoose.set("debug", true);
mongoose
  .connect(`mongodb+srv://karimlaakroud:N0OY7tdMALlPDnKN@karim.y3ogwl5.mongodb.net/?retryWrites=true&w=majority&appName=karim`)
  .then((_) => {
    app.listen(serverPort, () => {
      console.log(
        `Server started on port ${serverPort}, Connected to mongodb: ${dbName}`
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });
