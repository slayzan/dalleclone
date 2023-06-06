import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();
const apiKey = ''

const configuration = new Configuration({
  apiKey: process.env.OpenAIApi,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });
    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error.response.status);
    console.log(error.response.data)
  }
});

export default router;
