import { useState } from 'react';
import '../assets/css/Game.css';

import {useParams} from 'react-router-dom';
import GameCard from '../components/GameCard';
import {useQuery, useMutation} from '@apollo/client'
import {QUERY_GAME} from '../utils/queries'
import {ADD_REVIEW} from '../utils/mutations'



function Game() {
    const [formState, setFormState] = useState({rating: '', reviewText: ''});
    const {id} = useParams()
    console.log(id)
    const {data} = useQuery(QUERY_GAME, {
        
        variables: {
            gameId: id
        }
    })
    const game = data?.game
    const [addReview] = useMutation(ADD_REVIEW);

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await addReview({
                variables: {
                    gameId: game.id,
                    rating: parseInt(formState.rating),
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
        const {name, value} = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]:value
        }))
    };

return (
    <div className="game-main">
        <div className="game-card">
            {game?<GameCard game={game}/>:"loading"}
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
                <textarea
                    className="game-form-input"
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