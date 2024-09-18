import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import categorieMovimentiRouter from "./api/CategorieMovimenti/categorieMovimenti.router";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/categorie-movimenti", categorieMovimentiRouter);

export default app;
