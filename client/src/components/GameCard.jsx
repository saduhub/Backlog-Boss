import { Link } from "react-router-dom";
import { useState } from "react";
import {useQuery, useMutation} from '@apollo/client'
import "../assets/css/GameCard.css";
import gamePreview from "../assets/images/png/game-preview.png";
import {ADD_TO_BACKLOG, ADD_TO_FAVORITES, ADD_TO_IN_PROGRESS, ADD_TO_COMPLETED} from '../utils/mutations'

const GameCard = ({ game, Backlog, Favorites, Progress, Completed, refetch}) => {
  const [addToBacklog] = useMutation(ADD_TO_BACKLOG);
  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);
  const [addToInProgress] = useMutation(ADD_TO_IN_PROGRESS);
  const [addToCompleted] = useMutation(ADD_TO_COMPLETED);


  console.log(Backlog)
  const handleAddToBacklog = async () => {
    await addToBacklog({ variables: { gameId: game._id } });
    refetch()
  };

  const handleAddToFavorites = async () => {
    await addToFavorites({ variables: {gameId: game._id  } });
    refetch()
  };

  const handleAddToInProgress = async () => {
    await addToInProgress({ variables: { gameId: game._id  } });
    refetch()
  };

  const handleAddToCompleted = async () => {
    await addToCompleted({ variables: {gameId: game._id  } });
    refetch()
    
  };

  return (
    <div className="game-card-main">
      <div className="game-card-title">
        <h1>
          <span id="title">{game.title}</span> ⭐{game.rating}
        </h1>
      </div>
      <div className="game-card-image">
        <img src={game.pictureUrl} />
      </div>
      <div className="game-card-info">
        <h4>
          <span id="release-date">Release Date:</span> {game.releaseDate}{" "}
        </h4>
        <h4>
          <span id="genre">Genre:</span> {game.genre}{" "}
        </h4>
        <h4>
          <span id="platform">Platform:</span> {game.platforms}{" "}
        </h4>
        <p>{game.description}</p>
      </div>
      <div className="game-card-buttons">
          <button style= {Backlog?{backgroundColor: "#9F34FF"}:{}}onClick = {handleAddToBacklog}>In Backlog</button>
          <button style= {Favorites?{backgroundColor: "#9F34FF"}:{}}onClick = {handleAddToFavorites}>Favorite</button>
          <button style= {Progress?{backgroundColor: "#9F34FF"}:{}}onClick = {handleAddToInProgress}>In Progress</button>
          <button style= {Completed?{backgroundColor: "#9F34FF"}:{}}onClick = {handleAddToCompleted}>Completed</button>
      </div>
      <div className="game-card-related-div">
        <h2>Related Games</h2>
        <div className="game-card-related">
          <img src={gamePreview} />
          <h3>Related Game 1</h3>
          <button>View Details</button>
        </div>
      </div>
      <div className="game-card-reviews-div">
        <h2>User Reviews</h2>
        <div className="game-card-reviews">
          {game.reviews.map((review, index) => (
            <div key={index} className="game-card-single-review">
              <img
                className="game-card-review-profile-picture"
                src={review.user.profilePictureUrl}
                alt={review.user.username}
              />
              <h4>
                {review.user.username}{" "}
                {new Date(parseInt(review.dateOfReview)).toLocaleDateString()}
              </h4>
              <h4>⭐{review.rating} </h4>
              <br></br>
              <p>{review.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
