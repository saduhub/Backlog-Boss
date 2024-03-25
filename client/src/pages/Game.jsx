import { useState } from 'react';
import '../assets/css/Game.css';

import {useParams} from 'react-router-dom';
import GameCard from '../components/GameCard';
import {useQuery, useMutation} from '@apollo/client'
import {GAME_PAGE_QUERY} from '../utils/queries'
import {ADD_REVIEW} from '../utils/mutations'



function Game() {
    const [formState, setFormState] = useState({rating: '', reviewText: ''});
    const {id} = useParams()
    console.log(id)
    const {data, refetch} = useQuery(GAME_PAGE_QUERY, {
        
        variables: {
            gameId: id
        }
    })
    const game = data?.game
    const user = data?.me
    const [addReview] = useMutation(ADD_REVIEW);
    console.log(data)
    console.log(user)
    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await addReview({
                variables: {
                    id: game._id,
                    reviewNum: parseInt(formState.rating),
                    reviewText: formState.reviewText
                    
                }
            });
            console.log('Review added successfully:', response);
            setFormState({ rating: '', reviewText: '' });
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

return (
    <div className="game-main">
        <div className="game-card">
            {game&&user?<GameCard 
            Backlog={!!user.gamesInBacklog.find(backloggame=> backloggame._id === game._id)} 
            Favorites={!!user.gamesInFavorites.find(favoritegame=> favoritegame._id === game._id)}
            Progress={!!user.gamesInProgress.find(progressgame=> progressgame._id === game._id)}
            Completed={!!user.gamesCompleted.find(completedgame=> completedgame._id === game._id)}
            refetch={refetch}
            game={game}/>:"loading"}
        </div>
        
        <form className="game-form" onSubmit={handleReviewSubmit}>
            <h2>Leave Your Review:</h2>
            <div className="game-rating-div">
                <label htmlFor="rating" className="game-rating-label">Rating:</label>
                <select className="game-rating" name="rating" onChange={handleChange}>
                    <option value="1">1 star</option>
                    <option value="2">2 stars</option>
                    <option value="3">3 stars</option>
                    <option value="4">4 stars</option>
                    <option value="5">5 stars</option>
                </select>
            </div>
            <div >
                <input
                    className="game-form-input"
                    name="reviewText"
                    type= "text"
                    placeholder="Write your review here..."
                    value={formState.reviewText}
                    onChange={handleChange}
                />
            </div>
            <div className="game-review-submit">
                <button type="submit" className="game-review-submit-button">Submit Review</button>
            </div>
        </form>
    </div>
)
}

export default Game;