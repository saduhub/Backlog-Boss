import '../assets/css/artGen.css';

import gamePreview from '../assets/images/png/game-preview.png';

const ArtGen = () => {

  const handleGen = () => {

  }
  
  const handleSaveProfile = () => {

  }

  const handleSaveDevice = () => {

  }

  return (
    <div className="artGen-container artGen-flex artGen-flex-col artGen-items-center">
      <div className="artGen-font artGen-my-p5">
        <h2>
          Backlog Boss AI Art Generator
        </h2>
      </div>

      <div className="artGen-inner-box artGen-border-radius artGen-flex artGen-flex-col artGen-items-center">
        <img src={gamePreview} alt="game preview" className="artGen-preview artGen-border-radius" />

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