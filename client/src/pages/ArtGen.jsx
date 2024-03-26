import '../assets/css/artGen.css';

import { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
// import { writeFileSync } from 'fs';

import gamePreview from '../assets/images/png/game-preview.png';
import { GET_AI_IMAGE } from '../utils/queries';
import { CHANGE_PROFILE_PIC, SAVE_AI_PIC } from '../utils/mutations';

const ArtGen = () => {
  const [prompt, setPrompt ] = useState('');
  const [imgUrl, setImgUrl ] = useState(gamePreview);
  
  const [getAiImage] = useLazyQuery(GET_AI_IMAGE);
  const [changeProfilePic] = useMutation(CHANGE_PROFILE_PIC);
  const [saveAiPic] = useMutation(SAVE_AI_PIC);

  // Generate button
  const handleGen = async () => {
    if(!prompt) return;

    const { data } = await getAiImage({
      variables: {
        prompt
      }
    });
    // console.log(data);
    setImgUrl(data.getAiImage.url);
  }
  
  const handlePromptInput = () => {
    setPrompt(document.querySelector('#promptInput').value);
  }

  // Use as profile picture button
  const handleSaveProfile = async () => {
    if(!imgUrl) return;
    const { data } = await changeProfilePic({
      variables: {
        url: imgUrl
      }
    })
  }

  // Save to account button
  const handleSavePic = async () => {
    if(!imgUrl) return;
    const { data } = await saveAiPic({
      variables: {
        url: imgUrl
      }
    })
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
          Use as profile picture
        </button>
        <button onClick={handleSavePic} className="artGen-save-button artGen-font">
          Save to account
        </button>
      </div>
    </div>
  )
}

export default ArtGen