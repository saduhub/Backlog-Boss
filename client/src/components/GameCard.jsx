import { Link } from 'react-router-dom';
import {useState} from 'react';
import '../assets/css/GameCard.css'
import gamePreview from '../assets/images/png/game-preview.png';

const GameCard = ({game}) => {




    return (
        <div className="game-card-main">
            <div className="game-card-title">
                <h1><span id="title">{game.title}</span> ⭐{game.rating}</h1>
            </div>
            <div className="game-card-image">
                <img src={game.pictureUrl}/>
            </div>
            <div className="game-card-info">
                <h4><span id="release-date">Release Date:</span> {game.releaseDate} </h4>
                <h4><span id="genre">Genre:</span> {game.genre} </h4>
                <h4><span id="platform">Platform:</span> {game.platforms} </h4>
                <p>Brief description of the game</p>
            </div>
            <div className="game-card-buttons">
                <form /*onSubmit = {addToBacklog}*/>
                    <button type="submit">In Backlog</button>
                </form>
                <form /*onSubmit = {addToFavorites}*/>
                    <button type="submit">Favorite</button>
                </form>
                <form /*onSubmit = {addToInProgress}*/>
                    <button type="submit">In Progress</button>
                </form>
                <form /*onSubmit = {addToCompleted}*/>
                    <button type="submit">Completed</button>
                </form>
            </div>
            <div className="game-card-related-div">
                <h2>Related Games</h2>
                <div className="game-card-related">
                    <img src={gamePreview}/>
                    <h3>Related Game 1</h3>
                    <button>View Details</button>
                </div>
            </div>
            <div className="game-card-reviews-div">
                <h2>User Reviews</h2>
                <div className="game-card-reviews">
                    <img /*profilepic*//>
                    <h4>Username Date of Review</h4>
                    <h4>⭐5.0 </h4>
                    <p>Great Game!</p>
                </div>
            </div>
        </div>
    )
}

export default GameCard;