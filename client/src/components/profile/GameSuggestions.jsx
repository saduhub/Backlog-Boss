import { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GAME_SUGGESTIONS } from "../../utils/queries";
import { ADD_TO_BACKLOG } from "../../utils/mutations";
import { Link } from 'react-router-dom';
// eslint-disable-next-line
function GameSuggestions({ gamesInBacklog }) {
    // eslint-disable-next-line
    const { data, loading, error } = useQuery(GAME_SUGGESTIONS);
    const [addToBacklog, { loading: adding }] = useMutation(ADD_TO_BACKLOG);
    const [backlogIds, setBacklogIds] = useState(gamesInBacklog || []);
    const [suggestedGames, setSuggestedGames] = useState([]);
    // console.log(error);
    // eslint-disable-next-line
    const gameData = data?.gameSuggestions || [] // depending on what I am expecting, it either an [] or an {}
    // console.log(gameData);
    // Only suggest 5 random titles that the user does n ot have backlogged
    const updateSuggestedGames = (games, backlog) => {
        const filteredGames = games.filter(game => !backlog.includes(game._id));
        const shuffled = [...filteredGames].sort(() => 0.5 - Math.random());
        setSuggestedGames(shuffled.slice(0, 5));
    };
    // Update suggested games when component mounts or gamesInBacklog changes
    useEffect(() => {
        setBacklogIds(gamesInBacklog || []);
        if (data?.gameSuggestions) {
            updateSuggestedGames(data.gameSuggestions, gamesInBacklog || []);
        }
    }, [gamesInBacklog, data?.gameSuggestions]);
    // Add game to backlog and update state.
    const handleAddToBacklog = (_id) => () => {
        // Prevent multiple clicks while mutation is in progress
        if (adding) return; 
        addToBacklog({ 
            variables: { gameId: _id }
        }).then((response) => {
            // console.log('Game added to backlog');
            // Update the local backlogIds state with the new list from the mutation response
            const updatedBacklogIds = response.data.addToBacklog.gamesInBacklog.map(game => game._id);
            setBacklogIds(updatedBacklogIds);
        // eslint-disable-next-line
        }).catch(error => {
            // console.error('Error adding game to backlog:', error);
        });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="profile-game-suggestions">
        {/* Game */}
        {suggestedGames.map((game) => (
                <div key={game._id} className="profile-game-suggested">
                    <img src={game.pictureUrl} alt={`${game.title} Game Cover`} />
                    <h3>{game.title}</h3>
                    <button 
                        onClick={handleAddToBacklog(game._id)}
                        disabled={backlogIds.includes(game._id)}
                        style={{ backgroundColor: backlogIds.includes(game._id) ? '#E1CDF2' : '#9F34FF' }}
                    >
                        {backlogIds.includes(game._id) ? '✓' : '+'}
                    </button>
                </div>
        ))}
        {/* Explore */}
        <Link to='/search' className='profile-explore-button'>Explore</Link>
      </div>
    )
}

export default GameSuggestions;