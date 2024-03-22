const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config({ path: path.join(__dirname, "../../.env") });
import { OpenAI } from 'openai';

const fetchPopularGames = async () => {
  const url = `https://api.rawg.io/api/games?page_size=9&key=${process.env.RAWG_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    // console.log(data.results);
    return data.results;
  } catch (err) {
    console.error(err);
  }
}

const generateImage = async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });
  
  try {
    const image = await openai.images.generate({
      model: "dall-e-2",  // dall-e-2 (default) or dall-e-3
      prompt,
      n: 1, // dall-e-2 can generate up to n: 10, dall-e-3 can only use n: 1
      size: "256x256",  // dall-e-2 sizes: "256x256", "512x512", "1024x1024" || dall-e-3 sizes: "1024x1024", "1024x1792", 1792x1024"
      style: "natural", // vivid (default) or natural
      // quality: "standard",  // standard (default) or hd
      // response_format: "url", // url (default) or b64_json
      // user: 'insertUsername' // keeps track of user who generated the image
    });
    
    const url = image.data[0].url;
    return url;
    // setImgUrl(url);
    // console.log(image.data);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  fetchPopularGames,
  generateImage
}