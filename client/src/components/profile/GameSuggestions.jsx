import { useQuery } from "@apollo/client";
import { GAME_SUGGESTIONS } from "../../utils/queries";

function GameSuggestions() {

    const { data, loading, error } = useQuery(GAME_SUGGESTIONS);
    console.log(error);
    if (loading) return <p>Loading...</p>;
    // depending on what I am expecting, it either an [] or an {}
    const gameData = data?.gameSuggestions || []
    console.log(gameData);

    return (
        <div className="profile-game-suggestions">
        {/* Game */}
        <div className="profile-game-suggested">
          <img src={gameData[0].pictureUrl} alt="placeholder" />
          <h3>{gameData[0].title}</h3>
          <button>+</button>
        </div>
        {/* Game */}
        <div className="profile-game-suggested">
          {/* <img src={logo} alt="placeholder" /> */}
          <h3>Game 2</h3>
          <button>+</button>
        </div>
        {/* Game */}
        <div className="profile-game-suggested">
          {/* <img src={logo} alt="placeholder" /> */}
          <h3>Game 3</h3>
          <button>+</button>
        </div>
        {/* Game */}
        <div className="profile-game-suggested">
          {/* <img src={logo} alt="placeholder" /> */}
          <h3>Game 4</h3>
          <button>+</button>
        </div>
        {/* Game */}
        <div className="profile-game-suggested">
          {/* <img src={logo} alt="placeholder" /> */}
          <h3>Game 5</h3>
          <button>+</button>
        </div>
        {/* Explore */}
        <button className='profile-explore-button'>Explore</button>
      </div>
    )
}

export default GameSuggestions;