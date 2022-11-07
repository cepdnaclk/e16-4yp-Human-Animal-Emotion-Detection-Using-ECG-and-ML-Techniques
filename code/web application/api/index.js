import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import subjectRoutes from "./src/routes/subjectRoutes";
import ecgDataRoutes from "./src/routes/ecgDataRoutes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGO_ATLAS_URL;

app.use(express.json());
app.use(cors());

app.use("/subjects", subjectRoutes);
app.use("/ecgdata", ecgDataRoutes);
app.get("/", (req, res) => res.send("Welcome to the ECG-EMOTION-DATASET-API!"));
app.all("*", (req, res) => res.send("Route doesn't exist."));

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`DB connected`);
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
