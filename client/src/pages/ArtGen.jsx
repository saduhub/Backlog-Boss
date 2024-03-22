import '../assets/css/artGen.css';

import { useState } from 'react';
// import dotenv from 'dotenv';
import { OpenAI } from 'openai';
// import { writeFileSync } from 'fs';
// import { getOpenAiKey } from '../../../server/utils/getKeys';

import gamePreview from '../assets/images/png/game-preview.png';

const ArtGen = () => {
  const [prompt, setPrompt ] = useState('');
  const [imgUrl, setImgUrl ] = useState(gamePreview);
  
/*   const openai = new OpenAI({
    apiKey: getOpenAiKey(),
  }); */

  const generateImage = async () => {
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
      setImgUrl(url);
      // console.log(image.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleGen = () => {
    generateImage();
  }
  
  const handlePromptInput = () => {
    setPrompt(document.querySelector('#promptInput').value);
  }

  const handleSaveProfile = () => {
    //// Can only be done after image is converted to png (like shown in handleSaveDevice)
    //// Access user profile pic property (may need global user context), then change current img to new AI-generated image
  }

  const handleSaveDevice = () => {

  }

/*   const handleSaveDevice = async () => {
    // Save image URL to img folder
    const imgResult = await fetch(imgUrl);
    const blob = await imgResult.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    writeFileSync(`../public/SaveData/${Date.now()}.png`, buffer);
  } */

  return (
    <div className="artGen-container artGen-flex artGen-flex-col artGen-items-center">
      <div className="artGen-font artGen-my-p5">
        <h2>
          Backlog Boss AI Art Generator
        </h2>
      </div>

      <div className="artGen-inner-box artGen-border-radius artGen-flex artGen-flex-col artGen-items-center">
        <img src={imgUrl} alt="image preview" id="imagePreview" className="artGen-preview artGen-border-radius" />

        <div className="artGen-flex artGen-content-center">
          <textarea name="promptInput" id="promptInput" cols="30" rows="2" onChange={handlePromptInput} value={prompt} placeholder="Enter a prompt" className="artGen-inputBox"></textarea>
          {/* <input type="text" onChange={handlePromptInput} id="promptInput" name="promptInput" value={prompt} placeholder="Prompt" className="artGen-inputBox" /> */}
        </div>

        <button onClick={handleGen} className="artGen-gen-button artGen-font artGen-border-radius artGen-my-p5">
          Generate
        </button>
      </div>

      <div className="artGen-flex artGen-flex-wrap artGen-gap artGen-content-center">
        <button onClick={handleSaveProfile} className="artGen-save-button artGen-font">
          Save as profile picture
        </button>
        <button onClick={handleSaveDevice} className="artGen-save-button artGen-font">
          Save to device
        </button>
      </div>
    </div>
  )
}

export default ArtGen