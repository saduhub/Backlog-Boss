import { useState } from 'react';
import '../assets/css/Game.css';
import GameCard from '../components/GameCard';


function Game({game}) {
    const [formState, setFormState] = useState({rating: '', reviewText: ''});


    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        const response = await addReview({
            variables: {
                rating: formState.rating,
                reviewText: formState.reviewText
            }
        })
    }

    const handleChange = (event) => {
        const { review, value } = event.target;
        setFormState({
          ...formState,
          [review]: value,
        });
      };


return (
    <div className="game-main">
        <div className="game-card">
            <GameCard />      
        </div>
        
        <form className="game-form" onSubmit={handleReviewSubmit}>
            <h2>Leave Your Review:</h2>
            <div className="game-rating-div">
                <label for="rating" className="game-rating-label">Rating:</label>
                <select className="game-rating" name="rating">
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
                    type= "text"
                    placeholder="Write your review here..."
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