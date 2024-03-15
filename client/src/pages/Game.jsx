import { useState } from 'react';
import '../assets/css/Game.css';
import GameCard from '../components/GameCard';

function Game(props) {
    const [formState, setFormState] = useState({rating: '', reviewText: ''});


    // const handleReviewSubmit = async (event) => {
    //     event.preventDefault();
    //     const response = await addReview({
    //         variables: {
    //             rating: formState.rating,
    //             reviewText: formState.reviewText
    //         }
    //     })
    // }

    // const handleChange = (event) => {
    //     const { review, value } = event.target;
    //     setFormState({
    //       ...formState,
    //       [review]: value,
    //     });
    //   };


return (
    <div className="game-main">
        <div className="game-card">
            <GameCard />
        </div>
        <h2>Leave Your Review:</h2>
        <form className="game-form" onSubmit={handleReviewSubmit}>
            <label for="rating">Rating:</label>
            <select className="game-rating" name="rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input 
                className="game-form-input" 
                placeholder="Write your review here..."
                onChange={handleChange}
            />
            <div className="game-form-button">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
)
};

export default Game;