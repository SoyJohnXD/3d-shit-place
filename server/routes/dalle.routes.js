import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router
  .route("/")
  .get((req, res) =>
    res.status(200).json({ message: "Hello from Dalle Routes" })
  );

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    console.log(response);
    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Algo salio mal" });
  }
});

export default router;
