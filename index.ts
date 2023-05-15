import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import partnerRouter from "./src/routes/partner.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/partner", partnerRouter);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
